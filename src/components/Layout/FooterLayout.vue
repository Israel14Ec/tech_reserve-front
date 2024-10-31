<template>
    <footer class="bg-white px-5 py-1 rounded-lg text-center">
        <p class=" uppercase text-gray-700 font-semibold mb-3">
            {{ getNameRole(authStore.userData.role) }}
        </p>
        <p class=" text-blue-700 font-semibold text-sm">TechReserve</p>
        <p class=" text-blue-500 text-center text-xs">Versión 1.0</p>
    </footer>
</template>

<script setup>

import { AuthStore } from '@/stores/Auth'
import { getNameRole } from '@/helpers/utils';

const authStore = AuthStore()

</script>
