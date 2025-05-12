import { createDiscreteApi } from 'naive-ui'

export const { message } = createDiscreteApi(['message'], {
  messageProviderProps: {
    placement: 'bottom',
    keepAliveOnHover: false
  }
})

export const { loadingBar } = createDiscreteApi(['loadingBar'], {
  loadingBarProviderProps: {
    to: 'body'
  }
})
