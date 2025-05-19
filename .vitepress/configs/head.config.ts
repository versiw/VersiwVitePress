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
    const isGitHubPages = env.VITE_DEPLOY_PLATFORM === 'github'
    heads.push(
      // Bing Webmaster Tools
      ['meta', { name: 'msvalidate.01', content: '7D0D5E34E0E1AE2E7F92802CB2D9308D' }],
      // Umami Analysis
      [
        'script',
        {
          defer: '',
          async: '',
          src: 'https://umami.versiw.com/umm.js',
          // src: env.VITE_BASE + 'scripts/umm.js',
          // 'data-host-url': 'https://umami.versiw.com',
          'data-website-id': isGitHubPages
            ? '656ea8ec-3ea1-4bd5-9ce3-2b87abd42c5c'
            : '14a6bdb6-1972-4d51-8821-52f63c03713c'
        }
      ]
    )
  }

  return heads
}

export default headConfig
