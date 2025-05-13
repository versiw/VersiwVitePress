export default {
  load() {
    return navDatas
  }
}

export const navDatas: NavData[] = [
  {
    group: 'UI 组件库',
    items: [
      {
        icon: '/images/navicons/UI 组件库/Ant Design.svg',
        title: 'Ant Design',
        desc: '一套企业级 UI 设计语言和 React 组件库',
        link: 'https://ant-design.antgroup.com/index-cn'
      },
      {
        icon: '/images/navicons/UI 组件库/Element Plus.svg',
        title: 'Element Plus',
        desc: '一个 Vue 3 UI 框架',
        link: 'https://element-plus.org/zh-CN/'
      },
      {
        icon: '/images/navicons/UI 组件库/Naive UI.svg',
        title: 'Naive UI',
        desc: '一个 Vue 3 组件库',
        link: 'https://www.naiveui.com/zh-CN/os-theme'
      },
      {
        icon: '/images/navicons/UI 组件库/Uiverse.png',
        title: 'Uiverse',
        desc: '最大的开源用户界面元素库',
        link: 'https://uiverse.io'
      },
      {
        icon: '/images/navicons/UI 组件库/Inspira UI.svg',
        title: 'Inspira UI',
        desc: '使用shadcn-vue、motion-v和TailwindCSS构建可重用组件',
        link: 'https://inspira-ui.com/'
      }
    ]
  },
  {
    group: '开发框架',
    items: [
      {
        icon: '/images/navicons/开发框架/Vue.js.svg',
        title: 'Vue.js',
        desc: '渐进式 JavaScript 框架',
        link: 'https://cn.vuejs.org'
      },
      {
        icon: '/images/navicons/开发框架/Electron.svg',
        title: 'Electron',
        desc: '一个使用 JavaScript、HTML 和 CSS 构建桌面应用程序的框架',
        link: 'https://www.electronjs.org/zh/docs/latest/'
      },
      {
        icon: '/images/navicons/开发框架/SoybeanAdmin.svg',
        title: 'SoybeanAdmin',
        desc: '一个清新优雅的中后台模版',
        link: 'https://docs.soybeanjs.cn/zh/'
      },
      {
        icon: '/images/navicons/开发框架/VitePress.svg',
        title: 'VitePress',
        desc: '由 Vite 和 Vue 驱动的静态站点生成器',
        link: 'https://vitepress.dev/zh/'
      }
    ]
  },
  {
    group: '功能库',
    items: [
      {
        icon: '/images/navicons/功能库/Vue Router.svg',
        title: 'Vue Router',
        desc: 'Vue.js 的官方路由，为 Vue.js 提供富有表现力、可配置的、方便的路由',
        link: 'https://router.vuejs.org/zh/'
      },
      {
        icon: '',
        title: 'Unplugin Vue Router',
        desc: '类型化的、基于文件的 Vue 3路由',
        link: 'https://uvr.esm.is/'
      },
      {
        icon: '/images/navicons/功能库/Driver.js.png',
        title: 'Driver.js',
        desc: '一个功能强大且高度可定制的基于原生JavaScript开发的新用户引导库',
        link: 'https://driver.employleague.cn/'
      },
      {
        icon: '/images/navicons/功能库/Axios.ico',
        title: 'Axios',
        desc: '一个基于 promise 的网络请求库，可以用于浏览器和 node.js',
        link: 'https://www.axios-http.cn'
      },
      {
        icon: '/images/navicons/功能库/Express.png',
        title: 'Express',
        desc: '基于 Node.js 平台的 web 应用开发框架',
        link: 'https://www.expressjs.com.cn'
      },
      {
        icon: '/images/navicons/功能库/Pinia.svg',
        title: 'Pinia',
        desc: '符合直觉的 Vue.js 状态管理库',
        link: 'https://pinia.vuejs.org/zh/'
      },
      {
        icon: '/images/navicons/功能库/Vue I18n.png',
        title: 'Vue I18n',
        desc: '适用于 Vue.js 的国际化插件',
        link: 'https://vue-i18n.intlify.dev/'
      },
      {
        icon: '/images/navicons/功能库/Day.js中文网.png',
        title: 'Day.js中文网',
        desc: 'Day.js是一个极简的JavaScript库,可以为现代浏览器解析、验证、操作和显示日期和时间。',
        link: 'https://dayjs.fenxianglu.cn/'
      }
    ]
  },
  {
    group: '构建工具',
    items: [
      {
        icon: '/images/navicons/构建工具/Vite.svg',
        title: 'Vite',
        desc: '卓越的 Web 开发构建工具',
        link: 'https://cn.vitejs.dev/'
      },
      {
        icon: '/images/navicons/构建工具/electron-vite.svg',
        title: 'electron-vite',
        desc: '下一代 Electron 开发构建工具',
        link: 'https://cn.electron-vite.org/'
      }
    ]
  },
  {
    group: 'CSS',
    items: [
      {
        icon: '/images/navicons/CSS/Animate.css.ico',
        title: 'Animate.css',
        desc: '一个跨浏览器的 CSS 动画库',
        link: 'https://animate.style/'
      },
      {
        icon: '/images/navicons/CSS/iCSS.png',
        title: 'iCSS',
        desc: 'CSS 奇技淫巧，在这里，都有',
        link: 'https://github.com/chokcoco/iCSS'
      },
      {
        icon: '/images/navicons/CSS/Gradient Magic.png',
        title: 'Gradient Magic',
        desc: '精彩而独特的 CSS 渐变免费画廊',
        link: 'https://www.gradientmagic.com/'
      }
    ]
  },
  {
    group: '调试工具',
    items: [
      {
        icon: '/images/navicons/调试工具/DiG GUI.ico',
        title: 'DiG GUI',
        desc: 'DiG Web 界面在线调试',
        link: 'https://www.diggui.com/'
      },
      {
        icon: '/images/navicons/调试工具/DNS Check.png',
        title: 'DNS Check',
        desc: 'DNS 全球传播测试',
        link: 'https://dnschecker.org/'
      }
    ]
  },
  {
    group: '云服务与托管平台',
    items: [
      {
        icon: '/images/navicons/云服务与托管平台/Cloudflare.ico',
        title: 'Cloudflare',
        desc: '全球最著名的 CDN 加速服务商',
        link: 'https://www.cloudflare-cn.com/'
      },
      {
        icon: '/images/navicons/云服务与托管平台/Netlify.svg',
        title: 'Netlify',
        desc: '现代化静态网站托管平台,全球 CDN 加速',
        link: 'https://www.netlify.com/'
      },
      {
        icon: '/images/navicons/云服务与托管平台/Supabase.ico',
        title: 'Supabase',
        desc: '一个开源的Firebase替代品。',
        link: 'hhttps://supabase.com/'
      },
      {
        icon: '/images/navicons/云服务与托管平台/Umami.ico',
        title: 'Umami',
        desc: '一个开源的、以隐私为中心的网站分析工具',
        link: 'https://umami.is/'
      }
    ]
  },
  {
    group: '其它',
    items: [
      {
        icon: '/images/navicons/其它/Nólëbase 集成.svg',
        title: 'Nólëbase 集成',
        desc: '多元化的文档工程工具合集',
        link: 'https://nolebase-integrations.ayaka.io/pages/zh-CN/'
      },
      {
        icon: '/images/navicons/其它/Animated Fluent Emojis.ico',
        title: 'Animated Fluent Emojis',
        desc: 'Microsoft 动画流畅的表情符号',
        link: 'https://animated-fluent-emoji.vercel.app/'
      }
    ]
  }
]
