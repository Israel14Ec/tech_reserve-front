import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import UserApi from '@/api/UserApi'
import { toast } from 'vue3-toastify'

export const useUserStore = defineStore('user', () => {

    const loadingAction = ref(false)
    const router = useRouter()

    async function createAccount (dataForm) {
        try {
            loadingAction.value = true
            const {data} = await UserApi.create(dataForm)
            router.push({name: 'Login'}).then(()=>  toast.success(data.msg))

        } catch (error) {
            console.error(error);
            toast.error(error.response.data.msg)
            throw error
        } finally {
            loadingAction.value = false            
        }
    }

    async function confirmAccount (token) {
        try {
            const { data } = await UserApi.confirmAccount(token)
            router.push({ name: 'Login' }).then(() =>  toast.success(data.msg));

        } catch (error) {
            console.error(error)
            toast.error(error.response.data.msg)
        }
    }

    return {
        loadingAction,
        createAccount,
        confirmAccount
    }
})