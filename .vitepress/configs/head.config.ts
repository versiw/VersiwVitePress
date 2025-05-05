import type { HeadConfig } from 'vitepress'

const headConfig = (env): HeadConfig[] => {
  return [
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
  ]
}

export default headConfig
