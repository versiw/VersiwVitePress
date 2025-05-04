import { defineConfig, loadEnv } from 'vitepress'
import { fileURLToPath } from 'node:url'
import { cwd } from 'node:process'
import { join } from 'node:path'

import { BiDirectionalLinks } from '@nolebase/markdown-it-bi-directional-links'
import { withSidebar } from 'vitepress-sidebar'

import viteConfig from './vite.config'
import navConfig from './nav.config'
import sideBarConfig from './sideBar.config'

/** @type {import('vitepress').UserConfig} */
const vitePressOptions = (env) => {
  return {
    // VitePress's options here...
    // 站点元数据
    title: '诗维',
    description: '基于 VitePress 构建的个人知识库',
    head: [
      ['link', { rel: 'icon', href: env.VITE_BASE + 'versiw.ico' }],
      ['meta', { name: 'msvalidate.01', content: '7D0D5E34E0E1AE2E7F92802CB2D9308D' }],
      [
        'link',
        {
          rel: 'preload',
          herf: env.VITE_BASE + 'fonts/LXGWWenKaiGBScreenR.ttf',
          as: 'font',
          type: 'font/ttf',
          crossorigin: ''
        }
      ]
    ] as [string, Record<string, string>][],
    lang: 'zh-CN',
    base: env.VITE_BASE,
    // 构建
    srcDir: 'src',
    vite: viteConfig,
    metaChunk: true,
    // 主题
    lastUpdated: true,
    themeConfig: {
      // https://vitepress.dev/reference/default-theme-config
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
      search: {
        provider: 'local',
        options: {
          locales: {
            root: {
              translations: {
                button: {
                  buttonText: '搜索文档',
                  buttonAriaLabel: '搜索文档'
                },
                modal: {
                  noResultsText: '无法找到相关结果',
                  resetButtonTitle: '清除查询条件',
                  footer: {
                    selectText: '选择',
                    navigateText: '切换'
                  }
                }
              }
            }
          }
        }
      },
      nav: navConfig,

      socialLinks: [{ icon: 'github', link: 'https://github.com/versiw' }]
    },
    // 自定义
    markdown: {
      lineNumbers: true,
      image: {
        // 默认禁用；设置为 true 可为所有图片启用懒加载。
        lazyLoading: true
      },
      config: (md) => {
        md.use(
          BiDirectionalLinks({
            dir: join(cwd(), 'src'),
            baseDir: '/'
          })
        )
      }
    },
    sitemap: {
      hostname: 'https://versiw.github.io' + env.VITE_BASE
    }
  }
}

export default ({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, fileURLToPath(new URL('../', import.meta.url)))

  return defineConfig(withSidebar(vitePressOptions(env), sideBarConfig))
}

// https://vitepress.dev/reference/site-config
// export default ({ mode }) => {
//   const env = loadEnv(mode, fileURLToPath(new URL('../', import.meta.url)))
//   return defineConfig({
//     // 站点元数据
//     title: '诗维',
//     description: '基于 vitepress 构建的个人博客',
//     head: [['link', { rel: 'icon', href: env.VITE_BASE + 'versiw.ico' }]],
//     lang: 'zh-CN',
//     base: env.VITE_BASE,

//     // 构建
//     srcDir: 'src',

//     vite: {
//       optimizeDeps: {
//         exclude: [
//           '@nolebase/vitepress-plugin-enhanced-readabilities/client',
//           'vitepress',
//           '@nolebase/ui'
//         ]
//       },
//       ssr: {
//         noExternal: [
//           'naive-ui',
//           'date-fns',
//           'vueuc',
//           '@nolebase/vitepress-plugin-enhanced-readabilities',
//           '@nolebase/vitepress-plugin-highlight-targeted-heading',
//           '@nolebase/ui'
//         ]
//       }
//     },

//     // 主题
//     lastUpdated: true,

//     themeConfig: {
//       // https://vitepress.dev/reference/default-theme-config
//       logo: '/versiw.svg',

//       outline: {
//         level: 'deep',
//         label: '目录'
//       },

//       docFooter: {
//         prev: '上一篇',
//         next: '下一篇'
//       },

//       lastUpdated: {
//         text: '最近一次更新',
//         formatOptions: {
//           dateStyle: 'short',
//           timeStyle: 'medium'
//         }
//       },

//       search: {
//         provider: 'local',
//         options: {
//           locales: {
//             root: {
//               translations: {
//                 button: {
//                   buttonText: '搜索文档',
//                   buttonAriaLabel: '搜索文档'
//                 },
//                 modal: {
//                   noResultsText: '无法找到相关结果',
//                   resetButtonTitle: '清除查询条件',
//                   footer: {
//                     selectText: '选择',
//                     navigateText: '切换'
//                   }
//                 }
//               }
//             }
//           }
//         }
//       },

//       nav: [
//         { text: '首页', link: '/' },
//         { text: '常用网站', link: '/nav' },
//         {
//           component: 'MusicPlay'
//         }
//       ],

//       sidebar: [
//         {
//           text: 'Examples',
//           items: [{ text: 'Markdown Examples', link: '/markdown-examples' }]
//         }
//       ],

//       socialLinks: [{ icon: 'github', link: 'https://github.com/versiw' }]
//     }
//   })
// }
