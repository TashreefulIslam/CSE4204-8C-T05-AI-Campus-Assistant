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
use App\Http\Controllers\Api\EnrollmentController;
use App\Http\Controllers\Api\StudentController;
use App\Http\Controllers\Admin\AdminDashboardController;


// Authentication Routes

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


// Protected Routes (Login Required)

Route::middleware('auth:sanctum')->group(function () {

    
    // Common Routes (All Logged-in Users)
    
    Route::get('/profile', [AuthController::class, 'profile']);
    Route::put('/profile', [AuthController::class, 'updateProfile']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::put('/update-password', [AuthController::class, 'updatePassword']);
    Route::middleware('role:student,teacher')->post('/ai/quiz', [AiRequestController::class, 'quiz']);

    
    // Admin Routes
    
    Route::middleware('role:admin')->group(function () {

        // Dashboard
        Route::get('/admin-dashboard', [DashboardController::class, 'adminDashboard']);
        Route::get('/admin/dashboard',[DashboardController::class,'index']);
        
        

        // User Management
        Route::get('/users', [UserController::class, 'index']);
        Route::post('/users', [UserController::class, 'store']);
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

        // Enrollment Management
        Route::get('/enrollments', [EnrollmentController::class, 'index']);
        Route::post('/enrollments', [EnrollmentController::class, 'store']);
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

        // Enrolled Students
        Route::get('/teacher-students', [DashboardController::class, 'teacherStudents']);


    });

    // Student Routes
    
    Route::middleware('role:student')->group(function () {

        // Dashboard
        Route::get('/student-dashboard', [StudentController::class, 'dashboard']);
        Route::get('/student/resources/dashboard', [StudentController::class, 'dashboard']);
        Route::get('/student/resources/routines', [StudentController::class, 'routines']);
        Route::get('/student/resources/exams', [StudentController::class, 'exams']);
        Route::get('/student/resources/notices', [StudentController::class, 'notices']);
        Route::get('/student/resources/assignments', [StudentController::class, 'assignments']);
        Route::post('/student/resources/assignments/{assignment}/complete', [StudentController::class, 'completeAssignment']);
        Route::get('/student/resources/courses', [StudentController::class, 'courses']);
        Route::get('/student/resources/materials', [StudentController::class, 'materials']);
        Route::get('/student/resources/materials/{course_material}/download', [StudentController::class, 'downloadMaterial']);
        
        // AI Services
        Route::post('/ai/chat', [AiRequestController::class, 'chat']);
        Route::post('/ai/study-plan', [AiRequestController::class, 'studyPlan']);
        Route::post('/ai/assignment-helper', [AiRequestController::class, 'assignmentHelper']);
        Route::post('/ai/summarize', [AiRequestController::class, 'summarize']);

    });

});
