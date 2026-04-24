<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Register extends Model
{
    protected $table = 'register';

    protected $primaryKey = 'register_id'; // ✅ ADD THIS

    public $incrementing = true;

    protected $keyType = 'int';

    protected $fillable = [
        'firstname',
        'lastname',
        'username',
        'email',
        'password',
        'status',
        'roles',
    ];
}