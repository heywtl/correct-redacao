import firebase from '../../firebase/index'
import router from '../../router'

export default {
  state: {
    isAuthorized: false,
    user: null,
    profile: null
  },
  mutations: {
    setUser(state: any, user: any) {
      state.user = user
      state.isAuthorized = true
    },
    setProfile(state: any, profile: any) {
      state.profile = profile
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
          dispatch('getProfile', payload, { root:true })
        })
    },
    signInUser({ commit, dispatch }: any, payload: any) {
      firebase.auth.signInWithEmailAndPassword(payload.email, payload.password)
        .then((auth) => {
          console.log(auth)
          let newUser = {
            id: auth.user?.uid,
            email: auth.user?.email,
            fbKeys: {}
          }
          commit('setUser', newUser)
        })
        .catch(e => { console.log(e) })
        .finally(() => {
          dispatch('getProfile', payload, { root:true })
        })
    },
    googleSignIn({ commit, dispatch }: any) {
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
        })
    },
    facebookSignIn({ commit, dispatch }: any) {
      let vm = this
        firebase.auth.signInWithPopup(firebase.facebook)
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
    },
    getProfile(state: any) {
      return state.profile
    }
  }
}