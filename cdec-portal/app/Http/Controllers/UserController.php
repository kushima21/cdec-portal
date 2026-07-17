<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Users;
use App\Models\Register;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = Users::all()->map(function($user) {
            return [
                'id' => $user->user_id,
                'prefix' => $user->prefix,
                'firstname' => $user->firstname,
                'middlename' => $user->middlename,
                'lastname' => $user->lastname,
                'suffix' => $user->suffix,
                'academic_suffix' => $user->academic_suffix,
                'address' => $user->address, // User's personal address
                'birthdate' => $user->birthdate,
                'contact_number' => $user->contact_number,
                'sex' => $user->sex,
                
                // Emergency details mapped explicitly
                'emergency_fullname' => $user->emergency_fullname,
                'emergency_address' => $user->emergency_address,
                'emergency_number' => $user->emergency_number,

                // Existing mappings
                'name' => $user->firstname.' '.$user->lastname,
                'school_id' => $user->school_id,
                'email' => $user->email,
                'status' => $user->status ?? 'Active',
                'roles' => $user->roles ?? [],
                'lastSignIn' => $user->updated_at ? $user->updated_at->format('M d, Y') : '',
                'profile_picture' => $user->profile_picture
                    ? asset($user->profile_picture)
                    : asset('system-images/cdec-logo.png'),
            ];
        });

        return Inertia::render('Admin/Users', [
            'users' => $users
        ]);
    }

    public function store(Request $request)
    {
        $path = null;

        if ($request->hasFile('profile_picture')) {
            $file = $request->file('profile_picture');
            $filename = time().'_'.$file->getClientOriginalName();
            $file->move(public_path('user-images'), $filename);
            $path = 'user-images/'.$filename;
        }

        // ===========================
        // SAVE USER
        // ===========================
        $user = Users::create([
            'prefix' => $request->prefix,
            'firstname' => $request->firstname,
            'middlename' => $request->middlename,
            'lastname' => $request->lastname,
            'suffix' => $request->suffix,
            'academic_suffix' => $request->academic_suffix,
            'roles' => $request->roles, // Automatically casted to JSON by Users model
            'email' => $request->email,
            'school_id' => $request->username, // Mapped from frontend input 'username'
            'address' => $request->address,   // User's residential address
            'password' => Hash::make($request->password),
            'profile_picture' => $path,
            'birthdate' => $request->birthdate,
            'contact_number' => $request->contact_number,
            'sex' => $request->sex,
            'emergency_fullname' => $request->emergency_fullname,
            'emergency_address' => $request->emergency_address,
            'emergency_number' => $request->emergency_number,
            'status' => 'Active',
        ]);

        // ===========================
        // SAVE TO REGISTER TABLE
        // ===========================
  Register::create([
    'register_id' => $user->user_id,
    'firstname'   => $user->firstname,
    'lastname'    => $user->lastname,
    'school_id'   => $user->school_id,
    'email'       => $user->email,
    'password'    => $user->password,
    'status'      => $user->status,
    'roles'       => is_array($user->roles)
                        ? $user->roles[0]
                        : $user->roles,
]);

        return redirect()
            ->route('users')
            ->with('success', 'User created successfully');
    }

    public function update(Request $request, $user_id)
    {
        $user = Users::findOrFail($user_id);
        $path = $user->profile_picture;

        if ($request->hasFile('profile_picture')) {
            $file = $request->file('profile_picture');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('user-images'), $filename);
            $path = 'user-images/' . $filename;
        }

        $user->update([
            'prefix' => $request->prefix,
            'firstname' => $request->firstname,
            'middlename' => $request->middlename,
            'lastname' => $request->lastname,
            'suffix' => $request->suffix,
            'academic_suffix' => $request->academic_suffix,
            'roles' => $request->roles,
            'email' => $request->email,
            'school_id' => $request->username, // Mapped from frontend input 'username'
            'address' => $request->address,
            'password' => $request->password
                ? Hash::make($request->password)
                : $user->password,
            'profile_picture' => $path,
            'birthdate' => $request->birthdate,
            'contact_number' => $request->contact_number,
            'sex' => $request->sex,
            'emergency_fullname' => $request->emergency_fullname,
            'emergency_address' => $request->emergency_address,
            'emergency_number' => $request->emergency_number,
        ]);

        // Sync with your Register data if required here

        return redirect()->route('users')->with('success', 'User updated successfully');
    }

    public function fetchUsersForProgram()
    {
        $users = Users::all()->map(function ($user) {
            return [
                'id' => $user->user_id,
                'fullname' => trim(
                    ($user->prefix ?? '') . ' ' .
                    $user->firstname . ' ' .
                    ($user->middlename ?? '') . ' ' .
                    $user->lastname . ' ' .
                    ($user->suffix ?? '')
                ),
                'firstname' => $user->firstname,
                'lastname' => $user->lastname,
            ];
        });

        return response()->json($users);
    }
}