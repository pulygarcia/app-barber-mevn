<script setup>
  import { useAppointmentStore } from '../stores/appointmentsStore';
  import { formatCurrency } from '../helpers';

  const appointmentsStore = useAppointmentStore();

    defineProps({
        service:{
            type: Object
        }
    })
</script>

<template>
  <div 
    class="p-4 rounded-lg cursor-pointer"
    :class="appointmentsStore.isServiceSelected(service._id) ? 'bg-gray-600 border border-blue-500' : 'bg-gray-800'"
    @click="appointmentsStore.onServiceSelected(service)"
  >
    <p class="font-bold text-xl text-white">{{ service.name }}</p>
    <p class="font-extrabold text-xl text-blue-500 mt-4">{{ formatCurrency(service.price) }}</p>
  </div>
</template>