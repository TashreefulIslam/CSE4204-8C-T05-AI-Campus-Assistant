<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class CtNotice extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'course_id',
        'teacher_id',
        'title',
        'exam_date',
        'start_time',
        'end_time',
    ];

    const UPDATED_AT = null;
}
