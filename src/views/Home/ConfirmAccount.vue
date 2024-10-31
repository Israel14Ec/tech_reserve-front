<template>
    <h1 class=" font-bold text-3xl text-gray-700">
        Confirma tu cuenta en
        <span class=" text-4xl text-blue-700">TechReserve</span>
    </h1>
    <p class=" mt-5 text-gray-500">Espera mientras se confirma tu cuenta ...</p>
</template>

<script setup>

import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/User';

const route = useRoute()
const userStore = useUserStore()

onMounted(() => {
    const token = route.params.email_verification_token;
    userStore.confirmAccount(token)
})

</script>
