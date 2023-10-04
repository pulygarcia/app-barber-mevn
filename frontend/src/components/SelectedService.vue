<script setup>
    import { formatCurrency } from '../helpers';
    import { useAppointmentStore } from '../stores/appointmentsStore';

    const appointmentsStore = useAppointmentStore();

    defineProps({
        service:{
            type: Object
        }
    })
</script>

<template>
  <div class="bg-gray-600 border border-blue-500 rounded-lg p-4 flex justify-between items-center">
    <div>
        <p class="font-bold text-lg text-white">{{ service.name }}</p>
        <p class="font-bold text-lg text-blue-500 mt-4">{{ formatCurrency(service.price) }}</p>
    </div>

    <button
        type="button"
        class="inline-flex items-center rounded-md bg-red-600 text-white text-sm font-bold shadow-sm px-3 py-2 hover:bg-red-700 transition"
        @click="appointmentsStore.onServiceSelected(service)"
    >
        Eliminar
    </button>
  </div>
</template>