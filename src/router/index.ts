import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Cadastro from '../views/Cadastro.vue'
import CadastroPerfil from '../views/CadastroPerfil.vue'
import Login from '../views/Login.vue'
import About from '../views/About.vue'
import Perfil from '../views/Perfil.vue'
import Submeter from '../views/Submeter.vue'
import AuthProfileGuard from './auth-profile-guard'
import AuthGuard from './auth-guard'
import Correcao from '../views/Correcao.vue'

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
    path: '/cadastro-perfil',
    name: 'CadastroPerfil',
    component: CadastroPerfil,
    beforeEnter: AuthGuard
  },
  {
    path: '/submeter-redacao',
    name: 'Submeter',
    component: Submeter,
    beforeEnter: AuthProfileGuard
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: Perfil,
    beforeEnter: AuthProfileGuard
  },
  {
    path: '/correcao',
    name: 'Correcao',
    component: Correcao
  }
]

const router = new VueRouter({
  routes,
  base: '',
  mode: 'history'
})

export default router
