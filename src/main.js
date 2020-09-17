// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import MyHttpServer from './plugins/http'
import moment from 'moment'
import myBread from './common/mybread.vue'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(MyHttpServer)
Vue.use(moment)
/* eslint-disable no-new */
Vue.filter('fmtdate', (v) => {
  return moment(v).format('YYYY-MM-DD')
}// 全局时间过滤器
)
// 全局注册自定义组件
Vue.component('my-bread', myBread)

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
