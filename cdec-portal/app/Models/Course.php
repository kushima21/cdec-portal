<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $fillable = [
        'course_id',
        'course_no',
        'descriptive_title',
        'lab_units',
        'lecture_units',
        'total_units',
    ];
}