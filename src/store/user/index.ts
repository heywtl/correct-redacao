import firebase from '../../firebase/index'
import router from '../../router'

export default {
  state: {
    isAuthorized: false,
    user: null
  },
  mutations: {
    setUser(state: any, user: any) {
      state.user = user
      state.isAuthorized = true
    },
    clearUser(state: any) {
      state.user = null
      state.profile = null
      state.isAuthorized = false
    }
  },
  actions: {
    signUpUser({commit, dispatch}: any, payload: any) {
      firebase.auth.createUserWithEmailAndPassword(payload.email, payload.password)
        .then((auth) => {
          let newUser = {
            id: auth.user?.uid,
            email: auth.user?.email,
            fbKeys: {}
          }
          commit('setUser', newUser)
        })
        .catch((e) => { console.log(e) })
        .finally(() => {
          dispatch('fetchProfile', payload, { root: true })
        })
    },
    signInUser({ commit, dispatch }: any, payload: any) {
      firebase.auth.signInWithEmailAndPassword(payload.email, payload.password)
        .then((auth) => {
          let newUser = {
            id: auth.user?.uid,
            email: auth.user?.email,
            fbKeys: {}
          }
          commit('setUser', newUser)
        })
        .catch(e => { console.log(e) })
        .finally(() => {
          dispatch('fetchProfile', payload, { root: true })
        })
    },
    googleSignIn({ commit }: any) {
        firebase.auth.signInWithPopup(firebase.google)
        .then((auth) => {
          let newUser = {
            id: auth.user?.uid,
            email: auth.user?.email,
            fbKeys: {}
          }
          commit('setUser', newUser)
        })
        .catch(e => { console.log(e) })
        .finally(() => {
          router.push({ name: 'Home' })
        })
    },
    signUserOut({ commit }: any) {
      commit('clearUser')
      router.push({ name: 'Home' })
    }
  },
  getters: {
    isAuthorized(state: any) {
      return state.isAuthorized
    },
    getUser(state: any) {
      return state.user
    }
  }
}