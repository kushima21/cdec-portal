<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Program;
use App\Models\AcademicTerm;

class AdmissionController extends Controller
{
    public function index()
    {
        $programs = Program::orderBy('program_name')->get();

        $academicTerm = AcademicTerm::where('academic_status', 'Ongoing')
            ->first();

        return Inertia::render('Admin/Application', [
            'programs' => $programs,
            'academicTerm' => $academicTerm,
        ]);
    }
}