import {defineStore} from 'pinia';
import { ref, onMounted, computed } from 'vue';
import {useRouter} from 'vue-router'
import authApiServices from '../api/authApiServices';
import appointmentServices from '../api/appointmentServices';

export const useUserStore = defineStore('user', () => {
    const user = ref({});
    const router = useRouter();
    const userAppointments = ref([]);
    const loading = ref(true);

    onMounted(async () => {
        try {
            const {data} = await authApiServices.auth()
            //console.log(data);
            user.value = data;

            await getUserAppointments();

        } catch (error) {
            console.log(error);
        }finally{
            loading.value = false
        }
    })

    async function getUserAppointments(){
        const {data} = await appointmentServices.getUserAppointments(user.value._id);
        //console.log(data);
        userAppointments.value = data;
    }

    const getUserName = computed(() => {
        return user.value.name ? user.value.name : '';
    })

    const closeUserSession = () => {
        localStorage.removeItem('auth_jwt');
        user.value = {};
        router.push({name: 'auth-login'});
    }

    const noAppointments = computed(() => {
        return userAppointments.value.length
    })

    return{
        user,
        getUserName,
        closeUserSession,
        userAppointments,
        noAppointments,
        loading,
        getUserAppointments
    }
})