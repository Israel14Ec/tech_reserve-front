<template>
    <RouterLink 
        :to="{name: routeOption.route}"
        class="flex items-center gap-5 hover:bg-blue-100 p-2 cursor-pointer font-medium"
        :class="[isThisRoute ? 'bg-blue-50 text-blue-700': 'text-gray-600']"    
    >
        
        <!--COMPONENT RENDERIZA DINAMICAMENTE EL COMPONENTE-->
        <component :is="routeOption.icon" class="w-4 h-4" />
        <p>{{ routeOption.name }}</p>
    </RouterLink>
</template>

<script setup>

import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()

const props = defineProps({
    routeOption: {
        type: Object,
        required: true
    }
})

const isThisRoute = computed( () => route.name === props.routeOption.route)


</script>
