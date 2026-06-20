<script setup>
import { Link, usePage, usePoll } from '@inertiajs/vue3';
import { ref, computed, watch, onMounted, onBeforeUnmount, inject } from 'vue';

const route = inject('route')
import Navbar from '@/Shared/menu/Navbar.vue';

const sidebarOpen = ref(false);
const page = usePage();

usePoll(10000, {
    only: ['unseenOrdersCount', 'unseenStockCount'],
    preserveScroll: true, preserveState: true
});

const unseenOrdersCount = computed(() => page.props.unseenOrdersCount);
const unseenStockCount  = computed(() => page.props.unseenStockCount);

function playNotificationSound() {
    new Audio('/sounds/notification-sound.wav').play().catch(() => {});
}

watch([unseenOrdersCount, unseenStockCount], ([newOrders, newStock], [oldOrders, oldStock]) => {
    if ((newOrders ?? 0) > (oldOrders ?? 0) || (newStock ?? 0) > (oldStock ?? 0)) {
        playNotificationSound();
    }
});

const menuItems = computed(() => [
    {
        name: 'Orders',
        route: 'admin.orders.index',
        icon: 'pi-shopping-cart',
        badge: unseenOrdersCount.value || null,
    },
    {
        name: 'Users',
        route: 'admin.users.index',
        icon: 'pi-users',
    },
    {
        name: 'Payments',
        route: 'admin.payments.index',
        icon: 'pi-credit-card',
    },
    {
        name: 'Stock Requests',
        route: 'admin.stock-notifications.index',
        icon: 'pi-bell',
        badge: unseenStockCount.value || null,
    },
    {
        name: 'Analytics',
        route: 'admin.analytics.index',
        icon: 'pi-chart-line',
    },
]);

</script>

<template>
    <Navbar />

    <div class="container mx-auto min-h-[calc(100vh-110px)] flex space-x-2 my-4">

        <!-- Mobile Overlay -->
        <div
            v-if="sidebarOpen"
            class="fixed inset-0 bg-black/40 z-20 md:hidden"
            @click="sidebarOpen = false"
        />

        <!-- Sidebar -->
        <aside
            :class="[
                'fixed md:static top-16 left-0 sm:min-h-[calc(100vh-110px)] min-h-[calc(100vh-80px)] z-40 w-64 bg-white border-r border-gray-200 sm:rounded-xl flex flex-col shadow-sm transition-transform duration-300 ease-in-out',
                sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
            ]"
        >
            <!-- Logo Section -->
            <div class="h-16 flex items-center px-6 border-b border-gray-200">
                <div class="flex items-center gap-3">
                    <div class="sm:w-9 w-7 sm:h-9 h-7 bg-linear-to-br from-brand-500 to-brand-600 rounded-lg flex items-center justify-center">
                        <i class="pi pi-bolt text-white text-lg"></i>
                    </div>
                    <span class="sm:text-xl font-bold text-gray-900">Admin Panel</span>
                </div>
            </div>

            <!-- Navigation Menu -->
            <nav class="flex-1 px-3 py-6 overflow-y-auto">
                <ul class="space-y-1">
                    <li v-for="item in menuItems" :key="item.route">
                        <Link
                            :href="route(item.route)"
                            @click="sidebarOpen = false"
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
                                    <span>{{ item.name }}</span>
                                </div>
                                <span
                                    v-if="item.badge"
                                    class="min-w-5 h-5 flex items-center justify-center text-xs font-bold rounded-full bg-red-500 text-white px-1"
                                >
                                    {{ item.badge }}
                                </span>
                            </div>
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>

        <!-- Main Content Area -->
        <main class="flex-1 min-w-0 flex flex-col">
            <!-- Mobile Top Bar -->
            <div class="sticky top-18 md:hidden h-10 bg-white border-b border-gray-200 rounded-xl flex justify-between items-center px-4 mx-4 shadow-sm z-30">
                <span class="ml-3 text-sm font-bold text-gray-900">Admin Panel</span>
                <button
                    @click="sidebarOpen = !sidebarOpen"
                    class="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                >
                    <i class="pi pi-bars text-lg"></i>
                </button>
            </div>

            <div class="h-full">
                <slot>
                    <div class="h-full flex flex-col items-center justify-center">
                        <h1 class="text-xl md:text-3xl text-center font-bold text-gray-800 my-4">
                            Welcome to Admin Dashboard
                        </h1>
                        <p class="text-gray-600 text-center text-sm md:text-xl mb-6">
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
