<script setup>
import { Head } from '@inertiajs/vue3'

const TBILISI_FREE_THRESHOLD = 500

const deliveryMethods = [
    {
        icon: 'pi pi-building',
        title: 'სონნივას ფილიალიდან გატანა',
        subtitle: 'ავჭალა — შუშის ქუჩა 38',
        badge: 'უფასო',
        badgeClass: 'bg-emerald-100 text-emerald-700',
        cardClass: 'border-emerald-200',
        iconClass: 'bg-emerald-50 text-emerald-600',
    },
    {
        icon: 'pi pi-map-marker',
        title: 'მიწოდება თბილისში',
        subtitle: 'ზონის მიხედვით',
        badge: '40 – 60 ₾',
        badgeClass: 'bg-blue-100 text-blue-700',
        cardClass: 'border-blue-200',
        iconClass: 'bg-blue-50 text-blue-600',
    },
    {
        icon: 'fa-solid fa-truck-fast',
        title: 'მიწოდება რეგიონებში',
        subtitle: 'წონისა და ტიპის მიხედვით',
        badge: '6 – 750 ₾',
        badgeClass: 'bg-violet-100 text-violet-700',
        cardClass: 'border-violet-200',
        iconClass: 'bg-violet-50 text-violet-600',
    },
]

const tbilisiZones = [
    {
        label: 'I ზონა',
        price: 40,
        color: 'blue',
        neighborhoods: [
            'გლდანი', 'გლდანულა', 'სოფელი გლდანი', 'ზაჰესი', 'ავჭალა',
            'თემქა', 'მუხიანი', 'დიღომი 7', 'დიღმის მასივი', 'დიდი დიღომი', 'სოფელი დიღომი',
        ],
    },
    {
        label: 'II ზონა',
        price: 50,
        color: 'indigo',
        neighborhoods: [
            'ვაკე', 'საბურთალო', 'ბაგები', 'ლისი', 'ვაშლიჯვარი', 'ორთაჭალა',
            'მთაწმინდა', 'სოლოლაკი', 'ვერა', 'დიდუბე', 'ჩუღურეთი', 'ნაძალადევი',
        ],
    },
    {
        label: 'III ზონა',
        price: 60,
        color: 'violet',
        neighborhoods: [
            'ისანი', 'სამგორი', 'ლილო', 'ორხევი', 'აეროპორტის დასახლება',
            'ქვემო ფონიჭალა', 'ზემო ფონიჭალა', 'რუსთავი', 'ვარკეთილი', 'წყნეთი',
            'კოჯორი', 'ტაბახმელა', 'წავკისი', 'შინდისი', 'ოქროყანა', 'ნაფეტვრები',
        ],
    },
]

const DELIVERY_RATES = [
    { maxKg: 1,    region: 10.5, office: 6,   village: 15.5 },
    { maxKg: 5,    region: 12.5, office: 6,   village: 17.5 },
    { maxKg: 10,   region: 16,   office: 10,  village: 21   },
    { maxKg: 15,   region: 21,   office: 15,  village: 26   },
    { maxKg: 20,   region: 26,   office: 20,  village: 31   },
    { maxKg: 30,   region: 36,   office: 30,  village: 45   },
    { maxKg: 50,   region: 65,   office: 50,  village: 80   },
    { maxKg: 100,  region: 105,  office: 80,  village: 120  },
    { maxKg: 150,  region: 145,  office: 110, village: 175  },
    { maxKg: 200,  region: 185,  office: 140, village: 215  },
    { maxKg: 250,  region: 220,  office: 170, village: 250  },
    { maxKg: 300,  region: 260,  office: 200, village: 290  },
    { maxKg: 500,  region: 340,  office: 280, village: 390  },
    { maxKg: 750,  region: 450,  office: 370, village: 500  },
    { maxKg: 1000, region: 700,  office: 510, village: 750  },
]

function weightLabel(rate, index) {
    const prev = index === 0 ? 0 : DELIVERY_RATES[index - 1].maxKg
    return index === 0
        ? `0 – ${rate.maxKg} კგ`
        : `${prev} – ${rate.maxKg} კგ`
}
</script>

<template>
    <Head title="მიწოდების ტარიფები" />

    <div class="min-h-screen bg-gray-50">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-10">

            <!-- Header -->
            <div class="text-center space-y-3">
                <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-500/10 mb-2">
                    <i class="fa-solid fa-truck-fast text-3xl text-brand-500"></i>
                </div>
                <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">მიწოდების ტარიფები</h1>
                <p class="text-gray-500 text-sm max-w-md mx-auto">ყველა მიწოდების ვარიანტი და მათი ფასები ერთ გვერდზე</p>
            </div>

            <!-- 3 method overview cards -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div
                    v-for="method in deliveryMethods"
                    :key="method.title"
                    class="bg-white rounded-2xl border p-5 flex flex-col gap-3 shadow-sm"
                    :class="method.cardClass"
                >
                    <div class="flex items-center justify-between">
                        <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" :class="method.iconClass">
                            <i :class="[method.icon, 'text-lg']"></i>
                        </div>
                        <span class="text-xs font-bold px-2.5 py-1 rounded-full" :class="method.badgeClass">
                            {{ method.badge }}
                        </span>
                    </div>
                    <div>
                        <p class="font-semibold text-gray-900 text-sm">{{ method.title }}</p>
                        <p class="text-xs text-gray-400 mt-0.5">{{ method.subtitle }}</p>
                    </div>
                </div>
            </div>

            <!-- Office pickup -->
            <section class="bg-white rounded-2xl border border-emerald-200 shadow-sm overflow-hidden">
                <div class="bg-emerald-50 px-6 py-4 flex items-center gap-3 border-b border-emerald-100">
                    <i class="pi pi-building text-emerald-600 text-lg"></i>
                    <div>
                        <h2 class="font-bold text-gray-900 text-base">სონნივას ფილიალიდან გატანა</h2>
                        <p class="text-xs text-emerald-600 font-medium mt-0.5">სრულიად უფასო</p>
                    </div>
                    <span class="ml-auto text-xl font-bold text-emerald-600">0 ₾</span>
                </div>
                <div class="px-6 py-4 flex items-start gap-2 text-sm text-gray-600">
                    <i class="pi pi-map-marker text-brand-500 mt-0.5 shrink-0"></i>
                    <div class="space-y-1">
                        <p class="font-medium text-gray-800">ავჭალა, შუშის ქუჩა 38</p>
                        <p class="text-xs text-gray-400 mt-0.5">ორშაბათი–პარასკევი, 09:00–18:00</p>
                        <a href="https://maps.app.goo.gl/3YwH55CnhUUfJoYQ9" target="_blank" class="text-brand-500 underline">
                            მისამართის სანახავად დააჭირეთ ლინკს
                        </a>
                    </div>
                </div>
            </section>

            <!-- Tbilisi zone pricing -->
            <section class="space-y-4">
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center">
                        <i class="pi pi-map-marker text-blue-600"></i>
                    </div>
                    <div>
                        <h2 class="font-bold text-gray-900 text-base">მიწოდება თბილისში</h2>
                        <p class="text-xs text-gray-400">ფასი განისაზღვრება ზონის მიხედვით</p>
                    </div>
                </div>

                <div class="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 flex items-center gap-2 text-sm text-emerald-700">
                    <i class="pi pi-check-circle shrink-0"></i>
                    <span><strong>{{ TBILISI_FREE_THRESHOLD }} ₾-ზე</strong> მეტი შეკვეთისას — თბილისში მიწოდება <strong>უფასოა</strong></span>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div
                        v-for="zone in tbilisiZones"
                        :key="zone.label"
                        class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                    >
                        <div class="px-4 py-3 flex items-center justify-between border-b border-gray-100"
                             :class="{
                                 'bg-blue-50': zone.color === 'blue',
                                 'bg-indigo-50': zone.color === 'indigo',
                                 'bg-violet-50': zone.color === 'violet',
                             }"
                        >
                            <span class="font-bold text-gray-800 text-sm">{{ zone.label }}</span>
                            <span class="font-bold text-lg"
                                  :class="{
                                      'text-blue-600': zone.color === 'blue',
                                      'text-indigo-600': zone.color === 'indigo',
                                      'text-violet-600': zone.color === 'violet',
                                  }"
                            >{{ zone.price }} ₾</span>
                        </div>
                        <ul class="px-4 py-3 space-y-1">
                            <li
                                v-for="n in zone.neighborhoods"
                                :key="n"
                                class="flex items-center gap-1.5 text-sm text-gray-500"
                            >
                                <span class="w-1 h-1 rounded-full bg-gray-300 shrink-0"></span>
                                {{ n }}
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <!-- Regions rate table -->
            <section class="space-y-4">
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-xl bg-violet-50 flex items-center justify-center">
                        <i class="fa-solid fa-truck-fast text-violet-600"></i>
                    </div>
                    <div>
                        <h2 class="font-bold text-gray-900 text-base">მიწოდება რეგიონებში</h2>
                        <p class="text-xs text-gray-400">ფასი განისაზღვრება წონისა და ტიპის მიხედვით</p>
                    </div>
                </div>

                <!-- Column legend -->
                <div class="grid grid-cols-3 gap-3">
                    <div class="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3 text-center">
                        <div class="w-7 h-7 rounded-lg bg-sky-50 flex items-center justify-center mx-auto mb-1.5">
                            <i class="fa-solid fa-warehouse text-sky-500 text-sm"></i>
                        </div>
                        <p class="text-sm font-semibold text-gray-700">OnWay ფილიალი</p>
                        <p class="text-xs text-gray-400 mt-0.5">ფილიალიდან გატანა</p>
                    </div>
                    <div class="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3 text-center">
                        <div class="w-7 h-7 rounded-lg bg-violet-50 flex items-center justify-center mx-auto mb-1.5">
                            <i class="fa-solid fa-city text-violet-500 text-sm"></i>
                        </div>
                        <p class="text-sm font-semibold text-gray-700">ქალაქი/რაიონი</p>
                        <p class="text-xs text-gray-400 mt-0.5">ადგილზე მიტანა</p>
                    </div>
                    <div class="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3 text-center">
                        <div class="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center mx-auto mb-1.5">
                            <i class="fa-solid fa-house-crack text-amber-500 text-sm"></i>
                        </div>
                        <p class="text-sm font-semibold text-gray-700">სოფელი</p>
                        <p class="text-xs text-gray-400 mt-0.5">სოფელში მიტანა</p>
                    </div>
                </div>

                <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <table class="w-full text-sm">
                        <thead>
                            <tr class="bg-gray-50 border-b border-gray-100">
                                <th class="text-left px-4 py-3 font-semibold text-gray-600 text-sm">წონა</th>
                                <th class="text-center px-4 py-3 font-semibold text-sky-600 text-sm">OnWay ფილიალი</th>
                                <th class="text-center px-4 py-3 font-semibold text-violet-600 text-sm">ქალაქი/რაიონი</th>
                                <th class="text-center px-4 py-3 font-semibold text-amber-600 text-sm">სოფელი</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-50">
                            <tr
                                v-for="(rate, index) in DELIVERY_RATES"
                                :key="rate.maxKg"
                                class="hover:bg-gray-50/60 transition-colors"
                            >
                                <td class="px-4 py-2.5 text-gray-500 text-sm font-medium">{{ weightLabel(rate, index) }}</td>
                                <td class="px-4 py-2.5 text-center">
                                    <span class="font-semibold text-sky-700">{{ rate.office }} ₾</span>
                                </td>
                                <td class="px-4 py-2.5 text-center">
                                    <span class="font-semibold text-violet-700">{{ rate.region }} ₾</span>
                                </td>
                                <td class="px-4 py-2.5 text-center">
                                    <span class="font-semibold text-amber-700">{{ rate.village }} ₾</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

        </div>
    </div>
</template>
