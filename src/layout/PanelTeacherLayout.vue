<template>
    <header class="bg-white px-5 py-2 w-full fixed top-0">
        <HeaderLayout 
            :is-large-window-visible="isLargeWindowVisible"
            :route-options="routeOptions"
            @is-blur-active="handleBlurActive"
        />
    </header>

    <div class="flex gap-2">
        <aside v-if="isLargeWindowVisible" class="p-5 w-1/5 flex flex-col fixed left-0 mt-15">
            <div class="rounded-md flex-grow" >
                <div class=" bg-white rounded-lg py-5 min-h-96 flex-grow">
                    <div class="w-full xl:w-4/5 mx-auto">
                        <IconLink v-for="option in routeOptions" :key="option.id" :route-option="option" />
                    </div>
                </div>
            </div>
            <FooterLayout />
                
        </aside>
        <main 
            class="overflow-y-auto mt-20 px-5 flex-1 xl:ml-72"
            :class="{ ' blur-sm shadow-sm -z-50': applyBlur }"      
        >
            <RouterView />
        </main>
    </div>
</template>

<script setup>

import { ref, onUnmounted, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { ClipboardDocumentIcon, HomeIcon } from '@heroicons/vue/24/solid'
import HeaderLayout from '@/components/Layout/HeaderLayout.vue';
import IconLink from '@/components/utils/IconLink.vue';
import FooterLayout from '@/components/Layout/FooterLayout.vue';


const isLargeWindowVisible = ref(true)
const applyBlur = ref(false)
const routeOptions = [
    { id: 1, name: 'Inicio', icon: HomeIcon, route: 'HomeTeacher' },
    { id: 2, name: 'Reservas', icon: ClipboardDocumentIcon, route: 'HistoryReservationTeacher'}
]

const mediaQuery = window.matchMedia('(min-width: 1280px)');
const updateVisibility = () => isLargeWindowVisible.value = mediaQuery.matches;

onMounted(() => {
    updateVisibility(); //Actualiza cuando el componente se monta
    mediaQuery.addEventListener('change', updateVisibility);
})

onUnmounted( () => {
    mediaQuery.removeEventListener('change', updateVisibility);
})


const handleBlurActive = (isBlurActive) => {
  applyBlur.value = isBlurActive;
};

</script>