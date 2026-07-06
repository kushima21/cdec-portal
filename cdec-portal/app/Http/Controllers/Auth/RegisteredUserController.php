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
    'school_id' => $user->school_id, // ✅ ADD THIS
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

    // ✅ AUTO GENERATE 6-DIGIT UNIQUE USERNAME
    do {
        $school_id = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
    } while (Register::where('school_id', $school_id)->exists());

    $user = Register::create([
        'firstname' => $request->firstname,
        'lastname' => $request->lastname,
        'school_id' => $school_id, // ✅ SAVE GENERATED USERNAME
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
        'school_id' => $user->school_id, // optional if you want to use it later
        'role' => $user->roles
    ]);

    return redirect()->route('studentregister');
}

public function share(Request $request): array
{
    return array_merge(parent::share($request), [
        'auth' => [
            'user' => [
                'id' => session('user_id'),
                'name' => session('user_name'),
                'email' => session('user_email'),
                'school_id' => session('school_id'), // ✅ ADD THIS
                'role' => session('roles'),
            ],
        ],
    ]);
}

}