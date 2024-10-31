import * as yup from 'yup'

export const reservationSchema = yup.object().shape({
    type_reservation: yup.string().required('Seleccione una opción')
})