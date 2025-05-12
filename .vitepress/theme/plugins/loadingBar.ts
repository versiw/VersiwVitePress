import { Router } from 'vitepress'
import { composeHandlers } from '../lib/compose'
import { loadingBar } from '../hooks/useCreateDiscreteApi'

export const setupLoadingBar = (router: Router) => {
  if (typeof window === 'undefined') return
  router.onBeforeRouteChange = () => {
    loadingBar.start()
  }

  router.onAfterPageLoad = composeHandlers(router.onAfterPageLoad, () => loadingBar.finish())
}
