<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Wolf Spider</title>
    <meta content="width=device-width, initial-scale=1">

    @vite(['resources/css/app.css','resources/js/app.js'])
    @livewireStyles
    <script src="https://js.pusher.com/beams/1.0/push-notifications-cdn.js"></script>
    @yield('scripts')
</head>
<body class="h-full">
{{ $slot }}

@livewireScripts
</body>
</html>
