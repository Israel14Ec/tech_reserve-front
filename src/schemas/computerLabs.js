import * as yup from 'yup'

export const computerLabsSchema = yup.object().shape({
    name: yup.string().required("El nombre es obligatorio"),
    ability: yup.number()
        .typeError('La habilidad debe ser un número')
        .required("El número de habilidad es obligatorio")
        .positive('La habilidad debe ser mayor que 0'),
    equipment: yup.number()
        .typeError('La cantidad de equipos debe ser un número')
        .required("La cantidad de equipos es obligatoria")
        .positive('La cantidad de equipos debe ser mayor que 0'),
    location: yup.string().required('Ingrese la locación')
});