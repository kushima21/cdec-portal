<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tertiary;

class TertiaryController extends Controller
{
    public function store(Request $request)
    {
        // ✅ validation (basic)
        $request->validate([
            'first_name' => 'required',
            'last_name' => 'required',
        ]);

        // ✅ save data
        Tertiary::create([
            'prefix' => $request->prefix,
            'suffix' => $request->suffix,
            'first_name' => $request->first_name,
            'middle_name' => $request->middle_name,
            'last_name' => $request->last_name,
            'birth_date' => $request->birth_date,
            'age' => $request->age,
            'gender' => $request->gender,
            'civil_status' => $request->civil_status,
            'contact_number' => $request->contact_number,
            'address' => $request->address,

            'emergency_fullname' => $request->emergency_fullname,
            'emergency_address' => $request->emergency_address,
            'emergency_number' => $request->emergency_number,


            // ✅ gikan sa logged-in user
            'email' => session('user_email'),
            'username' => session('username'),
        ]);

        return back()->with('success', 'Saved successfully');
    }
}