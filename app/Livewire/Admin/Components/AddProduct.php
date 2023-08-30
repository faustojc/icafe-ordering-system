<?php

namespace App\Livewire\Admin\Components;

use App\Models\Product;
use App\Notifications\ProductNotification;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Livewire\Attributes\On;
use Livewire\Attributes\Rule;
use Livewire\Component;
use Livewire\WithFileUploads;

class AddProduct extends Component
{
    use WithFileUploads;

    #[Rule('required', message: 'Please input product name', onUpdate: FALSE)]
    public string $name = '';
    #[Rule('required', message: 'Please input product price', onUpdate: FALSE)]
    public float $price = 0.0;

    public string $category = '';
    public string $description = '';

    #[Rule('required')]
    public string $image = '';

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

    public function addProduct(): void
    {
        $this->dispatch('upload-image');
        $this->validate();

        $product = new Product();
        $product->name = strtoupper($this->name);
        $product->price = $this->price;
        $product->category = $this->category;
        $product->description = $this->description;
        $product->image = $this->image;
        $product->save();

        $this->reset();
        $this->dispatch('product-processed');
        $this->dispatch('close-modal');

        auth()->guard('admin')->user()->notify(new ProductNotification($product, 'Added', 'success'));
    }

    public function render(): View|\Illuminate\Foundation\Application|Factory|Application
    {
        return view('livewire.admin.components.product.add-product-modal', [
            'errors' => $this->getErrorBag(),
        ]);
    }
}
