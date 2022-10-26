<template>
  <el-form
    ref="loginFormRef"
    :model="loginForm"
    :rules="rules"
    class="login-form"
  >
    <div class="title">Login</div>
    <el-form-item prop="name">
      <el-input
        v-model="loginForm.name"
        placeholder="请输入用户名或邮箱"
        :prefix-icon="User"
      />
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="loginForm.password"
        placeholder="请输入登录密码"
        :prefix-icon="Lock"
        type="password"
        show-password
      />
    </el-form-item>
    <el-form-item prop="randomCode">
      <el-row>
        <el-col :span="18"
          ><el-input
            v-model="loginForm.randomCode"
            placeholder="请输入验证码"
            :prefix-icon="Postcard"
        /></el-col>
        <el-col :span="6">
          <el-image
            :key="22"
            v-if="codeImg"
            :src="codeImg"
            alt="验证码"
            @click="changeCode"
          >
            <template #placeholder>
              <div class="image-slot">Loading<span class="dot">...</span></div>
            </template>
          </el-image>
        </el-col>
      </el-row>
    </el-form-item>

    <el-button type="success" @click="login">登录</el-button
    ><el-button type="warning" @click="toReg">注册</el-button>
  </el-form>
</template>

<script setup>
import { User, Lock, Postcard } from '@element-plus/icons-vue'
import { getCurrentInstance, reactive, ref, inject, computed } from 'vue'
import envConfig from '@/config'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const store = useStore()
const router = useRouter()
const { proxy } = getCurrentInstance()

// 动态路由表
const routerList = computed(() => {
  return store.state.menu.menuList
})
const loginFormRef = ref()
// 登录表单
const loginForm = reactive({
  name: '',
  password: '',
  randomCode: ''
})
// 登录验证规则
const rules = reactive({
  name: { required: true, message: '用户名不得为空', trigger: 'blur' },
  password: [
    { required: true, message: '密码不得为空', trigger: 'blur' },
    { min: 6, message: '密码长度不得小于6', trigger: 'blur' }
  ],
  randomCode: { required: true, message: '请输入验证码', trigger: 'blur' }
})
// 登录
const login = async () => {
  if (!loginFormRef.value) return
  await loginFormRef.value.validate(async (valid) => {
    if (valid) {
      try {
        const data = await proxy.$api.userLogin(loginForm)

        // eslint-disable-next-line no-undef
        ElMessage.success('登录成功')
        // 存储token及个人信息。
        store.commit('user/setToken', data.token)
        store.commit('user/setUserInfo', data.user)
        store.commit('menu/getMenuList', data.user.roleId.menuList)
        addRoute()
        // 登录成功跳转至管理页面，由于登录界面是管理系统唯一入口，不用考虑返回原来的页面
        router.push({ path: '/' })
        // 获取菜单列表

        resetForm()
      } catch (error) {
        return
      }
    } else {
      // eslint-disable-next-line no-undef
      ElMessage.error('请输入登录信息')
    }
  })
}
// 清空表单
const resetForm = () => {
  if (!loginFormRef.value) return
  loginFormRef.value.resetFields()
}

// 获取验证码
let codeImg = ref(`${envConfig.baseApi}/user/getCode?t=${new Date().getTime()}`)
const changeCode = () => {
  codeImg.value = `${envConfig.baseApi}/user/getCode?t=${new Date().getTime()}`
  loginForm.randomCode = ''
}

// 去注册
const panel = inject('panel')
const toReg = () => {
  panel.value = 'reg'
}
// 增加路由
const addRoute = () => {
  routerList.value.forEach((item) => {
    router.addRoute(item)
  })
}
</script>

<style lang="less">
.login-form {
  /* stylelint-disable-next-line selector-class-pattern */
  .el-form-item.is-error {
    /* stylelint-disable-next-line selector-class-pattern */
    .el-input__wrapper {
      box-shadow: 0 3px 0 -2px var(--el-color-error);
      /* stylelint-disable-next-line selector-class-pattern */
      .el-input__prefix-inner {
        color: var(--el-color-error);
      }
    }
  }
  /* stylelint-disable-next-line selector-class-pattern */
  .el-input__wrapper {
    padding-left: 5px;
    color: #fff;
    background-color: transparent;
    border: 0;
    border-radius: 0;
    box-shadow: 0 3px 0 -2px var(--el-text-color-placeholder);
  }
}
</style>
<style lang="less" scoped>
.login-form {
  padding: 20px;
  text-align: center;
  background: hsl(0deg 0% 100% / 30%);
  border-radius: 4%;

  .title {
    margin-bottom: 15px;
    font-size: 18px;
  }
}
</style>
