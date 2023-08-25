<?php

namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ProductProcessed implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public object|null $product = NULL;
    private string $type;

    /**
     * Create a new event instance.
     */
    public function __construct(object $product, string $type)
    {
        $this->product = $product;
        $this->type = $type;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return PrivateChannel
     */
    public function broadcastOn(): PrivateChannel
    {
        return new PrivateChannel('product-channel');
    }

    public function broadcastAs(): string
    {
        return 'product-processed';
    }

    public function broadcastWith(): array
    {
        return [
            'product' => $this->product,
            'type' => $this->type,
        ];
    }
}
