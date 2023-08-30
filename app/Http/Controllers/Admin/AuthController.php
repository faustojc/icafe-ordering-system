<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AuthController extends Controller
{

    public function __invoke()
    {
        return Inertia::render('Admin/Auth');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'username' => 'required',
            'password' => 'required',
        ]);

        if (auth()->guard('admin')->attempt($credentials)) {
            session()->regenerate();

            $token = auth()->guard('admin')->user()->tokens()->first()->token;

            if (empty($token)) {
                auth()->guard('admin')->user()->createToken('API TOKEN');
            }

            return redirect()->to(route('admin.dashboard'));
        }

        return Inertia::render('Admin/Auth', [
            'error' => 'Invalid credentials.',
        ]);
    }
}
