const env = import.meta.env.MODE || 'development'

const EnvConfig = {
  development: {
    baseApi: 'http://localhost:3000/blogAdmin',
    mockApi: '线上mock地址，若后台某个接口缺少数据可以使用'
  },
  test: {
    baseApi: 'http://******测试地址',
    mockApi: '线上mock地址，若后台某个接口缺少数据可以使用'
  },
  pro: {
    baseApi: 'http://*******上线地址',
    mockApi: '线上mock地址，若后台某个接口缺少数据可以使用'
  }
}

export default {
  env,
  // mock的总开关，当为true时都是获取mock数据
  mock: false,
  ...EnvConfig[env]
}
