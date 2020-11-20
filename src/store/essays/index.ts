import { mapGetters } from 'vuex'
import firebase from '../../firebase/index'

export default {
    state: {
        essay: null
    },
    computed: {
        ...mapGetters([
            'getUser'
        ])
    },
    actions: {
        postEssay({ commit, dispatch }: any, payload: any){
            //firebase.db.collection('Estudante').doc(getUser.email).collection('essay').add(payload)
            //.catch((e) => { console.log(e) })
        }
    }
}