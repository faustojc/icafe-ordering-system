<?php

use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\Components\ProductController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Customer\OrderMenu;
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

Route::get('/', OrderMenu::class)->name('order.menu');

// ----------- Admin Routes -----------
Route::get('/admin/auth', AuthController::class)->name('admin.auth');
Route::post('/admin/auth', [AuthController::class, 'login']);

Route::middleware('admin')->group(static function () {
    Route::get('admin/dashboard', DashboardController::class)->name('admin.dashboard');
    Route::resource('admin/products', ProductController::class);
    Route::post('admin/products/upload', [ProductController::class, 'upload']);
});
