import Vue from 'vue'
import router from './router'
import App from './App.vue'
import store from "./store";

import FastClick from "fastclick"
import LazyLoad from "vue-lazyload"

import toast from "components/common/toast"

Vue.config.productionTip = false

//Vue实例可以作为事件总线
Vue.prototype.$bus = new Vue()

//安装toast插件
Vue.use(toast)

//解决移动端300ms延迟
FastClick.attach(document.body)

//使用lazyload
Vue.use(LazyLoad, {
  loading: require('assets/img/common/placeholder.png')
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
