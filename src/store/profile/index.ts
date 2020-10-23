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
    getProfile({ commit }: any, payload: any) {
      firebase.db.collection('perfil').where('email', '==', payload.email)
        .get().then((profile) => {
          commit('setProfile')
        })
        .catch(e => { console.log(e) })
    },
    createProfile({ commit }: any, payload: any){
      let addProfile = {
        email: payload.email,
        nome: '',
        sobrenome: '',
        aniversario: '',
        biografia: '',
        entrada: Date.now()
      }
      firebase.db.collection('perfil').add(addProfile)
      .then((profile) => {
          let newProfile = {
            id: profile?.id,
            email: payload.email,
            nome: '',
            sobrenome: '',
            aniversario: '',
            biografia: '',
            entrada: Date.now()
          }
          commit('setProfile', newProfile)
        })
        .catch((e) => { console.log(e) })
    }
  },
  getters: {}
}