import api from "../lib/axios";

export default{
    createAppointment(appointment){
        const token = localStorage.getItem('auth_jwt');

        return api.post('/appointments', appointment, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
    },
    getAppointmentsByDate(date){
        const token = localStorage.getItem('auth_jwt');

        return api.get(`/appointments?date=${date}`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
    },
    getUserAppointments(user){
        const token = localStorage.getItem('auth_jwt');

        return api.get(`/users/${user}/appointments`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
    }
}