<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tertiary;

class TertiaryController extends Controller
{
    public function store(Request $request)
    {
        // Validation
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name'  => 'required|string|max:255',
        ]);

        // Check if user is logged in
        if (!session()->has('user_id')) {
            return back()->withErrors([
                'error' => 'User session not found. Please log in again.'
            ]);
        }

        Tertiary::create([

            // register.register_id
            'tertiary_id' => session('user_id'),

            // Personal Information
            'prefix'         => $request->prefix,
            'suffix'         => $request->suffix,
            'first_name'     => $request->first_name,
            'middle_name'    => $request->middle_name,
            'last_name'      => $request->last_name,
            'birth_date'     => $request->birth_date,
            'age'            => $request->age,
            'gender'         => $request->gender,
            'civil_status'   => $request->civil_status,
            'contact_number' => $request->contact_number,
            'address'        => $request->address,

            // Emergency Information
            'emergency_fullname' => $request->emergency_fullname,
            'emergency_address'  => $request->emergency_address,
            'emergency_number'   => $request->emergency_number,
             'status'          => 'Active',

            // Account Information
            'roles'     => session('role'),
            'email'     => session('user_email'),
            'school_id' => session('school_id'),
        ]);

        return redirect()->back()->with('success', 'Student registered successfully.');
    }
}