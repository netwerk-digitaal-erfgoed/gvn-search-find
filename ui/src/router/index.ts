import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ObjectView from '../views/ObjectView.vue';
import DatasetView from '../views/DatasetView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/object',
      name: 'object',
      component: ObjectView
    },
    {
      path: '/dataset',
      name: 'dataset',
      component: DatasetView
    }
  ],
  scrollBehavior() {
    // always scroll to top
    return { top: 0 };
  }
});

export default router;
