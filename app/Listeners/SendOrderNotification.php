<?php

namespace App\Listeners;

use App\Events\NewOrderNotifEvent;
use App\Events\PlaceOrder;
use App\Models\Admin;
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
        $admin = Admin::query()->first();
        NewOrderNotifEvent::dispatch($event->order, $admin);

        // $admins = Admin::all();
        // Notification::send($admins, new NewOrderNotification($event->order));
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
