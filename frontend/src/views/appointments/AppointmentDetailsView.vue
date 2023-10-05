<script setup>
  import {useAppointmentStore} from '../../stores/appointmentsStore';
  import SelectedService from '../../components/SelectedService.vue'
  import { formatCurrency } from '../../helpers';
  import VueTailwindDatepicker from "vue-tailwind-datepicker";
import { ref } from 'vue';

  const appointmentsStore = useAppointmentStore();

  const formatter = ref({
    date: 'DD MM YYYY',
    month: 'MMM',
  })

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

    <div class="lg:flex gap-5 lg:items-center mt-8">
      <div class="space-y-5 mt-8">
        <h3 class="text-white text-2xl font-extrabold">Seleccioná una fecha</h3>

        <VueTailwindDatepicker 
          i18n="es"
          as-single
          no-input
          :formatter="formatter"
          v-model="appointmentsStore.dateValue"
        />
      </div>

      <div class="text-white">
        Horas
      </div>

    </div>

  </div>

  <p v-else class="text-red-500 text-center bg-red-300 mt-5 font-bold py-1">No seleccionaste ningún servicio</p>

</template>