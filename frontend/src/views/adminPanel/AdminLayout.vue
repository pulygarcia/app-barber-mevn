<script setup>
    import { useUserStore } from '../../stores/userStore'
    const user = useUserStore()
</script>


<template>
    <div class="flex justify-between">
        <div>
            <h1 class="text-2xl lg:text-6xl font-black text-white">App infinity</h1>
            <h2 class="text-xl lg:text-2xl font-black text-white">Panel de Administración</h2>
        </div>

        <div class="flex flex-col space-y-5">
              <div class="flex gap-2 items-center">
                  <p class="text-white text-right">Usuario: {{ user.getUserName }}</p>
                  <button
                      type="button"
                      class="bg-red-500 font-bold text-white py-1 px-3 rounded-md hover:bg-red-600 transition"
                      @click="user.closeUserSession"
                  >
                      Cerrar Sesión
                  </button>
              </div>
          </div>
    </div>
    <main class="space-y-6">
       <RouterView />
    </main>
</template>