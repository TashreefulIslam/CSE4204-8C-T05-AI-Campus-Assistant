<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Course;
use App\Models\Assignment;
use App\Models\Notice;
use App\Models\CTNotice;
use App\Models\CourseMaterial;
use App\Models\Enrollment;
use App\Models\Routine;
use App\Models\ExamRoutine;


class DashboardController extends Controller
{

public function adminDashboard()
{
    $dashboard = [

        // User Statistics
        'total_users' => User::count(),
        'total_students' => User::where('role', 'student')->count(),
        'total_teachers' => User::where('role', 'teacher')->count(),
        'total_admins' => User::where('role', 'admin')->count(),

        // Academic Statistics
        'total_courses' => Course::count(),
        'total_assignments' => Assignment::count(),
        'total_ct_notices' => CTNotice::count(),
        'total_course_materials' => CourseMaterial::count(),
        'total_notices' => Notice::count(),

        // Latest Records
        'recent_notices' => Notice::latest()->take(5)->get(),
        'recent_assignments' => Assignment::latest()->take(5)->get(),

    ];

    return response()->json([
        'message' => 'Admin dashboard retrieved successfully.',
        'data' => $dashboard
    ], 200);
}

public function teacherDashboard()
{
    $teacherId = auth()->id();

    $dashboard = [

        // Statistics
        'total_courses' => Course::where('teacher_id', $teacherId)->count(),

        'total_assignments' => Assignment::where('teacher_id', $teacherId)->count(),

        'total_ct_notices' => CTNotice::where('teacher_id', $teacherId)->count(),

        'total_course_materials' => CourseMaterial::where('teacher_id', $teacherId)->count(),

        // My Courses
        'my_courses' => Course::where('teacher_id', $teacherId)->get(),

        // Recent Assignments
        'recent_assignments' => Assignment::where('teacher_id', $teacherId)
            ->latest()
            ->take(5)
            ->get(),

        // Recent CT Notices
        'recent_ct_notices' => CTNotice::where('teacher_id', $teacherId)
            ->latest('created_at')
            ->take(5)
            ->get(),

        // Recent Materials
        'recent_course_materials' => CourseMaterial::where('teacher_id', $teacherId)
            ->latest('upload_date')
            ->take(5)
            ->get(),

        // Latest University Notices
        'latest_notices' => Notice::latest()
            ->take(5)
            ->get(),
    ];

    return response()->json([
        'message' => 'Teacher dashboard retrieved successfully.',
        'data' => $dashboard
    ], 200);
}

public function studentDashboard()
{
    $studentId = auth()->id();

    $courseIds = Enrollment::where('student_id', $studentId)
                    ->pluck('course_id');

    $dashboard = [

        // Student Statistics
        'total_enrolled_courses' => $courseIds->count(),

        // My Courses
        'my_courses' => Course::whereIn('id', $courseIds)->get(),

        // Today's Class Routine
        'today_class_routines' => Routine::whereIn('course_id', $courseIds)
            ->where('day', now()->format('l'))
            ->get(),

        // Upcoming Exams
        'upcoming_exam_routines' => ExamRoutine::whereIn('course_id', $courseIds)
            ->whereDate('exam_date', '>=', today())
            ->orderBy('exam_date')
            ->take(5)
            ->get(),

        // Upcoming CT Notices
        'upcoming_ct_notices' => CTNotice::whereIn('course_id', $courseIds)
            ->whereDate('exam_date', '>=', today())
            ->orderBy('exam_date')
            ->take(5)
            ->get(),

        // Course Materials
        'course_materials' => CourseMaterial::whereIn('course_id', $courseIds)
            ->latest('upload_date')
            ->take(10)
            ->get(),

        // Latest Notices
        'latest_notices' => Notice::latest()
            ->take(5)
            ->get(),
    ];

    return response()->json([
        'message' => 'Student dashboard retrieved successfully.',
        'data' => $dashboard
    ], 200);
}

}
