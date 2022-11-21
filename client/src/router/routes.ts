import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../pages/StartPage.vue'),
    children: [{ path: '', component: () => import('../layouts/SnowBackground.vue') },
    { path: '', component: () => import('../layouts/SnowBackground.vue') }
  ],
  },
  {
    path: '/login',
    component: () => import('pages/LoginPage.vue'),
    /* component: () => import('layouts/NavLayout.vue'),
    children: [{ path: '', component: () => import('pages/LoginPage.vue') }], */
  },
  {
    path: '/registration',
    component: () => import('../pages/RegistrationPage.vue'),
    /* component: () => import('layouts/NavLayout.vue'),
    children: [{ path: '', component: () => import('pages/RegistrationPage.vue') }], */
  },
  {
    path: '/profile',
    component: () => import('layouts/HeaderLayout.vue'),
    children: [{ path: '', component: () => import('pages/ProfilePage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
