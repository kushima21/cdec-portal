<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProgramController;
use App\Http\Controllers\CollegeController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\CurriculaController;
use App\Http\Controllers\BuildingController;
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
| Admin Layout & Pages
|--------------------------------------------------------------------------
*/
Route::get('/AdminLayout', fn () => Inertia::render('Layouts/AdminLayout'))->name('AdminLayout');

Route::get('/courses', [CourseController::class, 'index'])->name('courses.index');
Route::post('/courses/store', [CourseController::class, 'store'])->name('courses.store');

Route::get('/program', [ProgramController::class, 'index'])->name('program.index');
Route::post('/program/store', [ProgramController::class, 'store'])->name('program.store');

Route::get('/curricula', [CurriculaController::class, 'index'])->name('curricula.index');
Route::post('/curricula/store', [CurriculaController::class, 'store'])->name('curricula.store');
Route::get('/curricula/program', [CurriculaController::class, 'program'])->name('curricula.program');

Route::get('/department', fn () => Inertia::render('Admin/Department'))->name('department');
Route::get('/colleges', [CollegeController::class, 'index'])->name('colleges.index');
Route::post('/colleges/store', [CollegeController::class, 'store'])->name('colleges.store');
Route::get('/academicyear', fn () => Inertia::render('Admin/AcademicYear'))->name('academicyear');

/*
|--------------------------------------------------------------------------
| Users
|--------------------------------------------------------------------------
*/
Route::get('/users', [UserController::class, 'index'])->name('users');
Route::post('/users/store', [UserController::class, 'store'])->name('users.store');
Route::post('/users/update/{id}', [UserController::class, 'update'])->name('users.update');
/*

|--------------------------------------------------------------------------
| Modal & Test Pages
|--------------------------------------------------------------------------
*/
Route::get('/modal', fn () => Inertia::render('Modal/ModalResources'))->name('modal');
Route::get('/studentregister', fn () => Inertia::render('Register/StudentRegister'))->name('studentregister');
/*
 Building
*/

/*Resource routes for building*/

Route::get('/resources', fn () => Inertia::render('Admin/Resources'))->name('resources');

/*close*/

Route::get('/building', [BuildingController::class, 'index'])->name('building.index');
Route::post('/building/store', [BuildingController::class, 'store'])->name('building.store');

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

require __DIR__.'/auth.php';