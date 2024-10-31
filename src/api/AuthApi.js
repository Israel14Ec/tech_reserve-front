import api from "@/config/axios";

export default {

    login(data) {
        return api.post('v1/auth', data)
    },
    //Obtener perfil
    getProfile() {
        return api.get('v1/auth')
    },
    //Cerrar sesión
    logout() {
        return api.delete('v1/auth')
    }
    
}