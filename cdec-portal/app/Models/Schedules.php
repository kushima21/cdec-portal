<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Schedules extends Model
{
    protected $table = 'schedules';
    protected $primaryKey = 'schedule_id';
    
    protected $fillable = [
        'curricula_id', 'course_id', 'course_code', 'course_no', 'descriptive_title',
        'program_id', 'academic_id', 'academic_year', 'academic_period', 
        'building_id', 'resources_id', 'room_name', 'instructor_id', 'prefix', 'instructor_name',
        'days', 'start_time', 'end_time', 'duration', 'available_slot'
    ];

public function room()
{
    return $this->belongsTo(Resources::class,'resources_id','resources_id');
}

    public function course()
    {
        return $this->belongsTo(Course::class, 'course_id', 'course_id');
    }

    public function curricula()
    {
        return $this->belongsTo(Curriculla::class, 'curricula_id', 'curricula_id');
    }

    public function instructor()
    {
        return $this->belongsTo(Users::class, 'instructor_id', 'user_id');
    }

    public function academic()
    {
        return $this->belongsTo(AcademicTerm::class, 'academic_id', 'academic_id');
    }
}