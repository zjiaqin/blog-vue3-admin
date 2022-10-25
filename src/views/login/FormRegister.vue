<template>
  <el-form ref="regFormRef" :model="regForm" :rules="rules" class="reg-form">
    <div class="title">Register</div>
    <el-form-item prop="email">
      <el-input
        v-model="regForm.email"
        placeholder="邮箱"
        :prefix-icon="Message"
      />
    </el-form-item>
    <el-form-item prop="emailCode">
      <div class="item-email">
        <el-input
          v-model="regForm.emailCode"
          placeholder="邮箱验证码"
          :prefix-icon="Position"
        />
        <el-button
          type="primary"
          :disabled="sendEmailBtn.disabled"
          class="btn-code"
          @click="debounce"
          >{{ sendEmailBtn.text }}</el-button
        >
      </div>
    </el-form-item>
    <el-form-item prop="name">
      <el-input
        v-model="regForm.name"
        placeholder="用户名"
        :prefix-icon="User"
      />
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="regForm.password"
        placeholder="登录密码"
        :prefix-icon="Lock"
        type="password"
        show-password
      />
    </el-form-item>
    <el-form-item prop="repassword">
      <el-input
        v-model="regForm.repassword"
        placeholder="确认密码"
        :prefix-icon="Lock"
        type="password"
        show-password
      />
    </el-form-item>
    <!--  -->
    <el-form-item prop="randomCode">
      <el-row>
        <el-col :span="18"
          ><el-input
            v-model="regForm.randomCode"
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

    <el-button type="success" @click="register">注册</el-button
    ><el-button type="warning" @click="toLoginPage">返回</el-button>
  </el-form>
</template>

<script setup>
import { isEmail } from '@/utils/validate.js'

import {
  User,
  Lock,
  Postcard,
  Message,
  Position
} from '@element-plus/icons-vue'
import { getCurrentInstance, inject, reactive, ref } from 'vue'
import envConfig from '@/config'

const { proxy } = getCurrentInstance()
const sendEmailBtn = reactive({
  time: 60,
  text: '获取验证码',
  disable: false
})
const regFormRef = ref()
// 登录表单
const regForm = reactive({
  email: '',
  emailCode: '',
  name: '',
  password: '',
  repassword: '',
  randomCode: ''
})

// 自定义密码验证规则
const validatePass = (rules, value, callback) => {
  if (value != regForm.password) {
    callback(new Error('两次密码不一致'))
  } else {
    callback()
  }
}
const validatePass2 = (rules, value, callback) => {
  if (regForm.repassword && value != regForm.repassword) {
    callback(new Error('两次密码不一致'))
  } else {
    callback()
  }
}
// 自定义邮箱验证规则
let EmailData = (rules, value, callback) => {
  if (!isEmail(value)) {
    callback(new Error('请输入正确的邮箱'))
  } else {
    // 这里有个坑，自定义的验证规则必须调用callback（）不然表单就会停止后续的任务了。
    callback()
  }
}

// 登录验证规则
const rules = reactive({
  email: [
    { required: true, message: '邮箱不得为空', trigger: 'blur' },
    { validator: EmailData, trigger: 'blur' }
  ],
  emailCode: { required: true, message: '验证码不得为空', trigger: 'blur' },
  name: { required: true, message: '用户名不得为空', trigger: 'blur' },
  password: [
    { required: true, message: '密码不得为空', trigger: 'blur' },
    { min: 6, message: '密码长度不得小于6', trigger: 'blur' },
    { validator: validatePass2, trigger: 'blur' }
  ],
  repassword: [
    { required: true, message: '密码不得为空', trigger: 'blur' },
    { min: 6, message: '密码长度不得小于6', trigger: 'blur' },
    { validator: validatePass, trigger: 'blur' }
  ],
  randomCode: { required: true, message: '请输入验证码', trigger: 'blur' }
})

// 发送邮件
// 防抖，这里有坑，js防抖函数使用不了,就很奇怪！！好像是因为用不了闭包的特性
let timer = ref(null)
const debounce = () => {
  clearTimeout(timer.value)
  timer.value = setTimeout(sendEmail, 1000)
}

const sendEmail = () => {
  regFormRef.value.validateField('email', async (valid) => {
    if (valid) {
      try {
        await proxy.$api.getEmailCode({
          email: regForm.email,
          type: 'add'
        })
        let timer = null
        if (!timer) {
          timer = setInterval(() => {
            if (sendEmailBtn.time > 0) {
              sendEmailBtn.disabled = true
              sendEmailBtn.text = `重新获取${sendEmailBtn.time}s`
              sendEmailBtn.time--
            } else {
              sendEmailBtn.disabled = false
              sendEmailBtn.text = `重新获取`
              sendEmailBtn.time = 60
              clearInterval(timer)
            }
          }, 1000)
        }
        // eslint-disable-next-line no-undef
        ElMessage.success('发送成功!')
      } catch (error) {
        return
      }
    } else {
      // eslint-disable-next-line no-undef
      ElMessage.error('请输入有效的邮箱!')
    }
  })
}
// 登录
const register = async () => {
  if (!regFormRef.value) return
  await regFormRef.value.validate(async (valid) => {
    if (valid) {
      try {
        await proxy.$api.registerAdmin(regForm)
        // eslint-disable-next-line no-undef
        ElMessage.success('注册成功')
        toLoginPage()
        resetForm()
      } catch (error) {
        return
      }
    } else {
      // eslint-disable-next-line no-undef
      ElMessage.error('请输入注册信息')
    }
  })
}
// 清空表单
const resetForm = () => {
  if (!regFormRef.value) return
  regFormRef.value.resetFields()
}

// 获取验证码
let codeImg = ref(`${envConfig.baseApi}/user/getCode?t=${new Date().getTime()}`)
const changeCode = () => {
  codeImg.value = `${envConfig.baseApi}/user/getCode?t=${new Date().getTime()}`
  regForm.randomCode = ''
}
// 返回登录界面
const panel = inject('panel')
const toLoginPage = () => {
  panel.value = 'login'
}
</script>

<style lang="less">
.reg-form {
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
.reg-form {
  padding: 20px;
  text-align: center;
  background: hsl(0deg 0% 100% / 30%);
  border-radius: 4%;

  .title {
    margin-bottom: 15px;
    font-size: 18px;
  }

  .item-email {
    display: flex;
    width: 100%;

    .btn-code {
      margin-left: 20px;
      width: 90px;
    }
  }
}
</style>
