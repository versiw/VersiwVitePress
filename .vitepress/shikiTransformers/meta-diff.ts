import type { ShikiTransformer } from '@shikijs/types'

export function parseMetaDiffString(meta: string, diffMode: 'ins' | 'del'): number[] | null {
  if (!meta) return null
  const match = meta.match(new RegExp(`${diffMode}\\s*=\\s*\\{?([\\d,-]+)\\}?`))
  if (!match) return null
  const lines = match[1].split(',').flatMap((v) => {
    const num = v.split('-').map((v) => Number.parseInt(v, 10))
    if (num.length === 1) return [num[0]]
    return Array.from({ length: num[1] - num[0] + 1 }, (_, i) => i + num[0])
  })
  return lines
}

export interface TransformerMetaDiffOptions {
  /**
   * Class for added lines
   */
  classLineAdd?: string
  /**
   * Class for removed lines
   */
  classLineRemove?: string
}

const symbolIns = Symbol('ins-lines')
const symbolDel = Symbol('del-lines')

export function transformerMetaDiff(options: TransformerMetaDiffOptions = {}): ShikiTransformer {
  const { classLineAdd = 'diff add', classLineRemove = 'diff remove' } = options

  return {
    name: 'transformers:meta-diff-ins',
    line(node, line) {
      if (!this.options.meta?.__raw) {
        return
      }
      const meta = this.meta as {
        [symbolIns]?: number[] | null
        [symbolDel]?: number[] | null
      }

      meta[symbolIns] ??= parseMetaDiffString(this.options.meta.__raw, 'ins')
      meta[symbolDel] ??= parseMetaDiffString(this.options.meta.__raw, 'del')

      const insLines: number[] = meta[symbolIns] ?? []
      const delLines: number[] = meta[symbolDel] ?? []

      if (insLines.includes(line)) this.addClassToHast(node, classLineAdd)
      if (delLines.includes(line)) this.addClassToHast(node, classLineRemove)
      return node
    }
  }
}
