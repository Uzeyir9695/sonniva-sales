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

        <script type="text/javascript" src="https://cdn.weglot.com/weglot.min.js"></script>
        <script>
            Weglot.initialize({
                api_key: 'wg_7ace44a8c1f484cdedc879984406c4cb5',
                hide_switcher: true,
                cache: true,
            });
        </script>

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
        @inertia

        <script>
            (function(w,t,c,p,s,e,l,k){
                p=new Promise(function(r){w[c]={client:function(){return p}};
                    l=document.createElement('div');l.setAttribute("id", "live-caller-widget");
                    s=document.createElement(t);s.async=1;s.setAttribute("data-livecaller", 'script');
                    k=document.body || document.documentElement;k.insertBefore(l, k.firstChild);
                    l.setAttribute("data-livecaller", 'mount-el');s.src='https://cdn.livecaller.io/js/app.js';
                    e=document.getElementsByTagName(t)[0];e ? e.parentNode.insertBefore(s,e) : k.insertBefore(s, l.nextSibling);
                    s.onload=function(){r(w[c]);};});return p;
            })(window,'script','LiveCaller').then(function(){
                try{
                    LiveCaller.config.merge({"widget":{"id":"f659b235-e91a-445d-a2b7-a8190574a76b"},"app":{"locale":"ka"}});
                    LiveCaller.liftOff();
                }catch(e){
                }
            });
        </script>
    </body>
</html>
