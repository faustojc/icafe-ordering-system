<?php

use App\Http\Controllers\Admin\Components\ProductController;
use App\Http\Controllers\Customer\Components\OrderController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route api for retrieving products
Route::get('/products', [ProductController::class, 'index']);

// Route api resource for orders
Route::apiResource('/orders', OrderController::class);
