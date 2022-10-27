<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup>
import { provide } from 'vue'
import * as echarts from 'echarts'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { ref } from 'vue'
const locale = ref(zhCn)
provide('echarts', echarts)
</script>
<style>
#app {
  height: 100vh;
}
</style>
