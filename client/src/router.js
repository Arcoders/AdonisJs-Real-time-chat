import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () => import('./views/Landing.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
    },
    {
      path: '/home',
      component: () => import('./views/Home.vue'),
      children: [
        {
          path: '/',
          component: () => import('./views/Welcome.vue'),
        },
      ],
    },
  ],
});
