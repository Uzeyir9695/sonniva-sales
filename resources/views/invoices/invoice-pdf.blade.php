<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="scroll-smooth scroll-pt-28">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=Nunito" rel="stylesheet">
    <script src="https://kit.fontawesome.com/2ba6cc2cc6.js" crossorigin="anonymous"></script>

    <!-- Favicon -->
    {{--    <link rel="icon" type="image/svg+xml" href="/favicon.png">--}}
    <style>

    </style>
</head>
<body class="bg-gray-50 p-4">

@include('orders.order-pdf', [
        'orderItems' => $orderItems,
        'invoiceNumber' => $invoiceNumber,
        'tbcIBAN' => 'GE61TB7179736080100002',
        'bogIBAN' => 'GE75BG0000000131345123',
    ])
</body>
</html>
