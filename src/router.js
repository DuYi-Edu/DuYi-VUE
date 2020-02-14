import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './views/Home';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: Home,
    // alias: '/',
  },
  {
    path: '/learn',
    component: () => import('./views/Learn'),
  },
  {
    path: '/student',
    component: () => import('./views/Student'),
  },
  {
    path: '/about',
    component: () => import('./views/About'),
  },
  {
    path: '/activity',
    component: () => import(/* webpackChunkName: 'academic' */'./views/Activity'),
    redirect (to) {
      return {
        name: 'academic',
      }
    },
    children: [
      // {
      //   path: '',
      //   component: () => import('./views/Academic'),
      // },
      {
        path: 'academic',
        name: 'academic',
        component: () => import(/* webpackChunkName: 'academic' */'./views/Academic'),
      },
      {
        path: 'personal',
        name: 'personal',
        component: () => import('./views/Personal'),
      },
      {
        path: 'download',
        name: 'download',
        component: () => import('./views/Download'),
      },
    ],
  },
  {
    path: '/course/:userId',
    component: () => import('./views/About'),
  },
  {
    path: '/question/:id',
    name: 'question',
    component: () => import('./views/Question'),
  },
];

export default new VueRouter({
  mode: 'history',
  routes,
});