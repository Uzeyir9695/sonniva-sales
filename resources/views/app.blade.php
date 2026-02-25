<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}"  @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
        <script src="https://kit.fontawesome.com/2ba6cc2cc6.js" crossorigin="anonymous"></script>
        <script src="https://www.google.com/recaptcha/enterprise.js?render=6Le1gHAsAAAAAA6p7osMt8gjcndj6hdsKPzRcHmE"></script>

{{--        <script type="text/javascript" src="https://cdn.weglot.com/weglot.min.js"></script>--}}
{{--        <script>--}}
{{--            Weglot.initialize({--}}
{{--                api_key: 'wg_569a623c969491c7096dc0032fea46d24'--}}
{{--            });--}}
{{--        </script>--}}

        @routes
        @vite('resources/js/app.js')
        @inertiaHead

    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
