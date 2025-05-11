import { createDiscreteApi } from 'naive-ui'
import { Router } from 'vitepress'

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

  router.onAfterPageLoad = () => {
    loadingBar.finish()
  }
}
