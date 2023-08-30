<?php

namespace App\Livewire\Admin\Components;

use App\Models\Product;
use App\Notifications\ProductNotification;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Livewire\Attributes\On;
use Livewire\Component;

class DeleteProduct extends Component
{
    public int $product_id = 0;

    #[On('set-data')]
    public function setData($product_id): void
    {
        $this->product_id = $product_id;
    }

    public function deleteProduct(): void
    {
        $product = Product::query()->where('id', $this->product_id)->first();

        auth()->guard('admin')->user()->notify(new ProductNotification($product, 'Deleted', 'success'));

        $product->delete();

        $this->reset();
        $this->dispatch('product-processed');
    }

    public function render(): View|\Illuminate\Foundation\Application|Factory|Application
    {
        return view('livewire.admin.components.product.delete-product');
    }
}
