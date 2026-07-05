<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CTNotice;

class CTNoticeController extends Controller
{
    public function store(Request $request)
    {
    $validated = $request->validate([
        'course_id' => 'required|exists:courses,id',
        'teacher_id' => 'required|exists:users,id',
        'title' => 'required|string|max:255',
        'exam_date' => 'required|date',
        'start_time' => 'required',
        'end_time' => 'required',
    ]);

    $validated['created_at'] = now();

    $ctNotice = CTNotice::create($validated);

    return response()->json([
        'message' => 'CT Notice created successfully.',
        'data' => $ctNotice
    ], 201);
    }

    public function index()
    {
    $ctNotices = CTNotice::with(['course', 'teacher'])->get();

    return response()->json([
        'message' => 'CT Notices retrieved successfully.',
        'data' => $ctNotices
    ], 200);
}

public function show(CTNotice $ct_notice)
{
    $ct_notice->load(['course', 'teacher']);

    return response()->json([
        'message' => 'CT Notice retrieved successfully.',
        'data' => $ct_notice
    ], 200);
}

public function update(Request $request, CTNotice $ct_notice)
{
    $validated = $request->validate([
        'course_id' => 'required|exists:courses,id',
        'teacher_id' => 'required|exists:users,id',
        'title' => 'required|string|max:255',
        'exam_date' => 'required|date',
        'start_time' => 'required',
        'end_time' => 'required',
    ]);

    $ct_notice->update($validated);

    return response()->json([
        'message' => 'CT Notice updated successfully.',
        'data' => $ct_notice
    ], 200);
}

public function destroy(CTNotice $ct_notice)
{
    $ct_notice->delete();

    return response()->json([
        'message' => 'CT Notice deleted successfully.'
    ], 200);
}
}
