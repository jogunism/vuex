<template>
  <div id="modal_shipping_detail" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="modalLabel" data-toggle="modal" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="modalLabel">{{ title }}</h4>
        </div>
        <div class="modal-body">
          <!-- shipping detail -->
          <div class="average">
            <span>배송기간(전주) <span class="sub">평균 {{ this.detail.shippingAverage }}일이내</span></span>
          </div>
          <table class="table" role="grid">
            <thead>
              <tr>
                <th class="">3일이내</th>
                <th class="">4일이내</th>
                <th class="">5~6일</th>
                <th class="">6일이상</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ this.detail.shippingWithin3Days }} ({{ this.detail.shippingWithin3DaysRates }}%)</td>
                <td>{{ this.detail.shippingWithin4Days }} ({{ this.detail.shippingWithin4DaysRates }}%)</td>
                <td>{{ this.detail.shippingWithinWeek }} ({{ this.detail.shippingWithinWeekRates }}%)</td>
                <td>{{ this.detail.shippingWeekOver }} ({{ this.detail.shippingWeekOverRates }}%)</td>
              </tr>
            </tbody>
          </table>
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
import { mapGetters } from 'vuex'

export default {
  name: 'modal',
  computed: {
    ...mapGetters({
      detail: 'shippingDetail'
    })
  },
  data () {
    return {
      title: ''
    }
  },
  mounted () {
    this.$bus.$on(types.SHOW_SHIPPING_DETAIL_MODAL, (args) => {
      this.fetchData(args.productId)
      this.title = args.productName
      $('#modal_shipping_detail').modal('show')
    })
  },
  methods: {
    fetchData (productId) {
      this.$store.dispatch('getProductShippingDetail', productId)
    },
    confirm () {
      $('#modal_shipping_detail').modal('hide')
    }
  }
}
</script>

<style lang="sass" scoped>
  @import '../../assets/scss/ShippingDetail.scss'
</style>
