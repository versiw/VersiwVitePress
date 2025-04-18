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
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
        title: 'Ant Design',
        desc: '一套企业级 UI 设计语言和 React 组件库',
        link: 'https://ant-design.antgroup.com/index-cn'
      },
      {
        icon: 'https://element-plus.org/images/element-plus-logo-small.svg',
        title: 'Element Plus',
        desc: '一个 Vue 3 UI 框架',
        link: 'https://element-plus.org/zh-CN/'
      },
      {
        icon: 'https://www.naiveui.com/assets/naivelogo-BdDVTUmz.svg',
        title: 'Naive UI',
        desc: '一个 Vue 3 组件库',
        link: 'https://www.naiveui.com/zh-CN/os-theme'
      },
      {
        icon: 'https://uiverse.io/favicon-32x32.png',
        title: 'Uiverse',
        desc: '最大的开源用户界面元素库',
        link: 'https://uiverse.io'
      }
    ]
  },
  {
    group: '开发框架',
    items: [
      {
        icon: 'https://cn.vuejs.org/logo.svg',
        title: 'Vue.js',
        desc: '渐进式 JavaScript 框架',
        link: 'https://cn.vuejs.org'
      },
      {
        icon: 'https://www.electronjs.org/zh/assets/img/logo.svg',
        title: 'Electron',
        desc: '一个使用 JavaScript、HTML 和 CSS 构建桌面应用程序的框架',
        link: 'https://www.electronjs.org/zh/docs/latest/'
      },
      {
        icon: 'https://docs.soybeanjs.cn/logo.svg',
        title: 'SoybeanAdmin',
        desc: '一个清新优雅的中后台模版',
        link: 'https://docs.soybeanjs.cn/zh/'
      },
      {
        icon: 'https://vitepress.dev/vitepress-logo-mini.svg',
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
        icon: 'https://router.vuejs.org/logo.svg',
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
        icon: 'https://driver.employleague.cn/assets/img/driver.png',
        title: 'Driver.js',
        desc: '一个功能强大且高度可定制的基于原生JavaScript开发的新用户引导库',
        link: 'https://driver.employleague.cn/'
      },
      {
        icon: 'https://www.axios-http.cn/img/favicon.ico',
        title: 'Axios',
        desc: '一个基于 promise 的网络请求库，可以用于浏览器和 node.js',
        link: 'https://www.axios-http.cn'
      },
      {
        icon: 'https://www.expressjs.com.cn/images/favicon.png',
        title: 'Express',
        desc: '基于 Node.js 平台的 web 应用开发框架',
        link: 'https://www.expressjs.com.cn'
      },
      {
        icon: 'https://pinia.vuejs.org/logo.svg',
        title: 'Pinia',
        desc: '符合直觉的 Vue.js 状态管理库',
        link: 'https://pinia.vuejs.org/zh/'
      },
      {
        icon: 'https://vue-i18n.intlify.dev/vue-i18n-logo.png',
        title: 'Vue I18n',
        desc: '适用于 Vue.js 的国际化插件',
        link: 'https://vue-i18n.intlify.dev/'
      }
    ]
  },
  {
    group: '构建工具',
    items: [
      {
        icon: 'https://cn.vitejs.dev/logo.svg',
        title: 'Vite',
        desc: '卓越的 Web 开发构建工具',
        link: 'https://cn.vitejs.dev/'
      },
      {
        icon: 'https://cn.electron-vite.org/favicon.svg',
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
        icon: 'https://animate.style/img/favicon.ico',
        title: 'Animate.css',
        desc: '一个跨浏览器的 CSS 动画库',
        link: 'https://animate.style/'
      },
      {
        icon: 'https://github.com/fluidicon.png',
        title: 'iCSS',
        desc: 'CSS 奇技淫巧，在这里，都有',
        link: 'https://github.com/chokcoco/iCSS'
      },
      {
        icon: 'https://www.gradientmagic.com/favicon/favicon-32x32.png',
        title: 'Gradient Magic',
        desc: '精彩而独特的 CSS 渐变免费画廊',
        link: 'https://www.gradientmagic.com/'
      }
    ]
  },
  {
    group: '其它',
    items: [
      {
        icon: 'https://nolebase.ayaka.io/logo.svg',
        title: 'Nólëbase 集成',
        desc: '多元化的文档工程工具合集',
        link: 'https://nolebase-integrations.ayaka.io/pages/zh-CN/'
      },
      {
        icon: 'https://animated-fluent-emoji.vercel.app/favicon.ico',
        title: 'Animated Fluent Emojis',
        desc: 'Microsoft 动画流畅的表情符号',
        link: 'https://animated-fluent-emoji.vercel.app/'
      }
    ]
  }
]
