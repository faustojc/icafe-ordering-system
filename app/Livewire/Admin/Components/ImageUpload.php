<?php

namespace App\Livewire\Admin\Components;

use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Storage;
use Livewire\Attributes\On;
use Livewire\Attributes\Rule;
use Livewire\Component;
use Livewire\WithFileUploads;

class ImageUpload extends Component
{
    use WithFileUploads;

    #[Rule(['required', 'image', 'max:1024'])]
    public mixed $image = NULL;
    //#[Reactive]
    public string|null $image_name = '';
    //#[Reactive]
    public string|null $url = NULL;

    public function mount($image = NULL): void
    {
        $this->url = ($image) ? url('images/products/' . $image) : NULL;
        $this->image_name = $image;
    }

    #[On('set-image')]
    public function updateImage($image): void
    {
        $this->url = url('images/products/' . $image);
        $this->image_name = $image;
    }

    #[On('discard-image-uploaded')]
    public function discardImage(): void
    {
        $this->reset();
    }

    #[On('upload-image')]
    public function uploadImage(): void
    {
        $this->validateOnly('image');
        $path = $this->image->storePubliclyAs('images/products', $this->image->getClientOriginalName());

        $this->url = Storage::url($path);

        Storage::deleteDirectory('livewire-tmp');

        $this->reset();
    }

    public function updated($property): void
    {
        if ($property === 'image') {
            $this->validateOnly($property);
            $this->dispatch('image-uploaded', image: $this->image->getClientOriginalName());

            $this->url = $this->image->temporaryUrl();
            $this->image_name = $this->image->getClientOriginalName();
        }
    }

    public function render(): View|Application|Factory|\Illuminate\Contracts\Foundation\Application
    {
        return view('livewire.admin.components.product.image-upload', [
            'errors' => $this->getErrorBag(),
        ]);
    }
}
