import type { Router } from 'vitepress'
import { inBrowser } from 'vitepress'
import { composeHandlers } from '../lib/compose'

let cardEffectCleanup: (() => void) | undefined

/**
 * 设置首页卡片3D视差效果插件。
 * 该效果仅在首页（路径为'/'）激活，离开首页时会自动清理。
 */
export function setupCardEffect(router: Router) {
  if (!inBrowser) return

  const cardSelector = '.VPHomeHero .image .custom-hero-image-container'

  // 定义此插件的路由处理逻辑
  const routeChangeHandler = (to: string) => {
    if (cardEffectCleanup) {
      cardEffectCleanup()
      cardEffectCleanup = undefined
    }

    if (to === '/' || router.route.path === '/') {
      import('../hooks/useCardEffect').then((module) => {
        try {
          const result = module.useCardEffect(cardSelector)
          if (result && typeof result.cleanup === 'function') {
            cardEffectCleanup = result.cleanup
          }
        } catch (error) {
          console.error('Failed to initialize card effect:', error)
        }
      })
    }
  }

  // 使用 composeHandlers 来附加处理逻辑，而不是覆盖
  router.onAfterRouteChange = composeHandlers(router.onAfterRouteChange, routeChangeHandler)
}
