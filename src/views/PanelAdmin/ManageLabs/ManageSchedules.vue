<template>
    <div v-if="loadComputerLabData">
        <SpinnerBlack />
    </div>
    <div v-else>

        <div class=" flex flex-col md:flex-row gap-2 items-center justify-between border-b-2">
            <div class=" flex gap-2 items-center text-gray-800" >
                <RouterLink :to="{name: 'ManageLabsAdmin'}">
                    <ChevronLeftIcon class="w-4 mr-4"/>
                </RouterLink>
                <BuildingLibraryIcon class="w-5"/>
                <h3 class=" text-lg font-medium ">Laboratorio 
                    <span class=" font-normal">{{ computerLabData.name }}</span>
                </h3>
            </div>
            <ButtonIcon class=" text-gray-800" @click="dialog = true">
                <template #icon> <PlusIcon/> </template>
                <template #name>Agregar Horario</template>
            </ButtonIcon>
        </div>
        <div class=" mt-3">
            <p class=" text-gray-600 font-medium">Capacidad de estudiantes: <span class=" font-normal">{{ computerLabData.ability }}</span></p>
            <p class=" text-gray-600 font-medium">Equipos disponibles: <span class=" font-normal">{{ computerLabData.equipment }}</span></p>
            <p class=" text-gray-600 font-medium">Ubicación: <span class=" font-normal">{{ computerLabData.location }}</span></p>
        </div>
        <div class="mt-5">
            <div v-if="computerLabData?.schedules_labs?.length > 0">
                <v-data-table 
                    :headers="headers"
                    :items="computerLabData?.schedules_labs"
                    items-per-page-text="Mostrando"
                    :items-per-page-options="itemsPerPage"
                    v-model:items-per-page="selectedItemsPerPage" 
                >
                    <template v-slot:item.start_time="{ value }">
                        <p>{{ formatHour(value) }}</p>
                    </template>
                    <template v-slot:item.end_time="{ value }">
                        <p>{{ formatHour(value) }}</p>
                    </template>
                    <template v-slot:item.is_availability="{ item }" >
                        <button :class="getColorAvailability(item.is_availability)" @click="isAvailability(item)"> 
                            {{ item.is_availability ? 'Disponible' : 'No disponible' }} 
                        </button>
                    </template>
                    <template v-slot:item.actions="{ item }">
                        <button class=" flex gap-1 items-center text-green-600 hover:text-green-500"
                            @click="updateSchedulesForm(item)"
                        >
                            <PencilIcon class="w-5"/>
                            <p>Editar</p>
                        </button>
                    </template>
                </v-data-table>
            </div>
            
            <div v-else class=" mt-10 text-center text-red-500 font-semibold">
                <p>No hay horarios ingresados</p>
            </div>
        </div>
    </div>

    <!--MODAL PARA AGREGAR HORARIO-->
    <v-dialog max-width="500" v-model="dialog">
        <v-card 
            max-width="500"
            title="Agregar horario"
        >

        <v-card-text>
            <Form class=" mt-5" :validation-schema="manageSchedulesSchema" @submit="createSchedules">
                <div class="container">
                    <label for="start_time">Hora de inicio: </label>
                    <div class="container_button ">
                        <Field type="time" name="start_time" id="start_time" />
                    </div>
                    <ErrorMessage name="start_time" class="error"/>
                </div>

                <div class="container">
                    <label for="end_time">Hora de fin: </label>
                    <div class="container_button">
                        <Field type="time" name="end_time" id="end_time" />
                    </div>
                    <ErrorMessage name="end_time" class="error"/>
                </div>

                <InputLoading :loading="false" text="Agregar"/>
            </Form>
        </v-card-text>
        </v-card>
    </v-dialog>

    <!--MODAL PARA EDITAR HORARIO-->
    <v-dialog  max-width="500" v-model="dialogEdit">
        <v-card max-width="500" title="Editar horario">
            <v-card-text>
                <Form 
                    class=" mt-5" 
                    :initial-values="dataEdit" 
                    :validation-schema="manageSchedulesSchema"
                    @submit="updateSchedules"
                >
                    <div class="container">
                        <label for="start_time">Hora de inicio: </label>
                        <div class="container_button ">
                            <Field type="time" name="start_time" id="start_time" />
                        </div>
                        <ErrorMessage name="start_time" class="error"/>
                    </div>

                    <div class="container">
                        <label for="end_time">Hora de fin: </label>
                        <div class="container_button">
                            <Field type="time" name="end_time" id="end_time" />
                        </div>
                        <ErrorMessage name="end_time" class="error"/>
                    </div>

                    <InputLoading :loading="false" text="Agregar"/>
                </Form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script setup>

import { onMounted, watch, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { RouterLink, useRoute  } from 'vue-router'
import { useComputerLabStore } from '@/stores/ComputerLab';
import { useSchedulesLabStore } from '@/stores/SchedulesLab';
import { BuildingLibraryIcon, ChevronLeftIcon, PencilIcon, PlusIcon } from '@heroicons/vue/24/solid';
import { formatHour, getColorAvailability, itemsPerPage } from '@/helpers/utils';
import {  Form, Field, ErrorMessage } from 'vee-validate'
import { manageSchedulesSchema } from '@/schemas/manageSchedules';
import SpinnerBlack from '@/components/utils/SpinnerBlack.vue';
import ButtonIcon from '@/components/utils/ButtonIcon.vue';
import InputLoading from '@/components/utils/InputLoading.vue';
import Swal from 'sweetalert2';

const route = useRoute()
const computerLab = useComputerLabStore()
const schedulesLab = useSchedulesLabStore()
const selectedItemsPerPage = ref(5)
const dialog = ref(false)
const dialogEdit = ref(false)
const dataEdit = ref({})

const { computerLabData, loadComputerLabData } = storeToRefs(computerLab)

const headers = [
    {title: 'Hora de Inicio', key:'start_time'},
    {title: 'Hora de Fin', key:'end_time'},
    {title: 'Disponibilidad', key:'is_availability'},
    {title: 'Acciones', key:'actions'}
]


const createSchedules = async (valueForm, {resetForm}) => {
    try {
        valueForm.id_computer_labs = route.params.idComputerLab
        await schedulesLab.create(valueForm)
        resetForm()
        dialog.value = false
    } catch (error) {
        console.error(error);
    }
}

const updateSchedulesForm = (value) => {
    
    value.start_time = formatHour(value.start_time);
    value.end_time =formatHour(value.end_time)
    dataEdit.value = value
    dialogEdit.value = true
}

const updateSchedules = (value) => {
    schedulesLab.update(value)
    dialogEdit.value = false
}

const isAvailability = ({id}) => {
    
    Swal.fire({
        title: 'Cambiar disponibilidad!',
        text: `Al aceptar va a cambiar la disponibilidad del horario, 
            cuando no este disponible los profesores no podrán reservar en esa hora`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        denyButtonText: 'Rechazar',
    }).then((result) => {
        if(result.isConfirmed) {
            schedulesLab.availabilitySchedulesLab(id)
        }
    })
}


onMounted( () => {
    computerLab.getComputerLabById(route.params.idComputerLab)
})

watch(() => route.path, () => {
    if(!!route.params.idComputerLab) {
        computerLab.getComputerLabById(route.params.idComputerLab)
    }
});

</script>
