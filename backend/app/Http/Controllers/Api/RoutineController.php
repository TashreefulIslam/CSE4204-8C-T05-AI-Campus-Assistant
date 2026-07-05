<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Routine;

class RoutineController extends Controller
{

public function store(Request $request)
{
    $validated = $request->validate([
        'course_id' => 'required|exists:courses,id',
        'day' => 'required|string|max:20',
        'start_time' => 'required',
        'end_time' => 'required',
        'room' => 'required|string|max:100',
    ]);

    $routine = Routine::create($validated);

    return response()->json([
        'message' => 'Class routine created successfully.',
        'data' => $routine
    ], 201);
}

public function index()
{
    $routines = Routine::with('course')->get();

    return response()->json([
        'message' => 'Class routines retrieved successfully.',
        'data' => $routines
    ], 200);
}

public function update(Request $request, Routine $routine)
{
    $validated = $request->validate([
        'course_id' => 'required|exists:courses,id',
        'day' => 'required|string|max:20',
        'start_time' => 'required',
        'end_time' => 'required',
        'room' => 'required|string|max:100',
    ]);

    $routine->update($validated);

    return response()->json([
        'message' => 'Class routine updated successfully.',
        'data' => $routine
    ], 200);
}

public function destroy(Routine $routine)
{
    $routine->delete();

    return response()->json([
        'message' => 'Class routine deleted successfully.'
    ], 200);
}
}
