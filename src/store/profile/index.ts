import firebase from '../../firebase/index'

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
      firebase.db.collection('perfil').where('email', '==', payload.email)
        .get().then((profile) => {
          let perfis = profile.docs.map((x) => {
            return { 
              ...x.data()
            }
          })
          commit('setProfile', perfis[0])
        })
        .catch(e => { console.log(e) })
    },
    createProfile({ commit, dispatch }: any, payload: any) {
      firebase.db.collection('perfil').add(payload)
      .then((profile) => {
          dispatch('fetchProfile', payload)
        })
      .catch((e) => { console.log(e) })
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