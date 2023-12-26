<script setup>
    import { useUserStore } from '../../stores/userStore';
    import Loader from '../../components/Loader.vue';

    const userStore = useUserStore();
</script>

<template>
  <p class="text-white mt-5">Aquí podés administrar tus próximos turnos</p>

  <Loader v-if="userStore.loading"/>

  <div v-else>
    <p v-if="!userStore.noAppointments" class="text-red-500 mt-10 text-center text-lg">No tienes turnos próximos</p>
  </div>

  <div v-for="appointment in userStore.userAppointments">
    <p class="text-red-500">One appointment to show</p>
  </div>
</template>