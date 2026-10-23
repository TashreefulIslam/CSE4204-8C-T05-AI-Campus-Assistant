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

public function store(Request $request)
{
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'university_id' => 'required|string|max:50',
        'email' => 'required|email|unique:users,email',
        'department' => 'nullable|string|max:100',
        'role' => 'required|in:student,teacher,admin',
        'phone' => 'nullable|string|max:255',
        'semester' => 'nullable|integer|min:1|max:255',
        'password' => 'required|string|min:8|confirmed',
    ]);

    $user = User::create($validated);

    return response()->json([
        'message' => 'User created successfully.',
        'user' => $user,
    ], 201);
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
        'university_id' => 'nullable|string|max:50',
        'phone' => 'nullable|string|max:255',
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
