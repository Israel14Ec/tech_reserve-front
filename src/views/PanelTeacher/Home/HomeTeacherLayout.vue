<template>
    <div class="bg-white px-4 py-2 flex justify-between border-b-2 border-gray-300">
        <h2 class=" font-medium text-xl text-gray-700">Reservar laboratorios</h2>
    </div>

    <div class=" flex flex-col md:flex-row gap-2">
        <div class="md:w-1/3 overflow-y-auto bg-gray-100 p-2">

            <div v-if="!computerLab.loadingComputerLabs"> 
                <ListLabsTeacher 
                    v-for="computer in computerLab.computerLabs" 
                    :key="computer.id" 
                    :computer-lab="computer" 
                />
            </div>
            <div v-else>
                <SpinnerBlack />
            </div>
            
        </div>

        <div class=" md:w-2/3 bg-gray-100 h-screen">
            <h2 class=" text-blue-700 my-5 text-xl text-center font-bold">Horarios</h2>
            <div class="px-5">
                <div v-if="!isRouteSchedulesLab">
                    <p class=" text-gray-400 font-medium text-center text-sm">Seleccione un laboratorio para ver los horarios</p>
                </div>
                <RouterView />
            </div>
        </div>
    </div>
</template>

<script setup>

import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router';
import { useComputerLabStore } from '@/stores/ComputerLab';
import ListLabsTeacher from '@/components/PanelTeacher/HomeTeacher/ListLabsTeacher.vue';
import SpinnerBlack from '@/components/utils/SpinnerBlack.vue';

const computerLab = useComputerLabStore()
const route = useRoute()

const isRouteSchedulesLab = computed(() => {
    const pathMatches = route.path.includes('/horarios')
    const hasId = !!route.params.idComputerLab
    
    return pathMatches && hasId
})

</script>

