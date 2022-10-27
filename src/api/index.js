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
  },

  // home
  // 总数统计
  getCountTotal() {
    return request({
      url: '/statistics/countTotal',
      method: 'get'
    })
  },
  // 访客统计
  accessUserCount(params) {
    return request({
      url: 'statistics/accessUserStatistics',
      method: 'get',
      data: params
    })
  },
  // 用户统计
  userCount(params) {
    return request({
      url: 'statistics/userStatistics',
      method: 'get',
      data: params
    })
  },
  // 文章统计
  articleCount(params) {
    return request({
      url: 'statistics/articleStatistics',
      method: 'get',
      data: params
    })
  },
  // 留言统计
  messageCount(params) {
    return request({
      url: 'statistics/messageStatistics',
      method: 'get',
      data: params
    })
  },
  // 访客排名统计
  accessUserRank(params) {
    return request({
      url: 'statistics/accessUserList',
      method: 'get',
      data: params
    })
  },
  // 用户排名
  userListRank(params) {
    return request({
      url: 'statistics/userList',
      method: 'get',
      data: params
    })
  },
  // 文章排名
  articleRank(params) {
    return request({
      url: 'statistics/articleList',
      method: 'get',
      data: params
    })
  },
  // 留言排名
  messageRank(params) {
    return request({
      url: 'statistics/messageList',
      method: 'get',
      data: params
    })
  }
}
