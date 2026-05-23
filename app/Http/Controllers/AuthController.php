<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\LoginActivity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{
    /**
     * Show the login form.
     */
    public function showLogin()
    {
        if (Auth::check()) {
            return redirect()->route('dashboard');
        }
        return view('auth.login');
    }

    /**
     * Handle authentication request.
     */
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials, $request->boolean('remember'))) {
            $user = Auth::user();

            // Track login activity
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
                LoginActivity::create([
                    'user_id' => $user->id,
                    'email' => $user->email,
                    'ip_address' => $request->ip(),
                    'login_count' => 1,
                    'login_time' => now(),
                    'status' => 'Active',
                ]);
            }

            $request->session()->regenerate();

            return redirect()->intended(route('dashboard'));
        }

        return back()->withErrors([
            'email' => 'Invalid credentials detected. Please verify your clearance codes.',
        ])->onlyInput('email');
    }

    /**
     * Handle logout request.
     */
    public function logout(Request $request)
    {
        $user = Auth::user();

        if ($user) {
            $activity = LoginActivity::where('user_id', $user->id)->first();
            if ($activity) {
                $activity->update([
                    'logout_time' => now(),
                    'status' => 'Logged Out',
                ]);
            }
        }

        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('login');
    }
}
