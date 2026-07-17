<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Users extends Model
{
    protected $table = 'users';
    protected $primaryKey = 'user_id';

    public $incrementing = true;

    protected $keyType = 'int';

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

    protected $appends = [
        'full_name'
    ];

    public function getFullNameAttribute()
    {
        return trim(
            ($this->prefix ? $this->prefix . ' ' : '') .
            $this->firstname . ' ' .
            ($this->middlename ? $this->middlename . ' ' : '') .
            $this->lastname .
            ($this->suffix ? ' ' . $this->suffix : '')
        );
    }
}