<template>
  <div class="w-full h-screen flex flex-col items-center justify-center">
    <register-form />
  </div>
</template>
<script lang="ts">
import RegisterForm from '~~/components/page/auth/register/RegisterForm.vue';

export default defineComponent({
  components: { RegisterForm },
  })
</script>