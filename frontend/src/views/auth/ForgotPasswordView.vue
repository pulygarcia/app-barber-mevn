<script setup>
  import authApiServices from '../../api/authApiServices'
  import { inject, ref } from 'vue';
  import { reset } from '@formkit/core'
  import Loader from '../../components/Loader.vue'

  const toast = inject('toast');
  const loading = ref(false);

  const handleSubmit = async (formData) => {
    loading.value = true;

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
      reset('forgotPasswordFormkit');
      loading.value = false;
    }
  }
</script>

<template>
  <Loader v-if="loading"/>

  <div v-else>
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
  </div>
</template>