<template>
  <el-aside class="aside-box" :width="!isCollapse ? '200px' : '65px'">
    <el-menu
      class="el-menu-vertical"
      default-active="2"
      :collapse="isCollapse"
      :collapse-transition="true"
      @open="handleOpen"
      @close="handleClose"
    >
      <!-- 顶部标题 -->
      <el-menu-item disabled v-if="!isCollapse" class="logo">
        blog-admin
      </el-menu-item>
      <menu-item v-for="item in menuList" :key="item.path" :menuItem="item" />
    </el-menu>
  </el-aside>
</template>
<script setup>
import MenuItem from './MenuItem.vue'
import { useStore } from 'vuex'
import { computed } from 'vue'
const store = useStore()
const isCollapse = computed(() => {
  return store.state.menu.isCollapse
})
const menuList = computed(() => {
  return store.state.menu.menuList
})

console.log()
</script>

<style lang="less" scoped>
::-webkit-scrollbar {
  display: none;
}

.aside-box {
  height: 100%;
  transition: all 0.4s ease-in-out;

  ::-webkit-scrollbar {
    width: 0 !important;
  }

  .el-menu {
    height: 100%;
    transition: width 0.4s ease-in-out;
  }

  .logo {
    justify-content: center;
    height: 60px;
    font-size: 22px;
  }
}
</style>
