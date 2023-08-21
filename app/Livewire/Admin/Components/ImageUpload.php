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
    public mixed $image_file = NULL;

    protected $listeners = ['livewire-upload-progress' => 'updateProgress'];

    public function updateProgress($progress): void
    {
        if ($progress === 100) {
            $this->dispatch('image-uploaded', image: $this->image_file);
        }
    }

    #[On('discard-image-uploaded')]
    public function discardImage(): void
    {
        $this->reset('image_file');
    }

    public function render(): View|Application|Factory|\Illuminate\Contracts\Foundation\Application
    {
        return view('livewire.admin.components.product.image-upload');
    }
}
