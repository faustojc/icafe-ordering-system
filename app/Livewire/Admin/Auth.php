<?php

namespace App\Livewire\Admin;

use App\Models\Admin;
use Hash;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Foundation\Application;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Validator;
use Livewire\Attributes\Layout;
use Livewire\Attributes\Rule;
use Livewire\Attributes\Title;
use Livewire\Component;
use \Illuminate\Support\Facades\Auth as Authenticate;

#[Title('Admin Login')]
class Auth extends Component
{
    #[Rule(['required'])]
    public string $username = '';
    #[Rule(['required'])]
    public string $password = '';

    public string $error = '';
    public bool $loading = false;

    public function login()
    {
        $this->loading = true;

        $validator = Validator::make(
            [
                'username' => $this->username,
                'password' => $this->password
            ],
            [
                'username' => 'required',
                'password' => 'required',
            ]);

        if ($validator->fails()) {
            $this->error = $validator->errors()->first();
            $this->loading = false;
            return NULL;
        }

        if (Authenticate::guard('admin')->attempt($validator->validated())) {
            $this->loading = false;
            return redirect()->to(route('admin.dashboard'));
        }

        // else, show error message
        $this->error = 'Invalid credentials.';
        $this->loading = false;

        return NULL;
    }

    public function addAdmin(): void
    {
        $this->loading = true;

        $admin = new Admin();
        $admin->username = 'wolfspider';
        $admin->password = Hash::make('xdsgBQA9746a');
        $admin->save();

        $this->loading = false;
    }

    #[Layout('livewire.layouts.app')]
    public function render(): View|Application|Factory|\Illuminate\Contracts\Foundation\Application
    {
        return view('livewire.admin.auth');
    }
}
