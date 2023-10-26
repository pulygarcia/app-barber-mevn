<script setup>
    import {isoToString} from '../helpers/date'
    import {formatCurrency} from '../helpers/index'

    defineProps({
        appointment:{
            type: Object
        }
    })
</script>

<template>
  <article class="bg-white rounded-lg p-3">
    <p class="text-gray-600 font-bold">Fecha: <span class="font-normal">{{ isoToString(appointment.date) }}</span></p>
    <p class="text-gray-600 font-bold">Hora: <span class="font-normal">{{ appointment.selectedHour }}hs.</span></p>
    <p class="text-black font-bold text-lg mt-3">Servicios solicitados: </p>
    <div v-for="service in appointment.services" class="space-y-3 mt-2">
        <p class="bg-gray-200 p-2 rounded text-blue-500 font-bold">{{ service.name }}</p>
    </div>
    <p class="text-black font-bold text-lg mt-3">Total a pagar: <span class="text-xl text-blue-500 font-extrabold">{{ formatCurrency(appointment.totalToPay) }}</span></p>
  </article>
</template>