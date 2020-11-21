import firebase from '../../firebase/index'
import router from '../../router'

export default {
    state: {
        userEssays: null,
        essay: null
    },
    mutations: {
        setUserEssays(state: any, profile: any) {
            state.profile = profile
        },
        setEssay(state: any) {
            state.profile = null
        }
    },
    actions: {
        postEssay({ commit, rootGetters }: any, payload: any){
            var user = rootGetters.getUser
            firebase.db.collection('Users').doc(user.email).collection('Essays').add(payload)
            .catch((e) => { console.log(e) })
            .finally(() => {
              router.push({ name: 'Home' })
            })
        },
        fetchUserEssays({ commit, rootGetters }: any) {
            var user = rootGetters.getUser
            firebase.db.collection('Users').doc(user.email).collection('Essays')
                .get().then((profile) => {
                    let list = profile.docs.map((essay) => {
                        return {
                            ...essay.data()
                        }
                    })
                    commit('setUserEssays', list)
                })
              .catch((e: any) => { console.log(e) })
        },
        fetchSingleEssay({ commit }: any, payload: any) {
            let essay = firebase.db.collection('Users').doc(payload.email).collection('Essays').doc(payload.id)
            commit('setEssay', essay)
        },
    }
}