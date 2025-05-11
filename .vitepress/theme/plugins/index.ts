import type { EnhanceAppContext } from 'vitepress/dist/client/index.js'
import { setupAnalytics } from './vercountAnalytics'
import { setupReadability } from './nolebase'
import { setupCardEffect } from './cardEffect'
import { setupGlobalComponents } from './globalComponents'
import { setupLoadingBar } from './loadingBar'

export function setupPlugins(ctx: EnhanceAppContext) {
  const { app, router, siteData } = ctx
  setupAnalytics(router)
  setupReadability(app)
  setupCardEffect(app, router)
  setupGlobalComponents(app)
  setupLoadingBar(router)
}
