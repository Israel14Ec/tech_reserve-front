import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import ComputerLabApi from '@/api/ComputerLabApi'
import { toast } from 'vue3-toastify'

export const useComputerLabStore = defineStore('computerLab', () => {
    
    const computerLabs = ref({})
    const loadingComputerLabs = ref(false)
    
    const computerLabData = ref({})
    const loadComputerLabData = ref(false)

    const router = useRouter()

    onMounted( () => {
        getComputerLab()
    })

    async function create (dataForm) {
        try {
            const { data } = await  ComputerLabApi.create(dataForm)
            computerLabs.value.push(data.data)
            toast.success(data.msg)

        } catch (error) {
            console.error(error)
        }
    }

    async function getComputerLab() {
        try {
            loadingComputerLabs.value = true
            const { data } = await ComputerLabApi.getAll()
            computerLabs.value = data
            
        } catch (error) {
            console.error(error)
            
        } finally {
            loadingComputerLabs.value = false
        }
    }

    async function getComputerLabById(id) {
        try {
            loadComputerLabData.value = true
            const { data } = await ComputerLabApi.getById(id)
            computerLabData.value = data            
        } catch (error) {
            toast.error(error.response.data.msg)
            console.error(error)
            router.push({name: 'ManageLabsAdmin'})
        } finally {
            loadComputerLabData.value = false
        }
    }

    async function updateComputerLab({id, ...values}) {
        try {
            const { data } = await ComputerLabApi.update(id, values)
            toast.success(data.msg)

            const idUpdate = computerLabs.value.findIndex( computer => computer.id === id)
            if(idUpdate !== -1) {
                computerLabs.value[idUpdate] = {id, ...values}
            }

        } catch (error) {
            console.error(error)
            toast.error(error.response.data.msg)
        }
    }

    async function deleteComputerLab (id) {
        try {
            const { data } = await ComputerLabApi.deleteSoft(id)
            toast.success(data.msg)
            computerLabs.value = computerLabs.value.filter( computer => computer.id !== id)
            
        } catch (error) {
            console.error(error)
            toast.error(error.response.data.msg)
        }
    }

    return {
        computerLabs,
        loadingComputerLabs,
        computerLabData,
        loadComputerLabData,
        create,
        getComputerLab,
        getComputerLabById,
        updateComputerLab,
        deleteComputerLab
    }
})