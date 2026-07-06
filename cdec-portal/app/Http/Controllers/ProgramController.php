<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Program;
use App\Models\Users;
use App\Models\Curriculla;
use App\Models\Colleges;
use Inertia\Inertia;

class ProgramController extends Controller
{
    public function index()
    {
        $programs = Program::all();

        $users = Users::all()->map(function ($user) {
            return [
                'id' => $user->id,
                'firstname' => $user->firstname,
                'lastname' => $user->lastname,
                'fullname' => trim($user->firstname . ' ' . $user->lastname),
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
            'colleges' => $colleges,
        ]);
    }

    public function store(Request $request)
    {
        // Validate request data
        $request->validate([
            'abbreviation' => 'required|string|max:50',
            'program_name' => 'required|string|max:255',
            'major' => 'nullable|string|max:255',
            'college_name' => 'required|string|max:50',
            'college_duration' => 'required|string|max:50',
            'description' => 'nullable|string',
            'program_head_name' => 'required|string|max:50',
        ]);

        // Build database entry matching explicit string mappings
        Program::create([
            'abbreviation' => $request->abbreviation,
            'program_name' => $request->program_name,
            'major' => $request->major,
            'college_duration' => $request->college_duration,
            'description' => $request->description,
            'program_head' => $request->program_head_name, // Saves text string name
            'college_name' => $request->college_name,       // Saves text department name
            'program_status' => 'Active'
        ]);

        return redirect()->back()->with('success', 'Program track added successfully');
    }
}