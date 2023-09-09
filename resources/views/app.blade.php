<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <style>
        body #app {
            height: 100%;
        }
    </style>

    @viteReactRefresh
    @vite(['resources/css/app.css','resources/js/app.jsx'])
    @inertiaHead
</head>
<body class="h-full bg-white dark:bg-gray-700">
@inertia
</body>
</html>
