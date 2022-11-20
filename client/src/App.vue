<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AuthService from './services/AuthService';

console.log('APP');

export default defineComponent({
  name: 'App',
  async created() {
    await AuthService.initUser();
  }
},
);
</script>
