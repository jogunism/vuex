<template>
  <div id="modal_change_profile" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="modalLabel" data-toggle="modal" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="modalLabel">프로필 변경</h4>
        </div>
        <div class="modal-body">
          <!-- change profile -->
          <form class="form-horizontal">
            <div class="box-body">
              <div class="form-group">
                <label for="inputMobile" class="col-sm-2 control-label">Mobile</label>
                <div class="col-sm-10">
                  <input type="mobile" class="form-control" id="inputMobile"
                          placeholder="0176 123456789" v-inputmask="'999[9] 9999999[9]'" />
                </div>
              </div>
              <div class="form-group">
                <label for="inputEmail" class="col-sm-2 control-label">Email</label>
                <div class="col-sm-10">
                  <input type="email" class="form-control" id="inputEmail" placeholder="id@mail.com" />
                </div>
              </div>
              <div class="form-group">
                <label for="inputDate" class="col-sm-2 control-label">Birthday</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" id='inputDate'
                          placeholder="1990-01-01" v-inputmask="'yyyy-mm-dd'"/>
                </div>
              </div>
              <div class="form-group password">
                <label for="inputPassword" class="col-sm-2 control-label"><span class="warn">*</span>Password</label>
                <div class="col-sm-10">
                  <input type="password" class="form-control" id="inputPassword" maxlength="30" />
                </div>
                <br /><br />
                <label for="inputPasswordConfirm" class="col-sm-2 control-label"></label>
                <div class="col-sm-10">
                  <input type="password" class="form-control" id="inputPasswordConfirm" maxlength="30"
                    @keyup="passwordDetact" />
                  <span class="help-block">Passwords do not match</span>
                </div>
              </div>
            </div>
          </form>
          <!-- ./ change profile -->
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="confirm">확인</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as types from '../../constants'
import { mapGetters } from 'vuex'

export default {
  name: 'profile_modal',
  computed: {
    ...mapGetters({
      loginMember: 'loginMember'
    })
  },
  mounted () {
    this.$bus.$on(types.SHOW_CHANGE_PROFILE_MODAL, (args) => {
      $('#modal_change_profile').modal('show')
    })
  },
  methods: {
    passwordDetact () {
      let password = $('#inputPassword').val()
      let passconfirm = $('#inputPasswordConfirm').val()
      if (passconfirm !== '' && password !== passconfirm) {
        $('.password').addClass('has-error').find('.help-block').show()
      } else {
        $('.password').removeClass('has-error').find('.help-block').hide()
      }
    },
    confirm () {
      console.log('confirm')
    }
  }
}
</script>

<style lang="sass" scoped>
  @import '../../assets/scss/ChangeProfile.scss'
</style>
