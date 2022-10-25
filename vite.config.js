import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src/')
    }
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${resolve(
            'src/assets/style/less/main.less'
          )}";`
        },
        javascriptEnabled: true
      }
    }
  },
  server: {
    // host设置为true才可以使用network的形式，以ip访问项目
    host: true,
    // 端口号
    port: 5175,
    // 自动打开浏览器
    open: false,
    // 跨域设置允许
    cors: true,
    // 如果端口已占用直接退出
    strictPort: true
    // 配置跨域 当接口没有设置跨域的时候需要配置代理
    // proxy: {
    //   '/blogAdmin': {
    //     target: 'http://localhost:3000/blogAdmin',
    //     changeOrigin: true
    //   }
    // }
  }
})
