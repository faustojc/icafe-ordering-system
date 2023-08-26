<?php

namespace App\Models;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use BroadcastsEvents, HasFactory;

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    /**
     * Get the channels that model events should broadcast on.
     *
     * @return array<int, Channel|Model>
     */
    public function broadcastOn(string $event): array
    {
        $admin = auth()->guard('admin')->user();

        // Return a private channel for the authenticated admin
        return [new PrivateChannel('App.Models.Admin.' . $admin->id)];
    }

    public function broadcastAs(string $event): string
    {
        return 'product-processed';
    }

    public function broadcastWith(string $event): array
    {
        return [
            'admin' => auth('admin')->user()->id,
            'product' => $this,
            'type' => $event,
        ];
    }
}
