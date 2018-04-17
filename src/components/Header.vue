<template>
  <header id="header" class="main-header">
    <a href="/" class="logo">
      <span class="logo-mini"><img src="http://file.shipon.de/asset/ci.png" /></span>
      <span class="logo-lg"><b>RANGE</b> CONSOLE</span>
    </a>

    <nav class="navbar navbar-static-top">
      <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
        <span class="sr-only">Toggle navigation</span>
      </a>

      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">

          <!-- User Account -->
          <li class="dropdown user user-menu">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <span class="">{{ memberName }}</span>
            </a>
            <ul class="dropdown-menu">
              <!-- User image -->
              <li class="user-header">
                <p>
                  <span class="name">{{ memberName }}</span><br />
                  <span class="group">{{ memberTeam }} {{ memberGrade }}</span>
                  <small>since {{ memberJoinDate }}</small>
                </p>
              </li>
              <!-- Menu Footer-->
              <li class="user-footer">
                <div class="pull-left">
                  <a class="btn btn-default btn-flat" @click="changeProfile">Profile</a>
                </div>
                <div class="pull-right">
                  <a @click="logout" class="btn btn-default btn-flat">Log out</a>
                </div>
              </li>
            </ul>
          </li>
          <!-- ./ User Account -->

        </ul>
      </div>
    </nav>
    <ChangeProfileModal />
  </header>
</template>

<script>
import ChangeProfileModal from './modal/ChangeProfile.vue'
import * as util from '../util/cookieHandler'
import * as types from '../constants'
import { mapGetters } from 'vuex'

export default {
  name: 'vw-header',
  computed: {
    ...mapGetters({
      memberName: 'memberName',
      memberTeam: 'memberTeam',
      memberGrade: 'memberGrade',
      memberJoinDate: 'memberJoinDate'
    })
  },
  components: {
    ChangeProfileModal
  },
  methods: {
    changeProfile () {
      this.$bus.$emit(types.SHOW_CHANGE_PROFILE_MODAL, null)
    },
    logout () {
      this.$store.dispatch('logout', util.getloginMemberEmail())
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/scss/Header.scss'
</style>
