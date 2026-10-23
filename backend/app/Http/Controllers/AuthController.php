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
            'university_id' => 'required|string|max:50|unique:users,university_id',
            'email' => 'required|email|unique:users,email',
            'department' => 'required|string|max:100',
            'role' => 'required|in:student,teacher',
            'password' => 'required|string|min:8|confirmed',
            
            
        ]);

        // Create new user
        $user = User::create([
            'name' => $validated['name'],
            'university_id' => $validated['university_id'],
            'email' => $validated['email'],
            'department' => $validated['department'],
            'role' => $validated['role'],
            'password' => $validated['password'],
            //'password' => Hash::make($validated['password']),
            //'role' => 'student',
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

    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'email' => ['required', 'email', 'unique:users,email,' . $user->id],
            'phone' => 'nullable|string|max:255',
        ]);

        $user->update($validated);

        return response()->json([
            'message' => 'Profile updated successfully.',
            'user' => $user->fresh(),
        ], 200);
    }
    
    public function logout(Request $request)
    {
    $request->user()->currentAccessToken()->delete();

    return response()->json([
        'message' => 'Logout successful.'
    ], 200);
    }

    public function updatePassword(Request $request)
   {
    $request->validate([
        'current_password' => 'required',
        'new_password' => 'required|min:8|confirmed',
    ]);

    $user = $request->user();

    if (!Hash::check($request->current_password, $user->password)) {
        return response()->json([
            'message' => 'Current password is incorrect.'
        ], 401);
    }

    $user->password = Hash::make($request->new_password);
    $user->save();

    return response()->json([
        'message' => 'Password updated successfully.'
    ]);
    }



}
