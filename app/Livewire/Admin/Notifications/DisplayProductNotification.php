<?php

namespace App\Livewire\Admin\Notifications;

use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Livewire\Attributes\On;
use Livewire\Component;

class DisplayProductNotification extends Component
{
    public array $notifications = [];

    #[On('echo-private:product-channel,ProductProcessed')]
    public function setNotification(array $eventData): void
    {
        $this->notifications[] = [
            'type' => $eventData['type'],
            'message' => 'Product added: ' . $eventData['product']->name,
        ];
    }

    public function render(): View|\Illuminate\Foundation\Application|Factory|Application
    {
        return view('livewire.admin.notifications.display-product-notification');
    }
}
