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
        'username',
        'password',
        'profile_picture',
        'birthdate',
        'contact_number',
        'sex',
        'emergency_fullname',
        'emergency_address',
        'emergency_number',
        'status',
    ];

    protected $casts = [
        'roles' => 'array', // json → array
    ];

    public function getFullNameAttribute()
{
    return "{$this->firstname} {$this->lastname}";
}
}
