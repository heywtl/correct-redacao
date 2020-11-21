import firebase from '../../firebase/index'
import router from '../../router'

export default {
  state: {
    profile: null
  },
  mutations: {
    setProfile(state: any, profile: any) {
      state.profile = profile
    },
    clearProfile(state: any) {
      state.profile = null
    }
  },
  actions: {
    fetchProfile({ commit }: any, payload: any) {
      firebase.db.collection('Users').doc(payload.email).get().then((profile) => {
          commit('setProfile', profile.data())
          })
        .catch((e: any) => { console.log(e) })
    },
    createProfile({ commit, dispatch }: any, payload: any) {
      firebase.db.collection('Users').doc(payload.email).set(payload)
      .then((profile) => {
          dispatch('fetchProfile', payload)
        })
      .catch((e) => { console.log(e) })
      .finally(() => {
        router.push({ name: 'Home' })
      })
    }
  },
  getters: {
    getProfile(state: any) {
      return state.profile
    },
    isStudent(state: any) {
      return (state.profile && state.profile.permissao == 'Estudante')
    }
  }
}