<?php

namespace App\Listeners;

use App\Events\PlaceOrder;
use App\Notifications\NewOrderNotification;
use DateTime;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendOrderNotification implements ShouldQueue
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(PlaceOrder $event): void
    {
        auth('admin')->user()?->notify(new NewOrderNotification($event->order));
    }

    /**
     * Determine if events and listeners should be automatically discovered.
     */
    public function shouldDiscoverEvents(): bool
    {
        return TRUE;
    }

    /**
     * Determine the time at which the listener should time out.
     */
    public function retryUntil(): DateTime
    {
        return now()->addMinutes(5);
    }
}
