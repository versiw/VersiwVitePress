import DefaultTheme from 'vitepress/theme-without-fonts'
import { EnhanceAppContext } from 'vitepress'
import { nextTick, onMounted } from 'vue'
import EnhancedLayout from './EnhancedLayout'
import { setupPlugins } from './plugins'

import './styles/index.scss'
import './styles/tailwind.css'

let initCardEffect = () => {}
let destroyFancybox: () => {}
let bindFancybox: () => void

export default {
  Layout: EnhancedLayout,

  async enhanceApp({ app, router, siteData }: EnhanceAppContext) {
    setupPlugins({ app, router, siteData })
  },

  setup() {
    onMounted(async () => {
      if (!import.meta.env.SSR) {
        const module = await import('./hooks/CardEffect.js')
        initCardEffect = module.initCardEffect

        // const moduleFancybox = await import('./hooks/ImgViewer')
        // destroyFancybox = moduleFancybox.destroyFancybox
        // bindFancybox = moduleFancybox.bindFancybox
      }
      if (typeof window !== 'undefined') {
        nextTick(() => {
          setTimeout(initCardEffect, 100)
          window.addEventListener('load', initCardEffect)
        })
        // bindFancybox()
      }
    })

    onUnmounted(() => {
      // destroyFancybox()
    })
  },

  extends: DefaultTheme
}
