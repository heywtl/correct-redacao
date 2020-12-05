import firebase from '../../firebase/index'
import router from '../../router'

export default {
    state: {
        essayList: null,
    },
    mutations: {
        setEssayList(state: any, list: any) {
            state.essayList = list
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
        postEssayCorrection({ commit }: any, payload: any){
            firebase.db.collection('EssayList')
                .doc(payload.id).set(payload.doc)
                .catch((e) => { console.log(e) })
                .finally(() => {
                    router.push({ name: 'Home' })
                })

            firebase.db.collection('Users')
            .doc(payload.doc.email).collection('Grades')
            .doc(payload.id).set(payload.grades)
            .catch((e) => { console.log(e) })
            .finally(() => {
                router.push({ name: 'Home' })
            })
        },
        fetchEssayList({ commit }: any, payload: any) {
            firebase.db.collection('EssayList').get()
                .then((essays) =>  {
                    let essayList = essays.docs.map((essay) => { return { id: essay.id, doc: { ...essay.data() } } } )
                    commit('setEssayList', essayList)
                })
        },
        fetchUserEssayList({ commit }: any, email: any) {
            firebase.db.collection('EssayList').get()
                .then((essays) =>  {
                    let essayList = essays.docs.map((essay) => { return { ...essay.data() } } )
                    commit('setEssayList', essayList)
                })
        }
    },
    getters: {
        getEssays(state: any) {
            return state.essayList
        }
    }
}