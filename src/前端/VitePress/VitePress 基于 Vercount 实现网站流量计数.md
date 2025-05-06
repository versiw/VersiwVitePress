---
tags:
  - vitepress
createDateTime: 2025-05-06 17:15:45
publish: true
---

# VitePress 基于 Vercount 实现网站流量计数

## 预览

![[VercountPreview.gif]]

## Vercount 介绍

[Vercount](https://cn.vercount.one/) 是一个可用于 VitePress 实现网站流量计数的插件，它优化了不蒜子 ([busuanzi](https://busuanzi.ibruce.info/)) 的一些缺点，并且支持自托管。

## 特点

- **极速响应**：服务器响应时间在 10ms 以内。
- **高可用性**：支持中国加速版本或 Vercel 全球 CDN，确保 99.99% 的可用性。
- **精准统计**：使用 POST 请求，克服传统 Referrer 方法在移动端和某些浏览器上的不足。
- **安全防护**：采用 JSON 回调方式，杜绝 CSRF 攻击风险，了解更多请查看：[JSONP](https://en.wikipedia.org/wiki/JSONP)。
- **自动数据同步**：无需手动操作，`site_pv`、`site_uv` 和 `page_pv` 数据会自动同步。
- **无缝兼容**：支持不蒜子的 `span` 标签，轻松切换。
- **持久数据存储**：使用 Redis 定期备份，确保数据不丢失。
- **Serverless 架构**：通过 Vercel Serverless Functions 提供后端支持，保证 99.99% 的可用性。
- **自托管**：支持自托管，可以部署到任何支持 NextJS 的平台。
- **编辑访客数据**：支持自定义网站的访客数据，前往 [vercount.one](https://vercount.one/) 登录即可

## 统计方式

- **页面浏览量**：每访问一次加一。
- **独立访客量**：通过用户的 UserAgent 和 IP 地址判断。

## 实现

### 默认实现

#### 添加 script

修改文件 `.vitepress\config.ts`

```ts showLineNumbers ins={3}
// ...
head: [
    ['script',{defer: '',async: '',src: 'https://cn.vercount.one/js'}]
  ],
// ...
```

> [!tip] 提示
> 中国访问优化：https://cn.vercount.one/js
> 
> 海外访问优化：https://events.vercount.one/js

#### 添加标签

在页面显示位置处添加代码

```vue
本文总阅读量 <span id="vercount_value_page_pv">Loading</span> 次
本站总访问量 <span id="vercount_value_site_pv">Loading</span> 次
本站总访客数 <span id="vercount_value_site_uv">Loading</span> 人
```

### SPA 应用下的优化

一般静态网站项目只需要在 html 的 head 中引入 `script` 标签即可，但是 `vitepress` 项目实际是比较特殊的 [单页应用程序](https://vitepress.dev/zh/guide/what-is-vitepress#performance)，切换页面并不会触发整个页面的刷新，不会再次触发 `script` 重载。

#### 实现调用访问量函数

新建文件 `.vitepress\theme\hooks\useVisitData.ts`

```ts
/**
 * 网站访问量统计
 *
 * https://cn.vercount.one/
 */
const useVisitData = () => {
  const script = document.createElement('script')
  script.defer = true
  script.async = true
  // 调用 Vercount 接口
  script.src = 'https://cn.vercount.one/js'
  document.head.appendChild(script)
}

export default useVisitData

```

#### 全站的访问统计

每个页面跳转都要计算到总访问量中去。

修改文件 `.vitepress\theme\index.ts`

```ts showLineNumbers ins={1,5-10}
import useVisitData from './hooks/useVisitData'

async enhanceApp({ app, router, siteData }: EnhanceAppContext) {
  // ...
  if (inBrowser) {
    // 网站访问量统计，路由加载完成，在加载页面组件后（在更新页面组件之前）调用。
    router.onAfterPageLoad = (to: string) => {
      useVisitData()
    }
  }
  // ...
}
```

#### 优化页面显示

我的 `VitePress` 站点集成了 `Naive UI` 组件库的使用，直接利用其[数值动画 Number Animation](https://www.naiveui.com/zh-CN/os-theme/components/number-animation) 组件进行页面显示优化。

#### 新建流量计数组件

新建文件 `.vitepress\theme\components\VisitData.vue`

```vue
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
const pagePV = ref(0)
const sitePV = ref(0)
const siteUV = ref(0)
let observer

onMounted(() => {
  // 初始化ref值（如果已经有值）
  updateCountsFromDOM()

  // 创建MutationObserver来监听DOM变化
  observer = new MutationObserver(() => {
    updateCountsFromDOM()
  })

  // 配置观察选项
  const config = {
    childList: true,
    subtree: true,
    characterData: true
  }

  // 开始观察整个文档或特定容器
  observer.observe(document.body, config)
})

onUnmounted(() => {
  // 组件卸载时停止观察
  if (observer) {
    observer.disconnect()
  }
})

function updateCountsFromDOM() {
  const pagePVElement = document.getElementById('vercount_value_page_pv')
  const sitePVElement = document.getElementById('vercount_value_site_pv')
  const siteUVElement = document.getElementById('vercount_value_site_uv')

  pagePV.value = parseCount(pagePVElement?.textContent)
  sitePV.value = parseCount(sitePVElement?.textContent)
  siteUV.value = parseCount(siteUVElement?.textContent)
}

function parseCount(text) {
  if (!text) return 0
  // 提取数字部分
  const match = text.toString().match(/\d+/)
  return match ? parseInt(match[0], 10) : 0
}
</script>

<template>
  <div style="display: none">
    本文总阅读量 <span id="vercount_value_page_pv" style="display: none">Loading</span> 次
    本站总访问量 <span id="vercount_value_site_pv" style="display: none">Loading</span> 次
    本站总访客数 <span id="vercount_value_site_uv" style="display: none">Loading</span> 人
  </div>

  <NGrid class="visit-data-class" :cols="2">
    <NGridItem id="vercount_container_site_pv" style="display: none">
      <NStatistic label="本站总访问量" tabular-nums>
        <NNumberAnimation show-separator :from="0" :to="sitePV" />
        <template #suffix> 次 </template>
      </NStatistic>
    </NGridItem>
    <NGridItem id="vercount_container_site_uv" style="display: none">
      <NStatistic label="本站总访客数" tabular-nums>
        <NNumberAnimation show-separator :from="0" :to="siteUV" />
        <template #suffix> 人 </template>
      </NStatistic>
    </NGridItem>
  </NGrid>
</template>

<style>
.visit-data-class {
  margin-top: 18px;
}
</style>

```

> [!tip]  提示
> Vercount 显示缺点：
> 1. 刷新页面后，会先显示之前的缓存数据，再从接口拉取新数据更新到界面上，观感上会有点怪。
> 2. 统计单文章页面访问量，切换页面后，会先显示上一个页面的访问数据，再更新到本页面的访问数据。
> 
> 优化方法：
> 
> 在含有 id 标签 `id="vercount_container_site_pv"` 的容器添加 style 属性：`style="display: none"`，直到正确获取数据后会自动显示出来。

#### 添加组件

修改文件 `.vitepress\theme\components\Layout.vue`

```vue showLineNumbers ins={2,6-8}
<script setup lang="ts">
import VisitData from './VisitData.vue'
</script>

<template>
  <template #home-hero-actions-after>
	<VisitData />
  </template>
</template>
```


## 参考文章

[Vercount - 网站流量计数器](https://cn.vercount.one/)

[vitepress静态网站添加访问量统计一、网站统计插件 目前我使用到的访问统计插件有两个，一个是 不蒜子 busuan - 掘金](https://juejin.cn/post/7442554317052493850#heading-8)

[GitHub - EvanNotFound/vercount: Busuanzi Compatible Website Counter Powered by Vercel + Redis](https://github.com/EvanNotFound/vercount)

