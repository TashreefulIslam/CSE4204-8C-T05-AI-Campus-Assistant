<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Course;
use App\Models\User;
class Assignment extends Model
{
    use HasFactory;

    protected $fillable = [
        'course_id',
        'teacher_id',
        'title',
        'description',
        'deadline',
    ];

    public function course()
{
    return $this->belongsTo(Course::class);
}

public function teacher()
{
    return $this->belongsTo(User::class, 'teacher_id');
}

}
