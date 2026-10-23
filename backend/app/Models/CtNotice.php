<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class CtNotice extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'ct_notices';

    protected $fillable = [
        'course_id',
        'teacher_id',
        'title',
        'exam_date',
        'start_time',
        'end_time',
        'created_at',
    ];

    protected $casts = [
        'exam_date' => 'date',
        'start_time' => 'datetime:H:i:s',
        'end_time' => 'datetime:H:i:s',
        'created_at' => 'datetime',
    ];

    //const UPDATED_AT = null;


    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function teacher()
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }
}
