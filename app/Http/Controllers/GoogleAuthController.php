<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\LoginActivity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class GoogleAuthController extends Controller
{
    /**
     * Redirect the user to the Google OAuth sign-in page.
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function redirectToGoogle()
    {
        // Redirect to Google's authentication server using Socialite driver
        return Socialite::driver('google')->redirect();
    }

    /**
     * Handle the callback authentication from Google OAuth.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function handleGoogleCallback(Request $request)
    {
        try {
            // Retrieve Google user details in a stateless or standard format
            $googleUser = Socialite::driver('google')->user();
            
            // Validate that we received necessary fields from Google
            if (empty($googleUser->getEmail())) {
                return redirect()->route('login')->withErrors([
                    'email' => 'Unable to retrieve your email address from Google. Please try again.',
                ]);
            }

            // Wrap operations in a database transaction to ensure atomicity
            $user = DB::transaction(function () use ($googleUser) {
                // 1. Try to find the user by their Google ID first
                $user = User::where('google_id', $googleUser->getId())->first();

                if ($user) {
                    // Update user's avatar in case it changed
                    if ($googleUser->getAvatar() && $user->avatar !== $googleUser->getAvatar()) {
                        $user->update(['avatar' => $googleUser->getAvatar()]);
                    }
                    return $user;
                }

                // 2. Check if a user with the same Gmail address already exists
                $user = User::where('email', $googleUser->getEmail())->first();

                if ($user) {
                    // Link Google account to existing email
                    $user->update([
                        'google_id' => $googleUser->getId(),
                        'avatar' => $googleUser->getAvatar(),
                    ]);
                    return $user;
                }

                // 3. Register as a new user with a cryptographically secure random password
                return User::create([
                    'name' => $googleUser->getName() ?? $googleUser->getNickname() ?? 'Google User',
                    'email' => $googleUser->getEmail(),
                    'google_id' => $googleUser->getId(),
                    'avatar' => $googleUser->getAvatar(),
                    'password' => Hash::make(Str::random(32)), // Secure, high-entropy password
                ]);
            });

            // Log the user into the application using secure session authentication
            Auth::login($user);

            // Track login activity in database
            $activity = LoginActivity::where('user_id', $user->id)->first();

            if ($activity) {
                $activity->update([
                    'email' => $user->email,
                    'ip_address' => $request->ip(),
                    'login_count' => $activity->login_count + 1, // Increment login count
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

            // Secure the session: regenerate session ID to prevent session fixation attacks
            $request->session()->regenerate();

            // Bind the active session to the user's current IP and User Agent to prevent session hijacking
            $request->session()->put('login_ip', $request->ip());
            $request->session()->put('login_user_agent', $request->userAgent());

            return redirect()->intended(route('dashboard'));

        } catch (\Exception $e) {
            // Log security and provider errors for administrative investigation
            Log::error('Google OAuth authentication failed: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString()
            ]);

            return redirect()->route('login')->withErrors([
                'email' => 'Google authorization failed. Access denied by authentication terminal.',
            ]);
        }
    }
}
