import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useComputerLabStore } from '@/stores/ComputerLab'
import SchedulesLabApi from '@/api/SchedulesLabApi'
import { toast } from 'vue3-toastify'

export const useSchedulesLabStore = defineStore('schedulesLab', () => {
    
    const computerLab = useComputerLabStore()
    const vector = []

    async function create ( dataForm ) {
        try {
            const { data } = await SchedulesLabApi.create( dataForm )
            toast.success(data.msg)
                // Verificar si `schedules_labs` está inicializado
            if (computerLab.computerLabData?.schedules_labs) {
                computerLab.computerLabData.schedules_labs.push(data.data)
            } else {
                // Inicializar si no existe
                computerLab.computerLabData.schedules_labs = [data.data]
            }
        } catch (error) {
            toast.error(error.response.data.msg)
            throw error
        }
    }

    async function update ({id, ...dataForm}) {
        try {
            const { data } = await SchedulesLabApi.update(dataForm, id)
            toast.success(data.msg)
            //Actualizar el vector
            const index = computerLab.computerLabData.schedules_labs.findIndex( schedules => schedules.id === id)
            if(index !== -1){
                computerLab.computerLabData.schedules_labs[index] = {id, ...dataForm}
            }
            
        } catch (error) {
            toast.error(error.response.data.msg)
            throw error
        }
    }

    async function availabilitySchedulesLab(id) {
        try {
            const { data } = await SchedulesLabApi.availability(id)
            toast.success(data.msg)

            const index = computerLab.computerLabData.schedules_labs.findIndex( schedules => schedules.id === id)
            if(index !== -1) {
                computerLab.computerLabData.schedules_labs[index].is_availability = data.data.is_availability
            }

        } catch (error) {
            console.error(error)
            toast.error(error.response.data.msg)
        }
    }

    return {
        create,
        update,
        availabilitySchedulesLab
    }
})