<script setup>
  import authApiServices from '../../api/authApiServices';
  import {useRoute,useRouter} from 'vue-router';
  import {onMounted, inject} from 'vue'

  const route = useRoute();
  const router = useRouter();

  const toast = inject('toast');

  onMounted(async () => {
    const token = route.params.token; //get token from url

    try {
      const {data} = await authApiServices.verify(token);

      toast.open({
        message: data.msg,
        type:'success'
      })

      setTimeout(() => {
        router.push({name: 'auth-login'})
      }, 5000);

    } catch (error) {
      console.log(error);

      toast.open({
        message: error.response.data.msg,
        type:'error'
      })
    }
  })  
  
</script>

<template>
  <h2 class="text-white mt-10 text-center text-4xl">Verificar cuenta</h2>
</template>