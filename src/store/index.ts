import Vue from 'vue'
import Vuex from 'vuex'


import shared from './shared'
import user from './user'
import profile from './profile'
import essays from './essays'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    shared,
    user,
    profile,
    essays
  }
})
