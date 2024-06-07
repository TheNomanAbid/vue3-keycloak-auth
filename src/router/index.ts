import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/HomePage.vue';
import LogIn from '../views/LogIn.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'LogIn',
    component: LogIn
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;