import DefaultTheme from 'vitepress/theme-without-fonts'
import { EnhanceAppContext } from 'vitepress'
import { h, nextTick, onMounted } from 'vue'
import { NolebaseHighlightTargetedHeading } from '@nolebase/vitepress-plugin-highlight-targeted-heading/client'
import '@nolebase/vitepress-plugin-highlight-targeted-heading/client/style.css'
import {
  NolebaseEnhancedReadabilitiesMenu,
  NolebaseEnhancedReadabilitiesScreenMenu,
  InjectionKey,
  LayoutMode
} from '@nolebase/vitepress-plugin-enhanced-readabilities/client'
import type { Options } from '@nolebase/vitepress-plugin-enhanced-readabilities/client'
import '@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css'

import Layout from './components/Layout.vue'
import MusicPlay from './components/MusicPlay.vue'
import NavPage from './components/NavPage.vue'
import Gallery from './components/Gallery.vue'
import Library from './components/Library.vue'
import BackTop from './components/BackTop.vue'
import BlurReveal from './components/inspira-ui/BlurReveal.vue'

import './styles/index.scss'

let initCardEffect = () => {}

export default {
  Layout: () => {
    return h(Layout, null, {
      'nav-bar-content-after': () => h(NolebaseEnhancedReadabilitiesMenu),
      'nav-screen-content-after': () => h(NolebaseEnhancedReadabilitiesScreenMenu),
      'layout-top': () => [h(NolebaseHighlightTargetedHeading)]
    })
  },

  async enhanceApp({ app, router, siteData }: EnhanceAppContext) {
    /**
     * Nólëbase 集成 阅读增强 配置
     * https://nolebase-integrations.ayaka.io/pages/zh-CN/integrations/vitepress-plugin-enhanced-readabilities/#%E9%85%8D%E7%BD%AE
     */
    app.provide(InjectionKey, {
      layoutSwitch: {
        defaultMode: LayoutMode.BothWidthAdjustable,
        contentLayoutMaxWidth: {
          defaultMaxWidth: 100
        }
      },
      spotlight: {
        defaultToggle: true
      }
    } as Options)

    // 动态导入包含 document 的文件
    if (!import.meta.env.SSR) {
      const module = await import('./hooks/CardEffect.js')
      initCardEffect = module.initCardEffect
    }

    app.component('MusicPlay', MusicPlay)
    app.component('NavPage', NavPage)
    app.component('Gallery', Gallery)
    app.component('Library', Library)
    app.component('BackTop', BackTop)
    app.component('BlurReveal', BlurReveal)

    // SPA切换页面导致监听事件丢失
    router.onAfterRouteChange = () => {
      initCardEffect()
    }
  },

  setup() {
    onMounted(async () => {
      if (!import.meta.env.SSR) {
        const module = await import('./hooks/CardEffect.js')
        initCardEffect = module.initCardEffect
        console.log('ssr')
      }
      // 只在客户端执行
      if (typeof window !== 'undefined') {
        // 使用nextTick确保DOM更新
        nextTick(() => {
          // 初始加载时执行
          setTimeout(initCardEffect, 100) // 小延迟确保 DOM 完全渲染
          window.addEventListener('load', initCardEffect)
        })
      }
    })
  },

  extends: DefaultTheme
}
