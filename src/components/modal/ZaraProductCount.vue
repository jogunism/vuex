<template>
  <div id="modal_zara_product_count" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="modalLabel" data-toggle="modal" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="modalLabel">테스트 결과</h4>
        </div>
        <div class="modal-body">
          <!-- shipping detail -->
          <div v-if="total === null">
            <span class="rotate"><i class="fa fa-refresh" /></span>
          </div>
          <div v-else>
            <table class="table table-striped" role="grid">
              <tbody>
                <tr>
                  <th style="width: 10px">#</th>
                  <th>column</th>
                  <th>value</th>
                </tr>
                <tr>
                  <td style="width: 10px">1.</td>
                  <td>총 갯수</td>
                  <td>{{ total }}</td>
                </tr>
                <tr>
                  <td style="width: 10px">2.</td>
                  <td>소요시간</td>
                  <td>{{ time }}</td>
                </tr>
              </tbody>
            </table>
            <p>{{ message }}</p>
          </div>
          <!-- ./ shipping detail -->
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

export default {
  name: 'modal',
  data () {
    return {
      total: null,
      time: null,
      message: ''
    }
  },
  mounted () {
    this.$bus.$on(types.SHOW_PRODUCTLIST_SCHEDULER_TEST_MODAL, () => {
      this.total = null
      this.time = null
      this.message = ''
      $('#modal_zara_product_count').modal('show')
    })
    this.$bus.$on(types.PRODUCTLIST_SCHEDULER_RESULT, (args) => {
      this.total = args.total > 0 ? args.total + ' 건' : '-'
      this.time = args.time !== '0' ? args.time : '-'
      if (parseInt(args.total) < 0) {
        this.message = '오류가 발생했습니다. 개발자를 갈궈주세요.'
      }
    })
  },
  methods: {
    confirm () {
      $('#modal_zara_product_count').modal('hide')
    }
  }
}
</script>

<style lang="sass" scoped>
  @import '../../assets/scss/ZaraProductCount.scss'
</style>
