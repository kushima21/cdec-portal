<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Colleges;
use Inertia\Inertia;

class CollegeController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'abbreviation' => 'required|string|max:50',
            'college_name' => 'required|string|max:255',
            'college_logo' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
            'email' => 'required|email|unique:colleges,email',
            'associate_dean' => 'required|string|max:255',
            'descriptive' => 'nullable|string',
            'colleges_status' => 'required|string|in:Active,Inactive',
        ]);

        $path = null;
        if ($request->hasFile('college_logo')) {
            $file = $request->file('college_logo');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('user-images'), $filename);
            $path = 'user-images/' . $filename;
        }

        Colleges::create([
            'abbreviation' => $request->abbreviation,
            'college_name' => $request->college_name,
            'college_logo' => $path,
            'email' => $request->email,
            'associate_dean' => $request->associate_dean,
            'descriptive' => $request->descriptive,
            'colleges_status' => $request->colleges_status,
        ]);

        return redirect()->route('colleges')->with('success', 'College created successfully');
    }

        public function index()
        {
            $colleges = Colleges::all()->map(function ($college) {
                return [
                    'id' => $college->id,
                    'abbreviation' => $college->abbreviation,
                    'college_name' => $college->college_name,
                    'college_logo' => $college->college_logo,
                    'email' => $college->email,
                    'associate_dean' => $college->associate_dean,
                    'descriptive' => $college->descriptive,
                    'colleges_status' => $college->colleges_status,
                    'created_at' => $college->created_at->format('F d, Y h:i A'),
                ];
            });

            return Inertia::render('Admin/Colleges', [
                'colleges' => $colleges
            ]);
        }
}