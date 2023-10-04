import { ref, computed } from 'vue';
import {defineStore} from 'pinia';

export const useAppointmentStore = defineStore('appointments', () => {

    const services = ref([]);

    function onServiceSelected(service){
        //Avoid duplicates
        if(services.value.some(selectedService => selectedService._id === service._id)){
            services.value = services.value.filter(selectedServices => selectedServices._id !== service._id);
        }else{
            //max quantity for select
            if(services.value.length == 2){
                alert('El máximo es 2 servicios por turno');
                return;
            }
            services.value.push(service);
        }
    }

    const isServiceSelected = computed(() => {
        //Use for add dinamic classes in the component
        return (id) => services.value.some(selectedService => selectedService._id === id)
    })

    const totalToPay = computed(() => {
        return services.value.reduce((total, service) => total + service.price, 0);
    })

    return{
        services,
        onServiceSelected,
        isServiceSelected,
        totalToPay
    }
})