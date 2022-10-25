<template>
  <el-aside class="aside-box" :width="!isCollapse ? '200px' : '65px'">
    <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-vertical"
      default-active="2"
      text-color="#fff"
      :collapse="isCollapse"
      :collapse-transition="true"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-menu-item disabled v-if="!isCollapse" class="logo">
        blog-admin
      </el-menu-item>

      <el-sub-menu index="1">
        <template #title>
          <el-icon><location /></el-icon>
          <span>Navigator One</span>
        </template>
        <el-menu-item-group title="Group One">
          <el-menu-item index="1-1">item one</el-menu-item>
          <el-menu-item index="1-2">item two</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group Two">
          <el-menu-item index="1-3">item three</el-menu-item>
        </el-menu-item-group>
        <el-sub-menu index="1-4">
          <template #title>item four</template>
          <el-menu-item index="1-4-1">item one</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>
<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
const store = useStore()
const isCollapse = computed(() => {
  return store.state.menu.isCollapse
})
</script>

<style lang="less" scoped>
.aside-box {
  height: 100%;
  transition: all 0.4s ease-in-out;

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
