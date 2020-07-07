import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import DefaultLayout from "../layouts/DefaultLayout";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../views/Login";
import Registration from "../views/Registration";
import authService from '../services/auth.service';

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Default',
    redirect: '/home',
    component: DefaultLayout,
    children: [
      {
        path: 'home',
        name: 'home',
        component: Home
      }
    ]
  },
  {
    path: '/auth',
    name: 'Auth',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: AuthLayout,
    children: [
      {
        path: 'login',
        name: 'login',
        component: Login
      },
      {
        path: 'register',
        name: 'register',
        component: Registration
      }
    ]
  },
  {
    path: '/login',
    redirect: '/auth/login'
  },
  {
    path: '/register',
    redirect: '/auth/register'
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name ==='home' && !authService.isLoggedIn()) {
    next({name: 'login'});
  } else if (authService.isLoggedIn() && to.name !== 'home') {
    next({name: 'home'})
  } else {
    next();
  }
})

export default router
