import DefaultTheme from 'vitepress/theme-without-fonts'
import { EnhanceAppContext } from 'vitepress'
import EnhancedLayout from './EnhancedLayout'
import { setupPlugins } from './plugins'
import { NaiveSSRProvider } from './plugins/naiveUISSR'

import './styles/index.scss'
import './styles/tailwind.css'

export default {
  extends: DefaultTheme,

  Layout: () => {
    return h(NaiveSSRProvider, null, {
      default: () => h(EnhancedLayout)
    })
  },

  async enhanceApp({ app, router, siteData }: EnhanceAppContext) {
    setupPlugins({ app, router, siteData })
  }
}
