<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\LoginActivity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class ApiAuthController extends Controller
{
    /**
     * Handle API Authentication and issue Sanctum token.
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid email or password clearance code'
            ], 401);
        }

        // Capture activity and increment count
        $activity = LoginActivity::where('user_id', $user->id)->first();
        if ($activity) {
            $activity->update([
                'email' => $user->email,
                'ip_address' => $request->ip(),
                'login_count' => $activity->login_count + 1,
                'login_time' => now(),
                'status' => 'Active',
            ]);
        } else {
            $activity = LoginActivity::create([
                'user_id' => $user->id,
                'email' => $user->email,
                'ip_address' => $request->ip(),
                'login_count' => 1,
                'login_time' => now(),
                'status' => 'Active',
            ]);
        }

        // Generate Sanctum access token
        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'status' => 'success',
            'message' => 'Authentication successful',
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ],
            'activity' => [
                'login_count' => $activity->login_count,
                'ip_address' => $activity->ip_address,
                'login_time' => $activity->login_time ? $activity->login_time->toIso8601String() : null,
                'status' => $activity->status,
            ]
        ]);
    }

    /**
     * Handle API Logout and revoke token.
     */
    public function logout(Request $request)
    {
        $user = $request->user();

        if ($user) {
            $activity = LoginActivity::where('user_id', $user->id)->first();
            if ($activity) {
                $activity->update([
                    'logout_time' => now(),
                    'status' => 'Logged Out',
                ]);
            }

            // Revoke current token
            $user->currentAccessToken()->delete();
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Cleared terminal session and revoked access token'
        ]);
    }
}
