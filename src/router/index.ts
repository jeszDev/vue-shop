import { createRouter, createWebHistory } from 'vue-router';
import ShopLayout from '@/modules/shop/layouts/ShopLayout.vue';
import { authRoutes } from '@/modules/auth/routes';
import { adminRoutes } from '@/modules/admin/routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'shop',
      component: ShopLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/modules/shop/views/Homeview.vue'),
        },
      ],
    },

    authRoutes,
    adminRoutes,
  ],
});

export default router;
