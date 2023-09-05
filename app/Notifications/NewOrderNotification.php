<?php

namespace App\Notifications;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Notification;
use function PHPUnit\Framework\isEmpty;

class NewOrderNotification extends Notification implements ShouldQueue
{
    use Queueable;

    private object $order;

    /**
     * Create a new notification instance.
     */
    public function __construct(Order $order)
    {
        $this->order = $order;
    }

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
        $name = (isEmpty($this->order->customer_name)) ?
            'Order #' . $this->order->id :
            $this->order->customer_name;

        return (new BroadcastMessage([
            'message' => 'New order received from ' . $name,
        ]))->onQueue('broadcast');
    }
}
