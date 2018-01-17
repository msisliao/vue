import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Demo from '@/components/demo-vuex'
import Mindex from '@/components/Mindex'
import Mshow from '@/components/Martshow'
import Msearsh from '@/components/MsearshPage'



const First = { template: '<div><h2>我是第 1 个子页面</h2></div>' }
import Second from '@/components/secondcomponent'

import VueResource from 'vue-resource'
Vue.use(VueResource);
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      component: Mindex,
      meta: { keepAlive: true }
    },
    {
      path: '/first',
      component: First
    },
    {
      path: '/MsearshPage',
      component: Msearsh
    },
    {
      path: '/movie/:id',
      component: Mshow
    }
  ]
})

