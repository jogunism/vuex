import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/authModule'
import seluv from './modules/seluvModule'
import monitoring from './modules/monitoringModule'
import comparing from './modules/comparingModule'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    seluv,
    monitoring,
    comparing
  }
})
