<script setup>
  import { useServicesStore } from '../../stores/servicesStore';
  import ServiceItem from '../../components/ServiceItem.vue'

  const serviceStore = useServicesStore();
</script>

<template>
  <h2 class="text-white font-bold text-4xl">Servicios</h2>
  <p class="text-lg text-gray-500">Seleccioná mínimo un servicio para tu turno</p>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-5 my-10">
    <ServiceItem 
      v-for="service in serviceStore.services"
      :key="service._id"
      :service="service"
    />
  </div>
</template>