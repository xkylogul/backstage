import axios from 'axios'
import NProgress from 'nprogress'
const MyHttpServer = {}
MyHttpServer.install = (Vue) => {
  axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
  Vue.prototype.$http = axios
  // 添加请求拦截器
  axios.interceptors.request.use(function (config) {
  // 在 request 拦截器中，展示进度条 NProgress.start()
    console.log('拦截器触发')
    if (config.url !== 'login') {
      NProgress.start()
      const AUTH_TOKEN = window.localStorage.getItem('token')
      config.headers.common['Authorization'] = AUTH_TOKEN // 设置请求头token权限
    }
    return config
  }, function (error) {
  // 对请求错误做些什么
    return Promise.reject(error)
  })

  // 添加响应拦截器
  axios.interceptors.response.use(function (response) {
  // 在 response 拦截器中，隐藏进度条 NProgress.done()
    NProgress.done()
    return response
  }, function (error) {
  // 对响应错误做点什么
    return Promise.reject(error)
  })
}
export default MyHttpServer
