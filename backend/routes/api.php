<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use Laravel\Sanctum\Http\Middleware\CheckAbilities;
use App\Http\Controllers\Api\CourseController;
use App\Http\Controllers\Api\AssignmentController;
use App\Http\Controllers\Api\NoticeController;
use App\Http\Controllers\Api\AiRequestController;
use App\Http\Controllers\Api\UserController;

// Authentication Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::put('/update-password', [AuthController::class, 'updatePassword'])->middleware('auth:sanctum');
Route::middleware('auth:sanctum')->get('/profile', [AuthController::class, 'profile']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
Route::middleware('auth:sanctum')->apiResource('courses', CourseController::class);

Route::middleware('auth:sanctum')->apiResource('assignments', AssignmentController::class);

Route::middleware('auth:sanctum')->apiResource('notices', NoticeController::class);

Route::middleware('auth:sanctum')->apiResource('ai-requests', AiRequestController::class);

Route::middleware('auth:sanctum')->group(function () {

    // User Management
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/users/{user}', [UserController::class, 'show']);
    Route::put('/users/{user}', [UserController::class, 'update']);
    Route::delete('/users/{user}', [UserController::class, 'destroy']);

});
