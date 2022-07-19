import { createStore } from 'vuex'

import user from './module/user'
import app from './module/app'

export default createStore({
  state: {
    env: import.meta.env
  },
  mutations: {},
  actions: {},
  modules: {
    app,
    user,
  }
})
