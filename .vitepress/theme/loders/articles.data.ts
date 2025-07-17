import { type ContentData, createContentLoader } from 'vitepress'

declare const data: ContentData[]

export { data }

export default createContentLoader('**/*.md', {
  transform(rawData) {
    return rawData.filter(
      (item: ContentData) => item.url.endsWith('.html') && item.frontmatter?.publish
    )
  }
})
