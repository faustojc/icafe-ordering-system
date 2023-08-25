<?php

namespace App\Livewire\Admin\Components;

use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Foundation\Application;
use Livewire\Attributes\On;
use Livewire\Attributes\Rule;
use Livewire\Component;
use Livewire\WithFileUploads;

class ImageUpload extends Component
{
    use WithFileUploads;

    #[Rule(['required', 'image', 'max:1024'])]
    public mixed $image = NULL;
    public string $image_name = '';

    #[On('set-image')]
    public function updateImage($image): void
    {
        $this->image = '/images/products/' . $image;
        $this->image_name = $image;
    }

    #[On('discard-image-uploaded')]
    public function discardImage(): void
    {
        $this->reset('image');
    }

    #[On('upload-image')]
    public function uploadImage(): void
    {
        $this->validateOnly('image');
        $this->image->storePublicly('images/products');
    }

    public function updated($property): void
    {
        if ($property === 'image_file') {
            $this->validateOnly($property);
            $this->dispatch('image-uploaded', image: $this->image->getClientOriginalName());
        }
    }

    public function render(): View|Application|Factory|\Illuminate\Contracts\Foundation\Application
    {
        return view('livewire.admin.components.product.image-upload', [
            'errors' => $this->getErrorBag(),
        ]);
    }
}
