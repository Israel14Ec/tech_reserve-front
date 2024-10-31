import api from "@/config/axios";

export default {
    //crear reservacion
    create (data){
        return api.post('v1/reservation', data)
    },
    get(data) {
        return api.get('v1/reservation', {
            params: data
        })
    },
    delete(id) {
        return api.delete(`v1/reservation/${id}`)
    }
}