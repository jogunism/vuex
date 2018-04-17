import * as types from '../../constants'
import { services } from '../api'

const state = {
  totalCount: 0,
  list: [],
  shippingDetail: {}
}

const getters = {
  totalCount: state => state.totalCount,
  list: state => state.list,
  shippingDetail: state => state.shippingDetail
}

const actions = {
  getList ({ commit, state }, obj) {
    services.products.getList(obj)
      .then((response) => {
        commit(types.GET_PRODUCT_LIST, response.data)
      })
      .catch((err) => {
        console.error(err)
      })
  },
  getProductShippingDetail ({ commit, state }, obj) {
    services.products.getProductShippingDetail(obj)
      .then((response) => {
        commit(types.GET_PRODUCT_SHIPPING_DETAIL, response.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

const mutations = {
  [types.GET_PRODUCT_LIST] (state, data) {
    state.totalCount = data.totalCount
    state.list = data.list
  },
  [types.GET_PRODUCT_SHIPPING_DETAIL] (state, data) {
    state.shippingDetail = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
