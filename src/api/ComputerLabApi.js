import api from "@/config/axios";

export default {
    create(data) {
        return api.post('v1/computer_lab', data)
    },
    getAll() {
        return api.get('v1/computer_lab')
    },
    getById(id) {
        return api.get(`v1/computer_lab/${id}`)
    },
    update(id, data) {
        return api.put(`v1/computer_lab/${id}`, data)
    },
    deleteSoft(id) {
        return api.delete(`v1/computer_lab/soft/${id}`)
    }
}