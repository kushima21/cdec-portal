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

    public function index(){

        $schedules = Schedules::all();
        // 🔹 Get all curricula WITH course info
                // 🔹 Get all users for Program Head selection
        $users = Users::all()->map(function ($user) {
            return [
                'id' => $user->id,
                'firstname' => $user->firstname,
                'lastname' => $user->lastname,
                'fullname' => $user->firstname . ' ' . $user->lastname,
            ];
        });

        $curricula = Curriculla::with('course')->get()->map(function ($curr) {
            return [
                'id' => $curr->id,
                'program_id' => $curr->program_id,
                'course_code' => $curr->course->course_code ?? 'N/A',
                'course_no' => $curr->course->course_no ?? 'N/A',
                'course' => $curr->course->descriptive_title ?? 'N/A',
                'lecture_units' => $curr->course->lecture_units ?? 0,
                'lab_units' => $curr->course->lab_units ?? 0,
                'total_units' => $curr->course->total_units ?? 0,
                'level' => $curr->academic_level,
                'academic_year' => $curr->academic_year,
            ];
        });

                // 🔹 Get all curricula WITH course info
         $resources = Resources::all()->map(function ($resources) {
            return [
                'resources_id' => $resources->id,
                'room_name' => $resources->room_name,
                'glossary' => $resources->glossary,
                'bulding_id' => $resources->building_id,
                'floor' => $resources->floor,
                'capacity' => $resources->capacity,
                
            ];
        });

    }
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