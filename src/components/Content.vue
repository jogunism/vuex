<template>
  <div class="content-wrapper" style="min-height: 1080px;">

    <!-- <div id="toast" style="padding: 20px 30px; background: rgb(243, 156, 18); z-index: 999999; font-size: 16px; font-weight: 600; display:none;">
      <a class="pull-right" href="#" data-toggle="tooltip" data-placement="left" title="" style="color: rgb(255, 255, 255); font-size: 20px;" data-original-title="Never show me this again!">×</a>
      <a href="https://themequarry.com" style="color: rgba(255, 255, 255, 0.9); display: inline-block; margin-right: 10px; text-decoration: none;">
        Ready to sell your theme? Submit your theme to our new marketplace now and let over 200k visitors see it!</a>
      <a class="btn btn-default btn-sm" href="https://themequarry.com" style="margin-top: -5px; border: 0px; box-shadow: none; color: rgb(243, 156, 18); font-weight: 600; background: rgb(255, 255, 255);">Let's Do It!</a>
    </div> -->

    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        {{ title }}
        <small>{{ subTitle }}</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="/"><i class="fa fa-dashboard"></i> Home</a></li>
        <li class="active">{{ getCategory() }}</li>
        <li v-show="id" class="active">{{ subTitle }}</li>
      </ol>
    </section>
    <div v-if="this.$props.category === 'zara'">
      <div v-if="this.$props.id === 'category'">
        <zaraCategory ref='zaraCategory' />
      </div>
      <div v-else-if="this.$props.id === 'products'">
      </div>
    </div>
    <div v-else-if="this.$props.category === 'monitoring'">
      <monitoring ref='monitoring' :id=this.$props.id />
    </div>
    <div v-else-if="this.$props.category === 'comparing'">
      <comparing ref='comparing' />
    </div>
  </div>
</template>

<script>
import monitoring from './contents/Monitoring.vue'
import comparing from './contents/Comparing.vue'
import zaraCategory from './contents/zara/Category.vue'
import * as util from '../util/stringUtil'

export default {
  name: 'contents',
  props: {
    category: {
      default: 'DashBoard'
    },
    id: {}
  },
  components: {
    zaraCategory,
    monitoring,
    comparing
  },
  data () {
    return {
      title: util.capitalizeFirstLetter(this.$props.category),
      subTitle: null
    }
  },
  mounted () {
    this.makeTitle()
    // this.showToast()
  },
  updated () {
    this.makeTitle()
    if (this.$props.category === 'monitoring') {
      this.$refs.monitoring.fetchData()
    }
  },
  methods: {
    getCategory () {
      return util.capitalizeFirstLetter(this.$props.category)
    },
    makeTitle () {
      // console.log(this.$props.category)
      // console.log(this.$props.id)
      switch (this.$props.category) {
        // seluv
        case 'zara':
          this.title = '자라'
          this.subTitle = util.capitalizeFirstLetter(this.$props.id)
          break

        // option
        case 'monitoring':
          this.title = util.mallName(this.$props.id)
          this.subTitle = util.capitalizeFirstLetter(this.$props.id)
          break
        case 'comparing':
          this.title = '가격비교'
          this.subTitle = 'Comparing'
          break
      }
    },
    showToast () {
      setTimeout(() => {
        $('#toast').show()
      }, 3000)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
