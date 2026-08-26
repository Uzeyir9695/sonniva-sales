<!DOCTYPE html>
<html lang="ka">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="refresh" content="0;url={{ $url }}" />
    <title>Sonniva Georgia</title>
    @vite('resources/css/app.css')
    <script>window.location.replace(@json($url));</script>
</head>
<body class="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 text-center">

    <div class="bg-white rounded-3xl shadow-lg px-10 py-14 max-w-lg w-full border border-gray-100">
        <div class="flex justify-center mb-8">
            <img src="{{ asset('logo/logo3.png') }}" alt="Sonniva Georgia" class="h-12 object-contain" />
        </div>

        <h1 class="text-xl font-semibold text-gray-900 mb-3">
            გადამისამართება აპლიკაციაში...
        </h1>

        <p class="text-gray-500 text-sm leading-relaxed">
            <a href="{{ $url }}" class="text-amber-600 font-semibold">დააჭირეთ აქ</a>,
            თუ ავტომატურად არ მოხდა გადამისამართება
        </p>
    </div>

</body>
</html>
