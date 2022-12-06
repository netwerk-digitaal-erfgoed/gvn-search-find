import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ObjectView from '../views/ObjectView.vue';
import DatasetView from '../views/DatasetView.vue';
import AboutView from '../views/AboutView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/search',
      name: 'search',
      component: HomeView
    },
    {
      path: '/object',
      name: 'object',
      component: ObjectView
    },
    {
      path: '/',
      name: 'dataset',
      component: DatasetView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    }
  ],
  scrollBehavior() {
    // always scroll to top
    return { top: 0 };
  }
});

export default router;
