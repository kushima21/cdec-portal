<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Colleges extends Model
{
    protected $fillable = [
        'abbreviation',
        'college_name',
        'college_logo',
        'email',
        'associate_dean',
        'descriptive',
        'colleges_status',
        'created_at',
    ];
}