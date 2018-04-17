<template>

  <section id="monitoring" class="content">
    <div class="row">
      <div class="col-xs-12">
        <div class="box">
          <!-- box -->
          <div class="box-header">
          </div>
          <div class="box-body">
            <div class="dataTables_wrapper form-inline dt-bootstrap">
              <div class="row">
                <div class="col-sm-6">
                  <div class="dataTables_length">
                    <label>Show <select name="length" class="form-control input-sm"
                        @change="changeItem($event)">
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="200">200</option>
                      </select> entries ( {{ this.totalCount }} entries )
                    </label>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="dataTables_filter search_area">
                    <label><i class="fa fa-search"></i>
                      <input type="search" class="form-control input-sm" placeholder="ProductId or Text"
                        v-model="queryString"
                        v-on:keyup.enter="search">
                    </label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-12">
                  <table class="table table-bordered table-hover" role="grid">
                    <thead>
                      <tr role="row">
                        <th tabindex="0" rowspan="1" colspan="1">상품코드</th>
                        <th tabindex="0" rowspan="1" colspan="1">카테고리</th>
                        <th tabindex="0" rowspan="1" colspan="1">이미지</th>
                        <th tabindex="0" rowspan="1" colspan="1">상품명</th>
                        <th>구매평</th>
                        <th>배송</th>
                        <th class="" tabindex="0" rowspan="1" colspan="1">
                          가격<br /><small>판매가 / 배송료</small>
                        </th>
                      </tr>
                    </thead>
                    <tbody v-if="this.list.length > 0">
                      <tr role="row" :class="product.isNew"
                        v-for="product in this.list" :key="product.productId"
                        @click="viewDetail(product.shippingAverage, product.productId, product.name)">
                        <td>{{ product.productId }}</td>
                        <td>{{ product.category }}</td>
                        <td><img :src="product.thumbnail" width="50"></td>
                        <td>
                          <a :href="product.url" target=_blank>{{ product.name }}</a>
                          <small class="new" v-if="product.isNew !== ''">new</small>
                        </td>
                        <td>
                          <span v-if="product.evaluationCount > 0">{{ priceFormat(product.evaluationCount) }} 개</span>
                          <span v-else>-</span>
                        </td>
                        <td>
                          <span v-if="product.shippingAverage > 0">
                            {{ priceFormat(product.shippingWithin3Days + product.shippingWithin4Days + product.shippingWithinWeek + product.shippingWeekOver) }} 건
                          </span>
                          <span v-else>-</span>
                        </td>
                        <td>
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
                    <tbody v-else>
                      <tr role="row" class="odd">
                        <td colspan="7" height="100" class="loading">
                          <span>No Results</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-12 pagination">
                  <paginate
                    :page-count=this.pageCount()
                    :page-range=2
                    :force-page=this.page-1
                    :container-class="'pagination'"
                    :click-handler="go">
                  </paginate>
                </div>
              </div>
            </div>
          </div>
          <!-- ./box -->
        </div>
      </div>
    </div>
    <ShippingDetailModal />
  </section>

</template>

<script>
import Paginate from 'vuejs-paginate'
import ShippingDetailModal from '../modal/ShippingDetail.vue'
import * as types from '../../constants'
import * as formatter from '../../util/priceFormatter'
import { mapGetters } from 'vuex'

export default {
  name: 'monitoring',
  props: ['id'],
  data () {
    return {
      page: 1,
      count: 25,
      queryString: ''
    }
  },
  mounted () {
  },
  computed: {
    ...mapGetters({
      totalCount: 'totalCount',
      list: 'list'
    })
  },
  components: {
    'Paginate': Paginate,
    ShippingDetailModal
  },
  methods: {
    pageCount () {
      let value = Math.floor(this.totalCount / this.count)
      return value > 0 ? value : 1
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
    viewDetail (shippingAverage, productId, productName) {
      if (shippingAverage < 1) {
        return
      }
      this.$bus.$emit(types.SHOW_SHIPPING_DETAIL_MODAL, {
        productId: productId,
        productName: productName
      })
    },
    fetchData () {
      this.$data.mallId = this.$props.id
      this.$store.dispatch('getList', this.$data)
    },
    changeItem (e) {
      this.count = e.target.value
      this.page = 1
      this.fetchData()
    },
    search () {
      this.page = 1
      this.fetchData()
    },
    go (page) {
      this.page = page
      this.fetchData()
    }
  },
  beforeDestroy () {
    console.log('Monitoring destroy')
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/Monitoring.scss'
</style>
