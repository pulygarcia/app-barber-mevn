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
    },
    getAppointmentById(id){
        const token = localStorage.getItem('auth_jwt');

        return api.get(`/appointments/${id}`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
    },
    updateAppointment(id, data){
        const token = localStorage.getItem('auth_jwt');

        return api.put(`/appointments/${id}`, data, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
    },
    cancelAppointment(id){
        const token = localStorage.getItem('auth_jwt');

        return api.delete(`/appointments/${id}`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
    }
}