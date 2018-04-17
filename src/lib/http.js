import axios from 'axios'
import * as cookie from '../util/cookieHandler'

export const $http = axios.create({
  // baseURL: types.BASE_URL,
  headers: {
    'Authorization': cookie.loginMember() ? cookie.loginMember()['token'] : null,
    // 'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
