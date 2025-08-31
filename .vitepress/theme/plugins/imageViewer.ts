import { Router } from 'vitepress'
import { composeHandlers } from '../lib/compose'

let destroyFancybox: () => void
let bindFancybox: () => void

export const setupImageViewer = async (router: Router) => {
  if (!import.meta.env.SSR) {
    const module = await import('../hooks/ImgViewer')
    destroyFancybox = module.destroyFancybox
    bindFancybox = module.bindFancybox
  }
  if (typeof window === 'undefined') return
  router.onBeforeRouteChange = composeHandlers(router.onBeforeRouteChange, () => destroyFancybox())
  router.onAfterRouteChange = composeHandlers(router.onAfterRouteChange, () =>
    nextTick(() => bindFancybox())
  )
}
