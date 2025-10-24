import type { Router } from 'vitepress'
import { inBrowser } from 'vitepress'

let cardEffectCleanup: (() => void) | undefined

/**
 * 设置首页卡片3D视差效果插件。
 * 该效果仅在首页（路径为'/'）激活，离开首页时会自动清理。
 */
export function setupCardEffect(router: Router) {
  if (!inBrowser) return

  const cardSelector = '.VPHomeHero .image .custom-hero-image-container'

  // 路由切换后执行
  router.onAfterRouteChange = (to) => {
    // 离开页面时，如果存在清理函数，则执行它
    if (cardEffectCleanup) {
      cardEffectCleanup()
      cardEffectCleanup = undefined
    }

    // 判断是否是首页
    if (to === '/' || router.route.path === '/') {
      // 动态导入，确保只在需要时加载代码
      import('../hooks/useCardEffect').then((module) => {
        try {
          const result = module.useCardEffect(cardSelector)
          // 保存清理函数，以便在离开首页时调用
          if (result && typeof result.cleanup === 'function') {
            cardEffectCleanup = result.cleanup
          }
        } catch (error) {
          console.error('Failed to initialize card effect:', error)
        }
      })
    }
  }
}
