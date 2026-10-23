<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use App\Models\CourseMaterial;

class CourseMaterialController extends Controller
{
    public function store(Request $request)
{
    $validated = $request->validate([
        'course_id' => [
            'required',
            Rule::exists('courses', 'id')->where(fn ($query) => $query->where('teacher_id', $request->user()->id)),
        ],
        'title' => 'required|string|max:255',
        'file' => 'required|file|mimes:pdf|max:10240',
    ]);

    $validated['teacher_id'] = $request->user()->id;
    $validated['file_path'] = $request->file('file')->store('course-materials', 'public');
    unset($validated['file']);
    $validated['upload_date'] = now();

    $material = CourseMaterial::create($validated);

    return response()->json([
        'message' => 'Course material created successfully.',
        'data' => $material
    ], 201);
}

public function index()
{
    $materials = CourseMaterial::with(['course', 'teacher'])
        ->where('teacher_id', auth()->id())
        ->get();

    return response()->json([
        'message' => 'Course materials retrieved successfully.',
        'data' => $materials
    ], 200);
}
public function show(CourseMaterial $course_material)
{
    abort_unless($course_material->teacher_id === auth()->id(), 403);
    $course_material->load(['course', 'teacher']);

    return response()->json([
        'message' => 'Course material retrieved successfully.',
        'data' => $course_material
    ], 200);
}

public function update(Request $request, CourseMaterial $course_material)
{
    abort_unless($course_material->teacher_id === auth()->id(), 403);

    $validated = $request->validate([
        'course_id' => [
            'required',
            Rule::exists('courses', 'id')->where(fn ($query) => $query->where('teacher_id', $request->user()->id)),
        ],
        'title' => 'required|string|max:255',
        'file' => 'nullable|file|mimes:pdf|max:10240',
    ]);

    if ($request->hasFile('file')) {
        Storage::disk('public')->delete($course_material->file_path);
        $validated['file_path'] = $request->file('file')->store('course-materials', 'public');
    }
    unset($validated['file']);
    $course_material->update($validated);

    return response()->json([
        'message' => 'Course material updated successfully.',
        'data' => $course_material
    ], 200);
}

public function destroy(CourseMaterial $course_material)
{
    abort_unless($course_material->teacher_id === auth()->id(), 403);
    Storage::disk('public')->delete($course_material->file_path);
    $course_material->delete();

    return response()->json([
        'message' => 'Course material deleted successfully.'
    ], 200);
}

}
