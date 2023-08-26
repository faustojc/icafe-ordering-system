<?php

namespace App\Livewire\Admin;

use App\Models\Admin;
use Hash;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Foundation\Application;
use Illuminate\Http\RedirectResponse;
use Livewire\Attributes\Layout;
use Livewire\Attributes\Rule;
use Livewire\Component;

class Authenticate extends Component
{
    #[Rule(['required'])]
    public string $username = '';
    #[Rule(['required'])]
    public string $password = '';

    public string $error = '';
    public bool $loading = FALSE;

    public function login(): ?RedirectResponse
    {
        $this->loading = TRUE;

        $credentials = $this->validate();

        if (auth()->guard('admin')->attempt($credentials)) {
            session()->regenerate();

            auth()->guard('admin')->user()->createToken('API TOKEN')->plainTextToken;

            $this->loading = FALSE;
            $this->error = 'Successfully logged in';
            return NULL;
            //return redirect()->to(route('admin.dashboard'));
        }

        // else, show error message
        $this->error = 'Invalid credentials.';
        $this->loading = FALSE;

        return NULL;
    }

    public function addAdmin(): void
    {
        $this->loading = TRUE;

        $admin = new Admin();
        $admin->username = 'wolfspider';
        $admin->password = Hash::make('xdsgBQA9746a');
        $admin->save();

        $this->loading = FALSE;
    }

    #[Layout('livewire.layouts.app')]
    public function render(): View|Application|Factory|\Illuminate\Contracts\Foundation\Application
    {
        return view('livewire.admin.auth', [
            'username' => $this->username,
            'password' => $this->password,
        ])->title('Admin Login');
    }
}
