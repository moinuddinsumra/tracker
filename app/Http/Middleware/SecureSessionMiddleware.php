<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class SecureSessionMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Only run checks if the user is authenticated
        if (Auth::check()) {
            $session = $request->session();

            // Bind credentials if they are missing in the current session (e.g. from prior sessions)
            if (!$session->has('login_ip')) {
                $session->put('login_ip', $request->ip());
                $session->put('login_user_agent', $request->userAgent());
            }

            // Check if current IP or User Agent has changed during the active session
            $savedIp = $session->get('login_ip');
            $savedUserAgent = $session->get('login_user_agent');

            if ($savedIp !== $request->ip() || $savedUserAgent !== $request->userAgent()) {
                // Track logout status in LoginActivity if possible
                $user = Auth::user();
                if ($user) {
                    $activity = \App\Models\LoginActivity::where('user_id', $user->id)->first();
                    if ($activity) {
                        $activity->update([
                            'status' => 'Session Hijack Blocked',
                            'logout_time' => now(),
                        ]);
                    }
                }

                // Invalidate session immediately
                Auth::logout();
                $session->invalidate();
                $session->regenerateToken();

                return redirect()->route('login')->withErrors([
                    'email' => 'Access revoked: Session security clearance compromise detected (IP/UA mismatch).',
                ]);
            }
        }

        return $next($request);
    }
}
