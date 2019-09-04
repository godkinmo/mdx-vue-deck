import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentPage: 1,
    overview: false,
  },
  mutations: {
    toggleOverview(state) {
      state.overview = !state.overview
    },
    setCurrentPage(state, page) {
      state.currentPage = page
    },
  },
})
