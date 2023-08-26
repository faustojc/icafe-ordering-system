<?php

namespace App\Livewire\Admin;

use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Livewire\Attributes\Layout;
use Livewire\Component;

class Dashboard extends Component
{
    public function logout(): RedirectResponse
    {
        auth()->guard('admin')->logout();
        session()->invalidate();

        return redirect()->route('admin.auth');
    }

    #[Layout('livewire.layouts.app')]
    public function render(): View|\Illuminate\Foundation\Application|Factory|Application
    {
        $token = auth()->guard('admin')->user()->tokens()->latest()->first()->token;
        $userId = auth()->guard('admin')->user()->id;

        return view('livewire.admin.dashboard', [
            'token' => $token,
            'userId' => $userId,
            'navbar' => view('livewire.admin.components.navbar'),
            'sidebar' => view('livewire.admin.components.sidebar'),
        ]);
    }
}
