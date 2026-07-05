<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CourseMaterial;

class CourseMaterialController extends Controller
{
    public function store(Request $request)
{
    $validated = $request->validate([
        'course_id' => 'required|exists:courses,id',
        'teacher_id' => 'required|exists:users,id',
        'title' => 'required|string|max:255',
        'file_path' => 'required|string|max:255',
    ]);

    $validated['upload_date'] = now();

    $material = CourseMaterial::create($validated);

    return response()->json([
        'message' => 'Course material created successfully.',
        'data' => $material
    ], 201);
}

public function index()
{
    $materials = CourseMaterial::with(['course', 'teacher'])->get();

    return response()->json([
        'message' => 'Course materials retrieved successfully.',
        'data' => $materials
    ], 200);
}
public function show(CourseMaterial $course_material)
{
    $course_material->load(['course', 'teacher']);

    return response()->json([
        'message' => 'Course material retrieved successfully.',
        'data' => $course_material
    ], 200);
}

public function update(Request $request, CourseMaterial $course_material)
{
    $validated = $request->validate([
        'course_id' => 'required|exists:courses,id',
        'teacher_id' => 'required|exists:users,id',
        'title' => 'required|string|max:255',
        'file_path' => 'required|string|max:255',
    ]);

    $course_material->update($validated);

    return response()->json([
        'message' => 'Course material updated successfully.',
        'data' => $course_material
    ], 200);
}

public function destroy(CourseMaterial $course_material)
{
    $course_material->delete();

    return response()->json([
        'message' => 'Course material deleted successfully.'
    ], 200);
}

}
