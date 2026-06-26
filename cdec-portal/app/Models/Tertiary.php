<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tertiary extends Model
{
    protected $table = 'tertiary';

protected $fillable = [
    'registration_id', // ✅ ADD THIS
    'prefix','suffix','first_name','middle_name','last_name',
    'birth_date','age','gender','civil_status','contact_number','address',
    'emergency_fullname','emergency_address','emergency_number',
    'email','username'
];
}