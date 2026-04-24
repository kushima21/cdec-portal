<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course;
use Inertia\Inertia;
use App\Models\Program;

class CourseController extends Controller
{
    // Fetch all courses for admin table
    public function index(Request $request)
    {
        $search = $request->input('search', '');

        $courses = Course::query()
            ->when($search, fn($q) => $q->where('descriptive_title', 'like', "%{$search}%")
                                        ->orWhere('course_code', 'like', "%{$search}%"))
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Admin/Courses', [
            'courses' => $courses,
            'search' => $search
        ]);
    }


public function store(Request $request)
{
    $validated = $request->validate([
        'course_code' => 'required|string|max:255',
        'course_no' => 'nullable|integer|min:0',
        'descriptive_title' => 'required|string|max:255',
        'lecture_units' => 'nullable|integer|min:0',
        'lab_units' => 'nullable|integer|min:0',
    ]);

    $lecture = $validated['lecture_units'] ?? 0;
    $lab = $validated['lab_units'] ?? 0;

    Course::create([
        'course_code' => $validated['course_code'],
        'course_no' => $validated['course_no'] ?? null,
        'descriptive_title' => $validated['descriptive_title'],
        'lecture_units' => $lecture,
        'lab_units' => $lab,
        'total_units' => $lecture + $lab,
    ]);

    return redirect()->back()->with('success', 'Course created successfully!');
}

public function curricula()
{
    $courses = Course::all()->map(function ($course) {
        return [
            'course_id' => $course->id,
            'course_code' => $course->course_code,

            'course_no' => $course->course_no,
            'descriptive_title' => $course->descriptive_title,
            'lecture_units' => $course->lecture_units,
            'lab_units' => $course->lab_units,
            'total_units' => $course->total_units,
        ];
    });

    $programs = Program::all()->map(function ($program) {
        return [
            'program_id' => $program->id,
            'abbreviation' => $program->abbreviation,
            'program_name' => $program->program_name,
        ];
    });

    return Inertia::render('Admin/Curricula', [
        'courses' => $courses,
        'programs' => $programs // ✅ ADD THIS
    ]);
}

}