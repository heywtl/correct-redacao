import store from '../store'

export default (to: any, from: any, next: any) => {
  if (store.getters.getUser) {
    next()
  } else {
    next('/login')
  }
}
