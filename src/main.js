import Vue from 'vue'
import VueRouter from 'vue-router'
import VirtualCollection from 'vue-virtual-collection'
import Fragment from 'vue-fragment'
import App from './App.vue'
import routes from './routes'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VirtualCollection)
Vue.use(Fragment.Plugin)

const router = new VueRouter({routes})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
