import { createContentLoader } from 'vitepress'
import { murmurHash3_32ToBase62 } from '../lib/murmHash3_32'

interface ShortLinkMap {
  [hash: string]: string
}

const generateHash = (path: string): string => {
  return murmurHash3_32ToBase62(path)
}

declare const data: ShortLinkMap

export { data }

export default createContentLoader('**/*.md', {
  transform(rawData): ShortLinkMap {
    const mapping: ShortLinkMap = {}
    rawData.map(({ url }) => {
      const cleanPath = url.replace(/\.html$/, '/')

      mapping[generateHash(cleanPath)] = cleanPath
    })

    if (process.env.NODE_ENV === 'development') {
      console.log('🔗 开发模式 - 短链接映射表:', mapping)
    } else if (process.env.NODE_ENV === 'production') {
      console.log(`\n✅ 成功生成短链接映射`)
    }
    return mapping
  }
})
