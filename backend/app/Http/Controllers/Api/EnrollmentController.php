<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class EnrollmentController extends Controller
{
    public function index()
    {
        return response()->json([
            'message' => 'Enrollments retrieved successfully.',
            'data' => Enrollment::with([
                'student:id,name,email,university_id,role',
                'course:id,course_code,course_name,teacher_id',
            ])->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'student_id' => [
                'required',
                Rule::exists('users', 'id')->where(fn ($query) => $query->where('role', 'student')),
            ],
            'course_id' => ['required', 'exists:courses,id'],
        ]);

        $enrollment = Enrollment::firstOrCreate($validated);
        $status = $enrollment->wasRecentlyCreated ? 201 : 200;

        return response()->json([
            'message' => $enrollment->wasRecentlyCreated
                ? 'Enrollment created successfully.'
                : 'Student is already enrolled in this course.',
            'data' => $enrollment->load([
                'student:id,name,email,university_id,role',
                'course:id,course_code,course_name,teacher_id',
            ]),
        ], $status);
    }
}
