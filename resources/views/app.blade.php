<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1">

    <style>
        body #app {
            height: 100%;
        }
    </style>

    <script src="https://js.pusher.com/beams/1.0/push-notifications-cdn.js"></script>

    @viteReactRefresh
    @vite(['resources/css/app.css','resources/js/app.jsx'])
    @inertiaHead
</head>
<body class="h-full bg-white dark:bg-gray-700">
@inertia
</body>
</html>
