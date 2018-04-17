<template>
  <div id="modal_add_compare_item" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="modalLabel" data-toggle="modal" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="close()"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="modalLabel">가격비교 추가</h4>
        </div>
        <div class="modal-body">
          <!-- -->
          <div class="search_area">
            <i class="fa fa-search"></i>
            <input type="search" class="form-control input-sm" placeholder="ProductId or Text"
                v-model="queryString"
                v-on:keyup.enter="search" />
          </div>
          <div class="result_area">
            <div class="title" v-if="(this.list.length > 0 || this.selectedProducts.length > 0)">
              <input type="text" ref="titleText" :value="title" v-on:keyup="changeTitle" />
            </div>
            <div class="selected_list" v-if="this.selectedProducts.length > 0">
              <!-- selectedItem -->
              <selectedItem v-for="product in this.selectedProducts"
                        :key="product.productId"
                        :product="product"
                        :remove-selected-product="removeSelectedProduct" />
            </div>
            <div class="list" v-if="this.list.length > 0">
              <table class="table table-bordered table-hover" role="grid">
                <tbody>
                  <tr v-for="product in this.list" :key="product.productId">
                    <td class="check_box">
                      <input type="checkbox" :value="product"
                          v-model="selectedProducts" />
                    </td>
                    <td class="mall_name">{{ mallName(product.mallId) }}</td>
                    <td><a :href="product.url" target=_blank>{{ product.name }}</a></td>
                    <td class="price_info">
                      <i class="fa fa-krw"></i> {{ getTotalPrice(product.orgPrice, product.dcPrice, product.shippingFees) }}
                      <br />
                      <span class="price" v-if="product.dcPrice > 0">
                        {{ priceFormat(product.dcPrice) }} <small class="strike">{{ priceFormat(product.orgPrice) }}</small>
                      </span>
                      <span class="price" v-else>{{ priceFormat(product.orgPrice) }}</span>
                      <span class="price"> / </span>
                      <span class="price" v-if="product.shippingFees === 0">무료</span>
                      <span class="price" v-else>{{ priceFormat(product.shippingFees) }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="list" v-else>
              <div class="no_results">
                <span>No Results</span>
              </div>
            </div>
          </div>
          <!-- ./ -->
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="confirm">저장</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import selectedItem from './AddCompareItemSelected.vue'
import * as util from '../../util/stringUtil.js'
import * as types from '../../constants'
import * as formatter from '../../util/priceFormatter'
import { mapGetters } from 'vuex'

export default {
  name: 'modal',
  data () {
    return {
      queryString: '',
      selectedProducts: []
    }
  },
  mounted () {
    this.$bus.$on(types.SHOW_ADD_COMPARE_ITEM_MODAL, () => {
      $('#modal_add_compare_item').modal('show')
    })
    this.$bus.$on(types.HIDE_ADD_COMPARE_ITEM_MODAL, () => {
      $('#modal_add_compare_item').modal('hide')
    })
  },
  computed: {
    ...mapGetters({
      list: 'seasrchResultList',
      title: 'title'
    })
  },
  components: {
    selectedItem
  },
  methods: {
    changeTitle () {
      this.$store.commit('changeTitle', this.$refs.titleText.value)
    },
    mallName (id) {
      return util.mallName(id)
    },
    priceFormat (price) {
      return formatter.numberWithCommas(price)
    },
    getTotalPrice (orgPrice, dcPrice, shippingFees) {
      if (dcPrice > 0) {
        return this.priceFormat(dcPrice + shippingFees)
      } else {
        return this.priceFormat(orgPrice + shippingFees)
      }
    },
    removeSelectedProduct (product) {
      for (let i = 0; i < this.selectedProducts.length; i++) {
        if (this.selectedProducts[i] === product) {
          this.selectedProducts.splice(i, 1)
          break
        }
      }
    },
    search () {
      this.$store.dispatch('search', this.queryString)
    },
    confirm () {
      let arr = []
      for (let i = 0; i < this.selectedProducts.length; i++) {
        arr.push(this.selectedProducts[i].productId)
      }
      this.$store.dispatch('addComparing', {
        title: this.title,
        products: arr
      })
    },
    close () {
      this.reset()
    },
    reset () {
      this.queryString = ''
      this.selectedProducts = []
      this.$store.commit('resetList')
    }
  }
}
</script>

<style lang="sass" scoped>
  @import '../../assets/scss/AddCompareItem.scss'
</style>
