<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { useUserStore } from '../stores/userStore';

const userStore = useUserStore();
</script>

<template>
    <div class="flex flex-col items-center text-white md:flex-row md:justify-between space-y-3">
        <h2 class="text-3xl font-extrabold lg:text-6xl">Infinity Barber</h2>
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
            <path stroke-linecap="round" stroke-linejoin="round" d="m7.848 8.25 1.536.887M7.848 8.25a3 3 0 1 1-5.196-3 3 3 0 0 1 5.196 3Zm1.536.887a2.165 2.165 0 0 1 1.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 1 1-5.196 3 3 3 0 0 1 5.196-3Zm1.536-.887a2.165 2.165 0 0 0 1.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863 2.077-1.199m0-3.328a4.323 4.323 0 0 1 2.068-1.379l5.325-1.628a4.5 4.5 0 0 1 2.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.33 4.33 0 0 0 10.607 12m3.736 0 7.794 4.5-.802.215a4.5 4.5 0 0 1-2.48-.043l-5.326-1.629a4.324 4.324 0 0 1-2.068-1.379M14.343 12l-2.882 1.664" />
          </svg>
        </span>
      </div>

      <h2 class="text-white text-center mt-10 text-2xl">¡Reservá tu turno hoy!</h2>

      <img src="/scissors.png" alt="scissors" class="w-15 h-15 animate-pulse mx-auto mt-5">

      <nav class="flex flex-col gap-4 items-center justify-center mt-20 text-white">
          <RouterLink :to="{name: 'user-appointments'}" class="font-bold bg-[#232323a3] px-3 py-1 rounded-md hover:bg-[#232323]">Mis turnos</RouterLink>

          <RouterLink :to="{name: 'new-appointment'}" class="font-bold uppercase bg-blue-600 px-3 py-1 rounded-md hover:bg-blue-700 transition">
              Nueva cita
          </RouterLink>
      </nav>

  <RouterView />
</template>