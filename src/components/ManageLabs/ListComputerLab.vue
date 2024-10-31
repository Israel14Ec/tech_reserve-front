<template>
    <div class=" bg-white p-5 rounded-lg mt-5">
        <div class=" flex justify-between border-b-2">
            <div class=" text-gray-700 hover:text-gray-500">
                <button @click="schedulesSubmit(computerLab.id)" class="flex  gap-2 items-center">
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
                        <Button @click="schedulesSubmit(computerLab.id)">
                            <CalendarDaysIcon />
                            <template #title>Horarios</template>
                        </Button>
                 
                        <Button @click="dialogEdit = true">
                            <PencilIcon />
                            <template #title>Editar</template>
                        </Button>
                        <Button @click="deleteSubmit(computerLab.id)">
                            <XMarkIcon />
                            <template #title>Eliminar</template>
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

    <!--MODAL PARA EDITAR-->
    <v-dialog max-width="500" v-model="dialogEdit">
        <v-card title="Editar laboratorio" max-width="500">
            <v-card-text>
                <Form 
                    class=" mt-5" :validation-schema="computerLabsSchema" :initial-values="computerLab"
                    @submit="updateSubmit"    
                >
                    <div class="container">
                        <label for="name">Nombre: </label>
                        <div class="container_button ">
                            <BuildingOfficeIcon class="w-5 mr-2" />
                            <Field type="text" placeholder="Ingrese el nombre de la librería" name="name" id="name" />
                        </div>
                        <ErrorMessage name="name" class="error"/>
                    </div>

                    <div class="container">
                        <label for="ability">Capacidad de estudiantes: </label>
                        <div class="container_button ">
                            <UserGroupIcon class="w-5 mr-2" />
                            <Field type="number" placeholder="Ingrese la capacidad de estudiantes" name="ability" id="ability" />
                        </div>
                        <ErrorMessage name="ability" class="error"/>
                    </div>

                    <div class="container">
                        <label for="equipment">Equipos disponibles: </label>
                        <div class="container_button ">
                            <ComputerDesktopIcon class="w-5 mr-2" />
                            <Field type="number" placeholder="Ingrese la cantidad de equipos" name="equipment" id="equipment" />
                        </div>
                        <ErrorMessage name="equipment" class="error"/>
                    </div>

                    <div class="container">
                        <label for="location">Ubicación: </label>
                        <div class="container_button ">
                            <MapPinIcon class="w-5 mr-2" />
                            <Field as="textarea" class="w-full outline-none" placeholder="Ingrese la cantidad de equipos" name="location" id="location" />
                        </div>
                        <ErrorMessage name="location" class="error"/>
                    </div>
                    <InputLoading :loading="false" text="Guardar"/>
                </Form>
            </v-card-text>
        </v-card>
    </v-dialog>

</template>

<script setup>

import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Form, ErrorMessage, Field } from 'vee-validate'
import { useComputerLabStore } from '@/stores/ComputerLab'
import { Bars4Icon, BuildingLibraryIcon, CalendarDaysIcon, PencilIcon, XMarkIcon } from '@heroicons/vue/24/solid'
import { BuildingOfficeIcon, ComputerDesktopIcon, MapPinIcon, UserGroupIcon } from '@heroicons/vue/24/solid';
import Button from '@/components/utils/Button.vue'
import { computerLabsSchema } from '@/schemas/computerLabs'
import InputLoading from '../utils/InputLoading.vue';

const menu = ref(null)
const isVisibleMenu = ref(false)
const dialogEdit = ref(false)
const computerLabStore = useComputerLabStore()
const router = useRouter()

const props = defineProps({
    computerLab: {
        type: Object,
        required: true
    }
})


//Horarios
const schedulesSubmit = (idComputerLab) => {
    isVisibleMenu.value = false
    router.push({name: 'ManageSchedules', params: {idComputerLab}})
}   


//Editar
const updateSubmit = (dataForm, {resetForm}) => {
    resetForm()
    computerLabStore.updateComputerLab(dataForm)
    isVisibleMenu.value = false
    dialogEdit.value = false
    
}

//Eliminar 
const deleteSubmit = (id) => {
    computerLabStore.deleteComputerLab(id)
    isVisibleMenu.value = false
}

//Evento
const closeMenuEvent = (event) => {
    if (menu.value && !menu.value.contains(event.target)) {
        isVisibleMenu.value = false
    }
}

onMounted(() => {
    document.addEventListener('click', closeMenuEvent)
})

onUnmounted(() => {
    document.removeEventListener('click', closeMenuEvent)
})

</script>
