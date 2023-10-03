<script setup>
  import { useAppointmentStore } from '../stores/appointmentsStore';

  const appointmentsStore = useAppointmentStore();

    defineProps({
        service:{
            type: Object
        }
    })
</script>

<template>
  <div 
    class="bg-gray-800 p-4 rounded-lg cursor-pointer"
    @click="appointmentsStore.isServiceSelected(service)"
  >
    <p class="font-bold text-xl text-white">{{ service.name }}</p>
    <p class="font-extrabold text-xl text-blue-500 mt-4">${{ service.price }}</p>
  </div>
</template>