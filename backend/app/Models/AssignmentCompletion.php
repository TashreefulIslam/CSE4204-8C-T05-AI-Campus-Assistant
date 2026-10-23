<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AssignmentCompletion extends Model
{
    protected $fillable = [
        'student_id',
        'assignment_id',
    ];

    public function student()
    {
        return $this->belongsTo(User::class, 'student_id');
    }

    public function assignment()
    {
        return $this->belongsTo(Assignment::class);
    }
}
