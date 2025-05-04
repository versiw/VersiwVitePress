import { getFirstFileFormRelativeSrcDir } from './utils'

export default [
  { text: '首页', link: '/' },
  { text: '常用网站', link: '/nav' },
  {
    text: '前端',
    items: [
      {
        text: '包管理器',
        link: getFirstFileFormRelativeSrcDir('前端/包管理器')
      },
      {
        text: 'VitePress',
        link: getFirstFileFormRelativeSrcDir('前端/VitePress')
      }
    ]
  },
  {
    text: '后端',
    items: [
      {
        text: 'Hadoop',
        link: getFirstFileFormRelativeSrcDir('后端/Hadoop')
      }
    ]
  },
  { text: '软件', link: '/软件' },
  // { text: '阅读', link: '/book' },
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
]
