// @ts-ignore
import { data as articles } from '../loders/articles.data'
import type { Router } from 'vitepress'

export function setupRandomRead(router: Router) {
  if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
      const button = document.querySelector('.actions .action:first-child .VPButton')
      button.removeAttribute('href')
      if (button) {
        button.addEventListener('click', (e) => {
          e.preventDefault()
          if (articles.length > 0) {
            const randomIndex = Math.floor(Math.random() * articles.length)
            const randomArticle = articles[randomIndex]
            if (router) {
              router.go(randomArticle.url)
            } else {
              window.location.href = randomArticle.url
            }
          } else {
            console.warn('没有可用的文章')
          }
        })
      }
    })
  }
}
