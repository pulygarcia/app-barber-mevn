<script setup>
  import authApiServices from '../../api/authApiServices'
  import { inject } from 'vue'
  import {reset} from '@formkit/vue'

  const toast = inject('toast');

  const handleSubmit = async ({password_confirm, ...formData}) => { //extract password_confirm cause is not necessary for the request
    try {
      const {data} = await authApiServices.register(formData);

      toast.open({
        message: data.msg,
        type: 'success'
      })

      reset('registerFormkit'); //Put a name in form id, and use reset function for clear it

    } catch (error) {
      console.log(error.response.data.msg); //Open axios error and get backend message

      toast.open({
        message: error.response.data.msg,
        type: 'error'
      })
    }
  }
</script>

<template>
  <h2 class="text-white text-center text-4xl mt-10">Registrate</h2>
  <p class="text-white text-center">Creá tu cuenta en Infinity Barber</p>

  <FormKit
    id="registerFormkit"
    type="form"
    :actions="false"
    incomplete-message="No completaste el formulario"
    @submit="handleSubmit"
  >
    <FormKit
      type="text"
      name="name"
      id="name"
      validation="required|length:3"
      placeholder="Tu nombre"
      label="Nombre"
      :validation-messages="{ required: 'Por favor ingresá un nombre', length: 'El es demasiado corto' }"
    />

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
      placeholder="Ingresa una contraseña segura"
      validation="required"
      :validation-messages="{ required: 'Ingresá una contraseña'}"
    />

    <FormKit
      type="password"
      name="password_confirm"
      label="Confirmar contraseña"
      validation="required|confirm"
      placeholder="Confirmar contraseña"
      :validation-messages="{ required: 'Confirmá tu contraseña', confirm: 'Las contraseñas no son iguales'}"
    />

    <FormKit type="submit">Registrar Usuario</FormKit>
  </FormKit>
</template>