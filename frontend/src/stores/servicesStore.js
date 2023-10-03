import {ref, onMounted} from 'vue';
import {defineStore} from 'pinia';
import servicesApi from '../api/servicesApi';

export const useServicesStore = defineStore('services', () => {

    const services = ref([]);

    onMounted( async() => {
        try {
            const {data} = await servicesApi.all(); //axios return values as data
            services.value = data;
        } catch (error) {
            console.log(error);
        }
    })

    return{
        services
    }
})