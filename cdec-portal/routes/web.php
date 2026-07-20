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
use App\Http\Controllers\ResourcesController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\AcademicTermController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\TertiaryController;
use App\Http\Controllers\AdmissionController;
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

Route::get('/register', [RegisteredUserController::class, 'create'])->name('register');
Route::post('/register', [RegisteredUserController::class, 'store']);

// LOGIN
Route::get('/login', function () {
    return Inertia::render('Auth/Login');
})->name('login.form');

Route::post('/login', [RegisteredUserController::class, 'login'])
    ->name('login');
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
Route::get('/modal', fn () => Inertia::render('Modal/ModalAcademicTerm'))->name('modal');
Route::get('/preenroll', fn () => Inertia::render('Register/PreEnroll'))->name('preenroll');
Route::get('/studentregister', fn () => Inertia::render('Register/StudentRegister'))->name('studentregister');

Route::get('/application', [AdmissionController::class, 'index'])
    ->name('application');
/*
 Building
*/

/*Resource routes for building*/


Route::get('/resources', [ResourcesController::class, 'index'])->name('resources');
Route::post('/resources/store', [ResourcesController::class, 'store'])->name('resources.store');

/*close*/

Route::get('/building', [BuildingController::class, 'index'])->name('building.index');
Route::post('/building/store', [BuildingController::class, 'store'])->name('building.store');
/*
|--------------------------------------------------------------------------
| Authenticated Routes
|--------------------------------------------------------------------------
*/

/*classes*/

Route::get('/classes', fn () => Inertia::render('Admin/Classes'))->name('classes');

Route::get('/schedule', [ScheduleController::class, 'index'])
    ->name('schedule.index');

Route::post('/schedule/store', [ScheduleController::class, 'store'])
    ->name('schedule.store');
    
Route::get('/academicterm', [AcademicTermController::class, 'index'])->name('academicterm');
Route::post('/academic-term/store', [AcademicTermController::class, 'store']);

Route::get('/dashboard', function () {
    if (!session()->has('user_id')) {
        return redirect()->route('login.form');
    }

    return Inertia::render('Admin/Dashboard', [
        'auth' => [
            'user' => [
                'id' => session('user_id'),
                'name' => session('user_name'),
                'email' => session('user_email'),
                'role' => session('role'),
            ]
        ]
    ]);
})->name('dashboard');


Route::post('/student/register', [TertiaryController::class, 'store']);