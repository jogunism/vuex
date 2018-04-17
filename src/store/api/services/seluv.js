import { $http } from '../../../lib/http'
import qs from 'qs'

export default {

  getCategoryList (obj = {}) {
    return $http.get('/api/seluv/zara/category/list', { params: obj })
          .then((response) => Promise.resolve(response))
          .catch((error) => Promise.reject(error))
  },

  categoryUpdate (obj = {}) {
    return $http.put('/api/seluv/zara/category/update', qs.stringify(obj, {arrayFormat: 'brackets'}))
          .then((response) => Promise.resolve(response))
          .catch((error) => Promise.reject(error))
  },

  testZaraProductGetheringAPI () {
    return $http.get('/api/seluv/zara/test/scheduler/link')
          .then((response) => Promise.resolve(response))
          .catch((error) => Promise.reject(error))
  }

}
