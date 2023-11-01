import { ref, computed, onMounted, inject, watch } from 'vue';
import {useRouter} from 'vue-router'
import {defineStore} from 'pinia';
import appointmentServices from '../api/appointmentServices';
import {convertToIso, isoToDDMMYYYY} from '../helpers/date'
import {useUserStore} from '../stores/userStore'

export const useAppointmentStore = defineStore('appointments', () => {
    const toast = inject('toast');
    const router = useRouter();
    const userStore = useUserStore();

    const appointmentId = ref('');
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

        if(appointmentId.value){
            //console.log('updating appointment');
            //this below is for the system dont block the current hour of selected appointment for update
            appointmentsByDate.value = data.filter(appointment => appointment._id !== appointmentId.value);

            //Show as selected the hour that was already selected before
            const currentAppointment = data.filter(appointment => appointment._id === appointmentId.value)[0];
            selectedHour.value = currentAppointment.selectedHour;

        }else{
            //console.log('new appointment');
            appointmentsByDate.value = data;
        }
    })


    function setAppointmentForUpdate(appointment){
        //Show appointment data modifying the state
        services.value = appointment.services;
        dateValue.value = isoToDDMMYYYY(appointment.date);
        selectedHour.value = appointment.selectedHour;
        appointmentId.value = appointment._id;
    }

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

    async function saveAppointment(){ //This function work for create, or update an appointment
        const appointment = {
            services: services.value.map(service => service._id),  //Only need service ID, not all the object
            date: convertToIso(dateValue.value),
            totalToPay: totalToPay.value,
            selectedHour: selectedHour.value
        }
        
        if(appointmentId.value){ //If is updating...
            try {
                const {data} = await appointmentServices.updateAppointment(appointmentId.value ,appointment);

                toast.open({
                    message: data.msg,
                    type: 'success'
                })

            } catch (error) {
                console.log(error);
            }

        }else{ //if is creating new...
            try {
                const {data} = await appointmentServices.createAppointment(appointment);
                //console.log(data.msg);
                toast.open({
                    message: data.msg,
                    type: 'success'
                })
    
            } catch (error) {
                console.log(error);
            }
        }

        clearAppointment();

        userStore.getUserAppointments(); //avoid have to reload page for can see the changes

        router.push({name: 'user-appointments'});
    }

    const clearAppointment = () => {
        services.value = [];
        dateValue.value = '';
        selectedHour.value = '';
        appointmentId.value = '';
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
        setAppointmentForUpdate,
        onSelectedHour,
        onServiceSelected,
        saveAppointment,
        isServiceSelected,
        totalToPay,
        isValidConfirmation,
        isDateSelected,
        disableHour,
        clearAppointment
    }
})