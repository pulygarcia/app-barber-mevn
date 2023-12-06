import api from "../lib/axios";

export default{
    register(data){
        return api.post('/auth/register', data);
    },
    verify(token){
        return api.get(`/auth/verify/${token}`);
    },
    login(data){
        return api.post('/auth/login/', data);
    },
    auth(){
        const token = localStorage.getItem('auth_jwt');
        return api.get('/auth/user', {
            headers: {
                Authorization: `Bearer ${token}`  //Check why is 'Bearer' here, in back middleware.
            }
        });
    },
    forgotPassword(data){
        return api.post('/auth/forgot-password', data);
    }
}