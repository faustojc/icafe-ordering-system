<?php

namespace App\Livewire\Admin\Components;

use App\Models\Product;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Livewire\Attributes\Locked;
use Livewire\Attributes\On;
use Livewire\Attributes\Rule;
use Livewire\Component;

class EditProduct extends Component
{
    #[Locked]
    public int $product_id = 0;
    #[Rule('required', message: 'Please input product name', onUpdate: FALSE)]
    public string $name = '';
    #[Rule('required', message: 'Please input product price', onUpdate: FALSE)]
    public float $price = 0.0;

    public string $category = '';
    public string|null $description;
    public bool $featured = FALSE;
    public bool $is_available = FALSE;

    #[Rule('required')]
    public string|null $image = NULL;

    public $listeners = ['edit-product' => 'setData'];

    #[On('set-data')]
    public function setData($product_id): void
    {
        if (!auth()->guard('admin')->check()) {
            abort(403);
        }

        $this->product_id = $product_id;
        $product = Product::query()->find($product_id);

        $this->name = $product->name;
        $this->price = $product->price;
        $this->category = $product->category;
        $this->description = $product->description;
        $this->featured = $product->featured;
        $this->is_available = $product->is_available;
        $this->image = $product->image;
    }

    #[On('image-uploaded')]
    public function updateImage($image): void
    {
        $this->image = $image;
    }

    #[On('discard')]
    public function discard(): void
    {
        $this->reset();
        $this->dispatch('discard-image-uploaded');
    }

    public function render(): View|\Illuminate\Foundation\Application|Factory|Application
    {
        return view('livewire.admin.components.product.edit-product');
    }
}
