// @ts-ignore
import { data as articles } from '../loders/articles.data'
import type { Router } from 'vitepress'

export function setupRandomRead(router: Router) {
  if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
      const button = document.querySelector('.actions .action:first-child .VPButton')
      button.removeAttribute('href')
      const hostname = window.location.hostname
      if (button) {
        button.addEventListener('click', (e) => {
          e.preventDefault()
          if (articles.length > 0) {
            const randomIndex = Math.floor(Math.random() * articles.length)
            const randomArticle = articles[randomIndex]
            if (router) {
              router.go(
                (hostname.includes('localhost') ? '/VersiwVitePress' : '') + randomArticle.url
              )
            } else {
              window.location.href =
                (hostname.includes('github') ? '/VersiwVitePress' : '') + randomArticle.url
            }
          } else {
            console.warn('没有可用的文章')
          }
        })
      }
    })
  }
}
