import firebase from '../../firebase/index'
import router from '../../router'

export default {
    state: {
        essayList: null,
    },
    mutations: {
        setEssayList(state: any) {
            state.essayList = null
        }
    },
    actions: {
        postEssay({ commit, rootGetters }: any, payload: any){
            var user = rootGetters.getUser

            let payloadEssayList = {
                email: user.email,
                corrected: false,
                correctedIA: false,
                correctedDate: null,
                correctedIADate: null,
                redacted: null,
                ...payload
            }

            firebase.db.collection('EssayList')
                .add(payloadEssayList)
                .catch((e) => { console.log(e) })
                .finally(() => {
                    router.push({ name: 'Home' })
                })
        },
        fetchEssayList({ commit }: any, payload: any) {
            firebase.db.collection('EssayList').get()
                .then((essays) =>  {
                    let essayList = essays.docs.map((essay) => { return { ...essay.data() } } )
                    debugger
                    commit('setEssayList', essayList)
                })
        }
    },
    getters: {
        getEssays(state: any) {
            return state.essays
        },
        getNotCorrected(state: any) {
            return state.essayList
        }
    }
}