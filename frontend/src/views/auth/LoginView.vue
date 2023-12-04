<script setup>
  import { RouterLink, useRouter } from 'vue-router';
  import authApiServices from '../../api/authApiServices'
  import { inject } from 'vue';

  const toast = inject('toast');
  const router = useRouter();

  const handleSubmit = async (formData) => {
    try {
      const {data} = await authApiServices.login(formData);

      localStorage.setItem('auth_jwt', data.jsonWebToken);  //probar si quitando el json stringify gunciona

      toast.open({
        message: data.msg,
        type: 'success'
      })

      router.push({name: 'user-appointments'})

    } catch (error) {
      //console.log(error.response.data.msg);
      toast.open({
        message: error.response.data.msg,
        type: 'error'
      })
    }
  }
</script>

<template>
  <h2 class="text-white text-center mt-10 text-4xl">Iniciar sesión</h2>
  <p class="text-white text-center">Si ya tienes una cuenta, inicia sesión</p>

  <FormKit
    id="loginFormkit"
    type="form"
    :actions="false"
    incomplete-message="No completaste el formulario"
    @submit="handleSubmit"
  >
    <FormKit
      type="email"
      name="email"
      id="email"
      validation="required|email"
      placeholder="Tu e-mail"
      label="Correo electrónico"
      :validation-messages="{ required: 'Por favor ingresá un correo electrónico', email: 'Ingresá un correo válido'}"
    />

    <FormKit
      type="password"
      name="password"
      label="Contraseña"
      placeholder="Ingresa tu contraseña"
      validation="required"
      :validation-messages="{ required: 'Por favor ingresá una contraseña'}"
    />

    <FormKit type="submit">Ingresar</FormKit>
  </FormKit>

  <p class="mt-5 text-white">¿Olvidaste tu contraseña? <span class="font-bold text-blue-500"><RouterLink :to="{name: 'forgot-password'}">Click aquí</RouterLink></span></p>
  <p class="mt-5 text-white">¿Todavía no tenés una cuenta? <span class="font-bold text-blue-500"><RouterLink :to="{name: 'register'}">Creá una cuenta aquí</RouterLink></span></p>
</template>