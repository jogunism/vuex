<template>
  <section class="content" id="comparing">
    <div class="row">
      <!-- v-for -->
      <vw-item v-for="comparing in this.list"
              :key="comparing.seq"
              :data="comparing" />
      <!-- ./ v-for -->
    </div>
    <div class="row">
      <div class="col-md-1 plus">
        <div class="box box-primary">
          <div class="box-body no-padding">
            <a href="javascript:void(0)" @click="addItem()">
              <span class="info-box-icon"><i class="fa fa-plus"></i></span>
            </a>
          </div>
        </div>
      </div>
    </div>
    <AddItemModal />
  </section>
</template>

<script>
import item from './ComparingItem.vue'
import AddItemModal from '../modal/AddCompareItem.vue'
import * as types from '../../constants'
import { mapGetters } from 'vuex'

export default {
  name: 'comparing',
  components: {
    'vw-item': item,
    AddItemModal
  },
  computed: {
    ...mapGetters({
      list: 'comparingList'
    })
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.$store.dispatch('getComparingList')
    },
    addItem () {
      this.$bus.$emit(types.SHOW_ADD_COMPARE_ITEM_MODAL, {})
    }
  }
}
</script>

<style lang="sass" scoped>
  @import '../../assets/scss/Comparing.scss'
</style>
