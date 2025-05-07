import type { HeadConfig } from 'vitepress'

const headConfig = (env): HeadConfig[] => {
  return [
    ['link', { rel: 'icon', href: env.VITE_BASE + 'versiw.ico' }],
    ['meta', { name: 'msvalidate.01', content: '7D0D5E34E0E1AE2E7F92802CB2D9308D' }],
    // Umami docs.versiw.com
    [
      'script',
      {
        defer: '',
        async: '',
        src: 'https://umami.versiw.com/script.js',
        'data-website-id': '5e7fc3a6-8633-44a5-bdef-dfbddffe8630'
      }
    ],
    // Umami versiw.github.io
    [
      'script',
      {
        defer: '',
        async: '',
        src: 'https://umami.versiw.com/script.js',
        'data-website-id': 'bc244f39-25d2-4962-acf1-8de61d13a29d'
      }
    ],
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
