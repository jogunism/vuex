
import * as types from '../constants'

const cookieData = document.cookie
const token = '_token'

export function loginMember () {
  let email = getCookie('user_email') || null
  let loginId = getCookie('user_id') || null
  return {
    id: loginId,
    email: email,
    token: loginId ? getCookie(loginId + token) : null
  }
}

export function getCookie (cName) {
  cName = cName + '='
  let start = cookieData.indexOf(cName)
  let cValue = ''
  if (start !== -1) {
    start += cName.length
    let end = cookieData.indexOf(';', start)
    if (end === -1) {
      end = cookieData.length
    }
    cValue = cookieData.substring(start, end)
  }
  return unescape(cValue)
}

export function isLogined () {
  // console.log(loginMember()['token'])
  return types.isDev || loginMember()['token'] !== null // 개발환경에선 pass through
}

export function keepUserId () {
  return getCookie(loginMember()['id'] + '_keep') === '1'
}

export function getloginMemberEmail () {
  return loginMember()['email']
}
