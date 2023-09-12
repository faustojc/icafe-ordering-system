<?php

namespace App\Events;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class PlaceOrder implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public Order $order;

    /**
     * Create a new event instance.
     */
    public function __construct(Order $order)
    {
        $this->order = $order;
    }

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
        $orderItems = $this->order->orderItems()->get();
        $products = Product::query()->whereIn('id', $orderItems->pluck('product_id'))->get();

        return [
            'order' => $this->order,
            'orderItems' => $orderItems,
            'products' => $products,
        ];
    }
}
