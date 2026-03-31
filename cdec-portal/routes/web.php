<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProgramController;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('welcome');

Route::get('/about', fn () => Inertia::render('About'))->name('about');
Route::get('/contact_us', fn () => Inertia::render('contact_us'))->name('contact_us');

/*
|--------------------------------------------------------------------------
| Auth Pages
|--------------------------------------------------------------------------
*/

Route::get('/login', fn () => Inertia::render('Auth.login'))->name('Auth.login');
Route::get('/register', fn () => Inertia::render('Auth.register'))->name('Auth.register');

/*
|--------------------------------------------------------------------------
| Admin Pages (Inertia Views)
|--------------------------------------------------------------------------
*/

Route::get('/AdminLayout', fn () => Inertia::render('Layouts/AdminLayout'))->name('AdminLayoutt');

Route::get('/courses', fn () => Inertia::render('Admin/Courses'))->name('courses');
Route::get('/program', fn () => Inertia::render('Admin/Program'))->name('program');
Route::get('/curricula', fn () => Inertia::render('Admin/Curricula'))->name('curricula');
Route::get('/department', fn () => Inertia::render('Admin/Department'))->name('department');
Route::get('/colleges', fn () => Inertia::render('Admin/Colleges'))->name('colleges');
Route::get('/academicyear', fn () => Inertia::render('Admin/AcademicYear'))->name('academicyear');

/*
|--------------------------------------------------------------------------
| Users (IMPORTANT: FIX DUPLICATION HERE)
|--------------------------------------------------------------------------
*/

// ❌ Removed duplicate Inertia route for /users
// ✅ Controller will handle rendering instead

Route::get('/users', [UserController::class, 'index'])->name('users');
Route::get('/colleges', [UserController::class, 'colleges'])->name('colleges');
Route::post('/users/store', [UserController::class, 'store'])->name('users.store');
Route::post('/users/update/{id}', [UserController::class, 'update'])->name('users.update');

/*
|--------------------------------------------------------------------------
| Program
|--------------------------------------------------------------------------
*/

Route::post('/programs/store', [ProgramController::class, 'store'])->name('program.store');

/*
|--------------------------------------------------------------------------
| Modal Test
|--------------------------------------------------------------------------
*/

Route::get('/modal', function () { return Inertia::render('Modal/ModalCurricula'); })->name('modal');

/*
|--------------------------------------------------------------------------
| Authenticated Routes
|--------------------------------------------------------------------------
*/

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

/*
|--------------------------------------------------------------------------
| Auth System
|--------------------------------------------------------------------------
*/

require __DIR__.'/auth.php';