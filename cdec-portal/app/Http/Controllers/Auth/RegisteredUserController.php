<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Register;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    // LOGIN
public function login(Request $request)
{
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    $user = Register::where('email', trim($request->email))->first();

    if (!$user || !Hash::check($request->password, $user->password)) {
        return back()->withErrors([
            'email' => 'Invalid credentials'
        ]);
    }

    session([
        'user_id' => $user->register_id,
        'user_name' => $user->firstname . ' ' . $user->lastname,
        'user_email' => $user->email,
        'role' => $user->roles
    ]);

    return redirect()->route('dashboard');
}

    // SHOW REGISTER PAGE
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    // REGISTER USER
    public function store(Request $request)
{
    $request->validate([
        'firstname' => 'required|string|max:255',
        'lastname' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:register,email',
        'password' => ['required', 'confirmed', Rules\Password::defaults()],
    ]);

    $user = Register::create([
        'firstname' => $request->firstname,
        'lastname' => $request->lastname,
        'email' => $request->email,
        'password' => Hash::make($request->password),
        'status' => 'Active',
        'roles' => 'tertiary',
    ]);

    // ✅ AUTO LOGIN (SESSION)
    session([
        'user_id' => $user->register_id,
        'user_name' => $user->firstname . ' ' . $user->lastname,
        'user_email' => $user->email,
        'role' => $user->roles
    ]);

    // ✅ REDIRECT TO STUDENT REGISTER PAGE
    return redirect()->route('studentregister');
}
}