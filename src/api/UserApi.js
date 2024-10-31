import api from "@/config/axios";

export default {

    create(data) {
        return api.post('/v1/user', data)
    },
    confirmAccount(email_verification_token) {
        return api.post('v1/user/confirm-account', {email_verification_token})
    }
}