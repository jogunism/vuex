<template>
  <div id="login">
    <span class="range"><strong>RANGE</strong> INTERNATIONAL GmbH</span>
    <div class="content">
      <p class="title">Login</p>
      <p class="sub-title">Log in to your Ship-on account</p>
      <div class="form">
        <div class="left"><span class="form-title">Email Address</span></div>
        <div class="form-group">
          <input class="form-control" maxlength="30" ref="email"
            v-model.trim="email" />
        </div>
        <div class="left"><span class="form-title">Password</span></div>
        <div class="form-group">
          <input class="form-control" maxlength="30" type="password" ref="password"
            v-model.trim="password"
            v-on:keyup.enter="login" />
        </div>
        <p class="left">
          <input class="checkbox" type="checkbox" v-model="checked" />
          <span class="form-title">Remember Email</span>
        </p>
        <p class="left message">
          <span class="warn">{{message}}</span>
        </p>
        <p>
          <button type="submit" class="btn btn-primary" v-on:click="login">Login</button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import * as util from '../util/cookieHandler'
import * as types from '../constants'
import { mapGetters } from 'vuex'
import crypto from 'crypto'

export default {
  name: 'login',
  data () {
    return {
      email: util.getCookie('user_email'),
      password: null,
      checked: util.keepUserId()
    }
  },
  created () {
    this.$bus.$on(types.EVENT.LOGIN_SUCCESS, () => {
      window.location.href = '/'
    })
  },
  mounted () {
    // if (util.isLogined()) {
    //   window.location.href = '/'
    // }
  },
  computed: {
    ...mapGetters({
      message: 'message'
    })
  },
  methods: {
    formValidation () {
      var result = true
      var ref
      for (ref in this.$refs) {
        $(this.$refs[ref]).parent().removeClass('has-error has-feedback').find('span').remove()
      }
      for (ref in this.$refs) {
        if ($(this.$refs[ref]).val() === '') {
          $(this.$refs[ref]).parent().addClass('has-error has-feedback')
              .append('<span class="glyphicon glyphicon-remove form-control-feedback"></span>')
          result = false
        }
      }
      return result
    },
    login () {
      if (this.formValidation()) {
        this.$store.dispatch('login', {
          email: this.email,
          password: crypto.createHmac(types.CRYPTO_ENC, this.password).digest('hex'),
          rememberEmail: this.checked
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/scss/Login.scss'
</style>
