<template>
  <div class="col-md-4 item">
    <div class="box box-primary">
      <div class="box-header with-border">
        <input type="text" ref="title" readonly="true"
            :value="makeTitle(this.data.title)"
            v-on:keyup.enter="changeTitle"
            @click="inputClick"
            @blur="inputBlur" />
        <a @click="remove"><span class="delete"><i class="fa fa-trash-o" /></span></a>
      </div>
      <div class="box-body">
        <div class="table-responsive">
          <table class="table no-margin">
            <tbody>
              <tr v-for="(product, index) in this.items[this.data.seq]"
                  :key="product.productId"
                  :class="index === 0 ? 'first' : ''" >
                <td><a :href="product.url" target=_blank><span>{{ mallName(product.mallId) }}</span></a></td>
                <td><span class="price"><i class="fa fa-krw"></i> {{ priceFormat(product.totalPrice) }}</span></td>
                <td>
                  <span v-if="product.dcPrice > 0">{{ priceFormat(product.dcPrice) }}
                    <small class="strike">{{ priceFormat(product.orgPrice) }}</small>
                  </span>
                  <span v-else>{{ priceFormat(product.orgPrice) }}</span>
                </td>
                <td><span>{{ priceFormat(product.shippingFees) }}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="overlay" v-if="this.items[this.data.seq] && this.items[this.data.seq].length < 1">
        <i class="fa fa-refresh fa-spin"></i>
      </div>
    </div>
  </div>
</template>

<script>
import * as util from '../../util/stringUtil'
import * as formatter from '../../util/priceFormatter'
import { mapGetters } from 'vuex'

export default {
  name: 'comparing-item',
  props: {
    data: {
      type: Object
    }
  },
  computed: {
    ...mapGetters({
      items: 'comparingItems'
    })
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    makeTitle (title) {
      return util.makeDotString(title, 30)
    },
    mallName (id) {
      return util.mallName(id)
    },
    priceFormat (price) {
      return formatter.numberWithCommas(price)
    },
    inputBlur () {
      $(this.$refs.title).attr('readonly', true)
      $(this.$refs.title).val(this.makeTitle(this.data.title))
    },
    inputClick () {
      $(this.$refs.title).attr('readonly', false)
      $(this.$refs.title).val(this.data.title)
    },
    changeTitle () {
      this.$store.dispatch('updateComparingItemTitle', {
        seq: this.data.seq,
        title: this.$refs.title.value
      })
      $(this.$refs.title).attr('readonly', true)
    },
    remove () {
      this.$store.dispatch('removeComparingItem', this.data.seq)
    },
    fetchData () {
      this.$store.dispatch('getComparingItem', this.data.seq)
    }
  }
}
</script>

<style lang="sass" scoped>
  @import '../../assets/scss/Comparing.scss'
</style>
