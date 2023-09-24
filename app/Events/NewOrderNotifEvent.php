<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NewOrderNotifEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(
        public readonly object $order,
        public readonly object $admin
    ) {}

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new Channel('App.Models.Admin.' . $this->admin->id),
        ];
    }

    public function broadcastWith(): array
    {
        $name = (is_null($this->order->customer_name)) ?
            'Order #' . $this->order->id :
            $this->order->customer_name;

        return [
            'message' => 'New order received from ' . $name,
        ];
    }
}
