<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Register extends Model
{
    protected $table = 'register'; // Update to your correct database table name if different

    protected $fillable = [
        'register_id',
        'firstname',
        'lastname',
        'school_id',
        'email',
        'password',
        'status',
        'roles',
    ];

    protected $casts = [
        'roles' => 'array', // 👈 Crucial: This avoids the Array to String Conversion issue here!
    ];
}