import type { HeadConfig } from 'vitepress'

const headConfig = (env) => {
  const heads: HeadConfig[] = [
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
  ]

  if (process.env.NODE_ENV === 'production') {
    heads.push(
      // Bing Webmaster Tools
      ['meta', { name: 'msvalidate.01', content: '7D0D5E34E0E1AE2E7F92802CB2D9308D' }],
      // Umami docs.versiw.com
      [
        'script',
        {
          defer: '',
          async: '',
          src: env.VITE_BASE + 'scripts/umm.js',
          'data-host-url': 'https://umami.versiw.com',
          'data-website-id': 'c50730fb-e245-4518-b757-44e58d397989'
        }
      ],
      // Umami versiw.github.io
      [
        'script',
        {
          defer: '',
          async: '',
          src: env.VITE_BASE + 'scripts/umm.js',
          'data-host-url': 'https://umami.versiw.com',
          'data-website-id': 'f516de8c-ed2a-483b-b34b-7d7760a7586d'
        }
      ]
    )
  }

  return heads
}

export default headConfig
