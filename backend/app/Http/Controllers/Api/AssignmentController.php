<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Assignment;


class AssignmentController extends Controller
{

public function index()
{
    return response()->json(
        Assignment::with(['course', 'teacher'])->get(),
        200
    );
}

public function store(Request $request)
{
    $validated = $request->validate([
        'course_id' => 'required|exists:courses,id',
        'teacher_id' => 'required|exists:users,id',
        'title' => 'required|string|max:255',
        'description' => 'required|string',
        'deadline' => 'required|date',
    ]);

    $assignment = Assignment::create($validated);

    return response()->json([
        'message' => 'Assignment created successfully.',
        'assignment' => $assignment,
    ], 201);
}

public function show(string $id)
{
    return response()->json(
        Assignment::with(['course', 'teacher'])->findOrFail($id),
        200
    );
}

public function update(Request $request, string $id)
{
    $assignment = Assignment::findOrFail($id);

    $validated = $request->validate([
        'course_id' => 'required|exists:courses,id',
        'teacher_id' => 'required|exists:users,id',
        'title' => 'required|string|max:255',
        'description' => 'required|string',
        'deadline' => 'required|date',
    ]);

    $assignment->update($validated);

    return response()->json([
        'message' => 'Assignment updated successfully.',
        'assignment' => $assignment,
    ]);
}

public function destroy(string $id)
{
    Assignment::findOrFail($id)->delete();

    return response()->json([
        'message' => 'Assignment deleted successfully.'
    ]);
}


}
