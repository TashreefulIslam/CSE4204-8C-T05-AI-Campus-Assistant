<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ExamRoutine;

class ExamRoutineController extends Controller
{

public function store(Request $request)
{
    $validated = $request->validate([
        'course_id' => 'required|exists:courses,id',
        'exam_date' => 'required|date',
        'start_time' => 'required',
        'end_time' => 'required',
        'room' => 'required|string|max:100',
    ]);

    $examRoutine = ExamRoutine::create($validated);

    return response()->json([
        'message' => 'Exam routine created successfully.',
        'data' => $examRoutine
    ], 201);
}

public function index()
{
    $examRoutines = ExamRoutine::with('course')->get();

    return response()->json([
        'message' => 'Exam routines retrieved successfully.',
        'data' => $examRoutines
    ], 200);
}



public function update(Request $request, ExamRoutine $exam_routine)
{
    $validated = $request->validate([
        'course_id' => 'required|exists:courses,id',
        'exam_date' => 'required|date',
        'start_time' => 'required',
        'end_time' => 'required',
        'room' => 'required|string|max:100',
    ]);

    $exam_routine->update($validated);

    return response()->json([
        'message' => 'Exam routine updated successfully.',
        'data' => $exam_routine
    ], 200);
}


public function destroy(ExamRoutine $exam_routine)
{
    $exam_routine->delete();

    return response()->json([
        'message' => 'Exam routine deleted successfully.'
    ], 200);
}

}
