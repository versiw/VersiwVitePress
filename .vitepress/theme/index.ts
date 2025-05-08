import DefaultTheme from 'vitepress/theme-without-fonts'
import { EnhanceAppContext, inBrowser } from 'vitepress'
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
import NavPage from './components/pages/NavPage.vue'
import Gallery from './components/pages/Gallery.vue'
import GiscusComment from './components/features/GiscusComment.vue'

import useVisitData from './hooks/useVisitData'

import './styles/index.scss'

let initCardEffect = () => {}

export default {
  Layout: () => {
    return h(Layout, null, {
      'nav-bar-content-after': () => h(NolebaseEnhancedReadabilitiesMenu),
      'nav-screen-content-after': () => h(NolebaseEnhancedReadabilitiesScreenMenu),
      'layout-top': () => [h(NolebaseHighlightTargetedHeading)],
      'doc-after': () => h(GiscusComment)
    })
  },

  async enhanceApp({ app, router, siteData }: EnhanceAppContext) {
    /** 网站访问量统计，路由加载完成，在加载页面组件后（在更新页面组件之前）调用。 */
    if (inBrowser) {
      router.onAfterPageLoad = (to: string) => {
        useVisitData()
      }
    }
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

    app.component('NavPage', NavPage)
    app.component('Gallery', Gallery)

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
