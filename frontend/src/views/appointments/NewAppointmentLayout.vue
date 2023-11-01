<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router';
import { onMounted } from 'vue';
import { useAppointmentStore } from '../../stores/appointmentsStore';

const route = useRoute();
const appointmentsStore = useAppointmentStore();

onMounted(() => {
  appointmentsStore.clearAppointment();
})
</script>

<template>
  <nav class="my-8 flex flex-col md:flex-row gap-3">
    <RouterLink
      :to="{name: 'new-appointment'}"
      class="flex-1 text-center py-2 font-bold uppercase hover:bg-blue-500 hover:text-white"
      :class="route.name == 'new-appointment' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'"
    >
      Servicios
    </RouterLink>

    <RouterLink
      :to="{name: 'appointment-details'}"
      class="flex-1 text-center py-2 font-bold uppercase hover:bg-blue-500 hover:text-white"
      :class="route.name == 'appointment-details' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'"
    >
      Resumen de reserva
    </RouterLink>
  </nav>

  <RouterView />
</template>