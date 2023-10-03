import {ref, onMounted} from 'vue';
import {defineStore} from 'pinia';
import servicesApi from '../api/servicesApi';

export const useServicesStore = defineStore('services', () => {

    onMounted( async() => {
        try {
            const {data} = await servicesApi.all();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    })

    return{

    }
})