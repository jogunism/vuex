<template>
  <span :class="className(this.product.mallId)">
    <button type="button" aria-label="Close" @click="remove()"><span>&times;</span></button>
    {{ mallName(this.product.mallId) }} : {{ productTitle(this.product.name) }}
  </span>
</template>

<script>
import * as util from '../../util/stringUtil.js'

export default {
  name: 'selectedProduct',
  props: {
    product: {
      type: Object
    },
    removeSelectedProduct: {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    className (id) {
      let text = ''
      switch (id) {
        case 'doichi': text = 'label label-success'
          break
        case 'hieuro': text = 'label label-primary'
          break
        case 'euromoms': text = 'label label-warning'
          break
      }
      return text
    },
    mallName (id) {
      return util.mallName(id)
    },
    productTitle (name) {
      return util.makeDotString(name.replace(/ /gi, ''), 8)
    },
    remove () {
      this.removeSelectedProduct(this.product)
    }
  },
  beforeDestroy () {
    console.log('selected item removed')
  }
}
</script>

<style lang="sass" scoped>
  @import '../../assets/scss/AddCompareItem.scss'
</style>
