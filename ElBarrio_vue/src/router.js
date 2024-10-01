// src/router.js

import { createRouter, createWebHistory } from 'vue-router';
import Homepage from '@/views/Homepage.vue';
import Menu from '@/views/Menu.vue';
import Eventi from '@/views/Eventi.vue';
import ChiSiamo from '@/views/ChiSiamo.vue';


const routes = [
  {
    path: '/',
    name: 'homepage',
    component: Homepage,
  },
  {
    path: '/menu',
    name: 'menu',
    component: Menu,
  },
  {
    path: '/eventi',
    name: 'eventi',
    component: Eventi,
  },
  {
    path: '/chi-siamo',
    name: 'chi-siamo',
    component: ChiSiamo,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
