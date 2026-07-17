<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Program;
use App\Models\Course;

class Curriculla extends Model
{
    // Tell Eloquent to use the correct table
    protected $table = 'curricula'; 
    protected $primaryKey = 'curricula_id'; // 🔥 FIX HERE
protected $fillable = [
    'program_id',
    'course_id',
    'course_code',
    'course_no',
    'descriptive_title',
    'academic_year',
    'academic_period',
    'academic_level',
    'course_type',
    'pre_requisites',
];

    public $timestamps = false;

    public function program() {
        return $this->belongsTo(Program::class, 'program_id', 'program_id');
    }

    public function course() {
        return $this->belongsTo(Course::class, 'course_id', 'course_id');
    }

    
}