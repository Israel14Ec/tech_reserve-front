export const itemsPerPage =[
    5, 10,15, -1
]

//Obtener el nombre de la ruta del rol
export const getURLRole = (role) => {

    switch(role){
        case 'admin': 
            return 'HomeAdmin'
        
        case 'teacher': 
            return 'TeacherLayout'
        
        default: return 'Login'
    } 
}

//Obtiene el nombre del rol
export const getNameRole = (role) => {

    switch(role) {
        case 'admin':
            return 'Administrador'
        case 'teacher':
            return 'Profesor'
        default: return 'Ninguno'
    }
}

//Obtiene la primera letra
export const getFirstLetter = (str) => {
    return str ? str.charAt().toUpperCase() : ''
}

//Formatea la hora 
export const formatHour = (hour) => {
    return hour.slice(0, 5)
}

//Color para la disponibilidad 
export const getColorAvailability = (value) => {
    if(value) {
        return 'text-green-600 bg-green-100 px-2 py-1 rounded-xl text-sm inline-block font-medium'
    }
    return 'text-red-600 bg-red-100 px-2 py-1 rounded-xl text-sm inline-block font-medium'
}

//Formato para VueTailwindDatepicker 
export const formatter = {
    date: "YYYY-MM-DD",
    month: "MMMM"
}

//Deshabilitar fines de semana y fechas anteriores a la actual
export const disableDates = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Establecer el tiempo de hoy a medianoche
    const day = date.getDay();

    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);

    // Deshabilitar si es domingo (0), sábado (6) o si la fecha es anterior a hoy
    return day === 0 || day === 6 || selectedDate < today;
};


//Formatear tipo de reservación
export const formatTypeReservation = (value) => {

    const reservation = {
        classes: 'Clase',
        practices: 'Práctica',
        events: 'Evento'
    }

    return reservation[value] || 'No definido'
}

//Formatear estado
export const formatStatus = (value) => {

    const status = {
        requested: 'Solicitado',
        confirmed: 'Confirmado',
        rejected: 'Rechazado',
    }

    return status[value] || 'No definido'
}