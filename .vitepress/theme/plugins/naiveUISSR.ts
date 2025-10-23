import { App, defineComponent, h, inject } from 'vue'
import { useRoute } from 'vitepress'
import { NConfigProvider } from 'naive-ui'
import { setup } from '@css-render/vue3-ssr'

/**
 * 在 enhanceApp 中调用，用于在 SSR 期间初始化样式收集器。
 * @param ctx EnhanceAppContext
 */
export function setupNaiveUISSR(app: App) {
  if (import.meta.env.SSR) {
    try {
      const { collect } = setup(app)
      // 将 collect 函数提供给后续的组件使用
      app.provide('css-render-collect', collect)
    } catch (error) {
      console.error('Failed to setup Naive UI SSR provider:', error)
    }
  }
}

/**
 * 这是一个内部组件，仅在 SSR 期间渲染。
 * 它调用注入的 collect 函数，并将收集到的 CSS 字符串渲染到一个自定义标签中。
 */
const CssRenderStyle = defineComponent({
  name: 'CssRenderStyle',
  setup() {
    const collect = inject('css-render-collect') as (() => string) | undefined
    // 增加健壮性：仅在 collect 函数存在时调用
    const style = collect ? collect() : ''
    return {
      style
    }
  },
  render() {
    // 即使 style 为空，也渲染标签，以保持 postRender 逻辑的一致性
    return h('css-render-style', {
      innerHTML: this.style
    })
  }
})

/**
 * 这是一个内部组件，仅在 SSR 期间渲染。
 * 它获取当前的路由路径，并将其渲染到一个自定义标签中。
 * 这个路径将作为 key，用于在 config 的钩子中关联样式。
 */
const VitepressPath = defineComponent({
  name: 'VitepressPath',
  setup() {
    const route = useRoute()
    return () => h('vitepress-path', null, [route.path])
  }
})

/**
 * Naive UI 的顶层 Provider 组件。
 * 它会包裹整个应用，并根据环境（SSR/客户端）注入必要的内容。
 */
export const NaiveSSRProvider = defineComponent({
  name: 'NaiveSSRProvider',
  setup(_, { slots }) {
    // 这个组件的核心是提供一个 NConfigProvider，并渲染其子组件。
    // 在 SSR 期间，它额外渲染两个用于提取数据的占位符组件。
    return () =>
      h(
        NConfigProvider,
        {
          abstract: true,
          inlineThemeDisabled: true // 重要：在 SSR 模式下必须开启
        },
        {
          default: () => [
            // 渲染传递进来的默认插槽内容 (也就是你现有的 EnhancedLayout)
            slots.default?.(),
            // 仅在 SSR 环境下渲染这两个占位符
            import.meta.env.SSR ? h(CssRenderStyle) : null,
            import.meta.env.SSR ? h(VitepressPath) : null
          ]
        }
      )
  }
})
