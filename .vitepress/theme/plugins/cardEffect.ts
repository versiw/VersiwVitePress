import type { Router } from 'vitepress'
import type { App } from 'vue'

let initCardEffect: () => void

export async function setupCardEffect(app: App, router: Router) {
  if (!import.meta.env.SSR) {
    const module = await import('../hooks/CardEffect.js')
    initCardEffect = module.initCardEffect
  }

  router.onAfterRouteChange = () => {
    initCardEffect?.()
  }
}
