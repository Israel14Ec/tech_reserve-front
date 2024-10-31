import { useRouter } from 'vue-router'
import AuthApi from '@/api/AuthApi'
import { getURLRole } from '@/helpers/utils';
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { toast } from 'vue3-toastify';


export const AuthStore = defineStore('auths', () => {
    
    const userData = ref({})  
    const router = useRouter()

    async function login(loginData) {
        try {
            const { data } = await AuthApi.login(loginData);
            localStorage.setItem('AUTH_TOKEN', data.auth_token) //Guardar token en localStorage
            router.push({name: getURLRole(data.data.role)}) //Redirigir segun el rol        

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.msg)
            throw error
        }
    }

    //Obtener pefil del usuario
    async function getProfile() {
        try {
            const { data }= await AuthApi.getProfile()
            userData.value = data.data
            
        } catch (error) {
            console.error(error)
        }
    }

    //Cerrar la sesión
    async function logout() {
        try {
            const { data } = await AuthApi.logout()
            //Eliminar el token
            localStorage.removeItem('AUTH_TOKEN')
            userData.value = {}
            router.push({name: 'Login'}).then(() => toast.success(data.msg))

        } catch (error) {
            console.error(error)
        }
    }

    
    return {
        userData,  
        login,
        getProfile,
        logout
    };
});
