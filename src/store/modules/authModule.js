import * as types from '../../constants'
import { services } from '../api'
import bus from '../../lib/eventBus.js'

const state = {
  loginMember: {},
  message: ''
}

const getters = {
  message: state => state.message,
  memberName: state => state.loginMember.name ? state.loginMember.name : '',
  memberTeam: state => state.loginMember.team ? state.loginMember.team : '',
  memberGrade: (state) => {
    switch (state.loginMember.grade) {
      case '0' :
        return '대표'
      case '1' :
        return '매니저'
      case '2' :
        return '사원'
      default :
        return ''
    }
  },
  memberJoinDate: state => state.loginMember.joinDate ? state.loginMember.joinDate.substring(0, 10) : '-'
}

const actions = {
  login ({ commit, state }, obj) {
    services.auth.login(obj)
      .then((response) => {
        commit(types.LOGIN, response.data)
      })
      .catch((err) => {
        console.error(err)
      })
  },
  logout ({ commit, state }, id) {
    services.auth.logout(id)
      .then((response) => {
        commit(types.LOGOUT, response.data)
      })
      .catch((err) => {
        console.error(err)
      })
  },
  session ({ commit, state }, obj) {
    if (!types.isDev) {   // 개발환경에선 pass through
      services.auth.getSession(obj)
        .then((response) => {
          commit(types.GET_SESSION, response.data)
        })
        .catch((err) => {
          bus.$emit(types.EVENT.NO_SESSION)
          console.error(err)
        })
    }
  }
}

const mutations = {
  [types.LOGIN] (state, obj) {
    if (obj.result) {
      bus.$emit(types.EVENT.LOGIN_SUCCESS)
    } else {
      state.message = obj.message
    }
  },
  [types.LOGOUT] (state, obj) {
    state.loginMember = {}
    bus.$emit(types.EVENT.LOGOUT_SUCCESS)
  },
  [types.GET_SESSION] (state, obj) {
    state.loginMember = obj
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
