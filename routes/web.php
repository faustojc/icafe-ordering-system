<?php

use App\Livewire\Admin\Dashboard;
use Illuminate\Support\Facades\Route;
use App\Livewire\Admin\Auth;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', static function () {
    return view('welcome');
});

// ----------- Admin Routes -----------
Route::get('/admin/auth', Auth::class)->name('admin.auth');
Route::post('/admin/auth', [Auth::class, 'login']);

Route::middleware('admin')->group(static function () {
    Route::get('admin/dashboard', Dashboard::class)
        ->name('admin.dashboard');
});
