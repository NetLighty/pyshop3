<template>
  <div class="absolute-center start-page">
    <h1 class="start-page-msg page-title">Hello, to use this app you should be authorized</h1>
    <div class="flex-row justify-center">
      <PrimaryButton @click="pushToLogin" class="q-mr-md " text="Login"></PrimaryButton>
      <PrimaryButton @click="pushToRegistration" text="Registration"></PrimaryButton>
    </div>
  </div>
</template>

<script lang="ts">
import PrimaryButton from 'src/components/PrimaryButton.vue';
import { useStore } from 'src/stores/store';
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
  },
  beforeRouteEnter(to, from, next) {
    const store = useStore();
    console.log('before route profile')
    console.log(store.isAuth);
    if ( store.isAuth ) {
      next('/profile');
    } else {
      next();
    }
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
