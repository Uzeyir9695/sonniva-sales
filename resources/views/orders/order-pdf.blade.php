<!doctype html>
<html lang="ka">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        @media print {
            body { background: white; }
            .avoid-break { page-break-inside: avoid; break-inside: avoid; }
        }
    </style>
    @vite('resources/css/app.css')
</head>
<body class="bg-gray-50 text-gray-900 p-6">

<div class="max-w-4xl mx-auto space-y-4">

    {{-- ── Header ── --}}
    <div class="bg-white rounded-2xl overflow-hidden border border-gray-200">
        <div class="bg-brand-500 px-8 py-3"></div>
        <div class="flex justify-between items-center px-8 py-6">
            <div class="flex items-center gap-4">
                <img src="{{ public_path('logo/logo.png') }}" alt="Sonniva Georgia" class="h-12 w-auto object-contain">
                <div class="text-sm text-gray-500 leading-relaxed border-l border-gray-200 pl-4">
                    <p class="font-bold text-gray-800">Sonniva Georgia LLC</p>
                    <p>Shusha Street 38, Tbilisi 0102</p>
                    <p>sales@sonniva.ge · 574 234 084</p>
                </div>
            </div>
            <div class="text-right">
                <p class="text-3xl font-bold text-brand-500">ინვოისი</p>
                <p class="text-base font-semibold text-gray-700 mt-1">#{{ $order->invoice_no }}</p>
                <p class="text-xs text-gray-400 mt-1">{{ now('Asia/Tbilisi')->format('d.m.Y') }}</p>
                @if($payment->transaction_id)
                    <p class="text-xs text-gray-400 mt-0.5">ტრანზ. ID: {{ $payment->transaction_id }}</p>
                @endif
            </div>
        </div>
    </div>

    @if($payment->provider === 'invoice')
        {{-- ── Bank Accounts (invoice only) ── --}}
        <div class="bg-white rounded-2xl p-6 border border-gray-200">
            <h2 class="text-xs font-bold text-brand-500 uppercase tracking-wider mb-3">საბანკო რეკვიზიტები</h2>
            <div class="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <p class="text-gray-500">თიბისი ბანკი</p>
                    <p class="font-semibold text-gray-900">{{ config('payments.tbc.iban') }}</p>
                </div>
                <div>
                    <p class="text-gray-500">საქართველოს ბანკი</p>
                    <p class="font-semibold text-gray-900">{{ config('payments.bog.iban') }}</p>
                </div>
            </div>
        </div>
    @endif

    {{-- ── Customer + Delivery ── --}}
    <div class="grid grid-cols-2 gap-4">

        <div class="bg-white rounded-2xl p-6 border border-gray-200">
            <h2 class="text-xs font-bold text-brand-500 uppercase tracking-wider mb-3">მომხმარებელი</h2>
            <p class="font-semibold text-gray-900">{{ $order->user->name }} {{ $order->user->lastname }}</p>
            <p class="text-sm text-gray-500 mt-1">{{ $order->user->phone }}</p>
            <p class="text-sm text-gray-500">{{ $order->user->email }}</p>
            @if($order->user->tax_id)
                <p class="text-xs text-gray-400 mt-3">
                    {{ $order->user->user_type === 'individual' ? 'პირადი ნომერი' : 'საიდ. ნომერი' }}:
                    <span class="font-medium text-gray-700">{{ $order->user->tax_id }}</span>
                </p>
            @endif
        </div>

        <div class="bg-white rounded-2xl p-6 border border-gray-200">
            <h2 class="text-xs font-bold text-brand-500 uppercase tracking-wider mb-3">მიწოდება</h2>
            @php
                $deliveryLabels = [
                    'office'   => 'თვითგატანა ოფისიდან',
                    'tbilisi'  => 'მიწოდება თბილისში',
                    'regions'  => 'მიწოდება რეგიონებში',
                ];
            @endphp
            <p class="font-semibold text-gray-900">{{ $deliveryLabels[$order->delivery_type] ?? $order->delivery_type }}</p>
            @if($order->branch)
                <p class="text-sm text-gray-500 mt-1">აღება: <span class="font-medium text-gray-700 capitalize">{{ $order->branch }} ფილიალი</span></p>
            @endif
            @if($order->city)
                <p class="text-sm text-gray-500 mt-1">ქალაქი/რაიონი: <span class="font-medium text-gray-700 capitalize">{{ $order->city }}</span></p>
            @endif
            @if($order->address)
                <p class="text-sm text-gray-500 mt-1">{{ $order->address }}</p>
                @if($order->apartment_number)
                    <p class="text-sm text-gray-500">ბინა / ოფისი: <span class="font-medium text-gray-700 capitalize">{{ $order->apartment_number }}</span></p>
                @endif
            @endif
            <p class="text-sm text-gray-500 mt-2">
                მიწოდება:
                <span class="font-semibold {{ $order->delivery_cost > 0 ? 'text-gray-800' : 'text-emerald-600' }}">
                    {{ $order->delivery_cost > 0 ? number_format($order->delivery_cost, 2) . ' ლარი' : 'უფასო' }}
                </span>
            </p>
            @if($order->comment)
                <p class="text-xs text-gray-400 mt-3 italic">{{ $order->comment }}</p>
            @endif
        </div>

    </div>

    {{-- ── Items Table ── --}}
    <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden avoid-break">
        <div class="bg-brand-50 px-6 py-3 border-b border-brand-100">
            <h2 class="text-xs font-bold text-brand-500 uppercase tracking-wider">შეკვეთილი პროდუქტები</h2>
        </div>
        <table class="w-full text-sm">
            <thead>
                <tr class="border-b border-gray-100 bg-gray-50">
                    <th class="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">კოდი</th>
                    <th class="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">დასახელება</th>
                    <th class="text-center px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">რაოდ.</th>
                    <th class="text-right px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap w-32">ერთ. ფასი</th>
                    <th class="text-right px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap w-32">ჯამი</th>
                </tr>
            </thead>
            <tbody>
                @foreach($order->items as $orderItem)
                    <tr class="{{ $loop->even ? 'bg-gray-50' : 'bg-white' }} border-b border-gray-50">
                        <td class="px-6 py-4 font-mono text-xs text-gray-400">{{ $orderItem->item->no }}</td>
                        <td class="px-6 py-4 font-medium text-gray-800">{{ $orderItem->item->name }}</td>
                        <td class="px-4 py-4 text-center text-gray-700">
                            {{ $orderItem->quantity }}
                            @if($orderItem->item->base_uom_desc)
                                <span class="text-xs text-gray-400">{{ $orderItem->item->base_uom_desc }}</span>
                            @endif
                        </td>
                        <td class="px-6 py-4 text-right text-gray-600 whitespace-nowrap">
                            @if($orderItem->wholesale_discount > 0)
                                <div class="line-through text-gray-400 text-xs">{{ number_format($orderItem->unit_price + $orderItem->wholesale_discount / $orderItem->quantity, 2) }} ლარი</div>
                                <div class="text-emerald-600 font-medium">{{ number_format($orderItem->unit_price, 2) }} ლარი</div>
                                <span class="inline-block text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-semibold mt-0.5">საბითუმო</span>
                            @elseif($orderItem->discount > 0)
                                <div class="line-through text-gray-400 text-xs">{{ number_format($orderItem->unit_price / (1 - $orderItem->discount / 100), 2) }} ლარი</div>
                                <div class="text-red-600 font-medium">{{ number_format($orderItem->unit_price, 2) }} ლარი</div>
                                <span class="inline-block text-[10px] px-1.5 py-0.5 rounded-full bg-red-100 text-red-600 font-semibold mt-0.5">-{{ (float) $orderItem->discount }}%</span>
                            @else
                                {{ number_format($orderItem->unit_price, 2) }} ლარი
                            @endif
                        </td>
                        <td class="px-6 py-4 text-right font-bold text-gray-900 whitespace-nowrap">{{ number_format($orderItem->subtotal, 2) }} ლარი</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    {{-- ── Totals ── --}}
    <div class="bg-white rounded-2xl border border-gray-200 p-6">
        <div class="flex flex-col items-end gap-2 text-sm">
            <div class="flex justify-between w-72 text-gray-500">
                <span>ჯამი</span>
                <span>
                    @if($order->wholesale_discount > 0)
                        <span class="line-through text-gray-400 mr-2">{{ number_format($order->subtotal + $order->wholesale_discount, 2) }} ლარი</span>
                    @endif
                    <span class="{{ $order->wholesale_discount > 0 ? 'font-semibold text-gray-900' : '' }}">{{ number_format($order->subtotal, 2) }} ლარი</span>
                </span>
            </div>
            @if($order->wholesale_discount > 0)
                <div class="flex justify-between w-72 text-emerald-600">
                    <span>საბითუმო ფასდაკლება</span>
                    <span>-{{ number_format($order->wholesale_discount, 2) }} ლარი</span>
                </div>
            @endif
            <div class="flex justify-between w-72 text-gray-500">
                <span>მიწოდება</span>
                <span>{{ $order->delivery_cost > 0 ? number_format($order->delivery_cost, 2) . ' ლარი' : 'უფასო' }}</span>
            </div>
            <div class="h-px w-72 bg-gray-200 my-2"></div>
            <div class="flex justify-between w-72 text-base font-bold text-gray-900">
                <span>სულ გადასახდელი</span>
                <span class="text-brand-500 text-lg">{{ number_format($order->total, 2) }} ლარი</span>
            </div>
            <p class="text-xs text-gray-400 mt-1">
                გადახდის მეთოდი: {{ strtoupper($payment->provider) }}
                @if($payment->transaction_id) · {{ $payment->transaction_id }} @endif
            </p>
        </div>
    </div>

    {{-- ── Footer ── --}}
    <div class="bg-brand-500 rounded-2xl px-8 py-4 flex justify-between items-center">
        <p class="text-white text-xs font-medium">Sonniva Georgia LLC · sales@sonniva.ge · 574 234 084</p>
        <p class="text-white/70 text-xs">{{ now('Asia/Tbilisi')->format('Y') }} © ყველა უფლება დაცულია</p>
    </div>

</div>
</body>
</html>
