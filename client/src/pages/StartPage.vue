<template>
  <div class="absolute-center start-page">
    <h1 class="start-page-msg">Hello, to use this app you should be authorized</h1>
    <div class="flex-row justify-center">
      <PrimaryButton @click="pushToLogin" class="q-mr-md " text="Login"></PrimaryButton>
      <PrimaryButton @click="pushToRegistration" text="Registration"></PrimaryButton>
    </div>
  </div>
</template>

<script lang="ts">
import PrimaryButton from 'src/components/PrimaryButton.vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const $router = useRouter();
    const pushToLogin = () => {
      $router.push('/login');
    }
    const pushToRegistration = () => {
      $router.push('/registration');
    }
    return {
      $router,
      pushToLogin,
      pushToRegistration,
    }
  },
  components: {
    PrimaryButton,
  }
}
</script>

<style lang="scss">
.start-page {
  width: 90%;
}
.start-page-msg {
  user-select: none;
  font-size: 3rem;
  margin: 0;
  margin-bottom: 2rem;
  color: $white;
}
</style>
