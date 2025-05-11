import DefaultTheme from 'vitepress/theme-without-fonts'
import { EnhanceAppContext } from 'vitepress'
import { nextTick, onMounted } from 'vue'
import EnhancedLayout from './EnhancedLayout'
import { setupPlugins } from './plugins'

import './styles/index.scss'

let initCardEffect = () => {}

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
        console.log('ssr')
      }
      if (typeof window !== 'undefined') {
        nextTick(() => {
          setTimeout(initCardEffect, 100)
          window.addEventListener('load', initCardEffect)
        })
      }
    })
  },

  extends: DefaultTheme
}
