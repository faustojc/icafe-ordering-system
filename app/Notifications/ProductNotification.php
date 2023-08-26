<?php

namespace App\Notifications;

use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Notification;

class ProductNotification extends Notification implements ShouldQueue
{
    use Queueable;

    private object $product;
    private string $action;
    private string $notification_type;

    /**
     * Create a new notification instance.
     */
    public function __construct(object $product, string $action, string $notification_type)
    {
        $this->product = $product;
        $this->action = $action;
        $this->notification_type = $notification_type;
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
     * Get the type of the notification being broadcast.
     */
    public function broadcastType(): string
    {
        return 'broadcast.message';
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'notifiable' => $notifiable,
            'product' => $this->product,
            'action' => $this->action,
            'notification_type' => $this->notification_type,
        ];
    }

    public function toBroadcast(object $notifiable): BroadcastMessage
    {
        return (new BroadcastMessage([
            'message' => 'Product ' . $this->action . ': ' . $this->product->name,
            'notification_type' => $this->notification_type,
        ]))->onQueue('broadcast');
    }

    public function broadcastOn(): PrivateChannel
    {
        $id = auth()->guard('admin')->user()->id;

        return new PrivateChannel('App.Models.Admin.' . $id);
    }
}
