<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Program;

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
        ]);

        Program::create([
            'abbreviation' => $request->abbreviation,
            'program_name' => $request->program_name,
            'major' => $request->major,
            'college_duration' => $request->college_duration,
            'description' => $request->description,
        ]);

        return redirect()->back()->with('success', 'Program created successfully!');
    }
}