import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // 站点元数据
  title: '诗维 - Versiw',
  description: '基于 vitepress 构建的个人博客',
  head: [['link', { rel: 'icon', href: '/versiw.ico' }]],
  lang: 'zh-CN',
  base: '/',

  // 构建
  srcDir: 'src',

  vite: {
    ssr: {
      noExternal: ['naive-ui', 'date-fns', 'vueuc']
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

    search: {
      provider: 'local'
    },

    nav: [
      { text: '首页', link: '/' },
      { text: '常用网站', link: '/nav' },
      {
        component: 'MusicPlay'
      }
    ],

    sidebar: [
      // {
      //   text: 'Examples',
      //   items: [
      //     { text: 'Markdown Examples', link: '/markdown-examples' },
      //     { text: 'Runtime API Examples', link: '/api-examples' }
      //   ]
      // }
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/versiw' }]
  }
})
