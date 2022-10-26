<!-- 菜单 -->
<template>
  <el-sub-menu :index="menuItem.path" v-if="menuItem.child">
    <template #title>
      <el-icon
        ><component class="icons" :is="menuItem.meta.icon"></component
      ></el-icon>
      <span>{{ menuItem.meta.title }}</span>
    </template>
    <el-menu-item
      @click="$router.push({ path: menuItem.path })"
      v-for="item in menuItem.children"
      :key="item.path"
      :index="item.path"
    >
      <span>{{ item.meta.title }}</span>
    </el-menu-item>
  </el-sub-menu>
  <el-menu-item
    v-else
    :index="menuItem.path"
    @click="$router.push({ path: menuItem.path })"
  >
    <el-icon
      ><component class="icons" :is="menuItem.meta.icon"></component
    ></el-icon>
    <span>{{ menuItem.meta.title }}</span>
  </el-menu-item>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({
  menuItem: Object
})
</script>
