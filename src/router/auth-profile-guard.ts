import store from '../store'

export default (to: any, from: any, next: any) => {

  if (!store.getters.getUser) {
    next('/login')
  } else if (!store.getters.getProfile?.permissao) {
    next('/cadastro-perfil')
  } else {
    next()
  }
}
