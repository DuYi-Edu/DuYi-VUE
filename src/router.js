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
    // component: () => import('./views/Learn'),
    components: {
      default: () => import('./views/Learn'),
      student: () => import('./views/Student'),
    },
  },
  {
    path: '/student',
    component: () => import('./views/Student'),
  },
  {
    path: '/about',
    component: () => import('./views/About'),
    beforeEnter (to, from, next) {
      console.log('beforeEnter');
      next();
    },
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
    // props: true,
    props: route => ({
      // name: route.name,
      id: route.params.id 
    }),
    component: () => import('./views/Question'),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  // console.log(to);
  // console.log(from);
  // next(false);
  // if(to.path === '/student') {
  //   next('/about');
  //   // this.$router.push()
  // } else {
    console.log('beforeEach');
    next();
  // }
  // next(new Error('不让跳转'));
})

router.beforeResolve((to, from, next) => {
  console.log('beforeResolve');
  next();
})

router.afterEach((to, from) => {
  console.log('afterEach');
})

router.onError(err => {
  console.log(err.message);
})

export default router;