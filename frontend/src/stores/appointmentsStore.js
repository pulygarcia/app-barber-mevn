import {defineStore} from 'pinia';

export const useAppointmentStore = defineStore('appointments', () => {

    function isServiceSelected(service){
        console.log(service);
    }

    return{
        isServiceSelected
    }
})