<script setup>
  import authApiServices from '../../api/authApiServices'
  import { inject } from 'vue';
  import {useRoute} from 'vue-router'
  import { reset } from '@formkit/core'

  const toast = inject('toast');
  const route = useRoute();

  const handleSubmit = async (formData) => {
    //console.log(formData.password);
    try {
      const {data} = await authApiServices.verifyResetPasswordToken(route.params.token);

      toast.open({
        message: data.msg,
        type: 'success'
      });

    } catch (error) {
      toast.open({
        message: error.response.data.msg,
        type: 'error'
      });
    }
  }
</script>

<template>
  <h2 class="text-white text-center mt-10 text-4xl">Nuevo password</h2>
  <p class="text-white text-center">A continuación, reestablecé tu contraseña</p>

  <FormKit
    id="forgotPasswordFormkit"
    type="form"
    :actions="false"
    incomplete-message="No completaste el formulario"
    @submit="handleSubmit"
  >

    <FormKit
      type="password"
      name="password"
      id="password"
      validation="required|password"
      placeholder="*******"
      label="Nueva contraseña"
      :validation-messages="{ required: 'Por favor ingresá una contraseña nueva', password: 'Ingresá una contraseña válida'}"
    />

    <FormKit type="submit">Reestablecer</FormKit>
  </FormKit>
</template>