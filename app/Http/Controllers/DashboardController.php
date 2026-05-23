<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\LoginActivity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    /**
     * Show the application dashboard.
     */
    public function index()
    {
        $totalUsers = User::count();
        $totalLogins = LoginActivity::sum('login_count');
        $activeUsers = LoginActivity::where('status', 'Active')->count();
        
        $lastLoginAct = LoginActivity::orderBy('login_time', 'desc')->first();
        $lastLoginUser = 'None';
        $lastLoginTimeAgo = '';
        if ($lastLoginAct) {
            $lastLoginUser = $lastLoginAct->email;
            $lastLoginTimeAgo = $lastLoginAct->login_time ? $lastLoginAct->login_time->diffForHumans() : 'Never';
        }

        $users = User::select('id', 'name', 'email', 'created_at')->orderBy('id', 'asc')->get();
        $activities = LoginActivity::orderBy('login_time', 'desc')->get();

        return view('dashboard', compact(
            'totalUsers',
            'totalLogins',
            'activeUsers',
            'lastLoginUser',
            'lastLoginTimeAgo',
            'users',
            'activities'
        ));
    }

    /**
     * Get the merged dashboard data using a SQL JOIN.
     */
    public function getDashboardData()
    {
        $data = DB::table('users')
            ->leftJoin('login_activities', 'users.id', '=', 'login_activities.user_id')
            ->select(
                'users.id as user_id',
                'users.name',
                'users.email',
                DB::raw('COALESCE(login_activities.login_count, 0) as total_login_count'),
                'login_activities.ip_address as latest_ip_address',
                'login_activities.login_time as latest_login_time',
                'login_activities.status as session_status'
            )
            ->orderBy('users.id', 'asc')
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $data
        ]);
    }
}
