<?php

namespace App\Livewire\Admin;

use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Livewire\Attributes\Layout;
use Livewire\Component;

class Dashboard extends Component
{
    public string $query = '';

    public function searchProduct(): void
    {
        $this->dispatch('search-product', query: $this->query);
    }

    #[Layout('livewire.layouts.app')]
    public function render(): View|\Illuminate\Foundation\Application|Factory|Application
    {
        return view('livewire.admin.dashboard', [
            'navbar' => view('livewire.admin.components.navbar'),
            'sidebar' => view('livewire.admin.components.sidebar'),
        ]);
    }
}
