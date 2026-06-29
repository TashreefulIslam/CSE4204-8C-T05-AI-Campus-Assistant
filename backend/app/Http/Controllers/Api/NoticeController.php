<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Notice;


class NoticeController extends Controller
{
    public function index()
{
    return response()->json(
        Notice::with('creator')->get(),
        200
    );
}

public function store(Request $request)
{
    $validated = $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'required|string',
        'created_by' => 'required|exists:users,id',
    ]);

    $notice = Notice::create($validated);

    return response()->json([
        'message' => 'Notice created successfully.',
        'notice' => $notice,
    ], 201);
}

public function show(string $id)
{
    return response()->json(
        Notice::with('creator')->findOrFail($id),
        200
    );
}

public function update(Request $request, string $id)
{
    $notice = Notice::findOrFail($id);

    $validated = $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'required|string',
        'created_by' => 'required|exists:users,id',
    ]);

    $notice->update($validated);

    return response()->json([
        'message' => 'Notice updated successfully.',
        'notice' => $notice,
    ]);
}

public function destroy(string $id)
{
    Notice::findOrFail($id)->delete();

    return response()->json([
        'message' => 'Notice deleted successfully.'
    ]);
}
}
