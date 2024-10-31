<template>
   <div class=" bg-white p-5 rounded-lg mt-5">
        <div class=" flex justify-between border-b-2">
            <div class=" text-gray-700 hover:text-gray-500">
                <button class="flex  gap-2 items-center" @click="toSchedulesteacher(computerLab.id)">
                    <BuildingLibraryIcon class="w-4" />
                    <p class=" font-bold text-lg"> {{ computerLab.name }} </p>
                </button>

            </div>
            <div class="relative z-50" ref="menu">
                <button @click="isVisibleMenu = !isVisibleMenu">
                    <Bars4Icon class="w-4" />
                </button>

                <div v-if="isVisibleMenu" class=" absolute right-0 bg-gray-700 rounded-sm py-2 px-3">
                    <div>
                        <Button @click="toSchedulesteacher(computerLab.id)">
                            <CalendarDaysIcon />
                            <template #title>Horarios</template>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
        <div class=" mt-4 text-sm text-gray-600 space-y-1">
            <p class="font-semibold">Capacidad de estudiantes:
                <span class=" font-normal"> {{ computerLab.ability }} </span>
            </p>
            <p class=" font-semibold">Equipos disponibles:
                <span class=" font-normal"> {{ computerLab.equipment }} </span>
            </p>
            <div>
                <p class=" font-semibold">Ubicación:
                </p>
                <p class=" font-normal"> {{ computerLab.location }} </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Bars4Icon, BuildingLibraryIcon, CalendarDaysIcon } from '@heroicons/vue/24/solid'
import Button from '@/components/utils/Button.vue'

const menu = ref(null)
const isVisibleMenu = ref(false)
const router = useRouter()

const props = defineProps({
    computerLab: {
        type: Object,
        required: true
    }
})


//Evento
const closeMenuEvent = (event) => {
    if (menu.value && !menu.value.contains(event.target)) {
        isVisibleMenu.value = false
    }
}

const toSchedulesteacher = (idComputerLab) => {
    isVisibleMenu.value = false
    router.push({name: 'SchedulesTeacher', params: {idComputerLab}})
} 

onMounted(() => {
    document.addEventListener('click', closeMenuEvent)
})

onUnmounted(() => {
    document.removeEventListener('click', closeMenuEvent)
})
</script>

