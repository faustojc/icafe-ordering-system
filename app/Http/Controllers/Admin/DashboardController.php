<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke()
    {
        $token = auth()->guard('admin')->user()->tokens()->latest()->first()->token;
        $userId = auth()->guard('admin')->user()->id;

        return Inertia::render('Admin/Dashboard', [
            'token' => $token,
            'userId' => $userId,
        ]);
    }
}
