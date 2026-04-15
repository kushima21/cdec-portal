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
public function index()
{
    $curriculla = Curriculla::join('courses', 'curricula.course_id', '=', 'courses.course_id')
        ->get()
        ->map(function ($item) {
            return [
                'curricula_id' => $item->curricula_id,
                'course_no' => $item->course_no,
                'descriptive_title' => $item->descriptive_title,
                'academic_year' => $item->academic_year,
                'total_units' => $item->total_units,
            ];
        });

    $courses = Course::all()->map(function ($course) {
        return [
            'id' => $course->course_id,
            'course_no' => $course->course_no,
            'descriptive_title' => $course->descriptive_title,
            'total_units' => $course->total_units ?? 0,
        ];
    });

    $resources = Resources::all()->map(function ($resource) {
        return [
            'resources_id' => $resource->resources_id,
            'room_name' => $resource->room_name,
        ];
    });

    $users = Users::all()->map(function ($user) {
        return [
            'id' => $user->id,
            'firstname' => $user->firstname,
            'lastname' => $user->lastname,
            'email' => $user->email,
            'profile_picture' => $user->profile_picture,
            'status' => $user->status,
            'full_name' => $user->firstname . ' ' . $user->lastname,
        ];
    });

    $schedules = Schedules::with([
        'curricula.course',
        'instructor',
        'resource',
        'academic'
    ])
    ->get()
    ->map(function ($s) {

        return [
            'id' => $s->schedule_id,

            // ✅ COURSE (SAFE + COMPLETE)
            'course' => [
                'course_no' => $s->curricula->course->course_no ?? 'N/A',
                'descriptive_title' => $s->curricula->course->descriptive_title ?? 'N/A',
                'total_units' => $s->curricula->course->total_units ?? 0,
            ],

            // TIME
            'time' => date('h:ia', strtotime($s->start_time)) . ' - ' . date('h:ia', strtotime($s->end_time)),

            // DAYS
            'days' => $s->days,

            // DURATION
            'duration' => $s->duration,

            // ACADEMIC
            'availability' => $s->academic->academic_year ?? 'N/A',

            // SLOTS
            'slots' => "1 / {$s->available_slot}",

            // ROOM
            'room' => $s->resource->room_name ?? 'TBA',

            // INSTRUCTOR
            'instructor' => [
                'name' => ($s->instructor->firstname ?? '') . ' ' . ($s->instructor->lastname ?? ''),
                'email' => $s->instructor->email ?? '',
                'avatar' => $s->instructor->profile_picture ?? null,
            ]
        ];
    });

    return Inertia::render('Admin/Schedule', [
        'curriculla' => $curriculla,
        'courses' => $courses,
        'resources' => $resources,
        'users' => $users,
        'schedules' => $schedules,
    ]);
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

    if (!$activeTerm) {
        return back()->withErrors(['error' => 'No active academic term found.']);
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