<template>
  <section id="zara_category" class="content">
    <div class="row">
      <div class="col-xs-12">
        <div class="box">
          <!-- box -->
          <form class="form-horizontal">
            <div class="box-body">
              <div class="box-header with-border">
                <span>카테고리 매칭</span>
              </div>
              <!-- v-for -->
              <div class="form-group"
                  v-for="category in this.list"
                  :key="category.cateogoryCode">
                <label class="col-sm-2 control-label">
                  <span v-if="category.process"><i class="fa fa-refresh rotating" /></span>
                  {{ categoryName(category.categoryName, category.categoryCode) }}
                </label>
                <label class="col-sm-1 control-label">{{ category.categoryCode }}</label>
                <div class="col-sm-9">
                  <textarea class="form-control" rows="2" placeholder="url ..."
                      :ref="category.categoryCode"
                      v-model="category.urls"
                      v-on:blur="onBlur(category.categoryCode)" />
                </div>
              </div>
              <!-- ./v-for -->
              <div class="button_area">
                <button type="button" class="btn btn-primary" @click="testAPI">테스트</button>
              </div>
            </div>
          </form>
          <!-- ./box -->
        </div>
      </div>
    </div>
    <ProductCountModal />
  </section>
</template>

<script>
import * as types from '../../../constants'
import ProductCountModal from '../../modal/ZaraProductCount.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'zara_category',
  mounted () {
    this.fetchData()
  },
  computed: {
    ...mapGetters({
      list: 'categoryList'
    })
  },
  components: {
    ProductCountModal
  },
  methods: {
    fetchData () {
      this.$store.dispatch('getCategoryList')
    },
    categoryName (name, code) {
      if (code.substr(0, 3) === '002') {
        return '여성 ' + name
      } else if (code.substr(0, 3) === '001') {
        return '남성 ' + name
      } else {
        return name
      }
    },
    onBlur (code) {
      let val = $(this.$refs[code]).val()
      this.$store.dispatch('categoryUpdate', {code: code, urls: val})
    },
    testAPI () {
      this.$bus.$emit(types.SHOW_PRODUCTLIST_SCHEDULER_TEST_MODAL)
      this.$store.dispatch('testProductListAPI')
    }
  }
}
</script>

<style lang="sass" scoped>
  @import '../../../assets/scss/ZaraCategory.scss'
</style>
