<?php

use App\Models\Admin;
use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('place-order', static function () {
    return true;
});

Broadcast::channel('App.Models.Admin.{userId}', static function (Admin $user, $userId) {
    return (int)$user->id === (int)$userId;
}, ['guards' => ['admin']]);
