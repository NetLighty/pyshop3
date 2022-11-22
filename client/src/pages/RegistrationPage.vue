<template>
  <div class='absolute-center'>
    <q-form @submit="submitForm">
      <h1 class="page-title">Registration</h1>
      <q-input filled v-model="email" label="Email" label-color="grey" color="white" lazy-rules
        :rules="[val => !!val || 'Email is missing', () => validateEmail(email) || 'Invalid email',]" />
      <q-input filled v-model="username" label="Username" label-color="grey" color="white" type="text" lazy-rules
        :rules="[val => val && val.length > 0 || 'Please type your username']" />
      <q-input filled v-model="password" label="Password" label-color="grey" color="white" type="password" lazy-rules
        :rules="[val => val && val.length > 0 || 'Please type password']" />
      <p class="text-negative error-msg">{{ isRegistrationError ? 'User with this email already exists' : '' }}</p>
      <div class="submit">
        <primary-button v-if="!isLoading" class="btn" text='Registration'>
        </primary-button>
        <q-spinner v-if="isLoading" color="white" size="3em" :thickness="2" />
      </div>
      <p class="q-mt-md text-grey ">
        Already have an account?
        <a @click="pushToLogin" class="q-ml-sm text-white cursor-pointer tight-text">Login</a>
      </p>
    </q-form>
  </div>
</template>

<script lang="ts">
import AuthService from 'src/services/AuthService';
import { ref } from 'vue';
import { validateEmail } from '../utils/emailValidation';
import PrimaryButton from '../components/PrimaryButton.vue';
import { useRouter } from 'vue-router';
import { useStore } from 'src/stores/store';
import UserService from 'src/services/UserService';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const username = ref('');
    const isLoading = ref(false);
    const isRegistrationError = ref(false);
    const router = useRouter();
    const store = useStore();

    const pushToLogin = () => {
      router.push('/login');
    }

    const submitForm = async () => {
      try {
        isLoading.value = true;
        isRegistrationError.value = false;
        await new Promise(r => setTimeout(r, 600)); // just for representation
        await AuthService.registration({ email: email.value, username: username.value, password: password.value })
        await AuthService.login({
          email: email.value,
          password: password.value,
        });
        const response = await UserService.getUser();
        store.setIsAuth(true);
        store.setUser(response.data);
        router.push('/profile');
      } catch {
        isRegistrationError.value = true;
        isLoading.value = false;
      }
    }
    return {
      email,
      password,
      isLoading,
      isRegistrationError,
      username,
      pushToLogin,
      submitForm,
      validateEmail,
    }
  },
  components: {
    PrimaryButton,
  },
  beforeRouteEnter(to, from, next) {
    const store = useStore();
    if ( store.isAuth ) {
      next('/profile');
    } else {
      next();
    }
  }
}
</script>

<style lang="scss">
@import '../css/authForm.scss';
</style>
