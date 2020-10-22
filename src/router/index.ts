import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Cadastro from '../views/Cadastro.vue'
import Login from '../views/Login.vue'
import About from '../views/About.vue'
import Submeter from '../views/Submeter.vue'
import AuthGuard from './auth-guard'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/cadastro',
    name: 'Cadastro',
    component: Cadastro
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/submeter-redacao',
    name: 'Submeter',
    component: Submeter,
    beforeEnter: AuthGuard
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: Submeter, //TODO: trocar pro certo
    beforeEnter: AuthGuard
  },
]

const router = new VueRouter({
  routes,
  base: '',
  mode: 'history'
})

export default router
