import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    overview: false,
  },
  mutations: {
    toggleOverview(state) {
      state.overview = !state.overview
    },
  },
})
