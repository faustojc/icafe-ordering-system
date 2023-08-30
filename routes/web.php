<?php

use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\Components\OrderController;
use App\Http\Controllers\Admin\Components\ProductController;
use App\Http\Controllers\Admin\DashboardController;
use Illuminate\Support\Facades\Route;

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
Route::get('/admin/auth', AuthController::class)->name('admin.auth');
Route::post('/admin/auth', [AuthController::class, 'login']);

Route::middleware('admin')->group(static function () {
    Route::get('admin/dashboard', DashboardController::class)->name('admin.dashboard');
    Route::resources([
       'admin/products' => ProductController::class,
        'admin/orders' => OrderController::class,
    ]);
});
