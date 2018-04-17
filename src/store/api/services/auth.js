import { $http } from '../../../lib/http'

export default {

  login (obj = {}) {
    return $http.get('/api/auth/login', { params: obj })
          .then((response) => Promise.resolve(response))
          .catch((error) => Promise.reject(error))
  },

  logout (id = '') {
    return $http.get('/api/auth/logout', { params: {email: id} })
          .then((response) => Promise.resolve(response))
          .catch((error) => Promise.reject(error))
  },

  getSession (obj = {}) {
    return $http.get('/api/auth/getSession', { params: obj })
          .then((response) => Promise.resolve(response))
          .catch((error) => Promise.reject(error))
  }

}
