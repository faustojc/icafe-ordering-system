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

Broadcast::channel('App.Models.User.{id}', static function ($user, $id) {
    return (int)$user->id === (int)$id;
});

Broadcast::channel('product-channel', static function (Admin $user) {
    return TRUE;
}, ['guards' => ['admin']]);
