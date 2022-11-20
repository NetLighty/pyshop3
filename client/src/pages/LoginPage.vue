<template>
  <div class='absolute-center'>
    <q-form @submit="submitForm">
      <h1 class="form-title">Login</h1>
      <q-input
      @focus="hideErrorMsg"
      filled
      v-model="email"
      label="Email"
      label-color="grey"
      color="white"
      lazy-rules :rules="[val => !!val || 'Email is missing', () => validateEmail(email) || 'Invalid email']" />
      <q-input
      @focus="hideErrorMsg"
      filled
      v-model="password"
      label="Password"
      label-color="grey"
      color="white"
      type="password"
      lazy-rules :rules="[val => val && val.length > 0 || 'Please type something']" />
      <p class="text-negative error-msg">{{ loginError ? 'Email or password is incorrect' : '' }}</p>
      <div class="submit">
        <primary-button v-if="!isLoading" class="btn" text='Login'>
        </primary-button>
        <q-spinner v-if="isLoading" color="white" size="4rem" :thickness="2" />
      </div>
      <p class="q-mt-md text-grey ">
        Don't have an account?
        <a
        @click="pushToRegistration"
        class="q-ml-sm text-white cursor-pointer">Registration</a>
      </p>
    </q-form>
  </div>
</template>

<script lang="ts">
import PrimaryButton from '../components/PrimaryButton.vue';
import { useRouter } from 'vue-router';
import { useStore } from '../stores/store';
import AuthService from 'src/services/AuthService';
import { ref } from 'vue';
import { validateEmail } from '../utils/emailValidation';
import { computed } from 'vue';
import UserService from 'src/services/UserService';

export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    const isAuth = computed(() => store.isAuth);
    const email = ref('')
    const password = ref('')
    const loginError = ref(false);
    const isLoading = ref(false);

    const pushToRegistration = () => {
      router.push('/registration');
    }

    const submitForm = async () => {
      try {
          isLoading.value = true;
          await new Promise(r => setTimeout(r, 600)); // just for respresentation
          await AuthService.login({ email: email.value, password: password.value });
          const response = await UserService.getUser();
          store.setIsAuth(true);
          store.setUser(response.data);
          router.push('/profile');
        } catch {
          loginError.value = true;
          // console.log('login failed')
          isLoading.value = false;
        }
    }

    const hideErrorMsg = () => {
      loginError.value = false;
    }

    return {
      store,
      isAuth,
      loginError,
      isPwd: ref(true),
      email,
      isLoading,
      password,
      submitForm,
      pushToRegistration,
      hideErrorMsg,
      validateEmail
    }
  },
  components: {
    PrimaryButton,
  }
}
</script>

<style lang="scss">
@import '../css/authForm.scss';
</style>
