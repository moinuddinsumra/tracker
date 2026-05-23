<?php

use App\Http\Controllers\Api\ApiAuthController;
use App\Http\Controllers\Api\ApiDashboardController;
use Illuminate\Support\Facades\Route;

// Public API routes
Route::post('/login', [ApiAuthController::class, 'login']);

// Protected API routes (Sanctum authentication)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [ApiAuthController::class, 'logout']);
    Route::get('/users', [ApiDashboardController::class, 'getUsers']);
    Route::get('/login-activities', [ApiDashboardController::class, 'getLoginActivities']);
    Route::get('/dashboard-data', [ApiDashboardController::class, 'getDashboardData']);
});
