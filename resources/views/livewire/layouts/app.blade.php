<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Wolf Spider</title>
    <meta content="width=device-width, initial-scale=1">

    @vite(['resources/css/app.css','resources/js/app.js'])
    @livewireStyles
</head>
<body class="h-full">
    {{ $slot }}

    @livewireScripts
</body>
</html>
