import {defineStore} from 'pinia';
import { ref, onMounted, computed } from 'vue';
import {useRouter} from 'vue-router'
import authApiServices from '../api/authApiServices';

export const useUserStore = defineStore('user', () => {
    const user = ref({});
    const router = useRouter();

    onMounted(async () => {
        try {
            const {data} = await authApiServices.auth()
            //console.log(data);
            user.value = data;

        } catch (error) {
            console.log(error);
        }
    })

    const getUserName = computed(() => {
        return user.value.name ? user.value.name : '';
    })

    const closeUserSession = () => {
        localStorage.removeItem('auth_jwt');
        user.value = {};
        router.push({name: 'auth-login'});
    }

    return{
        user,
        getUserName,
        closeUserSession
    }
})