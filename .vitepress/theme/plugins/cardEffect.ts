import type { Router } from 'vitepress'
let initCardEffect: () => void

export async function setupCardEffect(router: Router) {
  if (!import.meta.env.SSR) {
    const module = await import('../hooks/CardEffect.js')
    initCardEffect = module.initCardEffect
  }

  router.onAfterRouteChange = () => {
    initCardEffect?.()
  }
}
