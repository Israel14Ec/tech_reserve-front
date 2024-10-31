<template>
    <div v-if="loadComputerLabData">
        <SpinnerBlack />
    </div>
    <div v-else>
        <div class="flex flex-col md:flex-row gap-2 items-center justify-between border-b-2">
            <div class=" flex gap-2 items-center text-gray-800">
                <RouterLink :to="{ name: 'HomeTeacher' }">
                    <ChevronLeftIcon class="w-4 mr-4" />
                </RouterLink>
                <BuildingLibraryIcon class="w-5" />
                <h3 class=" text-lg font-medium ">Laboratorio
                    <span class=" font-normal">{{ computerLabData.name }}</span>
                </h3>
            </div>
        </div>
        <div class=" mt-3">
            <p class=" text-gray-600 font-medium">Capacidad de estudiantes: <span
                    class=" font-normal">{{ computerLabData.ability }}</span></p>
            <p class=" text-gray-600 font-medium">Equipos disponibles: <span
                    class=" font-normal">{{ computerLabData.equipment }}</span></p>
            <p class=" text-gray-600 font-medium">Ubicación: <span
                    class=" font-normal">{{ computerLabData.location }}</span></p>
        </div>
        <div class=" mt-5">
            <div v-if="computerLabData?.schedules_labs?.length > 0" >
                <v-data-table
                    :headers="headers"
                    :items="computerLabData?.schedules_labs"
                    :items-per-page-options="itemsPerPage"
                    v-model:items-per-page="selectedItemsPerPage" 
                    items-per-page-text="Mostrando"
                    no-data-text="No hay datos disponibles" 
                >
                    <template v-slot:item.start_time="{ value }">
                        <p>{{ formatHour(value) }}</p>
                    </template>
                    <template v-slot:item.end_time="{ value }">
                        <p>{{ formatHour(value) }}</p>
                    </template>
                    <template v-slot:item.is_availability="{ item }" >
                        <p :class="getColorAvailability(item.is_availability)"> 
                            {{ item.is_availability ? 'Disponible' : 'No disponible' }} 
                        </p>
                    </template>
                    <template v-slot:item.actions="{ item }">
                        <button class=" flex gap-1 items-center text-blue-600 hover:text-blue-500"
                            v-if="item.is_availability"
                            @click="dialogReservationAdd = true"
                        >
                            <CalendarDaysIcon class="w-5" />
                            <p>Reservar</p>
                        </button>
                    </template>
                </v-data-table>

            </div>
            <div v-else class=" mt-10 text-center text-red-500 font-semibold">
                <p>No hay horarios para este laboratorio</p>
            </div>
        </div>

        <!--MODAL PARA REALIZAR LA RESERVACIÓN-->
        <v-dialog max-width="750" v-model="dialogReservationAdd">
            <v-card max-width="750" title="Realizar reserva">
                <v-card-text>
                    <div>
                        <p class=" text-indigo-500 text-center text-lg font-medium">
                            Seleccione el dia para reservar
                        </p>
                        <div class=" flex gap-5 mt-5    ">
                            <div class=" w-1/2 overflow-x-auto">
                                <VueTailwindDatepicker
                                    i18n="es-mx"
                                    :disable-date="disableDates"
                                    :formatter="formatter"
                                    v-model="dateValue"
                                    as-single
                                    no-input
                                />
                            </div>
                            <div class=" w-1/2" >
                                <div class="mb-10">
                                    <p class=" text-gray-700 font-medium">Fecha seleccionada:</p>
                                    <p
                                        class=" text-sm"
                                        :class="[dateValue[0] ? 'text-gray-700' : 'text-red-500 font-semibold']"> 
                                     {{ dateValue[0] ? dateValue[0] : 'No selecciono fecha' }}
                                    </p>
                                </div>
                                <Form 
                                    @submit="handleSubmit"
                                    :validation-schema="reservationSchema"
                                >
                                    <div class="container">
                                        <label for="type_reservation">Tipo de reserva</label>
                                        <div class="container_button">
                                            <Field as="select"  name="type_reservation" id="type_reservation" 
                                                class=" w-full outline-none"
                                            >
                                                <option v-for="option in optionSelect" :key="option.value" :value="option.value">
                                                    {{ option.title }}
                                                </option>
                                            </Field>
                                        </div>
                                        <ErrorMessage name="type_reservation" class="error"/>
                                    </div>
                                    <InputLoading :loading="loadingCreate" text="Reservar"/>
                                </Form>
                            </div>
                        </div>
                    </div>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup>

import { onMounted, ref, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { useComputerLabStore } from '@/stores/ComputerLab';
import { AuthStore } from '@/stores/Auth';
import { useReservationStore } from '@/stores/Reservation';
import { BuildingLibraryIcon, ChevronLeftIcon, CalendarDaysIcon } from '@heroicons/vue/24/solid'
import SpinnerBlack from '@/components/utils/SpinnerBlack.vue';
import { disableDates, formatHour, formatter, getColorAvailability, itemsPerPage } from '@/helpers/utils';
import VueTailwindDatepicker from "vue-tailwind-datepicker";
import InputLoading from '@/components/utils/InputLoading.vue';
import { reservationSchema } from '@/schemas/Reservation';

const computerLab = useComputerLabStore()
const authStore = AuthStore()
const reservationStore = useReservationStore()
const route = useRoute()
const dialogReservationAdd = ref(false)
const dateValue = ref([])

const selectedItemsPerPage = ref(5)
const { computerLabData, loadComputerLabData } = storeToRefs(computerLab)
const { userData } = storeToRefs(authStore)
const { loadingCreate } = storeToRefs(reservationStore)

const headers = [
    {title: 'Hora de Inicio', key:'start_time'},
    {title: 'Hora de Fin', key:'end_time'},
    {title: 'Disponibilidad', key:'is_availability'},
    {title: 'Acciones', key:'actions'}
]

const optionSelect = [
    {value: 'classes', title: 'Clases'},
    {value: 'practices', title: 'Prácticas'},
    {value: 'events', title: 'Eventos'}
]

const handleSubmit = async (value, {resetForm }) => {
    //Validar que se haya seleccionado un dateValue
    if(dateValue.value.length === 0) {
        return
    }

    try {
        value.id_user = userData.value.id
        value.id_schedules_lab = route.params.idComputerLab
        value.reservation_date = dateValue.value[0]
        await reservationStore.create(value)
        dialogReservationAdd.value = false
        resetForm()
        dateValue.value = []

    } catch (error) {
        console.error(error);
    } 
}

onMounted(() => {
    computerLab.getComputerLabById(route.params.idComputerLab)
})

watch( () => route.path, () =>  {
    if(!!route.params.idComputerLab) {
        computerLab.getComputerLabById(route.params.idComputerLab)
    }
})


</script>