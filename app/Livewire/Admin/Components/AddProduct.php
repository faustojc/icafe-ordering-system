<?php

namespace App\Livewire\Admin\Components;

use App\Models\Product;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Support\Facades\Storage;
use Livewire\Attributes\On;
use Livewire\Attributes\Rule;
use Livewire\Component;
use Livewire\WithFileUploads;

class AddProduct extends Component
{
    use WithFileUploads;

    #[Rule(['required'])]
    public string $name = '';
    #[Rule(['required'])]
    public float $price = 0.0;
    public string $category = '';
    public string $description = '';
    public mixed $image = NULL;
    public string $image_name = '';

    #[On('image-uploaded')]
    public function updateImage($image): void
    {
        $this->image = $image;
    }

    public function discard(): void
    {
        $this->reset();
        $this->image = NULL;
        Storage::deleteDirectory('livewire-tmp');

        $this->dispatch('discard-image-uploaded');
    }

    public function addProduct(): void
    {
        $path = $this->image->store('public/products');
        $this->image_name = basename($path);

        $product = new Product();
        $product->name = $this->name;
        $product->price = $this->price;
        $product->category = $this->category;
        $product->description = $this->description;
        $product->image = $this->image_name;
        $product->save();

        $this->discard();
    }

    public function render(): View|\Illuminate\Foundation\Application|Factory|Application
    {
        return view('livewire.admin.components.product.add-product-modal');
    }
}
