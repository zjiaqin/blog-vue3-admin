<template>
  <el-header>
    <div class="l-content">
      <div class="btn-menu" @click="changeCollapse">
        <el-icon v-if="$store.state.menu.isCollapse" size="22px"
          ><Expand
        /></el-icon>
        <el-icon v-else size="22px"><Fold /></el-icon>
      </div>
    </div>
    <div class="r-content">
      <el-switch
        v-model="isDark"
        class="mt-2"
        inline-prompt
        :active-icon="Moon"
        :inactive-icon="Sunny"
      />
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <el-avatar :size="40" v-if="true" :icon="UserFilled" />
          <el-avatar :size="40" v-else />
          <div class="user-name">qzj</div>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              ><el-icon><User /></el-icon>个人信息</el-dropdown-item
            >
            <el-dropdown-item
              ><el-icon><EditPen /></el-icon>修改密码</el-dropdown-item
            >
            <el-dropdown-item divided
              ><el-icon><MostlyCloudy /></el-icon>博客展示</el-dropdown-item
            >
            <el-dropdown-item
              ><el-icon><CollectionTag /></el-icon>Github</el-dropdown-item
            >
            <el-dropdown-item
              ><el-icon><SwitchButton /></el-icon>退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script setup>
import { Moon, Sunny } from '@element-plus/icons-vue'
import { UserFilled } from '@element-plus/icons-vue'

import { useDark } from '@vueuse/core'
import { useStore } from 'vuex'
const store = useStore()
const isDark = useDark()

// const isCollapse = computed(() => {
//   return store.state.menu.isCollapse
// })

const changeCollapse = () => {
  store.commit('menu/toggleCollapse')
}
</script>
<style scoped lang="less">
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;

  .r-content {
    display: flex;
    align-items: center;

    .el-dropdown-link {
      display: flex;
      align-items: center;

      .user-name {
        margin: 0 20px 0 10px;
        font-size: 18px;
        font-weight: 500;
      }
    }
  }
}

.mt-2 {
  margin-right: 20px;
  --el-switch-on-color: #575b60;
}
</style>
