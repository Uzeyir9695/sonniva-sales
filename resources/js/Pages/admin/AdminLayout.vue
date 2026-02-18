<script setup>
import {Link, router, usePage, usePoll} from '@inertiajs/vue3';
import {computed, onMounted} from "vue";
import {useToast} from "primevue/usetoast";

const toast = useToast();
const page = usePage();
const invoicesCount = computed(() => page.props.invoicesCount);
const unseenInvoices = computed(() => page.props.unseenInvoices);
const salesCount = computed(() => page.props.salesCount);
const unseenSales = computed(() => page.props.unseenSales);

const menuItems = [
    {
        name: 'Invoices',
        route: 'admin.invoices.index',
        icon: 'pi-file'
    },
    {
        name: 'Sales',
        route: 'admin.sales.index',
        icon: 'pi-cart-plus'
    },
    {
        name: 'Ready Orders',
        route: 'admin.ready-orders',
        icon: 'pi-truck'
    },
    {
        name: 'Users',
        route: 'admin.users.index',
        icon: 'pi-users'
    },
    {
        name: 'Manage Items',
        route: 'admin.items.index',
        icon: 'pi-box'
    },
    {
       name: 'Analytics & Reports',
       route: 'admin.reports.index',
       icon: 'pi-chart-bar'
    },
    // {
    //    name: 'Scanner',
    //    route: 'scanner.show',
    //    icon: 'pi-qrcode'
    // },
];

usePoll(10000, {
    only: ['unseenInvoices', 'unseenSales'],   // fetch ONLY these props
    preserveScroll: true,
    preserveState: true,
})
</script>

<template>
    <div class="flex bg-gray-50">
        <!-- Sidebar -->
        <aside class="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm">
            <!-- Logo Section -->
            <div class="h-16 flex items-center px-6 border-b border-gray-200">
                <div class="flex items-center gap-3">
                    <div class="w-9 h-9 bg-gradient-to-br from-brand-500 to-brand-600 rounded-lg flex items-center justify-center">
                        <i class="pi pi-bolt text-white text-lg"></i>
                    </div>
                    <span class="text-xl font-bold text-gray-900">Admin Panel</span>
                </div>
            </div>

            <!-- Navigation Menu -->
            <nav class="flex-1 px-3 py-6 overflow-y-auto">
                <ul class="space-y-1">
                    <li v-for="item in menuItems" :key="item.route">
                        <Link
                            :href="route(item.route)"
                            :class="[
                                'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200',
                                  route().current(item.route)
                                  ? 'bg-green-100 text-green-700 shadow-sm'
                                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                              ]"
                        >
                            <div class="flex w-full items-center justify-between">
                                <div class="inline-flex gap-2">
                                    <i :class="['pi text-lg', item.icon, route().current(item.route) ? 'text-green-600' : 'text-gray-500']"></i>
                                    <span class="">{{ item.name }}</span>
                                </div>

                                <span v-if="unseenInvoices > 0 && item.name === 'Invoices'" class="font-bold bg-red- 600 text-black px-2 py-0.5 rounded-md text-xs">{{unseenInvoices}}</span>
                                <span v-if="unseenSales > 0 && item.name === 'Sales'" class="flex items-center justify-center font-bold text-black w-5 h-5 p-2 rounded-full text-xs">{{unseenSales}}</span>
                            </div>
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>

        <!-- Main Content Area -->
        <main class="flex-1 overflow-auto">
            <div class="h-full">
                <slot>
                    <!-- Default content if no slot provided -->
                    <div class="h-full flex flex-col items-center justify-center">
                        <h1 class="text-3xl font-bold text-gray-800 mb-4">
                            Welcome to Admin Dashboard
                        </h1>
                        <p class="text-gray-600 text-lg md:text-xl mb-6">
                            Here you can manage frames, orders, users, and settings efficiently.
                        </p>
                    </div>
                </slot>
            </div>
        </main>
    </div>
</template>

<style scoped>

</style>
