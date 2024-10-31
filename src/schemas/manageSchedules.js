import * as yup from 'yup';

export const manageSchedulesSchema = yup.object().shape({
    start_time: yup
        .string()
        .required('La hora de inicio es obligatoria')
        .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/, 'Formato de hora inválido (HH:mm)'), // Valida formato 24 horas
    end_time: yup
        .string()
        .required('La hora de finalización es obligatoria')
        .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/, 'Formato de hora inválido (HH:mm)')
        .test('is-greater', 'La hora de finalización debe ser mayor que la hora de inicio', function(value) {
            const { start_time } = this.parent;
            return value > start_time;  // Verifica si end_time es mayor que start_time
        }),
});
