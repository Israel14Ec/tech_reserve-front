<template>
    <div class="bg-white px-4 py-2 flex justify-between border-b-2 border-gray-300">
        <h2 class=" font-medium text-xl text-gray-700">Mis reservas</h2>
    </div>

    <div class=" bg-white p-2">
        <v-data-table-server
            v-model:items-per-page="reservationStore.perPage"
            :items-per-page-options="itemsPerPage"
            @update:options="reservationStore.getReservationByUser"
            :loading="reservationStore.loadingGetReservations"
            :items="reservationStore.reservations"
            :items-length="reservationStore.itemsLength"
            :headers="headers"
            items-per-page-text="Mostrando"
            no-data-text="No hay datos disponibles" 
        >
            <template v-slot:item.type_reservation="{value}">
                <p>{{ formatTypeReservation(value)}}</p>
            </template>

            <template v-slot:item.status="{value}">
                <p>{{ formatStatus(value)}}</p>
            </template>
            <template v-slot:items.start_time="{value}">
                <p>{{ formatHour(value) }}</p>
            </template>
            <template v-slot:item.hour="{item}">
                <p>{{ `${formatHour(item.start_time)} - ${formatHour(item.end_time)}`}}</p>
            </template>

            <template v-slot:item.actions="{ item }">
                <div class=" flex flex-col gap-1 my-2">
                    <ButtonTable class=" text-green-500 hover:text-green-400">
                        <template #icon> <PencilIcon/> </template>
                        <template #text>Modificar</template>    
                    </ButtonTable>
                    
                    <ButtonTable class=" text-red-500 hover:text-red-400"
                        @click="reservationStore.deleteReservation(item.id_reservation)"
                    >
                        <template #icon><XCircleIcon/></template>
                        <template #text>Eliminar</template>
                    </ButtonTable>
                </div>
            </template>

        </v-data-table-server>
    </div>
</template>

<script setup>
import ButtonTable from '@/components/utils/ButtonTable.vue';
import { formatHour, formatStatus, formatTypeReservation, itemsPerPage } from '@/helpers/utils';
import { useReservationStore } from '@/stores/Reservation';
import { PencilIcon, XCircleIcon, XMarkIcon } from '@heroicons/vue/24/solid'

const reservationStore = useReservationStore()

const headers = [
    { title: 'Laboratorio', key: 'name_lab'},
    { title: 'Tipo de reservación', key: 'type_reservation'},
    { title: 'Estado', key:'status'},
    { title: 'Fecha', key: 'reservation_date'},
    { title: 'Horario', key:'hour'},
    { title: 'Acciones', key: 'actions'}
]

</script>