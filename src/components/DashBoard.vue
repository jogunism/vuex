<template>
  <div id="app" class="wrapper" style="height: auto; min-height: 100%;">
    <VEHeader />
    <VELeftMenu />
    <VEContent
      :category=this.$route.params.category
      :id=this.$route.params.id />
    <VEFooter />
  </div>
</template>

<script>
import * as cookie from '../util/cookieHandler'
import * as types from '../constants'
import VEHeader from './Header.vue'
import VELeftMenu from './LeftMenu.vue'
import VEContent from './Content.vue'
import VEFooter from './Footer.vue'

export default {
  data () {
    return {
    }
  },
  created () {
    this.$bus.$on([types.EVENT.LOGOUT_SUCCESS, types.EVENT.NO_SESSION], () => {
      window.location.href = '/#/login'
    })
  },
  mounted () {
    if (!cookie.isLogined()) {
      window.location.href = '/#/login'
    } else {
      console.log(cookie.loginMember())
      this.$store.dispatch('session', cookie.loginMember())
    }
  },
  components: {
    VEHeader,
    VELeftMenu,
    VEContent,
    VEFooter
  },
  methods: {
  }
}
</script>
