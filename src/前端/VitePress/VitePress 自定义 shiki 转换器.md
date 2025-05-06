---
tags:
  - vitepress
createDateTime: 2025-05-05 21:53:43
publish: true
---

# VitePress 自定义 shiki 转换器

## 背景与问题

​VitePress​ 是我分享个人知识库的静态网页解决方案，而 ​Obsidian​ 是我本地用于编写文档的工具。

​Obsidian​ 丰富的插件生态极大地提升了 Markdown 编写体验，尤其是 obsidian-shiki-plugin​ 插件实现了类似 ​VitePress​ 集成的 ​Shiki​ 语法高亮功能。

然而，在实际使用中发现，尽管语法高亮效果相似，但在代码差异化显示方面存在显著差异：

1. ​VitePress 的代码差异显示方式​：
    - 在代码行中添加 `// [!code --]` 或 `// [!code ++]` 注释
    - 为该行创建 diff 效果，并保留代码块的颜色
2. ​obsidian-shiki-plugin 的代码差异显示方式​：
    - 在代码块顶部使用 `ins={1} del={5-10}` 这样的元数据标记
    - 这种方式更直观且便于维护（ps：其实后来发现注释更加便于维护，因为添加代码行不会变更，但是我的目标是 obsidian 和 VitePress 的一致性）

## 问题分析

这种差异导致了一个主要痛点：在 ​**Obsidian**​ 中编写的带有代码差异的内容，在 ​**VitePress**​ 中预览或发布时无法正确显示，需要手动调整格式。这严重影响了写作流程的一致性和效率，使得创作和分享体验不一致，写作过程颇为痛苦。

## 目标探索

为了解决这一问题，我开始探索如何统一这两个平台在代码差异显示方面的效果，实现"一次编写，多处一致展示"的目标。

这样就能确保在本地使用 Obsidian 编写的内容，在部署到 VitePress 后仍能保持相同的代码差异展示效果。

## 探索历程

### 发现 VitePress 的代码转换器配置

在研究 VitePress 的源码时，我发现了一个非常有潜力的配置项：`codeTransformers?: ShikiTransformer[]`。这个配置允许我们自定义 Shiki 的转换器，或许正是解决当前问题的关键所在。

通过查看 VitePress 的相关源码，我了解到这个配置项可以让我们在代码块渲染过程中插入自定义的转换逻辑，这为统一 Obsidian 和 VitePress 的代码差异显示提供了可能。

### Shiki 生态中的现成方案

进一步调研后，我发现 Shiki 本身已经具备了一些强大的转换器功能，这些应该就是 VitePress 内置 Shiki 的转换器：

1. ​**内置转换器**​：Shiki 提供了多个内置转换器，包括 `meta-highlight.ts` 和 `notation-diff.ts`，从文件命名来看，这些转换器很可能与我们的需求相关
2. ​**Expressive Code 的启示**​：通过研究 obsidian-shiki-plugin 发现它实际上是基于 Expressive Code 实现的，而 Expressive Code 又是基于 Shiki 构建的。更令人兴奋的是，Expressive Code 已经实现了我们需要的 `ins/del` 语法来标记代码差异

### 现成的解决方案？

虽然 Expressive Code 功能强大，但直接集成到 VitePress 可能需要较多工作。

### 最终方案

1. **研究 Shiki 内置转换器**​：重点分析 `meta-highlight.ts` 和 `notation-diff.ts` 的实现原理
2. ​**开发自定义转换器**​：基于 VitePress 的 `codeTransformers` 配置，编写转换器将 obsidian-shiki-plugin 的 `ins/del` 标记转换为 VitePress 可识别的格式

## 自定义 Diff 差异突出显示转换器

### 定义转换器

在 `VitePress` 项目下创建文件夹 `.vitepress\shikiTransformers`，新建文件 `meta-diff.ts`，内容如下：

```ts
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

```

### 添加转换器

修改文件 `.vitepress\config.ts` 

```ts showLineNumbers ins={1,8}
import { transformerMetaDiff } from './shikiTransformers/meta-diff'

markdown: {
      lineNumbers: true,
      image: {
        lazyLoading: true
      },
      codeTransformers: [transformerMetaDiff()],
      // ...
    },
```

> [!warning] 警告
>  目前也只是初步实现，可能存在 Bug，已知当使用 `transformerMetaDiff` 后，原先 `VitePress` 内置的 `shiki` 转换器 `transformerMetaHighlight` 会失效，比如使用 `ts showLineNumbers {2} ins={8}`，只会显示 diff 效果，原本的第二行 highlight 效果失效，暂时不知道原因。不过可以通过添加 `transformerMetaHighlight` 转换器修复，二者效果可以同时存在。我没添加原因是因为感觉二者同时存在的场景暂时没有。
>  
>  如有该场景需求的，按下述操作修复即可，如遇其他 bug，可参考修复。

```ts showLineNumbers ins={2,9}
import { transformerMetaDiff } from './shikiTransformers/meta-diff'
import { transformerMetaHighlight } from '@shikijs/transformers'

markdown: {
      lineNumbers: true,
      image: {
        lazyLoading: true
      },
      codeTransformers: [transformerMetaHighlight(), transformerMetaDiff()],
      // ...
    },
```


## 参考文章

[VitePress 集成 | Shiki 中文文档](https://shiki.zhcndoc.com/packages/vitepress)

[GitHub - mProjectsCode/obsidian-shiki-plugin](https://github.com/mProjectsCode/obsidian-shiki-plugin)

[shiki/packages/transformers/src/transformers at main · shikijs/shiki · GitHub](https://github.com/shikijs/shiki/tree/main/packages/transformers/src/transformers)

[转换器 | Shiki 中文文档](https://shiki.zhcndoc.com/guide/transformers)

