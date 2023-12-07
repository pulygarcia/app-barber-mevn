<script setup>
  import authApiServices from '../../api/authApiServices'
  import { inject, onMounted, ref } from 'vue';
  import {useRoute} from 'vue-router'
  import { reset } from '@formkit/core'

  const toast = inject('toast');
  const route = useRoute();
  const validToken = ref(false);

  onMounted(async () => {
    try {
      const {data} = await authApiServices.verifyResetPasswordToken(route.params.token);

      validToken.value = true;

    } catch (error) {
      toast.open({
        message: error.response.data.msg,
        type: 'error'
      });
    }
  })
</script>

<template>
  <div v-if="validToken">
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
  </div>

  <p v-else class="text-center text-4xl text-white mt-10">Token no válido</p>
</template>