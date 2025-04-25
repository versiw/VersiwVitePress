import { defineConfig, loadEnv } from 'vitepress'
import { fileURLToPath } from 'node:url'
import { cwd } from 'node:process'
import path from 'node:path'

import { BiDirectionalLinks } from '@nolebase/markdown-it-bi-directional-links'
import { withSidebar } from 'vitepress-sidebar'

/** @type {import('vitepress').UserConfig} */
const vitePressOptions = (env) => {
  return {
    // VitePress's options here...
    // 站点元数据
    title: '诗维',
    description: '基于 VitePress 构建的个人知识库',
    head: [
      ['link', { rel: 'icon', href: env.VITE_BASE + 'versiw.ico' }],
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
    vite: {
      optimizeDeps: {
        exclude: [
          '@nolebase/vitepress-plugin-enhanced-readabilities/client',
          'vitepress',
          '@nolebase/ui'
        ]
      },
      ssr: {
        noExternal: [
          'naive-ui',
          'date-fns',
          'vueuc',
          '@nolebase/vitepress-plugin-enhanced-readabilities',
          '@nolebase/vitepress-plugin-highlight-targeted-heading',
          '@nolebase/ui'
        ]
      }
    },
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
      nav: [
        { text: '首页', link: '/' },
        { text: '常用网站', link: '/nav' },
        { text: '前端', link: '/前端/包管理器/npm 安裝' },
        {
          text: '后端',
          items: [
            {
              text: 'Hadoop',
              link: '后端/Hadoop/Hadoop HA高可用+Zookeeper搭建 一站式解決方案！！！'
            }
          ]
        },
        { text: '软件', link: '/软件' },
        {
          text: '仓库链接',
          items: [
            {
              text: 'VueElectronStarter',
              link: 'https://versiw.github.io/VueElectronStarterDocs/'
            },
            { text: 'versiwfekit (前端工具集)', link: 'https://github.com/versiw/versiwfekit' }
          ]
        },
        {
          text: '作品集',
          items: [
            { text: '链路加密机对称密钥管理系统', link: 'gallery/encryptmachinemanager.md' },
            { text: '二维码加密数字通行证系统', link: 'gallery/qrcode-pass.md' },
            { text: 'Django招聘网站爬虫管理和数据分析系统', link: 'gallery/django-job-spider.md' },
            { text: '微信小程序题库管理系统', link: 'gallery/wx-question.md' },
            { text: 'Python房产信息采集和可视化分析', link: 'gallery/python-house-spider.md' }
          ]
        }
        // {
        //   component: 'MusicPlay'
        // }
      ],

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
            dir: path.join(cwd(), 'src'),
            baseDir: '/'
          })
        )
      }
    }
  }
}

export default ({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, fileURLToPath(new URL('../', import.meta.url)))

  return defineConfig(
    withSidebar(vitePressOptions(env), [
      {
        scanStartPath: 'src',
        basePath: '/',
        resolvePath: '/',
        debugPrint: false
      },
      {
        scanStartPath: 'src/前端',
        basePath: '/前端/',
        resolvePath: '/前端/',
        sortMenusByName: true
      },
      {
        scanStartPath: 'src/后端',
        basePath: '/后端/',
        resolvePath: '/后端/',
        useTitleFromFrontmatter: true
      },
      {
        scanStartPath: 'src/软件',
        basePath: '/软件/',
        resolvePath: '/软件/'
      }
    ])
  )
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
