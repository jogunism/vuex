import { $http } from '../../../lib/http'
import qs from 'qs'

export default {

  /* monitoring */
  getList (obj = {}) {
    return $http.get('/api/monitoring/productList', { params: obj })
          .then((response) => Promise.resolve(response))
          .catch((error) => Promise.reject(error))
  },
  getProductShippingDetail (id = '') {
    return $http.get('/api/monitoring/productShippingDetail', { params: {productId: id} })
          .then((response) => Promise.resolve(response))
          .catch((error) => Promise.reject(error))
  },

  /* comparing */
  getComparingList () {
    return $http.get('/api/comparing/list')
          .then((response) => Promise.resolve(response))
          .catch((error) => Promise.reject(error))
  },
  getComparingItem (seq) {
    return $http.get('/api/comparing/item', {params: {seq: seq}})
          .then((response) => Promise.resolve(response))
          .catch((error) => Promise.reject(error))
  },
  updateComparingItemTitle (obj) {
    return $http.put('/api/comparing/itemTitle', qs.stringify(obj, {arrayFormat: 'brackets'}))
          .then((response) => Promise.resolve(response))
          .catch((error) => Promise.reject(error))
  },
  removeComparingItem (seq) {
    return $http.delete('/api/comparing/item', {params: {seq: seq}})
          .then((response) => Promise.resolve(response))
          .catch((error) => Promise.reject(error))
  },
  getSearchResult (queryString) {
    return $http.get('/api/comparing/search', {params: {queryString: queryString}})
          .then((response) => Promise.resolve(response))
          .catch((error) => Promise.reject(error))
  },
  addComparing (obj = {}) {
    return $http.post('/api/comparing/item', qs.stringify(obj, {arrayFormat: 'brackets'}))
          .then((response) => Promise.resolve(response))
          .catch((error) => Promise.reject(error))
  }

}
