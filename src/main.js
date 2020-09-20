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
import TreeTable from 'vue-table-with-tree-grid'
// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// require styles 导入富文本编辑器对应的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(MyHttpServer)
Vue.use(moment)
// 将富文本编辑器，注册为全局可用的组件
Vue.use(VueQuillEditor)

/* eslint-disable no-new */
Vue.filter('fmtdate', (v) => {
  return moment(v).format('YYYY-MM-DD')
}// 全局时间过滤器
)
// 全局注册自定义组件
Vue.component('my-bread', myBread)
Vue.component('tree-table', TreeTable)

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
