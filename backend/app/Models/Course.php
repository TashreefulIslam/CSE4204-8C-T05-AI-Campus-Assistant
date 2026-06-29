<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\User;
use App\Models\Enrollment;
use App\Models\Assignment;
use App\Models\CtNotice;
use App\Models\CourseMaterial;
use App\Models\Routine;
use App\Models\ExamRoutine;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'course_code',
        'course_name',
        'credit',
        'teacher_id',
    ];

public function teacher()
{
    return $this->belongsTo(User::class, 'teacher_id');
}

public function enrollments()
{
    return $this->hasMany(Enrollment::class);
}

public function assignments()
{
    return $this->hasMany(Assignment::class);
}

public function ctNotices()
{
    return $this->hasMany(CtNotice::class);
}

public function courseMaterials()
{
    return $this->hasMany(CourseMaterial::class);
}

public function routines()
{
    return $this->hasMany(Routine::class);
}

public function examRoutines()
{
    return $this->hasMany(ExamRoutine::class);
}


}
