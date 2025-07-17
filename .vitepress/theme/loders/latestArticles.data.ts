import { type ContentData, createContentLoader } from 'vitepress'
import dayjs from 'dayjs'

interface LatestArticle {
  title: string
  date: string
  tags: []
  url: string
}

declare const data: LatestArticle[]

export { data }

export default createContentLoader('**/*.md', {
  transform(rawData) {
    return rawData
      .filter((item: ContentData) => item.url.endsWith('.html') && item.frontmatter?.publish)
      .sort((a, b) => {
        const dateA = dayjs(a.frontmatter.createDateTime || '1970-01-01T00:00:00Z')
        const dateB = dayjs(b.frontmatter.createDateTime || '1970-01-01T00:00:00Z')
        return dateB.valueOf() - dateA.valueOf()
      })
      .slice(0, 3)
      .map((article) => {
        return {
          title: article.url.split('/').pop()?.replace('.html', ''),
          date: dayjs(article.frontmatter?.createDateTime).format('YYYY-MM-DD'),
          tags: article.frontmatter?.tags || [],
          url: article.url
        }
      })
  }
})
