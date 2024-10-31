import api from '@/config/axios'

export default {

    //crear 
    create(data){
        return api.post('v1/schedules_lab', data)
    },
    update(data, id) {
        return api.patch(`v1/schedules_lab/${id}`, data)
    },
    availability(id) {
        return api.patch(`v1/schedules_lab/availability/${id}`)
    }
}