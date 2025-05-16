import { createDiscreteApi } from 'naive-ui'

export const getMessage = (
  placement?: 'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right'
) => {
  const { message } = createDiscreteApi(['message'], {
    messageProviderProps: {
      placement: placement,
      keepAliveOnHover: false
    }
  })
  return message
}

export const { loadingBar } = createDiscreteApi(['loadingBar'], {
  loadingBarProviderProps: {
    to: 'body'
  }
})
