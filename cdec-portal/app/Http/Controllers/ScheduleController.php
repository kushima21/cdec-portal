<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Models\Building;
use App\Models\Resources;
use App\Models\Users;
use App\Models\Course;
use App\Models\Curriculla;
use App\Models\Program;
use App\Models\College;
use App\Models\Schedules;
use App\Models\AcademicTerm;

class ScheduleController extends Controller
{
    // ================= INDEX =================


    // ================= STORE =================

    
public function store(Request $request)
{
    $validated = $request->validate([
        'curricula_id' => 'required',
        'room_id' => 'required',
        'instructor_id' => 'required',
        'start_time' => 'required',
        'end_time' => 'required',
        'duration' => 'required',
        'available_slot' => 'required|integer',
        'days' => 'required|array',
    ]);

    // ACTIVE TERM
$activeTerm = AcademicTerm::where('academic_status', 'Ongoing')->first();

// ✅ FIX: fallback if walay "Ongoing"
if (!$activeTerm) {
    $activeTerm = AcademicTerm::first();
}

    // GET CURRICULUM (para course_id + program_id)
    $curriculum = Curriculla::findOrFail($validated['curricula_id']);

    // GET ROOM (para building_id)
    $room = Resources::findOrFail($validated['room_id']);

    Schedules::create([
        'curricula_id' => $validated['curricula_id'],

        // ✅ AUTO FROM CURRICULUM
        'course_id' => $curriculum->course_id,
        'program_id' => $curriculum->program_id,

        // term
        'academic_id' => $activeTerm->academic_id,

        // room + building
        'room_id' => $validated['room_id'],
        'building_id' => $room->building_id,

        // others
        'instructor_id' => $validated['instructor_id'],
        'start_time' => $validated['start_time'],
        'end_time' => $validated['end_time'],
        'duration' => $validated['duration'],
        'available_slot' => $validated['available_slot'],
        'days' => implode(',', $validated['days']),
    ]);

    return redirect()->route('schedule.index')
        ->with('success', 'Schedule created successfully');
}

}