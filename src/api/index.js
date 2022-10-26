import request from './request'

export default {
  // 登录
  userLogin(params) {
    return request({
      url: '/user/login',
      method: 'post',
      data: params
    })
  },
  // 获取验图
  getRandomCode() {
    return request({
      url: '/user/getCode',
      method: 'get'
    })
  },
  // 获取邮箱验证码
  getEmailCode(params) {
    return request({
      url: 'user/sendEmail',
      method: 'post',
      data: params
    })
  },
  // 注册用户

  registerAdmin(params) {
    return request({
      url: '/user/register',
      method: 'post',
      data: params
    })
  }
}
// 获取菜单列表tree
