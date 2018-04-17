import './lib/css'
import './lib/script'
import './lib/global'

import Vue from 'vue'
import Vuex from 'vuex'
import App from './components/App'
import EventBus from './lib/eventBus.js'
import router from './router/index.js'
import store from './store/index.js'
import inputmask from 'v-inputmask'

Vue.config.productionTip = false
Vue.prototype.$bus = EventBus
Vue.use(Vuex)
Vue.use(inputmask)

/* eslint-disable no-new */
new Vue({
  store,
  router,
  el: '#app',
  template: '<App/>',
  components: { App }
})
