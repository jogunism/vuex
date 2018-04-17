import * as types from '../../constants'
import { services } from '../api'
import bus from '../../lib/eventBus.js'
import Vue from 'vue'

const state = {
  comparingList: [],
  comparingItems: {},
  seasrchResultList: [],
  title: ''
}

const getters = {
  comparingList: state => state.comparingList,
  seasrchResultList: state => state.seasrchResultList,
  title: state => state.title,
  comparingItems: state => state.comparingItems
}

const actions = {
  getComparingList ({ commit, state }) {
    services.products.getComparingList()
      .then((response) => {
        commit(types.GET_COMPARING_LIST, response.data)
      })
      .catch((err) => {
        console.error(err)
      })
  },
  getComparingItem ({commit, state}, seq) {
    services.products.getComparingItem(seq)
      .then((response) => {
        commit(types.GET_COMPARING_ITEM, {seq: seq, data: response.data})
      })
      .catch((err) => {
        console.error(err)
      })
  },
  updateComparingItemTitle ({ commit, state }, obj) {
    services.products.updateComparingItemTitle(obj)
      .then((response) => {
        commit(types.UPDATE_COMPARING_ITEM_TITLE, obj)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  removeComparingItem ({commit, state}, seq) {
    services.products.removeComparingItem(seq)
      .then((response) => {
        commit(types.REMOVE_COMPARING_ITEM, seq)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  search ({ commit, state }, queryString) {
    services.products.getSearchResult(queryString)
      .then((response) => {
        commit(types.GET_SEARCH_RESULT, response.data)
      })
      .catch((err) => {
        console.error(err)
      })
  },
  addComparing ({ commit, state }, obj) {
    services.products.addComparing(obj)
      .then((response) => {
        commit(types.ADD_COMPARING_ITEM, response.data)
        bus.$emit(types.HIDE_ADD_COMPARE_ITEM_MODAL)
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

const mutations = {
  [types.GET_COMPARING_LIST] (state, data) {
    state.comparingList = data
  },
  [types.GET_COMPARING_ITEM] (state, data) {
    Vue.set(state.comparingItems, String(data.seq), data.data)
  },
  [types.UPDATE_COMPARING_ITEM_TITLE] (state, obj) {
    for (let i in state.comparingList) {
      let item = state.comparingList[i]
      if (item.seq === obj.seq) {
        item.title = obj.title
        break
      }
    }
  },
  [types.REMOVE_COMPARING_ITEM] (state, seq) {
    for (let i in state.comparingList) {
      if (state.comparingList[i].seq === seq) {
        state.comparingList.splice(i, 1)
        break
      }
    }
  },
  [types.GET_SEARCH_RESULT] (state, data) {
    state.seasrchResultList = data
    if (data.length > 0) {
      state.title = data[0].name
    }
  },
  [types.ADD_COMPARING_ITEM] (state, data) {
    state.comparingList.push(data)
  },
  changeTitle (state, text) {
    state.title = text
  },
  resetList (state) {
    state.seasrchResultList = []
    state.title = ''
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
