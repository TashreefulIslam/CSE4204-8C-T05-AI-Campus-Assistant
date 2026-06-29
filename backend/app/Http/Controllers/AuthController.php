<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;


class AuthController extends Controller
{
    public function register(Request $request)
    {
        // Validate incoming data
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8',
            //'role' => 'required|in:student,teacher,admin',
        ]);

        // Create new user
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => $validated['password'],
            'role' => 'student',
        ]);

        // Return JSON response
        return response()->json([
            'message' => 'User registered successfully.',
            'user' => $user,
        ], 201);
    }


    public function login(Request $request)
    {
    // Validate incoming data
    $validated = $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    // Find user by email
    $user = User::where('email', $validated['email'])->first();

    // Check if user exists and password is correct
    if (!$user || !Hash::check($validated['password'], $user->password)) {
        return response()->json([
            'message' => 'Invalid email or password.'
        ], 401);
    }

    // Generate API token
    $token = $user->createToken('auth_token')->plainTextToken;

    // Login successful
    return response()->json([
    'message' => 'Login successful.',
    'access_token' => $token,
    'token_type' => 'Bearer',
    'user' => $user,
    ], 200);
    
    }


    public function profile(Request $request)
    {
    return response()->json([
        'user' => $request->user()
    ], 200);
    }
    
    public function logout(Request $request)
    {
    $request->user()->currentAccessToken()->delete();

    return response()->json([
        'message' => 'Logout successful.'
    ], 200);
    }



}
