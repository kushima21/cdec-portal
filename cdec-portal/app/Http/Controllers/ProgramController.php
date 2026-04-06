<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Program;
use Inertia\Inertia;

class ProgramController extends Controller
{
public function store(Request $request)
{
    $request->validate([
        'abbreviation' => 'required|string|max:50',
        'program_name' => 'required|string|max:255',
        'major' => 'nullable|string|max:255',
        'college_duration' => 'required|string|max:50',
        'description' => 'nullable|string',
        'program_head_name' => 'required|string',
    ]);

    Program::create([
        'abbreviation' => $request->abbreviation,
        'program_name' => $request->program_name,
        'major' => $request->major,
        'college_duration' => $request->college_duration,
        'description' => $request->description,
        'program_head' => $request->program_head_name,
        'program_status' => 'Active',
    ]);

    return redirect()->back()->with('success', 'Program created successfully!');
}

public function curricula () {
    $program = Program::all()->map(function ($program) {
        return [
            'program_id' => $program->id,
            'abbreviation' => $program->abbreviation,
            'program_name' => $program->program_name,
            'major' => $program->major,
            'college_duration' => $program->college_duration,
            'description' => $program->description,
            'program_head' => $program->program_head,
            'program_status' => $program->program_status,
            'created_at' => $program->created_at->format('F d, Y h:i A'),
        ];  
    });

    return Inertia::render('Admin/Curricula', [
        'programs' => $program
    ]);
}

}