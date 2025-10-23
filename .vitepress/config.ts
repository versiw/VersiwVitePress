import { defineConfig, loadEnv } from 'vitepress'
import { fileURLToPath } from 'node:url'
import { cwd } from 'node:process'
import { join } from 'node:path'
import type { UserConfig } from 'vitepress'

import { BiDirectionalLinks } from '@nolebase/markdown-it-bi-directional-links'
import { withSidebar } from 'vitepress-sidebar'

import viteConfig from './vite.config'
import headConfig from './configs/head.config'
import navConfig from './configs/nav.config'
import searchConfig from './configs/search.config'
import sideBarConfig from './configs/sideBar.config'

import { transformerMetaDiff } from './shikiTransformers/meta-diff'
import { transformerMetaHighlight } from '@shikijs/transformers'

const fileAndStyles: Record<string, string> = {}

const vitePressOptions = (env): UserConfig => {
  return {
    // 站点元数据
    title: '诗维',
    description: '基于 VitePress 构建的个人知识库',
    head: headConfig(env),
    lang: 'zh-CN',
    base: env.VITE_BASE,
    // 构建
    srcDir: 'src',
    metaChunk: true,
    // 主题
    lastUpdated: true,
    themeConfig: {
      logo: '/versiw.svg',
      outline: {
        level: 'deep',
        label: '目录'
      },
      docFooter: {
        prev: '上一篇',
        next: '下一篇'
      },
      lastUpdated: {
        text: '最近一次更新',
        formatOptions: {
          dateStyle: 'short',
          timeStyle: 'medium'
        }
      },
      darkModeSwitchLabel: '切换主题',
      lightModeSwitchTitle: '切换至明亮模式',
      darkModeSwitchTitle: '切换至深色模式',
      sidebarMenuLabel: '导航',
      returnToTopLabel: '回到顶部',
      search: searchConfig,
      nav: navConfig,

      socialLinks: [{ icon: 'github', link: 'https://github.com/versiw' }]
    },
    // 自定义
    markdown: {
      anchor: {
        slugify: (s) => s
      },
      lineNumbers: true,
      image: {
        // 默认禁用；设置为 true 可为所有图片启用懒加载。
        lazyLoading: true
      },
      codeTransformers: [transformerMetaHighlight(), transformerMetaDiff()],
      config: (md) => {
        md.use(
          BiDirectionalLinks({
            dir: join(cwd(), 'src'),
            baseDir: '/'
          })
        )
      }
    },
    vite: viteConfig,
    postRender(context) {
      const styleRegex = /<css-render-style>((.|\s)+)<\/css-render-style>/
      const vitepressPathRegex = /<vitepress-path>(.+)<\/vitepress-path>/
      const style = styleRegex.exec(context.content)?.[1]
      const vitepressPath = vitepressPathRegex.exec(context.content)?.[1]
      if (vitepressPath && style) {
        fileAndStyles[vitepressPath] = style
      }
      context.content = context.content.replace(styleRegex, '')
      context.content = context.content.replace(vitepressPathRegex, '')
    },
    transformHtml(code, id) {
      const html = id.split('/').pop()
      if (!html) return
      const style = fileAndStyles[`/${html}`]
      if (style) {
        return code.replace(/<\/head>/, style + '</head>')
      }
    },
    sitemap: {
      hostname: 'https://' + env.VITE_HOSTNAME + env.VITE_BASE
    }
  }
}

export default ({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, fileURLToPath(new URL('../', import.meta.url)))

  return defineConfig(withSidebar(vitePressOptions(env), sideBarConfig))
}
