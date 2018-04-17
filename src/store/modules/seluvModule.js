import * as types from '../../constants'
import { services } from '../api'
import bus from '../../lib/eventBus.js'
import Vue from 'vue'

const state = {
  categoryList: []
}

const getters = {
  categoryList: state => state.categoryList
}

const actions = {
  getCategoryList ({ commit, state }, obj) {
    services.seluv.getCategoryList()
      .then((response) => {
        commit(types.GET_ZARA_CATEGORY_LIST, response.data)
      })
      .catch((err) => {
        console.error(err)
      })
  },
  categoryUpdate ({ commit, state }, obj) {
    commit(types.START_CATEGORY_UPDATE, obj)
    services.seluv.categoryUpdate(obj)
      .then((response) => {
        commit(types.UPDATE_ZARA_CATEGORY, obj)
      })
      .catch((err) => {
        console.error(err)
      })
  },
  testProductListAPI ({ commit, state }, obj) {
    services.seluv.testZaraProductGetheringAPI()
      .then((response) => {
        bus.$emit(types.PRODUCTLIST_SCHEDULER_RESULT, response.data)
      })
      .catch((err) => {
        bus.$emit(types.PRODUCTLIST_SCHEDULER_RESULT, {total: -1, time: '0'})
        console.error(err)
      })
  }
}

const mutations = {
  [types.GET_ZARA_CATEGORY_LIST] (state, data) {
    state.categoryList = data
  },
  [types.START_CATEGORY_UPDATE] (state, data) {
    for (let i in state.categoryList) {
      if (state.categoryList[i].categoryCode === data.code) {
        Vue.set(state.categoryList[i], 'process', true)
        break
      }
    }
  },
  [types.UPDATE_ZARA_CATEGORY] (state, data) {
    for (let i in state.categoryList) {
      if (state.categoryList[i].categoryCode === data.code) {
        state.categoryList[i].urls = data.urls
        state.categoryList[i].process = null
        break
      }
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
