---
tags:
  - vitepress
createDateTime: 2025-05-04 20:30:21
publish: true
---

# VitePress 集成 Algolia & DocSearch 搜索

## 预览

![[VitePress 集成 Algolia & DocSearch 搜索-20250718.png|350]]

## Algolia & DocSearch 是什么？

> Docs are only helpful when your users can find answers easily.
> 
> 只有当用户能轻松找到答案时，文档才会有所帮助。

Algolia 是一家提供**搜索服务​**的科技公司，专注于为网站和应用程序提供快速、精准的实时搜索功能。

[DocSearch](https://docsearch.algolia.com/) 是 Algolia 旗下的一款免费产品，主要提供技术文档和技术博客的搜索服务，需要申请验证使用。

申请验证条件：
- 网站可以公开访问
- 网站是开源项目的技术文档或技术博客
- 网站的所有者

## 它的工作方式？

1. 采集：利用 [Algolia Crawler](https://www.algolia.com/products/search-and-discovery/crawler/) 定期索引网站的每个部分。
2. 配置：将 DocSearch 提供的代码片段添加至网站代码中。
3. 查询访问：用户输入搜索词后，请求通过 Algolia 的 API 发送至服务器。搜索结果在毫秒内返回，通常包含高亮显示、分页、筛选过滤等功能。

## 谁可以申请？

- 对所有开发人员文档和技术博客开放。
- DocSearch 的初衷是改善大型技术文档的搜索。因此，向所有在线技术文档和技术博客提供免费托管版本。
- 通常会拒绝未做好生产准备或网站上有非技术内容的申请。

## 申请使用 Algolia

访问官方申请地址 [DocSearch: Search made for documentation | DocSearch by Algolia](https://docsearch.algolia.com/apply) 进行功能使用申请。

申请过程略...

## 在 VitePress 中进行配置

VitePress 支持使用 [Algolia DocSearch](https://docsearch.algolia.com/docs/what-is-docsearch) 搜索文档站点。请参阅他们的入门指南。在你的 `.vitepress/config.ts` 中, 至少需要提供以下内容才能使其正常工作：

```ts showLineNumbers ins={4,6-8}
export default defineConfig({
  themeConfig: {
    search: {
      provider: 'algolia',
      options: {
        appId: '...',
        apiKey: '...',
        indexName: '...',
        locales: {
          root: {
            placeholder: '搜索文档',
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                searchBox: {
                  resetButtonTitle: '清除查询条件',
                  resetButtonAriaLabel: '清除查询条件',
                  cancelButtonText: '取消',
                  cancelButtonAriaLabel: '取消'
                },
                startScreen: {
                  recentSearchesTitle: '搜索历史',
                  noRecentSearchesText: '没有搜索历史',
                  saveRecentSearchButtonTitle: '保存至搜索历史',
                  removeRecentSearchButtonTitle: '从搜索历史中移除',
                  favoriteSearchesTitle: '收藏',
                  removeFavoriteSearchButtonTitle: '从收藏中移除'
                },
                errorScreen: {
                  titleText: '无法获取结果',
                  helpText: '你可能需要检查你的网络连接'
                },
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭',
                  searchByText: '搜索提供者'
                },
                noResultsScreen: {
                  noResultsText: '无法找到相关结果',
                  suggestedQueryText: '你可以尝试查询',
                  reportMissingResultsText: '你认为该查询应该有结果？',
                  reportMissingResultsLinkText: '点击反馈'
                }
              }
            }
          }
        }
      }
    }
  }
})

```

## 参考资料

[DocSearch: Search made for documentation | DocSearch by Algolia](https://docsearch.algolia.com/)

[搜索 | VitePress](https://vitepress.dev/zh/reference/default-theme-search#algolia-search)

