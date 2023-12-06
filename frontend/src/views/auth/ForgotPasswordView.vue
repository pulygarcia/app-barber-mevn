<script setup>
  import authApiServices from '../../api/authApiServices'
  import { inject } from 'vue';
  import { reset } from '@formkit/core'

  const toast = inject('toast');

  const handleSubmit = async (formData) => {
    try {
      const {data} = await authApiServices.forgotPassword({email: formData.email});

      toast.open({
        message: data.msg,
        type: 'success'
      });

    } catch (error){
      toast.open({
        message: error.response.data.msg,
        type: 'error'
      });
    }finally{
      reset('forgotPasswordFormkit')
    }
  }
</script>

<template>
  <h2 class="text-white text-center mt-10 text-4xl">Olvidé mi password</h2>
  <p class="text-white text-center">Recuperá tu contraseña</p>

  <FormKit
    id="forgotPasswordFormkit"
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

    <FormKit type="submit">Enviar instrucciones</FormKit>
  </FormKit>
</template>