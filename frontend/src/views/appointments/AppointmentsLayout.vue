<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { useUserStore } from '../../stores/userStore';

const userStore = useUserStore();
</script>

<template>
    <div class="flex flex-col items-center text-white md:flex-row md:justify-between space-y-3">
        <h2 class="text-3xl font-extrabold lg:text-6xl">Infinity Barber</h2>

        <div class="flex flex-col space-y-5">
            <div class="flex gap-3 items-center">
                <p>Usuario: {{ userStore.getUserName }}</p>
                <button @click="userStore.closeUserSession" class="bg-red-500 font-bold text-white py-1 px-3 rounded-md hover:bg-red-600 transition">Cerrar sesión</button>
            </div>
            <nav class="flex gap-4 items-center justify-end">
                <RouterLink :to="{name: 'user-appointments'}" class="font-bold text-white">Mis turnos</RouterLink>

                <RouterLink :to="{name: 'new-appointment'}" class="font-bold uppercase bg-blue-600 px-3 py-1 rounded-md hover:bg-blue-700 transition">
                    Nueva cita
                </RouterLink>
            </nav>
        </div>
    </div>

  <RouterView />
</template>