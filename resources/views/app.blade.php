<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}"  @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('favicon.png') }}">
        <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('favicon.png') }}">
        <meta name="theme-color" content="#6777ef"/>
{{--        <link rel="manifest" href="{{ asset('/manifest.json') }}">--}}

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
        <script src="https://www.google.com/recaptcha/enterprise.js?render={{ config('services.google_recaptcha.site_key') }}"></script>

        @if(app()->environment('production'))
        <!-- Google tag (gtag.js) -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-MX80ZYCMNF"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MX80ZYCMNF');
        </script>
        @endif

        <link rel="canonical" href="{{ request()->url() }}" />

        @php
            $localePath = trim(preg_replace('#^(en|ru|tr)(/|$)#', '', request()->path()), '/');
            $localeBase = rtrim(config('app.url'), '/');
            $localeSuffix = $localePath !== '' ? '/'.$localePath : '';
        @endphp
        @foreach (config('app.supported_locales') as $hreflang)
            <link rel="alternate" hreflang="{{ $hreflang }}" href="{{ $localeBase.($hreflang === config('app.default_locale') ? '' : '/'.$hreflang).$localeSuffix }}">
        @endforeach
        <link rel="alternate" hreflang="x-default" href="{{ $localeBase.$localeSuffix }}">

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
        @inertia

{{--        <script>--}}
{{--            (function(w,t,c,p,s,e,l,k){--}}
{{--                p=new Promise(function(r){w[c]={client:function(){return p}};--}}
{{--                    l=document.createElement('div');l.setAttribute("id", "live-caller-widget");--}}
{{--                    s=document.createElement(t);s.async=1;s.setAttribute("data-livecaller", 'script');--}}
{{--                    k=document.body || document.documentElement;k.insertBefore(l, k.firstChild);--}}
{{--                    l.setAttribute("data-livecaller", 'mount-el');s.src='https://cdn.livecaller.io/js/app.js';--}}
{{--                    e=document.getElementsByTagName(t)[0];e ? e.parentNode.insertBefore(s,e) : k.insertBefore(s, l.nextSibling);--}}
{{--                    s.onload=function(){r(w[c]);};});return p;--}}
{{--            })(window,'script','LiveCaller').then(function(){--}}
{{--                try{--}}
{{--                    LiveCaller.config.merge({"widget":{"id":"f659b235-e91a-445d-a2b7-a8190574a76b"},"app":{"locale":"ka"}});--}}
{{--                    LiveCaller.liftOff();--}}
{{--                }catch(e){--}}
{{--                }--}}
{{--            });--}}
{{--        </script>--}}
    </body>
</html>
