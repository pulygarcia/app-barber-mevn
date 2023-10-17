<script setup>
  import {useRoute} from 'vue-router'
  const authRoutes = [
    {name: 'register', text: 'Registrarse'},
    {name: 'auth-login', text: 'Iniciar sesión'}
  ]

  const route = useRoute();
  console.log(route);
</script>

<template>
  <div class="lg:w-3/5 mt-20 mx-auto">
    <nav class="flex justify-between uppercase font-bold">
      <RouterLink
        v-for="link in authRoutes"
        :to="{name: link.name}"
        :class="link.name === route.name ? 'text-blue-500' : 'text-white'"
      >
        {{ link.text }}
      </RouterLink>
    </nav>

    <RouterView />
  </div>
</template>