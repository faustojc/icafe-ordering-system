<?php

namespace App\Events;

use App\Models\Admin;
use App\Models\Product;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ProductProcessed implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(
        private readonly Admin $admin,
        private readonly Product $product,
        private readonly string $action,
        private readonly string $type

    ) {}

    /**
     * Get the channels the event should broadcast on.
     *
     * @return Channel
     */
    public function broadcastOn(): Channel
    {
        return new Channel('App.Models.Admin.' . $this->admin->id);
    }

    public function broadcastWith(): array
    {
        return [
            'message' => 'Product ' . $this->action . ': ' . $this->product->name,
            'type' => $this->type,
        ];
    }
}
