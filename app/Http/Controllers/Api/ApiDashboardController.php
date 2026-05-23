<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\LoginActivity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ApiDashboardController extends Controller
{
    /**
     * Get all registered users.
     */
    public function getUsers()
    {
        $users = User::select('id', 'name', 'email', 'created_at')->orderBy('id', 'asc')->get();

        return response()->json([
            'status' => 'success',
            'data' => $users
        ]);
    }

    /**
     * Get all login activities.
     */
    public function getLoginActivities()
    {
        $activities = LoginActivity::orderBy('login_time', 'desc')->get();

        return response()->json([
            'status' => 'success',
            'data' => $activities
        ]);
    }

    /**
     * Get merged dashboard data via SQL JOIN.
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
                'login_activities.logout_time as latest_logout_time',
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
