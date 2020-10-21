export default {
  state: {
    loading: false,
    error: null
  },
  mutations: {
    setLoading (state: any, payload: any) {
      state.loading = payload
    },
    setError (state: any, payload: any) {
      state.error = payload
    },
    clearError (state: any) {
      state.error = null
    }
  },
  actions: {
    clearError ({commit}: any) {
      commit('clearError')
    }
  },
  getters: {
    loading (state: any) {
      return state.loading
    },
    error (state: any) {
      return state.error
    }
  }
}
