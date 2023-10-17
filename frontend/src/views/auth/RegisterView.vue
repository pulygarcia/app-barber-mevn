<script setup>
  
</script>

<template>
  <h2 class="text-white text-center text-4xl mt-10">Registrate</h2>
  <p class="text-white text-center">Creá tu cuenta en Infinity Barber</p>

  <FormKit
    type="form"
    :actions="false"
    incomplete-message="No completaste el formulario"
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
      label="Pulygarcia09@gmail.com"
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