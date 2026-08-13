<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\CourseController;
use App\Http\Controllers\Api\AssignmentController;
use App\Http\Controllers\Api\NoticeController;
use App\Http\Controllers\Api\AiRequestController;
use App\Http\Controllers\Api\CTNoticeController;
use App\Http\Controllers\Api\CourseMaterialController;
use App\Http\Controllers\Api\RoutineController;
use App\Http\Controllers\Api\ExamRoutineController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Admin\AdminDashboardController;


// Authentication Routes

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


// Protected Routes (Login Required)

Route::middleware('auth:sanctum')->group(function () {

    
    // Common Routes (All Logged-in Users)
    
    Route::get('/profile', [AuthController::class, 'profile']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::put('/update-password', [AuthController::class, 'updatePassword']);

    
    // Admin Routes
    
    Route::middleware('role:admin')->group(function () {

        // Dashboard
        Route::get('/admin-dashboard', [DashboardController::class, 'adminDashboard']);
        Route::get('/admin/dashboard',[DashboardController::class,'index']);
        
        

        // User Management
        Route::get('/users', [UserController::class, 'index']);
        Route::get('/users/{user}', [UserController::class, 'show']);
        Route::put('/users/{user}', [UserController::class, 'update']);
        Route::delete('/users/{user}', [UserController::class, 'destroy']);

        // Course Management
        Route::apiResource('courses', CourseController::class);

        // Notice Management
        Route::apiResource('notices', NoticeController::class);

        // Class Routine Management
        Route::post('/routines', [RoutineController::class, 'store']);
        Route::get('/routines', [RoutineController::class, 'index']);
        Route::put('/routines/{routine}', [RoutineController::class, 'update']);
        Route::delete('/routines/{routine}', [RoutineController::class, 'destroy']);

        // Exam Routine Management
        Route::post('/exam-routines', [ExamRoutineController::class, 'store']);
        Route::get('/exam-routines', [ExamRoutineController::class, 'index']);
        Route::put('/exam-routines/{exam_routine}', [ExamRoutineController::class, 'update']);
        Route::delete('/exam-routines/{exam_routine}', [ExamRoutineController::class, 'destroy']);
    });

    // Teacher Routes
    
    Route::middleware('role:teacher')->group(function () {

        // Dashboard
        Route::get('/teacher-dashboard', [DashboardController::class, 'teacherDashboard']);

        // Assignment Management
        Route::apiResource('assignments', AssignmentController::class);

        //AI REQUEST MANAGEMENT IMPLEMENT LATER

        // CT Notice Management
        Route::get('/ct-notices', [CTNoticeController::class, 'index']);
        Route::post('/ct-notices', [CTNoticeController::class, 'store']);
        Route::get('/ct-notices/{ct_notice}', [CTNoticeController::class, 'show']);
        Route::put('/ct-notices/{ct_notice}', [CTNoticeController::class, 'update']);
        Route::delete('/ct-notices/{ct_notice}', [CTNoticeController::class, 'destroy']);

        // Course Material Management
        Route::get('/course-materials', [CourseMaterialController::class, 'index']);
        Route::post('/course-materials', [CourseMaterialController::class, 'store']);
        Route::get('/course-materials/{course_material}', [CourseMaterialController::class, 'show']);
        Route::put('/course-materials/{course_material}', [CourseMaterialController::class, 'update']);
        Route::delete('/course-materials/{course_material}', [CourseMaterialController::class, 'destroy']);


    });

    // Student Routes
    
    Route::middleware('role:student')->group(function () {

        // Dashboard
        Route::get('/student-dashboard', [DashboardController::class, 'studentDashboard']);
        
        // AI Services
        Route::post('/ai/chat', [AiRequestController::class, 'chat']);
        Route::post('/ai/study-plan', [AiRequestController::class, 'studyPlan']);
        Route::post('/ai/assignment-helper', [AiRequestController::class, 'assignmentHelper']);
        Route::post('/ai/quiz', [AiRequestController::class, 'quiz']);
        Route::post('/ai/summarize', [AiRequestController::class, 'summarize']);

    });

});

