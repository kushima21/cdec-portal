<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
    ]);
});


Route::get('/register', function () {
    return Inertia::render('Register'); // ✅ match file name
});

require __DIR__.'/auth.php';

