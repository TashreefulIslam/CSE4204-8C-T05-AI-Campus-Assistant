<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class ExamRoutine extends Model
{
     use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'course_id',
        'exam_date',
        'start_time',
        'end_time',
        'room',
    ];
}
