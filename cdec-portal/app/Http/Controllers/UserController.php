<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Users;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
   public function index()
{
    $users = Users::all()->map(function($user) {
        return [
            'id' => $user->id,

            // ✅ ADD THESE HERE
            'prefix' => $user->prefix,
            'firstname' => $user->firstname,
            'middlename' => $user->middlename,
            'lastname' => $user->lastname,
            'suffix' => $user->suffix,
            'academic_suffix' => $user->academic_suffix,
            'birthdate' => $user->birthdate,
            'contact_number' => $user->contact_number,
            'sex' => $user->sex,
            'fullname' => $user->emergency_fullname,
            'address' => $user->emergency_address,
            'emergency_number' => $user->emergency_number,

            // existing
            'name' => $user->firstname.' '.$user->lastname,
            'username' => $user->username,
            'email' => $user->email,
            'status' => 'Active',
            'roles' => $user->roles ?? [],
            'lastSignIn' => $user->updated_at->format('M d, Y'),
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

        // unique filename
        $filename = time() . '_' . $file->getClientOriginalName();

        // save to public/user-images
        $file->move(public_path('user-images'), $filename);

        $path = 'user-images/' . $filename;
    }

    Users::create([
        'prefix' => $request->prefix,
        'firstname' => $request->firstname,
        'middlename' => $request->middlename,
        'lastname' => $request->lastname,
        'suffix' => $request->suffix,
        'academic_suffix' => $request->academic_suffix,
        'roles' => $request->roles,
        'email' => $request->email,
        'username' => $request->username,
        'password' => Hash::make($request->password),
        'profile_picture' => $path,
        'birthdate' => $request->birthdate,
        'contact_number' => $request->contact_number,
        'sex' => $request->sex,
        'emergency_fullname' => $request->fullname,
        'emergency_address' => $request->address,
        'emergency_number' => $request->emergency_number,
    ]);

    return redirect()->route('users')->with('success', 'User created successfully');
}

public function update(Request $request, $id)
{
    $user = Users::findOrFail($id);

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
        'username' => $request->username,

        // ✅ only update password if naa
        'password' => $request->password
            ? Hash::make($request->password)
            : $user->password,

        'profile_picture' => $path,
        'birthdate' => $request->birthdate,
        'contact_number' => $request->contact_number,
        'sex' => $request->sex,
        'emergency_fullname' => $request->fullname,
        'emergency_address' => $request->address,
        'emergency_number' => $request->emergency_number,
    ]);

    return redirect()->route('users')->with('success', 'User updated successfully');
}


// fetch user to Colleges 

public function colleges()
{
    $users = Users::all()->map(function($user) {
        return [
            'id' => $user->id,
            'firstname' => $user->firstname,
            'lastname' => $user->lastname,
            'email' => $user->email,
            'profile_picture' => $user->profile_picture
                ? asset($user->profile_picture)
                : asset('system-images/cdec-logo.png'),
        ];
    });

    return Inertia::render('Admin/Colleges', [
        'users' => $users
    ]);
}
}

