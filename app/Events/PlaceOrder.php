<?php

namespace App\Events;

use App\Models\Order;
use Exception;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class PlaceOrder implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(
        public object $order
    ) {}

    /**
     * Get the channels the event should broadcast on.
     *
     * @return Channel
     */
    public function broadcastOn(): Channel
    {
        return new Channel('place-order');
    }

    public function broadcastWith(): array
    {
        $this->order = Order::with('orderItems.product')->oldest()->paginate(perPage: 20);

        return [
            'orders' => $this->order,
        ];
    }

    /**
     * Handle a job failure.
     *
     * @param Exception $exception
     *
     * @return void
     */
    public function failed(Exception $exception): void
    {
        // Handle the exception...
        Log::error($exception->getMessage());
    }
}
