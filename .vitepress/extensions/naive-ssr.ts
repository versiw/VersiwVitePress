// .vitepress/extensions/naive-ssr.ts

import type { SiteConfig } from 'vitepress'
import { loadEnv } from 'vitepress'

interface NaiveSSRExtensionOptions {
  /**
   * 是否在构建过程中打印详细的调试日志。
   * @default false
   */
  enableDebug?: boolean
}

/**
 * VitePress 配置扩展：用于实现 Naive UI 的服务端渲染 (SSR)。
 * 遵循 Naive UI 官方推荐的 `postRender` 和 `transformHtml` 钩子方案。
 * 特别处理了 VitePress 的 `base` 配置和非 ASCII 文件路径（如中文路径）的 URL 编码问题。
 * @param options 扩展配置项
 */
export const naiveSSRExtension = (
  options: NaiveSSRExtensionOptions = {}
): Pick<SiteConfig, 'postRender' | 'transformHtml'> => {
  const { enableDebug = false } = options
  const fileAndStyles: Record<string, string> = {}

  const env = loadEnv(process.env.NODE_ENV || 'development', process.cwd())
  const base = env.VITE_BASE || '/'

  if (enableDebug) {
    console.log('[Naive SSR Extension] 扩展已初始化。')
    console.log(`[Naive SSR Extension] 检测到 base 配置为: "${base}"`)
  }

  // if (enableDebug) {
  //   process.on('exit', () => {
  //     console.log('\n[Naive SSR Extension] 构建完成。最终收集到的样式映射表:')
  //     console.log(JSON.stringify(fileAndStyles, null, 2))
  //   })
  // }

  return {
    postRender(context) {
      const styleRegex = /<css-render-style>([\s\S]+?)<\/css-render-style>/
      const vitepressPathRegex = /<vitepress-path>(.+?)<\/vitepress-path>/

      const style = styleRegex.exec(context.content)?.[1]
      const routePathKey = vitepressPathRegex.exec(context.content)?.[1]

      if (routePathKey && style) {
        fileAndStyles[routePathKey] = style
        if (enableDebug) {
          console.log(`[Naive SSR Extension] [postRender] 成功提取样式。 Key: "${routePathKey}"`)
        }
      } else if (enableDebug && routePathKey) {
        console.log(`[Naive SSR Extension] [postRender] 未找到样式。 Key: "${routePathKey}"`)
      }

      context.content = context.content.replace(styleRegex, '').replace(vitepressPathRegex, '')
    },

    transformHtml(code, id, { pageData }) {
      let relativeRoutePath = `/${pageData.relativePath.replace(/\\/g, '/')}`.replace(
        /\.md$/,
        '.html'
      )

      if (relativeRoutePath.endsWith('/index.html')) {
        relativeRoutePath = relativeRoutePath.slice(0, -10)
        if (relativeRoutePath === '') relativeRoutePath = '/'
      }

      const rawKey = (base + relativeRoutePath).replace(/\/\//g, '/')
      const finalKey = encodeURI(rawKey)
      const style = fileAndStyles[finalKey]

      if (enableDebug) {
        console.log(
          `\n[Naive SSR Extension] [transformHtml] 正在处理页面: ${pageData.relativePath}`
        )
        console.log(`[Naive SSR Extension] [transformHtml] 构建出的查找 Key: "${finalKey}"`)
      }

      if (style) {
        if (enableDebug) {
          console.log(`[Naive SSR Extension] [transformHtml] 成功匹配到样式，准备注入。`)
        }

        const pureCssMatch = style.match(/<style[^>]*>([\s\S]*)<\/style>/)
        if (pureCssMatch && pureCssMatch[1]) {
          const pureCss = pureCssMatch[1].trim()
          return code.replace(/<\/head>/, `<style>${pureCss}</style></head>`)
        } else if (enableDebug) {
          console.warn(
            `[Naive SSR Extension] [transformHtml] 警告：找到了样式块，但无法提取纯 CSS 内容。样式块内容: ${style}`
          )
        }
      } else if (enableDebug) {
        console.log(`[Naive SSR Extension] [transformHtml] 未匹配到样式。`)
      }

      return code
    }
  }
}
