<template>
  <div>
    <NuxtPage/>
  </div>
</template>
<script lang="ts" setup>
import { useAuthStore } from './store/auth';

console.log('start')
const authStore = useAuthStore();
const TOKEN_KEY = 'access-token';
const token = useCookie(TOKEN_KEY);
console.log(token)
if(token.value) authStore.UpdateToken(token.value as string);
</script>
