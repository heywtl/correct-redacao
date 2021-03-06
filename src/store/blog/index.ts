import firebase from '../../firebase/index'

export default {
    state: {
        posts: []
    },
    mutations: {
        setBlogPost(state: any, posts: any) {
            state.posts = posts
        },
    },
    actions: {
        fetchBlogPosts({ commit }: any) {
            firebase.db.collection('Blog')
                .get().then((post) => {
                    let list = post.docs.map((pos) => {
                        return {
                            ...pos.data()
                        }
                    })
                    commit('setBlogPost', list)
                })
              .catch((e: any) => { console.log(e) })
        }
    },
    getters: {
        getBlogPosts(state: any) {
            return state.posts
          },
    }
}