<script setup>
  import {useUserStore} from '../../stores/userStore'
  import Appointment from '../../components/Appointment.vue';

  const userStore = useUserStore();
</script>

<template>
  <h2 class="text-white text-center mt-10 text-4xl">Turnos reservados</h2>
  <p class="text-white text-center">Aquí podés administrar y visualizar tus turnos</p>

  <p v-if="userStore.loading" class="text-white text-center mt-10">Cargando turnos...</p>

  <div v-else>
    <div v-if="userStore.noAppointments" class="mt-10 space-y-5">
      <Appointment
      v-for="appointment in userStore.userAppointments"
      :key="appointment._id"
      :appointment="appointment"
      />
    </div>
    <p v-else class="text-red-500 text-center mt-10">Aún no tenés turnos reservados</p>
  </div>
</template>