<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Curriculla;
use App\Models\Program;
use App\Models\Course;
use Inertia\Inertia;

class CurriculaController extends Controller
{
public function index()
{
    // Fetch all courses
    $courses = Course::all()->map(function ($course) {
        return [
            'course_id' => $course->course_id,
            'course_no' => $course->course_no,
            'descriptive_title' => $course->descriptive_title,
            'lecture_units' => $course->lecture_units,
            'lab_units' => $course->lab_units,
            'total_units' => $course->total_units,
        ];
    });

    // Fetch all programs
    $programs = Program::all()->map(function ($program) {
        return [
            'program_id' => $program->program_id,
            'abbreviation' => $program->abbreviation,
            'program_name' => $program->program_name,
            'major' => $program->major ?? null,
        ];
    });

    // Fetch all saved curricula with relationships
    $curricula = Curriculla::with(['program', 'course'])->get()->map(function ($curr) {
        return [
            'id' => $curr->id,
            'program' => $curr->program->abbreviation ?? 'N/A',
            'course' => $curr->course->descriptive_title ?? 'N/A',
            'academicYear' => $curr->academic_year,
            'term' => $curr->academic_period,
            'level' => $curr->academic_level,
            'type' => $curr->course_type,
        ];
    });

    return Inertia::render('Admin/Curricula', [
        'courses' => $courses,
        'programs' => $programs,
        'curricula' => $curricula,
    ]);
}

    public function store(Request $request)
    {
        $data = $request->validate([
            'program_id' => 'required|exists:programs,program_id', // corrected
            'course_ids' => 'required|array',
            'course_ids.*' => 'exists:courses,course_id', // corrected if courses PK is course_id
            'academic_year' => 'required|string',
            'academic_period' => 'required|string',
            'academic_level' => 'required|string',
            'course_type' => 'required|string',
            'pre_requisites' => 'nullable|array',
            'pre_requisites.*' => 'exists:courses,course_id', // corrected
        ]);

        foreach ($data['course_ids'] as $courseId) {
            Curriculla::create([
                'program_id' => $data['program_id'],
                'course_id' => $courseId,
                'academic_year' => $data['academic_year'],
                'academic_period' => $data['academic_period'],
                'academic_level' => $data['academic_level'],
                'course_type' => $data['course_type'],
                'pre_requisites' => json_encode($data['pre_requisites'] ?? []),
            ]);
        }

        return redirect()->back()->with('success', 'Curricula created successfully.');
    }


    public function Program()
    {
        // Fetch all courses
        $courses = Course::all()->map(function ($course) {
            return [
                'course_id' => $course->course_id,
                'course_no' => $course->course_no,
                'descriptive_title' => $course->descriptive_title,
                'lecture_units' => $course->lecture_units,
                'lab_units' => $course->lab_units,
                'total_units' => $course->total_units,
            ];
        });

        // Fetch all programs
        $programs = Program::all()->map(function ($program) {
            return [
                'program_id' => $program->program_id,
                'abbreviation' => $program->abbreviation,
                'program_name' => $program->program_name,
                'major' => $program->major ?? null,
                'college_duration' => $program->college_duration ?? null,
                'college_id' => $program->college_id ?? null,
            ];
        });

        $curricula = Curriculla::with(['program', 'course'])->get()->map(function ($curr) {
            return [
                'id' => $curr->id,
                'program_id' => $curr->program_id, // ✅ ADD THIS
                'program' => $curr->program->program_name ?? 'N/A', // mas better kaysa abbreviation
                'course' => $curr->course->descriptive_title ?? 'N/A',
                'course_no' => $curr->course->course_no ?? '',
                'lecture_units' => $curr->course->lecture_units ?? 0,
                'lab_units' => $curr->course->lab_units ?? 0,
                'total_units' => $curr->course->total_units ?? 0,
                'academicYear' => $curr->academic_year,
                'term' => $curr->academic_period,
                'level' => $curr->academic_level,
                'type' => $curr->course_type,
            ];
        });

        // Pass data to Inertia view
        return Inertia::render('Admin/Program', [
            'courses' => $courses,
            'programs' => $programs,
            'curricula' => $curricula,
        ]);
    }

}