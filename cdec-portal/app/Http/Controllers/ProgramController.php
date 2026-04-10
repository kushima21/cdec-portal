<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Program;
use App\Models\Users;
use App\Models\Curriculla;
use App\Models\Colleges; // 🔹 Add this
use Inertia\Inertia;

class ProgramController extends Controller
{
    // 🔹 Display Programs Page
    public function index()
    {
        // 🔹 Get all programs
        $programs = Program::all();

        // 🔹 Get all users for Program Head selection
        $users = Users::all()->map(function ($user) {
            return [
                'id' => $user->id,
                'firstname' => $user->firstname,
                'lastname' => $user->lastname,
                'fullname' => $user->firstname . ' ' . $user->lastname,
            ];
        });

        // 🔹 Get all curricula WITH course info
        $curricula = Curriculla::with('course')->get()->map(function ($curr) {
            return [
                'id' => $curr->id,
                'program_id' => $curr->program_id,
                'course_no' => $curr->course->course_no ?? 'N/A',
                'course' => $curr->course->descriptive_title ?? 'N/A',
                'lecture_units' => $curr->course->lecture_units ?? 0,
                'lab_units' => $curr->course->lab_units ?? 0,
                'total_units' => $curr->course->total_units ?? 0,
                'level' => $curr->academic_level,
                'academic_year' => $curr->academic_year,
            ];
        });

        // 🔹 Get all colleges for dropdown
        $colleges = Colleges::orderBy('college_name', 'asc')->get()->map(function($college) {
            return [
                'college_id' => $college->college_id,
                'college_name' => $college->college_name,
            ];
        });

        return Inertia::render('Admin/Program', [
            'programs' => $programs,
            'users' => $users,
            'curricula' => $curricula,
            'colleges' => $colleges, // 🔹 pass to frontend
        ]);
    }

    // 🔹 Store a new program
// 🔹 Store a new program
public function store(Request $request)
{
    $request->validate([
        'abbreviation' => 'required|string',
        'program_name' => 'required|string',
        'major' => 'nullable|string',
        'college_name' => 'required|string', // ✅ change to college_name
        'college_duration' => 'required|string',
        'description' => 'nullable|string',
        'program_head_id' => 'required|exists:users,id',
    ]);

    Program::create([
        'abbreviation' => $request->abbreviation,
        'program_name' => $request->program_name,
        'major' => $request->major,
        'college_name' => $request->college_name, // ✅ save name
        'college_duration' => $request->college_duration,
        'description' => $request->description,
        'program_head' => $request->program_head_id,
    ]);

    return redirect()->back()->with('success', 'Program created successfully');
}
}