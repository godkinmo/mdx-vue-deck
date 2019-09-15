import Vue from 'vue'
import Router from 'vue-router'
import Deck from './views/Deck.vue'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/:page?',
      name: 'home',
      component: Deck,
    },
  ],
})
