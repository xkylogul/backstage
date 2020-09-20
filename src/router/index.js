import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login/login.vue'
import Home from '../components/home/home.vue'
import Users from '../components/users/users.vue'
import Rights from '../components/rights/rights.vue'
import Roles from '../components/roles/roles.vue'
import goods from '../components/goodManage/goods.vue'
import params from '../components/goodManage/params.vue'
import categories from '../components/goodManage/categories.vue'
import addGoods from '../components/goodManage/addGoods.vue'
import Orders from '../components/orders/orders.vue'
import Reports from '../components/reports/reports.vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(Router)
Vue.use(NProgress)
// 解决首页路由重复点击报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new Router({
  routes: [
    {path: '/', redirect: '/login'},
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home',
      path: '/home',
      component: Home,
      children: [
        {
          name: 'users',
          path: '/users',
          component: Users
        },
        {
          name: 'rights',
          path: '/rights',
          component: Rights
        },
        {
          name: 'roles',
          path: '/roles',
          component: Roles
        },
        {
          name: 'goods',
          path: '/goods',
          component: goods
        },
        {
          name: 'params',
          path: '/params',
          component: params
        },
        {
          name: 'categories',
          path: '/categories',
          component: categories
        },
        {
          name: 'addGoods',
          path: '/goods/add',
          component: addGoods
        },
        {
          name: 'orders',
          path: '/orders',
          component: Orders
        },
        {
          name: 'Reports',
          path: '/reports',
          component: Reports
        }
      ]
    }
  ]
})
// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  //     next()  放行    next('/login')  强制跳转

  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  NProgress.start()
  next()
})
export default router
