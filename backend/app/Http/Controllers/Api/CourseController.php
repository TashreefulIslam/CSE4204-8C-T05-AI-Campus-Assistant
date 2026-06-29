<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Course;


class CourseController extends Controller
{
    public function index()
{
    return response()->json(Course::with('teacher')->get(), 200);
}

public function store(Request $request)
{
    $validated = $request->validate([
        'course_code' => 'required|string|max:20',
        'course_name' => 'required|string|max:255',
        'credit' => 'required|numeric',
        'teacher_id' => 'required|exists:users,id',
    ]);

    $course = Course::create($validated);

    return response()->json([
        'message' => 'Course created successfully.',
        'course' => $course,
    ], 201);
}

public function show(string $id)
{
    $course = Course::with('teacher')->findOrFail($id);

    return response()->json($course, 200);
}

public function update(Request $request, string $id)
{
    $course = Course::findOrFail($id);

    $validated = $request->validate([
        'course_code' => 'required|string|max:20',
        'course_name' => 'required|string|max:255',
        'credit' => 'required|numeric',
        'teacher_id' => 'required|exists:users,id',
    ]);

    $course->update($validated);

    return response()->json([
        'message' => 'Course updated successfully.',
        'course' => $course,
    ], 200);
}

public function destroy(string $id)
{
    $course = Course::findOrFail($id);

    $course->delete();

    return response()->json([
        'message' => 'Course deleted successfully.'
    ], 200);
}
}
