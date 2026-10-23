<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class CourseMaterial extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'course_materials';

    protected $fillable = [
        'course_id',
        'teacher_id',
        'title',
        'file_path',
        'upload_date',
    ];

    protected $casts = [
        'upload_date' => 'datetime',
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
