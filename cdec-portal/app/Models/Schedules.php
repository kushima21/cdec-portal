<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Schedules extends Model
{
    protected $table = 'schedules';
    protected $primaryKey = 'schedule_id';

    protected $fillable = [
        'curricula_id',
        'course_id',
        'program_id',
        'academic_id',
        'building_id',
        'room_id',
        'instructor_id',
        'days',
        'start_time',
        'end_time',
        'duration',
        'available_slot',
    ];

    // Curriculum
    public function curricula()
    {
        return $this->belongsTo(Curriculla::class, 'curricula_id', 'curricula_id');
    }

    // Instructor
    public function instructor()
    {
        return $this->belongsTo(Users::class, 'instructor_id', 'id');
    }

    // Room
    public function resource()
    {
        return $this->belongsTo(Resources::class, 'room_id', 'resources_id');
    }

    // 🔥 ADD THIS (VERY IMPORTANT)
    public function academic()
    {
        return $this->belongsTo(AcademicTerm::class, 'academic_id', 'academic_id');
    }
}