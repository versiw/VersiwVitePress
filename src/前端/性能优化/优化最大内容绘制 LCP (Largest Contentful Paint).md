---
tags:
  - 性能优化
createDateTime: 2025-10-25 17:04:58
publish: true
---

# 优化最大内容绘制 LCP (Largest Contentful Paint)


## 什么是 LCP

最大内容绘制，即 [Largest Contentful Paint (LCP)](https://web.dev/articles/lcp?hl=zh-cn) 是三项 [Core Web Vitals](https://web.dev/articles/vitals?hl=zh-cn#core_web_vitals) 指标之一，用于衡量网页主要内容的加载速度。具体来说，LCP 衡量的是从用户开始加载网页到视口内渲染最大图片或文本块的时间。

> [!note] 三项核心网页指标
> - **[Largest Contentful Paint (LCP)](https://web.dev/articles/lcp?hl=zh-cn)**：衡量加载性能。为了提供良好的用户体验，应在网页首次开始加载的 **2.5 秒**内完成 LCP。
> - **[Interaction to Next Paint (INP)](https://web.dev/articles/inp?hl=zh-cn)**：衡量互动性。为了提供良好的用户体验，网页的 INP 应不超过 **200 毫秒**。
> - **[Cumulative Layout Shift (CLS)](https://web.dev/articles/cls?hl=zh-cn)**：衡量视觉稳定性。为了提供良好的用户体验，网页的 CLS 应保持在 **0.1** 或更低。


为了提供良好的用户体验，**网站应力求将至少 75% 的网页访问的 LCP 控制在 2.5 秒或更短的时间内。**


## 测量 LCP 的方法


- 浏览器开发者工具的“性能”面板
- 浏览器开发者工具的“Lighthouse”面板
- [PageSpeed Insights](https://pagespeed.web.dev/?hl=zh-cn)：输入您的网址，它会提供来自真实用户的现场数据（如果可用）和实验室数据，并明确指出 LCP 元素。


## 可能的 LCP 元素

通常，LCP 元素是页面加载时视口内可见的最大内容，可能是以下几种类型：

- **图像**：`<img>` 元素或 `<svg>` 内的 `<image>` 元素
- **视频封面**：`<video>` 元素的海报图像
- **背景图片**：通过 `url()` 函数加载的 CSS 背景图
- **块级文本元素**：例如段落 `<p>`、标题 `<h1>-<h6>` 或 `<div>` 等包含文本节点的元素


## LCP 细分

对于经过良好优化的网页，LCP 资源请求应尽早开始加载，并希望 LCP 元素在 LCP 资源完成加载后尽快渲染。为了直观地了解特定网页是否遵循此原则，可以将 LCP 总时间分解为以下子部分：

- **首字节时间（Time to First Byte, TTFB）**：从用户开始加载网页到浏览器收到 HTML 文档响应的第一个字节所用的时间。
- **资源加载延迟**：从 TTFB 结束到浏览器开始加载 LCP 资源之间的时间。如果 LCP 元素不需要加载资源即可呈现（例如，如果该元素是使用系统字体呈现的文本节点），则此时间为 0。
- **资源加载时长**：加载 LCP 资源本身所需的时间。如果 LCP 元素不需要加载资源即可呈现，则此时间为 0。
- **元素渲染延迟**：从 LCP 资源完成加载到 LCP 元素完全渲染之间的时间。

每个网页的 LCP 都包含以下四个子类别。它们之间没有间隙或重叠，并且加起来等于完整的 LCP 时间。

![[优化最大内容绘制 LCP (Largest Contentful Paint)-20251026.png | 700]]

在优化 LCP 时，尝试单独优化这些子部分会很有帮助。但请务必注意，需要优化所有这些子部分。在某些情况下，应用于某个部分的优化不会改善 LCP，只会将节省的时间转移到另一部分。

例如，在之前的网络瀑布图中，如果通过压缩图片或改用更优的格式（例如 AVIF 或 WebP）来减小图片的文件大小，则会缩短**资源加载时长**，但实际上不会改善 LCP，因为时间只会转移到**元素渲染延迟**子部分：

![[优化最大内容绘制 LCP (Largest Contentful Paint)-20251026-1.png | 700]]

之所以会发生这种情况，是因为在此网页上，LCP 元素在 JavaScript 代码完成加载之前处于隐藏状态，然后所有内容会一次性显示出来。

此示例有助于说明，需要优化所有这些子部分，才能获得最佳 LCP 结果。

### 最佳子部分时间

为了优化 LCP 的每个子部分，务必要了解优化良好的网页上这些子部分的理想细分情况。

在四个子部分中，有两个的名称中包含“延迟”一词。这表明您希望这些时间尽可能接近于零。另外两部分涉及网络请求，而网络请求本身就需要时间。

| LCP 子部分 | LCP 占比 (%) |
| :------ | :--------: |
| 首字节时间   |    ~40%    |
| 资源加载延迟  |    <10%    |
| 资源加载时长  |    ~40%    |
| 元素渲染延迟  |    <10%    |
| **总计**  |  **100%**  |

一种不错的 LCP 时间细分思路是：

- **绝大部分** LCP 时间应该花在加载 HTML 文档和 LCP 源上。
- 在 LCP 之前的任何时间，如果这两个资源中的一个未加载，则**有机会进行改进**。

## 优化策略

### 1. 缩短资源加载时长

此步骤的目标是减少通过网络将资源字节传输到用户设备所花费的时间。一般来说，您可以通过以下方式来完成此操作。

#### 缩减资源的大小

网页的 LCP 资源（如果有）将是图片或 Web 字体。以下指南详细介绍了如何缩减以上两项的大小：

- [提供最佳图片大小](https://developer.chrome.com/docs/lighthouse/performance/uses-responsive-images?hl=zh-cn)
- [使用现代图片格式](https://developer.chrome.com/docs/lighthouse/performance/uses-webp-images?hl=zh-cn)
- [压缩图片](https://developer.chrome.com/docs/lighthouse/performance/uses-optimized-images?hl=zh-cn)
- [缩小网页字体大小](https://web.dev/articles/reduce-webfont-size?hl=zh-cn)

#### 缩短资源必须经过的距离

- [内容分发网络](https://web.dev/articles/content-delivery-networks?hl=zh-cn) (CDN)：让服务器尽可能靠近用户来缩短加载时间。
- [图片 CDN](https://web.dev/articles/image-cdns?hl=zh-cn)：不仅可以缩短资源传输距离，还可以减小资源大小，自动为您实现之前的所有大小缩减建议。

#### 减少对网络带宽的争用（预加载关键资源）

即使您已减小资源的大小和传输距离，如果您同时加载许多其他资源，资源仍可能需要很长时间才能加载完毕。此问题称为网络争用。

- 使用 `fetchpriority="high"` 属性来提示浏览器尽早开始加载该资源。浏览器会尽最大努力防止低优先级资源与该资源竞争。

> [!note] 注意
> 如果您加载了许多具有较高 `fetchpriority` 的资源，或者只是加载了大量资源，那么这可能会影响 LCP 资源的加载速度。


### 2. 消除资源加载延迟

此步骤的目标是确保 LCP 资源尽早开始加载。

一个不错的经验法则是，LCP 资源应与该网页加载的第一个资源同时开始加载。换句话说，如果 LCP 资源开始加载的时间晚于第一个资源，则有改进空间。

![[优化最大内容绘制 LCP (Largest Contentful Paint)-20251026-2.png | 700]]

一般来说，有两个因素会影响 LCP 资源的加载速度：

- 发现资源的时间。
- 资源获得的优先级。

#### 在发现资源时进行优化

为确保 LCP 资源尽早开始加载，关键在于浏览器预加载扫描器能够在初始 HTML 文档响应中发现该资源。

- 使用 `<link rel="preload">` 可以实现对 LCP 图片或字体等关键静态资源的预加载。


尽可能避免以下做法:

- **JS 动态添加**：LCP 元素是使用 JavaScript 动态添加到网页中的 `<img>`。
- **JS 延迟加载**：LCP 元素通过 JavaScript 库延迟加载，该库会隐藏其 `src` 或 `srcset` 属性（通常为 `data-src` 或 `data-srcset`）。
- **CSS 直接引用**：仅在外部 CSS 文件中通过 `background-image: url(...)` 引用 LCP 图片，而不在 HTML 中预加载。

为消除不必要的资源加载延迟，您的 LCP 资源应可从 HTML 源代码中发现。例如：

```html
<link rel="preload" as="image" href="/path/to/hero-image.webp" type="image/webp">
```


#### 优化资源获得的优先级

即使 LCP 资源可从 HTML 标记中发现，它仍然可能不会像第一个资源那样尽早开始加载。如果浏览器预加载扫描器的优先级启发法无法识别出相应资源的重要性，或者如果它确定其他资源更重要，则可能会发生这种情况。

例如，如果您在 `<img>` 元素上设置 ` loading="lazy"`，则可以使用 HTML 延迟 LCP 图片。使用延迟加载意味着，在布局确认图片位于视口中之前，资源不会加载，因此加载时间可能会比正常情况下晚。

- 避免对 LCP 图片使用懒加载，在 `<img>` 标签上添加 `loading="eager"` 属性，作为对预加载的补充和加强。

> [!warning] 警告
> 切勿延迟加载 LCP 图片，因为这始终会导致不必要的资源加载延迟，并对 LCP 产生负面影响。

即使没有延迟加载，浏览器也不会以最高优先级初始加载图片，因为它们不是会阻止渲染的资源。对于可以从更高优先级中受益的资源，您可以使用 fetchpriority 属性向浏览器提示哪些资源最重要：

```html
<img fetchpriority="high" src="/path/to/hero-image.webp">
```

如果您认为某个 `<img>` 元素很可能是网页的 LCP 元素，最好为该元素设置 `fetchpriority="high"`。不过，如果将多个图片（超过一两个）设置为高优先级，则优先级设置对缩短 LCP 毫无帮助。

您还可以降低文档响应中可能位于较早位置但因样式设置而不可见的图片的优先级，例如启动时不可见的轮播幻灯片中的图片：

```html
<img fetchpriority="low" src="/path/to/carousel-slide-3.webp">
```


优化 LCP 资源优先级和发现时间后，您的网络瀑布图应如下所示（LCP 资源与第一个资源同时开始）：

![[优化最大内容绘制 LCP (Largest Contentful Paint)-20251026-3.png | 700]]


### 3. 消除元素渲染延迟

默认情况下，CSS 和 JavaScript 都会阻塞页面的渲染，推迟 LCP 的出现。

#### 减少 CSS 阻塞时间

##### 精简和压缩 CSS

移除不必要的字符，如空格和注释。一般可以在构建工具处进行优化设置。

##### 延迟加载非关键 CSS

将与首屏无关的 CSS 分离出来，并使用异步方式加载。

使用浏览器开发者工具中的 `Coverage / 覆盖范围` 面板可以找到页面未使用的 css。

- 移除无用的 css，并将它们移到需要的页面
- 用 `rel="preload"` 和 `onload` 异步加载对于初次渲染无用的 css

##### 内联关键 CSS

将渲染首屏内容所必需的 CSS 直接嵌入到 HTML 的 `<head>` 标签中，消除额外的网络请求。

#### 减少 JavaScript 阻塞时间


##### 异步加载 JavaScript

使用 `async` 或 `defer` 属性来避免 JavaScript 阻塞 DOM 解析。

##### 内联关键脚本

如果某段 JS 必须在页面加载初期尽快运行，并且其体积非常小，可以将其内联到 HTML 中以避免网络请求延迟。

##### 精简和压缩 JavaScript 文件


#### 使用服务器端渲染

- 服务器端呈现 (SSR)：指在服务器上运行客户端应用逻辑，并使用完整的 HTML 标记来响应 HTML 文档请求的过程。缺点是需要额外的服务器处理时间，这可能会减慢 TTFB。不过，这种权衡通常是值得的，因为服务器处理时间在您的控制范围内，而用户的网络和设备功能不在您的控制范围内。
- 静态网站生成 (SSG)：在构建步骤中（而不是按需）生成 HTML 页面的过程。如果您的架构支持预渲染，那么从性能角度来看，预渲染通常是更好的选择。

### 4. 缩短加载首字节所需时间（优化 TTFB）

此步骤的目标是尽快提供初始 HTML。此步骤之所以列在最后，是因为开发者通常对此步骤的控制权最少。不过，这也是最重要的步骤之一，因为它会直接影响后续的每个步骤。在后端传送第一个内容字节之前，前端不会发生任何事情，因此，您采取的任何加快 TTFB 的措施都会改善其他所有加载指标。

对于原本速度很快的网站，TTFB 较慢的常见原因是访问者通过多次重定向（例如通过广告或[缩短的链接](https://en.wikipedia.org/wiki/URL_shortening)）到达网站。始终尽可能减少访问者必须等待的重定向次数。

另一个常见原因是无法从 CDN 边缘服务器使用缓存内容，并且所有请求都必须一直返回到源服务器。如果访问者使用唯一的网址参数进行分析，即使这些参数不会导致网页发生变化，也可能会出现这种情况。

#### 启用页面缓存

缓存 HTML 页面可以显著减少服务器处理时间。

#### 使用内容分发网络（CDN）

CDN 可以将您的内容缓存到全球各地的服务器上，让用户从就近的节点加载，从而减少网络延迟。


#### 尽早建立第三方连接

发往第三方服务的请求也会影响 LCP，特别是当页面关键内容依赖它们的时候。使用 `<link rel="preconnect">` 来提前与关键的第三方域名建立连接，为后续的资源请求节省时间。

```html
<link rel="preconnect" href="https://example.com">
```

使用 [dns-prefetch](https://developer.mozilla.org/zh-CN/docs/Web/Performance/Guides/dns-prefetch) 让 dns 解析更快。

```html
<link rel="dns-prefetch" href="https://example.com">
```

考虑到浏览器兼容性， `dns-prefetch` 可以作为 `preconnect` 的一个 fallback。

```html
<head>
  <link rel="preconnect" href="https://example.com">
  <link rel="dns-prefetch" href="https://example.com">
</head>
```

> [!note] 注意
> - `dns-prefetch` 仅对[跨源](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Guides/CORS)域上的 DNS 查找有效，因此请避免使用它来指向你的站点或域。
> - 如果页面需要建立与许多第三方域的连接，则将它们预先连接会适得其反。`preconnect` 提示最好仅用于最关键的连接。对于其他的连接，只需使用 `<link rel="dns-prefetch">` 即可节省第一步——DNS 查询——的时间。


#### 选择高性能的托管服务

您的主机提供商对服务器响应速度有直接影响。


## 参考资料

[优化 Largest Contentful Paint  |  Articles  |  web.dev](https://web.dev/articles/optimize-lcp?utm_source=lighthouse&utm_medium=devtools&hl=zh-cn)

[优化LCP提升页面加载性能-CSDN博客](https://blog.csdn.net/wuchen092832/article/details/107903286)


