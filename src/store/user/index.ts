import firebase from '../../firebase/index'

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
      state.isAuthorized = false
    }
  },
  actions: {
    signUpUser({commit}: any, payload: any) {
      firebase.auth.createUserWithEmailAndPassword(payload.email, payload.password)
        .then((response): any => {
          let newUser = {
            // @ts-ignore: Object is possibly 'null'.
            id: response.user.uid,
            fbKeys: {}
          }
          commit('setUser', newUser)
          
        })
        .catch((e) => { console.log(e) })
        .finally(() => {})
    },
    signInUser({ commit }: any, payload: any) {
      commit('clearError')
      firebase.auth.signInWithEmailAndPassword(payload.email, payload.password)
        .then((response) => {
          let newUser = {
            // @ts-ignore: Object is possibly 'null'.
            id: response.user.uid,
            fbKeys: {}
          }
          commit('setUser', newUser)
        })
        .catch(e => { console.log(e) })
        .finally(() => {})
    },
    googleSignIn({ commit }: any) {
        firebase.auth.signInWithPopup(firebase.google)
        .then((response) => {
          let newUser = {
            // @ts-ignore: Object is possibly 'null'.
            id: response.user.uid,
            fbKeys: {}
          }
          commit('setUser', newUser)
        })
        .catch(e => { console.log(e) })
        .finally(() => {})
    },
    facebookSignIn({ commit }: any) {
        firebase.auth.signInWithPopup(firebase.facebook)
        .then((response) => {
          let newUser = {
            // @ts-ignore: Object is possibly 'null'.
            id: response.user.uid,
            fbKeys: {}
          }
          commit('setUser', newUser)
        })
        .catch(e => { console.log(e) })
        .finally(() => {})
    },
    signUserOut({ commit }: any) {
      commit('clearUser')
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