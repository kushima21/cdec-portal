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

    public function curricula()
    {
        return $this->belongsTo(Curriculla::class, 'curricula_id');
    }

    public function course()
    {
        return $this->belongsTo(Course::class, 'course_id', 'course_id');
    }

    public function instructor()
    {
        return $this->belongsTo(Users::class, 'instructor_id');
    }

    public function room()
    {
        return $this->belongsTo(Resources::class, 'room_id');
    }

    public function academic()
    {
        return $this->belongsTo(AcademicTerm::class, 'academic_id');
    }
}