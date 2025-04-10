import DefaultTheme from 'vitepress/theme'
import { EnhanceAppContext } from 'vitepress'
import { nextTick, onMounted } from 'vue'

import Layout from './components/Layout.vue'
import MusicPlay from './components/MusicPlay.vue'
import NavPage from './components/NavPage.vue'
import './styles/index.scss'

let initCardEffect = () => {}

export default {
  Layout,

  async enhanceApp({ app, router, siteData }: EnhanceAppContext) {
    // 动态导入包含 document 的文件
    if (!import.meta.env.SSR) {
      const module = await import('./hooks/CardEffect.js')
      initCardEffect = module.initCardEffect
    }

    app.component('MusicPlay', MusicPlay)
    app.component('NavPage', NavPage)

    // SPA切换页面导致监听事件丢失
    router.onAfterRouteChange = () => {
      initCardEffect()
    }
  },

  setup() {
    onMounted(() => {
      // 只在客户端执行
      if (typeof window !== 'undefined') {
        // 使用nextTick确保DOM更新
        nextTick(() => {
          // 初始加载时执行
          setTimeout(initCardEffect, 100) // 小延迟确保 DOM 完全渲染
          // 监听路由变化
          window.addEventListener('load', initCardEffect)
        })
      }
    })
  },

  extends: DefaultTheme
}
