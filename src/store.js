import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentPage: 1,
    mode: 'normal',
    steps: 0,
    step: 0,
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
    setSteps(state, steps) {
      state.steps = steps
    },
    setStep(state, step) {
      state.step = step
    },
    increaseStep(state) {
      state.step += 1
    },
    decreaseStep(state) {
      state.step -= 1
    }
  },
})
