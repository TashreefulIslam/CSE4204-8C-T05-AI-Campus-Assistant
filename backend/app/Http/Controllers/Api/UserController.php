<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function index()
    {
    $users = User::all();

    return response()->json([
        'message' => 'Users retrieved successfully.',
        'data' => $users
    ], 200);
    }

public function show(User $user)
{
    return response()->json([
        'message' => 'User retrieved successfully.',
        'data' => $user
    ], 200);
}

public function update(Request $request, User $user)
{
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'email' => [
            'required',
            'email',
            Rule::unique('users')->ignore($user->id),
        ],
        'role' => 'required|in:student,teacher,admin',
        'department' => 'nullable|string|max:255',
    ]);

    $user->update($validated);

    return response()->json([
        'message' => 'User updated successfully.',
        'data' => $user
    ], 200);
}

public function destroy(User $user)
{
    $user->delete();

    return response()->json([
        'message' => 'User deleted successfully.'
    ], 200);
}

}
