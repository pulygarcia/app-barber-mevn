<script setup>

</script>

<template>
  <h2 class="text-white text-center mt-10 text-4xl">Olvidé mi password</h2>
  <p class="text-white text-center">Recuperá tu contraseña</p>

  <FormKit
    id="registerFormkit"
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