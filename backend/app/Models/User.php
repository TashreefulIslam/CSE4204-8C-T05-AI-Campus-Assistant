<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Assignment;
use App\Models\CtNotice;
use App\Models\Notice;
use App\Models\AiRequest;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
    'name',
    'email',
    'phone',
    'password',
    'role',
    'university_id',
    'department',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function courses()
{
    return $this->hasMany(Course::class, 'teacher_id');
}

public function enrollments()
{
    return $this->hasMany(Enrollment::class, 'student_id');
}

public function assignments()
{
    return $this->hasMany(Assignment::class, 'teacher_id');
}

public function ctNotices()
{
    return $this->hasMany(CtNotice::class, 'teacher_id');
}

public function notices()
{
    return $this->hasMany(Notice::class, 'created_by');
}

public function aiRequests()
{
    return $this->hasMany(AiRequest::class);
}


}
