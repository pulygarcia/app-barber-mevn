<script setup>
  import {useAppointmentStore} from '../../stores/appointmentsStore';
  import SelectedService from '../../components/SelectedService.vue'
import { formatCurrency } from '../../helpers';

  const appointmentsStore = useAppointmentStore();
</script>

<template>
  <h2 class="text-white text-3xl font-extrabold">Resumen del Turno</h2>
  <p class="text-gray-500 mt-2">Verificá si todo está correcto y confirmá tu turno</p>

  <h3 class="text-blue-500 text-2xl font-extrabold mt-5">Servicios seleccionados</h3>

  <div v-if="appointmentsStore.services.length > 0" class="mt-5 space-y-4">
    <SelectedService 
      v-for="service in appointmentsStore.services"
      :key="service._id"
      :service="service"
    />

    <h3 class="text-white text-2xl font-extrabold mt-5 text-right">Total a pagar: <span class="text-blue-500">{{ formatCurrency(appointmentsStore.totalToPay) }}</span></h3>

  </div>

  <p v-else class="text-red-500 text-center bg-red-300 mt-5 font-bold py-1">No seleccionaste ningún servicio</p>

</template>