<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Register extends Model
{
    protected $table = 'register';

    protected $primaryKey = 'register_id';

    public $timestamps = true;

    protected $fillable = [
        'firstname',
        'lastname',
        'school_id',
        'email',
        'password',
        'status',
        'roles',
    ];

    protected $hidden = [
        'password',
    ];

    protected $casts = [
        'password' => 'hashed',
    ];
}