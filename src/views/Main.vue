<template>
  <div class="common-layout">
    <el-container class="lay-container">
      <common-aside></common-aside>
      <el-container class="r-container">
        <common-header />
        <el-scrollbar>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-scrollbar>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import CommonAside from '@/components/CommonAside.vue'
import CommonHeader from '@/components/CommonHeader.vue'
</script>
<style lang="less" scoped>
.common-layout {
  height: 100%;

  .lay-container {
    height: 100%;

    .r-container {
      display: flex;
      flex-direction: column;
    }
  }
}

.el-main {
  background-color: var(--el-bg-color-page);
}
</style>
