<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AcademicTerm;
use Inertia\Inertia;

class AcademicTermController extends Controller
{
    public function index()
{
    $terms = AcademicTerm::latest()->get();

    return Inertia::render('Admin/AcademicTerm', [
        'terms' => $terms
    ]);
}
    public function store(Request $request)
    {
        $request->validate([
            'academic_year' => 'required',
            'academic_start' => 'required|date',
            'academic_end' => 'required|date|after_or_equal:academic_start',
            'academic_period' => 'required',
        ]);

        AcademicTerm::create([
            'academic_year' => $request->academic_year,
            'academic_start' => $request->academic_start,
            'academic_end' => $request->academic_end,
            'academic_period' => $request->academic_period,

            // default auto
            'academic_status' => 'Ongoing',
            'status' => 'Enabled',
        ]);

        return redirect()->back()->with('success', 'Academic term created successfully!');
    }
}