import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../layouts/SnowBackground.vue'),
    children: [{ path: '', component: () => import('../pages/StartPage.vue') },],
  },
  {
    path: '/login',
    component: () => import('../layouts/SnowBackground.vue'),
    children: [{ path: '', component: () => import('pages/LoginPage.vue') },],
  },
  {
    path: '/registration',
    component: () => import('../layouts/SnowBackground.vue'),
    children: [{ path: '', component: () => import('../pages/RegistrationPage.vue') },],
  },
  {
    path: '/profile',
    component: () => import('../layouts/SnowBackground.vue'),
    children: [{ path: '', component: () => import('pages/ProfilePage.vue') },
    { path: '', component: () => import('src/components/ProfileHeader.vue') }],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
