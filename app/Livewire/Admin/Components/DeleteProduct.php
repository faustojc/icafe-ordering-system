<?php

namespace App\Livewire\Admin\Components;

use App\Models\Product;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Livewire\Component;

class DeleteProduct extends Component
{
    public int $product_id = 0;

    public function deleteProduct(): void
    {
        Product::query()->where('id', $this->product_id)->delete();
    }

    public function render(): View|\Illuminate\Foundation\Application|Factory|Application
    {
        return view('livewire.admin.components.product.delete-product');
    }
}
