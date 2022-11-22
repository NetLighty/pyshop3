import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
import { AuthResponse } from 'src/models/AuthResponse';
import { API_URL_DEV, API_URL_PROD } from 'src/utils/consts';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}
const API_URL = API_URL_DEV;
//const API_URL = API_URL_PROD;
const api = axios.create({ withCredentials: true, baseURL: API_URL });

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    'access_token'
  )}`;
  return config;
});

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        error.config.headers.Authorization = `Bearer ${localStorage.getItem(
          'refresh_token'
        )}`;
        const response = await axios.post<AuthResponse>(
          `${API_URL}/auth/refresh`,
          {
            withCredentials: true,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('refresh_token')}`,
            },
          }
        );
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('refresh_token', response.data.refresh_token);
        return api.request(originalRequest);
      } catch (e) {
        //console.log('unauthorized');
      }
    }
    throw error;
  }
);

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
