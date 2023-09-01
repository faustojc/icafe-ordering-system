import {showToast} from "@/Components/toast.js"
import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

const token = document.head.querySelector('meta[name="api-token"]');
const userId = document.head.querySelector('meta[name="userId"]');

if (token) {
    window.apiToken = token.content;
}

if (userId) {
    window.userId = userId.content;
}

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    forceTLS: true,
    encrypted: true,
    auth: {
        headers: {
            Authorization: `Bearer ${window.apiToken}`,
        },
    },
});

window.Echo.private(`App.Models.Admin.${window.userId}`).notification((notification) => {
    showToast(notification.message, notification.notification_type);
});
