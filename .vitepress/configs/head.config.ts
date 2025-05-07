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
        'data-website-id': 'c50730fb-e245-4518-b757-44e58d397989'
      }
    ],
    // Umami versiw.netlify.app
    [
      'script',
      {
        defer: '',
        async: '',
        src: 'https://umami.versiw.com/script.js',
        'data-website-id': 'cc8a7cdd-4864-4cd3-a374-9051c5064714'
      }
    ],
    // Umami versiw.github.io
    [
      'script',
      {
        defer: '',
        async: '',
        src: 'https://umami.versiw.com/script.js',
        'data-website-id': 'f516de8c-ed2a-483b-b34b-7d7760a7586d'
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
