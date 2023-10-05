import { ref, computed, onMounted } from 'vue';
import {defineStore} from 'pinia';

export const useAppointmentStore = defineStore('appointments', () => {

    const services = ref([]);
    const dateValue = ref('');
    const hours = ref([]);

    onMounted(() => {  //Available hours to select
        const startHour = 10;
        const finishHour = 22;

        for(let hour = startHour; hour <= finishHour; hour++){
            hours.value.push(hour + ':00');  //10:00, 11:00, 12:00 . . . 
        }
    })

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
        dateValue,
        hours,
        onServiceSelected,
        isServiceSelected,
        totalToPay
    }
})