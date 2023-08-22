<?php

namespace App\Livewire\Admin\Components;

use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Support\Facades\Storage;
use Livewire\Attributes\On;
use Livewire\Attributes\Rule;
use Livewire\Component;

class EditProduct extends Component
{

    public int $product_id = 0;
    #[Rule(['required'])]
    public string $name = '';
    #[Rule(['required'])]
    public float $price = 0.0;
    public string $category = '';
    public string $description = '';
    public bool $featured = FALSE;
    public bool $is_available = FALSE;
    public mixed $image = '';

    public bool $loading = FALSE;

    public $listeners = ['edit-product' => 'setData'];

    public function setData($product_id, $name, $price, $category, $description, $featured, $is_available, $image): void
    {
        $this->loading = TRUE;

        $this->product_id = $product_id;
        $this->name = $name;
        $this->price = $price;
        $this->category = $category;
        $this->description = $description;
        $this->featured = $featured;
        $this->is_available = $is_available;
        $this->image = $image;

        $this->dispatch('set-image', image: $image);

        $this->loading = FALSE;
    }

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

    public function render(): View|\Illuminate\Foundation\Application|Factory|Application
    {
        return view('livewire.admin.components.product.edit-product');
    }
}
