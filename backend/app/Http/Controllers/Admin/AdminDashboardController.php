<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Course;

class AdminDashboardController extends Controller
{
    public function index()
    {
        return response()->json([
            'totalUsers' => User::count(),
            'students' => User::where('role','student')->count(),
            'teachers' => User::where('role','teacher')->count(),
            'admins' => User::where('role','admin')->count(),
            'courses' => Course::count(),

            'recentUsers' => User::latest()
                                ->take(5)
                                ->get(),

            'monthlyUsers' => [
                ['month'=>'Jan','users'=>20],
                ['month'=>'Feb','users'=>35],
                ['month'=>'Mar','users'=>45],
                ['month'=>'Apr','users'=>55],
                ['month'=>'May','users'=>70],
                ['month'=>'Jun','users'=>90],
            ]
        ]);
    }
}
