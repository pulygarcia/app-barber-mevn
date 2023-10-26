import { ref, computed, onMounted, inject, watch } from 'vue';
import {useRouter} from 'vue-router'
import {defineStore} from 'pinia';
import appointmentServices from '../api/appointmentServices';
import {convertToIso} from '../helpers/date'

export const useAppointmentStore = defineStore('appointments', () => {
    const toast = inject('toast');
    const router = useRouter();

    const services = ref([]);
    const dateValue = ref('');
    const hours = ref([]);
    const selectedHour = ref('');
    const appointmentsByDate = ref([]);

    onMounted(() => {  //Available hours to select
        const startHour = 10;
        const finishHour = 22;

        for(let hour = startHour; hour <= finishHour; hour++){
            hours.value.push(hour + ':00');  //10:00, 11:00, 12:00 . . . 
        }
    })

    watch(dateValue, async () => {
        selectedHour.value = '';

        if(dateValue.value === ''){ //This is because one time you confirm an appointment, date value is reseted (in createAppointment below) and watch is runned again with no value;
            return;
        }

        const {data} = await appointmentServices.getAppointmentsByDate(dateValue.value);
        //console.log(data);
        appointmentsByDate.value = data;
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

    async function createAppointment(){
        const appointment = {
            services: services.value.map(service => service._id),  //Only need service ID, not all the object
            date: convertToIso(dateValue.value),
            totalToPay: totalToPay.value,
            selectedHour: selectedHour.value
        }
        //console.log(appointment);
        
        try {
            const {data} = await appointmentServices.createAppointment(appointment);
            //console.log(data.msg);
            toast.open({
                message: data.msg,
                type: 'success'
            })

            //reset
            services.value = [];
            dateValue.value = '';
            selectedHour.value = '';

            router.push({name: 'user-appointments'});

        } catch (error) {
            console.log(error);
        }
    }

    const isServiceSelected = computed(() => {
        //Use for add dinamic classes in the component
        return (id) => services.value.some(selectedService => selectedService._id === id)
    })

    const totalToPay = computed(() => {
        return services.value.reduce((total, service) => total + service.price, 0);
    }) 

    const onSelectedHour = (hour) => {
        selectedHour.value = hour;
    }
    
    const isValidConfirmation = computed(() => {
        return services.value.length && dateValue.value.length && selectedHour.value.length;
    })
    
    const isDateSelected = computed(() => {
        return dateValue.value ? true : false;
    })
    
    const disableHour = computed(() => {
        return (hour) => {
            return appointmentsByDate.value.find(appointment => appointment.selectedHour === hour);
        }
    })

    return{
        services,
        dateValue,
        hours,
        selectedHour,
        onSelectedHour,
        onServiceSelected,
        createAppointment,
        isServiceSelected,
        totalToPay,
        isValidConfirmation,
        isDateSelected,
        disableHour
    }
})