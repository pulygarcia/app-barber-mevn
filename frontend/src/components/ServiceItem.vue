<script setup>
    defineProps({
        service:{
            type: Object
        }
    })
</script>

<template>
  <div>
    <p class="text-white">{{ service.name }}</p>
  </div>
</template>