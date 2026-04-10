<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Course;
use App\Models\Curriculla;
use App\Models\Users;
use App\Models\Colleges;

class Program extends Model
{
    protected $fillable = [
        'program_id',
        'abbreviation',
        'program_name',
        'major',
        'college_duration',
        'description',
        'program_head',
        'college_name',
        'program_status',
    ];

    // 🔹 Relations
    public function curricula()
    {
        return $this->hasMany(Curriculla::class, 'program_id', 'program_id');
    }

    public function college()
    {
        return $this->hasMany(Colleges::class, 'college_id', 'college_id');
    }

    public function course()
    {
        return $this->belongsTo(Course::class, 'course_id', 'course_id');
    }

    // 🔹 Program Head Relation (FIXED)
    public function user()
    {
        return $this->belongsTo(Users::class, 'program_head', 'id');
    }
}