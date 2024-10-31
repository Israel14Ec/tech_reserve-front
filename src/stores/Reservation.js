import { defineStore } from 'pinia'
import { ref } from 'vue'
import ReservationApi from '@/api/ReservationApi';
import { toast } from 'vue3-toastify';

export const useReservationStore = defineStore('reservations', () => {

    const loadingCreate = ref(false)
    const reservations = ref([])
    const loadingGetReservations = ref(false)

    //Valores para v-date-table-serve
    const itemsLength = ref(1)
    const perPage = ref(5)
    const currentPage = ref(1) 

    async function create (dataForm) {
        try {
            loadingCreate.value = true
            const { data } = await ReservationApi.create(dataForm)
            toast.success(data.msg)

        } catch (error) {
            toast.error(error.response.data.msg)
            throw error
        } finally {
            loadingCreate.value = false
        }
    }

    async function getReservationByUser(options) {
        try {
            currentPage.value= options.page                                
            
            loadingGetReservations.value = true
            const { data } = await ReservationApi.get({
                per_page: perPage.value,
                current_page: currentPage.value
            })            
            reservations.value = data.data
            itemsLength.value = +data.total
        
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.msg)        
        } finally {
            loadingGetReservations.value = false
        }
    }

    async function deleteReservation (id) {
        try {
            const { data } = await ReservationApi.delete(id)
            console.log(data);
            toast.success(data.msg)
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.msg)
        }
    }

    return {
        loadingCreate,
        loadingGetReservations,
        itemsLength,
        perPage,
        currentPage,
        reservations,
        create,
        getReservationByUser,
        deleteReservation
    }
})