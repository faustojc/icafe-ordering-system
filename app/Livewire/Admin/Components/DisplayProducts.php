<?php

namespace App\Livewire\Admin\Components;

use App\Models\Product;
use App\Models\User;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Livewire\Attributes\On;
use Livewire\Component;
use Livewire\WithPagination;

class DisplayProducts extends Component
{
    use WithPagination;

    public $paginators = [];
    public string $query = '';

    #[On('search-product')]
    public function search($query): void
    {
        $this->query = $query;
        $this->resetPage();
    }

    public function render(): View|\Illuminate\Foundation\Application|Factory|Application
    {
        $products = Product::query()
            ->where('name', 'like', "%{$this->query}%")
            ->paginate(5);

        return view('livewire.admin.components.product.display-products', [
            'products' => $products,
        ]);
    }
}
