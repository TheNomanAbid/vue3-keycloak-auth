import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: "landing",
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/HomePage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'LogIn',
    component: () => import('../views/LogIn.vue'),
  },
  {
    path: '/callback',
    name: 'CallBack',
    component: () => import('../views/CallBack.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;