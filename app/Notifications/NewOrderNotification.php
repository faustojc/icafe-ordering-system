<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Notification;

class NewOrderNotification extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(
        private readonly object $order
    ) {}

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['broadcast'];
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'order' => $this->order,
        ];
    }

    public function toBroadcast(object $notifiable): BroadcastMessage
    {
        $name = (is_null($this->order->customer_name)) ?
            'Order #' . $this->order->id :
            $this->order->customer_name;

        return (new BroadcastMessage([
            'message' => 'New order received from ' . $name,
        ]))->onQueue('broadcasts');
    }
}
