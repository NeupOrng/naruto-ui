<template>
  <div class="w-full h-screen flex flex-col items-center justify-center">
    <login-form />
  </div>
</template>
<script lang="ts">
import LoginForm from '~~/components/page/auth/login/LoginForm.vue';

export default defineComponent({
  components: { LoginForm },
  })
</script>