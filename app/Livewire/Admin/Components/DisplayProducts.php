<?php

namespace App\Livewire\Admin\Components;

use App\Models\Product;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Livewire\Attributes\Computed;
use Livewire\Attributes\On;
use Livewire\Component;
use Livewire\WithPagination;

class DisplayProducts extends Component
{
    use WithPagination;

    public $paginators = [];
    public string $query = '';

    public $listeners = ['product-processed' => 'render'];

    #[On('search-product')]
    public function search($query): void
    {
        $this->query = $query;
        $this->resetPage();
    }

    #[Computed]
    public function products(): LengthAwarePaginator
    {
        return Product::query()
            ->where('name', 'like', "%{$this->query}%")
            ->orderBy('created_at', 'desc')
            ->paginate(10);
    }

    public function render(): View|\Illuminate\Foundation\Application|Factory|Application
    {
        return view('livewire.admin.components.product.display-products');
    }
}
