<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Users extends Model
{
    protected $table = 'users';

    protected $fillable = [
        'prefix',
        'firstname',
        'middlename',
        'lastname',
        'suffix',
        'academic_suffix',
        'roles',
        'email',
        'school_id',
        'password',
        'profile_picture',
        'birthdate',
        'contact_number',
        'sex',
        'address',
        'emergency_fullname',
        'emergency_address',
        'emergency_number',
        'status',
    ];

    protected $casts = [
        'roles' => 'array',
    ];

    public function getFullNameAttribute()
    {
        return "{$this->firstname} {$this->lastname}";
    }
}