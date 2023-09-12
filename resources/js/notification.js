import {showToast} from "@/Components/toast.js";

const token = document.head.querySelector('meta[name="api-token"]');
const userId = document.head.querySelector('meta[name="userId"]');

if (token) {
    window.apiToken = token.content;
}

if (userId) {
    window.userId = userId.content;
}

window.Echo.private(`App.Models.Admin.${window.userId}`).notification((notification) => {
    showToast(notification.message, notification.notification_type);
});

window.Echo.channel('place-order').listen('PlaceOrder', (e) => {
    console.log(e);
});
