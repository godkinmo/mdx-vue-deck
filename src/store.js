import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentPage: 1,
    mode: 'normal',
  },
  mutations: {
    toggleMode(state, next) {
      state.mode = state.mode === next
        ? 'normal'
        : next
    },
    setCurrentPage(state, page) {
      state.currentPage = page
    },
  },
})
