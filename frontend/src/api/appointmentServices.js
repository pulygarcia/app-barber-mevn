import api from "../lib/axios";

export default{
    createAppointment(appointment){
        const token = localStorage.getItem('auth_jwt');

        return api.post('/appointments', appointment, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
    }
}