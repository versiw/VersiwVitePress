---
tags:
  - vitepress
createDateTime: 2025-04-30 19:46:12
publish: true
---

# VitePress 基于 giscus 实现评论功能

## giscus 介绍

[giscus](https://giscus.app/zh-CN) 利用 [GitHub Discussions](https://docs.github.com/en/discussions) 实现的评论系统，让访客借助 GitHub 在你的网站上留下评论和反应吧！

## 如何运作

giscus 加载时，会使用 [GitHub Discussions 搜索 API](https://docs.github.com/en/graphql/guides/using-the-graphql-api-for-discussions#search) 根据选定的映射方式（如 `URL`、`pathname`、`<title>` 等）来查找与当前页面关联的 `discussion`。如果找不到匹配的 `discussion`，`giscus bot` 就会在第一次有人留下评论或回应时自动创建一个 `discussion`。

访客如果想要评论，必须按照 GitHub OAuth 流程授权 [giscus app](https://github.com/apps/giscus) [代表他发布](https://docs.github.com/en/developers/apps/identifying-and-authorizing-users-for-github-apps)，或者可以直接在 GitHub Discussion 里评论。你可以在 GitHub 上管理评论。

## 特点

- [开源](https://github.com/giscus/giscus)。🌏
- 无跟踪，无广告，永久免费。📡 🚫
- 无需数据库。所有数据均储存在 GitHub Discussions 中。
- 支持[自定义主题](https://github.com/giscus/giscus/blob/main/ADVANCED-USAGE.md#data-theme)！🌗
- 支持[多种语言](https://github.com/giscus/giscus/blob/main/CONTRIBUTING.md#adding-localizations)。🌐
- [高可配置性](https://github.com/giscus/giscus/blob/main/ADVANCED-USAGE.md)。🔧
- 自动从 GitHub 拉取新评论与编辑。🔃
- [可自建服务](https://github.com/giscus/giscus/blob/main/SELF-HOSTING.md)！🤳


## 安装使用

### 仓库开启 Github Discussions

在仓库的 `Settings` -> `General` -> `Features` -> `Discussions` 中开启 Discussions 功能

### 仓库安装 giscus app

访问 [GitHub Apps - giscus · GitHub](https://github.com/apps/giscus) ，在 Github 账户中集成 giscus 应用。可以选择为所有的存储库安装或者特定的存储库安装。

### 在线配置 giscus

请确保：

1. **该仓库是[公开的](https://docs.github.com/en/github/administering-a-repository/managing-repository-settings/setting-repository-visibility#making-a-repository-public)**，否则访客将无法查看 discussion。
2. **[giscus](https://github.com/apps/giscus) app 已安装**，否则访客将无法评论和回应。
3. **Discussions** 功能已[在你的仓库中启用](https://docs.github.com/en/github/administering-a-repository/managing-repository-settings/enabling-or-disabling-github-discussions-for-a-repository)。

访问 [giscus](https://giscus.app/zh-CN)，进行 giscus 的在线配置，按要求输入仓库，可以检查仓库是否满足 giscus 开启条件，根据页面引导完成配置，下方底部会给出生成好的 `<script>` 标签

![[VitePress 实现评论功能-20250430.png]]

#### 映射关系

我选择的是 `<title>`

#### Discussion 分类

我选择的是 `Announcements`

#### 特性

![[VitePress 实现评论功能-20250430-1.png]]

## 在 VitePress 中集成

### 安装依赖

```shell
npm i -D @giscus/vue
```

### 创建组件

在 `.vitepress\theme\components` 目录下新建 `GiscusComment.vue` 文件，添加如下内容：

```html
<script setup>
import Giscus from '@giscus/vue'
import { useRoute, useData } from 'vitepress'

const route = useRoute()
const { isDark } = useData()
</script>

<template>
  <div style="margin-top: 24px">
    <Giscus
      id="comments"
      repo="versiw/VersiwVitePress"
      repoid="R_kgDOOWaB1w"
      category="Announcements"
      categoryid="DIC_kwDOOWaB184Cpoaj"
      lang="zh-CN"
      mapping="title"
      term="Welcome to @giscus/vue component!"
      reactionsenabled="1"
      emitmetadata="0"
      inputposition="top"
      :theme="isDark ? 'dark' : 'light'"
      :key="route.path"
    ></Giscus>
  </div>
</template>

```

### 使用组件

在 `.vitepress/theme/index.ts` 中引入 `GiscusComment` 组件

```ts
Layout: () => {
  return h(Layout, null, {
    'doc-after': () => h(GiscusComment),
  })
},
```

我这里使用了 `VitePress` 的自定义布局，所以我还需要在自定义布局文件 `Layout.vue` 中添加具名插槽。

```vue
<template>
    <DefaultTheme.Layout>
      <template #doc-after>
        <slot name="doc-after" />
      </template>
    </DefaultTheme.Layout>
</template>
```

> [!note] 注意
> 请注意**使用组件**这一部分的使用，结合实际 `VitePress` 的配置，做出适当修改


## 参考资料


[giscus](https://giscus.app/zh-CN)

[给 VitePress 添加评论功能 | Henry Site](https://site.quteam.com/technology/front-end/vitepress-comment/)



