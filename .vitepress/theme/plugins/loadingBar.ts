import { createDiscreteApi } from 'naive-ui'
import { Router } from 'vitepress'
import { composeHandlers } from '../lib/compose'

const { loadingBar } = createDiscreteApi(['loadingBar'], {
  loadingBarProviderProps: {
    to: 'body'
  }
})

export const setupLoadingBar = (router: Router) => {
  if (typeof window === 'undefined') return
  router.onBeforeRouteChange = () => {
    loadingBar.start()
  }

  router.onAfterPageLoad = composeHandlers(router.onAfterPageLoad, () => loadingBar.finish())
}
