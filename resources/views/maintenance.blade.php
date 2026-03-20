<!DOCTYPE html>
<html lang="ka">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sonniva Georgia — ტექნიკური სამუშაოები</title>
    @vite('resources/css/app.css')
    <script src="https://kit.fontawesome.com/2ba6cc2cc6.js" crossorigin="anonymous"></script>
</head>
<body class="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 relative overflow-hidden">

    <!-- Background blobs -->
    <div class="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-amber-400/10 blur-3xl pointer-events-none"></div>
    <div class="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-amber-400/10 blur-3xl pointer-events-none"></div>

    <!-- Card -->
    <div class="relative z-10 bg-white rounded-3xl shadow-lg px-10 py-14 max-w-lg w-full text-center border border-gray-100">

        <!-- Logo -->
        <div class="flex justify-center mb-8">
            <img src="{{ asset('logo/logo3.png') }}" alt="Sonniva Georgia" class="h-12 object-contain" />
        </div>

        <!-- Spinning gear icon -->
        <div class="flex justify-center mb-6">
            <div class="w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center">
                <i class="fa-solid fa-gear fa-spin fa-2xl text-amber-600"></i>
            </div>
        </div>

        <!-- Title -->
        <h1 class="text-2xl font-semibold text-gray-900 mb-3">
            მიმდინარეობს ტექნიკური სამუშაოები
        </h1>

        <!-- Subtitle -->
        <p class="text-gray-500 text-sm leading-relaxed mb-8">
            მალე დავბრუნდებით<span class="dot-1">.</span><span class="dot-2">.</span><span class="dot-3">.</span>
        </p>

        <!-- Divider -->
        <div class="border-t border-gray-100 mb-8"></div>

        <!-- Contact info -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-500">
            <div class="flex items-center gap-2">
                <i class="fa-solid fa-phone text-amber-500"></i>
                <span>032 269 36 99</span>
            </div>
            <span class="hidden sm:block text-gray-200">|</span>
            <div class="flex items-center gap-2">
                <i class="fa-solid fa-clock text-amber-500"></i>
                <span>ორშ–პარ, 09:00–18:00</span>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <p class="relative z-10 mt-8 text-xs text-gray-400">
        &copy; {{ date('Y') }} Sonniva Georgia. ყველა უფლება დაცულია.
    </p>

</body>
</html>
