<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}"  @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('sonniva_favicon_192.png') }}">
        <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('sonniva_favicon_192.png') }}">
        <meta name="theme-color" content="#6777ef"/>
{{--        <link rel="manifest" href="{{ asset('/manifest.json') }}">--}}

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
        <script src="https://kit.fontawesome.com/2ba6cc2cc6.js" crossorigin="anonymous"></script>
        <script src="https://www.google.com/recaptcha/enterprise.js?render=6LcW6nwsAAAAAAm5AmwLcYU2MkUEtJczfTdo_vXh"></script>

{{--        <script type="text/javascript" src="https://cdn.weglot.com/weglot.min.js"></script>--}}
{{--        <script>--}}
{{--            Weglot.initialize({--}}
{{--                api_key: 'wg_23adeb49d3aba0bd4a948b450978bcda9',--}}
{{--                hide_switcher: true,--}}
{{--                cache: true,--}}
{{--            });--}}
{{--        </script>--}}

        <script async src="https://static.linguise.com/script-js/switcher.bundle.js?d=pk_2ULbqKvkPcCPvJK9MW7qD9FpmOGFTbIX"></script>

        <link rel="canonical" href="{{ request()->url() }}" />

        @php
            $orgJsonLd = json_encode([
                '@context' => 'https://schema.org',
                '@type'    => 'Organization',
                'name'     => config('app.name'),
                'url'      => url('/'),
                'logo'     => url('/logo/logo.png'),
            ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        @endphp
        <script type="application/ld+json">{!! $orgJsonLd !!}</script>

        @isset($json_ld)
            <script type="application/ld+json">{!! json_encode($json_ld, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) !!}</script>
        @endisset
        @isset($breadcrumb_json_ld)
            <script type="application/ld+json">{!! json_encode($breadcrumb_json_ld, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) !!}</script>
        @endisset
        @routes
        @vite('resources/js/app.js')
        @inertiaHead

    </head>
    <body class="font-sans antialiased bg-gray-50">
        <!-- Linguise: must be static HTML, not rendered by Inertia/Vue -->
        <div id="linguise-slot" style="display:none">[linguise]</div>
        @inertia
    </body>
</html>
