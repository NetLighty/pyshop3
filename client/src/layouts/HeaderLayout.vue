<template>
  <q-layout>
    <q-header style="background-color: transparent">
      <q-toolbar class="row justify-end ">
          <span class="text-grey q-mr-sm">Logged as: </span>
          <span class="q-mr-md">{{ store.user.username }}</span>
        <q-btn @click="logout" color="grey" flat round dense icon="logout" />
      </q-toolbar>
    </q-header>
    <RouterView></RouterView>
  </q-layout>

</template>

<script>
import { useStore } from 'src/stores/store';
import { computed } from 'vue';
import AuthService from 'src/services/AuthService';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    const isAuth = ref(computed(() => store.isAuth));
    const user = ref(computed(() => store.user));

    const logout = async () => {
      try {
        router.push('/');
        store.setIsAuth(false);
        store.setUser({});
        await AuthService.logout();
      } catch {
        // console.log('logout error')
      }
    }
    return {
      store,
      isAuth,
      user,
      logout,
      router
    }
  }
}
</script>

<style>
.q-header {
  position: relative;
}
</style>
