<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\User;


class Notice extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'title',
        'description',
        'created_by',
    ];

    const UPDATED_AT = null;

    public function creator()
{
    return $this->belongsTo(User::class, 'created_by');
}
}
