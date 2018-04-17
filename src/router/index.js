import Vue from 'vue'
import Router from 'vue-router'
import DashBoard from '@/components/DashBoard'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'DashBoard',
      component: DashBoard
    },
    {
      path: '/seluv/:category/:id',
      name: 'Seluv',
      component: DashBoard
    },
    {
      path: '/:category',
      name: 'Comparing',
      component: DashBoard
    },
    {
      path: '/:category/:id',
      name: 'Monitoring',
      component: DashBoard
    }
    // {
    //   path: '/coins/:id',
    //   name: 'Coins',
    //   component: Coins
    // }
    // todo : https://scotch.io/tutorials/getting-started-with-vue-router
  ]
})
