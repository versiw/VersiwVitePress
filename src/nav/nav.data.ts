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
      }
    ]
  }
]
