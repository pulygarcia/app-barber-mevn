<script setup>
  import authApiServices from '../../api/authApiServices'
  import { inject, onMounted, ref } from 'vue';
  import {useRoute, useRouter} from 'vue-router'
  import { reset } from '@formkit/core'
  import Loader from '../../components/Loader.vue'
 
  const toast = inject('toast');
  const route = useRoute();
  const router = useRouter();
  const validToken = ref(false);
  const loading = ref(false);

  onMounted(async () => {
    try {
      await authApiServices.verifyResetPasswordToken(route.params.token);

      validToken.value = true;

    } catch (error) {
      toast.open({
        message: error.response.data.msg,
        type: 'error'
      });

    }
  })

  const handleSubmit = async (formData) => {
    const {password} = formData;
    const {token} = route.params;
    loading.value = true;

    try {
      const {data} = await authApiServices.updatePassword(token, password);

      toast.open({
        message: data.msg,
        type: 'success'
      });

      reset('newPasswordFormkit');

      setTimeout(() => {
        router.push({name: 'login'})
      }, 3000);

    } catch (error) {
      toast.open({
        message: error.response.data.msg,
        type: 'error'
      });

    }finally{
      loading.value = false;
    }
  }
</script>

<template>

  <Loader v-if="loading"/>

  <div v-if="validToken && loading === false">
    <h2 class="text-white text-center mt-10 text-4xl">Nuevo password</h2>
    <p class="text-white text-center">A continuación, reestablecé tu contraseña</p>
    <FormKit
      id="newPasswordFormkit"
      type="form"
      :actions="false"
      incomplete-message="No completaste el formulario"
      @submit="handleSubmit"
    >
      <FormKit
        type="password"
        name="password"
        id="password"
        validation="required"
        placeholder="new password"
        label="Nueva contraseña"
        :validation-messages="{ required: 'Por favor ingresá una contraseña nueva'}"
      />
      <FormKit type="submit">Reestablecer</FormKit>
    </FormKit>
  </div>

  <p v-else-if="!validToken" class="text-center text-4xl text-white mt-10">Token no válido</p>
</template>