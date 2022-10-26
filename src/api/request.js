import axios from 'axios'
// import { ElMessage } from 'element-plus'
import config from '@/config'

const service = axios.create({
  baseURL: config.baseApi,
  timeout: 1000 * 10,
  withCredentials: false,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
})
// 请求拦截器
service.interceptors.request.use((req) => {
  //自定义header 为每次请求添加token
  if (localStorage.getItem('token')) {
    req.headers['Authorization'] =
      'Bearer ' + JSON.parse(localStorage.getItem('token'))
  }
  return req
})
// 响应拦截器
service.interceptors.response.use((res) => {
  if (res.status == 200) {
    if (res.data) {
      const { code, data, msg } = res.data

      if (code == 10000) {
        return data
      } else {
        //网络请求错误
        // eslint-disable-next-line no-undef
        ElMessage.error(msg || '网络请求错误')
        return Promise.reject(msg || 'NETWORK_ERROR')
      }
    }
  }
})

// 封装核心函数
function request(options) {
  //
  options.method = options.method || 'get'
  if (options.method.toLowerCase() == 'get') {
    options.params = options.data
  }
  //对mock的处理
  let isMock = config.mock
  if (typeof options.mock !== 'undefined') {
    isMock = options.mock
  }
  //对线上环境进行处理
  if (config.env == 'prod') {
    service.defaults.baseURL = config.baseApi
  } else {
    service.defaults.baseURL = isMock ? config.mockApi : config.baseApi
  }
  return service(options)
}
export default request
