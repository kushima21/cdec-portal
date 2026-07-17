<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Models\Users;
use App\Models\Course;
use App\Models\Resources;
use App\Models\Curriculla;
use App\Models\Schedules;
use App\Models\AcademicTerm;

class ScheduleController extends Controller
{
    // ==========================================
    // DISPLAY SCHEDULE LIST
    // ==========================================
    public function index()
{
    $users = Users::select(
        'user_id',
        'firstname',
        'middlename',
        'lastname',
        'prefix',
        'suffix',
        'school_id'
    )
    ->orderBy('lastname')
    ->get();

    $schedules = Schedules::with([
    'curricula',
    'course',
    'room',
    'instructor',
    'academic'
])->get();

    return Inertia::render('Admin/Schedule', [
        'users' => $users,
        'curriculla' => Curriculla::all(),
        'resources' => Resources::all(),
        'academicTerms' => AcademicTerm::where('academic_status','Ongoing')->get(),
        'schedules' => $schedules,
    ]);
}

    // ==========================================
    // STORE NEW SCHEDULE RECORD
    // ==========================================
    public function store(Request $request)
    {
        $validated = $request->validate([
            'academic_id'    => 'required',
            'curricula_id'   => 'required',
            'resources_id'   => 'required', 
            'instructor_id'  => 'required',
            'days'           => 'required|array',
            'start_time'     => 'required',
            'end_time'       => 'required',
            'duration'       => 'required',
            'available_slot' => 'required|integer',
        ]);

        $activeTerm = AcademicTerm::findOrFail($validated['academic_id']);
        $curriculum = Curriculla::findOrFail($validated['curricula_id']);
        $course     = Course::findOrFail($curriculum->course_id);
        $instructor = Users::findOrFail($validated['instructor_id']);
        
        // 🛠️ FIXED: Variable renamed from $room_name to $room to prevent save crashes
        $room       = Resources::findOrFail($validated['resources_id']); 

        Schedules::create([
            'curricula_id'      => $curriculum->curricula_id,
            'course_id'         => $course->course_id,
            'course_code'       => $course->course_code,
            'course_no'         => $course->course_no,
            'descriptive_title' => $course->descriptive_title,
            'program_id'        => $curriculum->program_id,
            
            'academic_id'       => $activeTerm->academic_id,
            'academic_year'     => $activeTerm->academic_year,
            'academic_period'   => $activeTerm->academic_period,

            'building_id'       => $room->building_id,
            'resources_id'      => $room->resources_id,
            'room_name'         => $room->room_name ,

            'instructor_id'     => $instructor->user_id,
            'prefix'            => $instructor->prefix,
            'instructor_name'   => trim(
                $instructor->firstname . ' ' .
                ($instructor->middlename ? $instructor->middlename . ' ' : '') .
                $instructor->lastname .
                ($instructor->suffix ? ' ' . $instructor->suffix : '')
            ),

            'days'              => implode(',', $validated['days']),
            'start_time'        => $validated['start_time'],
            'end_time'          => $validated['end_time'],
            'duration'          => $validated['duration'],
            'available_slot'    => $validated['available_slot'],
        ]);

        return redirect()
            ->route('schedule.index')
            ->with('success', 'Schedule created successfully.');
    }
}