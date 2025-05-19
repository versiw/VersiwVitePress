---
tags:
  - vitepress
createDateTime: 2025-05-07 17:35:22
publish: true
---

# VitePress 基于 Umami 实现站点数据统计

## Umami 是什么？

`Umami` 是一个开源的、以隐私为中心的网站分析工具，是 Google Analytics 的替代品。它提供网站流量、用户行为和性能的基本见解，同时优先考虑数据隐私。

与许多传统分析平台不同，`Umami` 不会收集或存储个人数据，避免了对 cookies 的需求，并且符合 GDPR 和 PECR 标准。

`Umami` 设计轻量且易于设置，可以进行自托管，使用户对其数据拥有完全控制权。

## 自部署方案

`Umami` 可以自部署也可以使用其 [Umami Cloud](https://umami.zhcndoc.com/docs/cloud)。

经过网络搜索资料综合研究后决定采用 ~~`Netlify(坑多勿入)`~~ `Vercel` 和 ` Supabase ` 进行自部署。

并且，`Umami` 官方指南针对二者都有详细的部署文档。

## 在 Supabase 上部署数据库

### 新建数据库

创建名为 `Umami` 的数据库，过程略。

### 获取数据库链接

直接在数据库页面顶部导航栏点击 `Connect`

![[VitePress 基于 Umami 实现站点数据统计-20250507.png]]

复制数据库链接，分别复制 `Transaction pooler` 和 `Session pooler` 的链接，然后将 `YOUR-PASSWORD` 替换为创建数据库时填写的密码，得到数据库链接。

`Transaction pooler` 链接

```txt
postgresql://postgres.mnnumwzyfnzxpydfizub:[YOUR-PASSWORD]@[YOUR-HOST]:6543/postgres
```

`Session pooler` 链接

```txt
postgresql://postgres.mnnumwzyfnzxpydfizub:[YOUR-PASSWORD]@[YOUR-HOST]:5432/postgres
```

> [!tip] 提示
> `[YOUR-PASSWORD]` 整个替换为自己的数据库密码

## 在 Netlify 上部署前端界面（不推荐）

### fork 仓库

访问 [Umami](https://github.com/umami-software/umami) 仓库 `fork` 到自己的仓库，选择 `fork` 而不是使用指南里的自动化步骤是为了后期 Umami 更新了可以方便同步。

### 修改源码

进入刚才 `fork` 下来的 umami 仓库，编辑 `db/postgresql/schema.prisma` 文件，添加 `directUrl = env("DIRECT_DATABASE_URL")`

```prisma showLineNumbers ins={4}
datasource db {
  provider     = "postgresql"
  url          = env("DATABASE_URL")
  directUrl    = env("DIRECT_DATABASE_URL")
  relationMode = "prisma"
}
```

### 导入 Netlify

将 `fork` 下来的仓库，在 Netlify 中导入。

需要修改的地方：

- 将构建命令更改为 `yarn run build`。
- 添加环境变量：
	- `DATABASE_URL`：`Transaction pooler` 链接
	- `DIRECT_DATABASE_URL`：`Session pooler` 链接

> [!note] 注意
> `Transaction pooler` 链接后追加 `?pgbouncer=true`
> 
> 原因暂时未知，官方指南和网上文章有提到，先照做，有时间再补知识

## 在 Vercel 上部署前端界面

步骤参考[[#在 Netlify 上部署前端界面（不推荐）]], 大体上流程差不多的。

### 绕过广告拦截器

既然都换托管平台了，那之前 `Netlify` 的环境变量 `TRACKER_SCRIPT_NAME` 失效的问题也应该得到了解决，毕竟如果更新了 `Umami` 还需要替换跟踪脚本文件，应该挺麻烦的。

官方提供多种方法避免被拦截，我采用设置环境变量方式。

添加环境变量：

- `TRACKER_SCRIPT_NAME`：`umm.js`
- `COLLECT_API_ENDPOINT`：`/api/umm`

## 运行

等待部署完成，访问即可

详细使用参考 Umami 指南配置即可：[umami.zhcndoc.com/docs/login](https://umami.zhcndoc.com/docs/login)

## 屏蔽本地访问

### 开启屏蔽

在想要屏蔽自己本地访问记录的站点上打开控制台，输入：

```js
localStorage.setItem('umami.disabled', 1);
```

### 取消屏蔽

```js
localStorage.removeItem('umami.disabled');
```

## 问题解决

### 数据不更新，遭到浏览器插件拦截

浏览器插件根据脚本名进行判断，包含 `analysis`、`script` 等的 `js` 脚本可能会被拦截。

通过 `Umami` 部署的环境变量更改跟踪脚本名称，添加 `TRACKER_SCRIPT_NAME` 环境变量，设置为你想要的名称，例如 `umm-versiw.js`。

实测，`2.17.0` 版本，`Netlify` 修改环境变量并没有起效，具体参考 [[#TRACKER_SCRIPT_NAME 环境变量再 Netlify 中构建不起作用]]

### TRACKER_SCRIPT_NAME 环境变量再 Netlify 中构建不起作用

在 Netlify 中添加环境变量 `TRACKER_SCRIPT_NAME` 进行构建自定义 Umami 跟踪脚本名称时，构建成功后，Umami 仪表盘显示跟踪脚本名称被修改，但是访问依旧报错 `404`。

[TRACKER\_SCRIPT\_NAME not works on netlify deployment · Issue #1254 · umami-software/umami](https://github.com/umami-software/umami/issues/1254)，这个 issues 提到 Netlify 构建 `TRACKER_SCRIPT_NAME` 环境变量失效，虽然时间是 2022 年的。但是我在 2025 年还是遇到了这个问题。可能确实 Netlify 中该环境变量无效吧。

网上关于 Umami 的帖子确实不算多，大多内容几乎差不多。

根据 Umami 官方帖子 [umami.zhcndoc.com/docs/bypass-ad-blockers](https://umami.zhcndoc.com/docs/bypass-ad-blockers)

采用 `托管跟踪脚本`，将原有的 `script.js` 跟踪脚本先下载下来放在项目静态资源中，然后将数据发送给 Umami 服务器。

缺点就是：如果 Umami 版本更新导致 `script.js` 代码变更，可能需要重新下载。

官方写的挺清楚的，过程略了。

### 多站点下，数据混淆或更新慢等现象

我的站点同时部署在 Netlify 和 Github Pages 上，起初，为了方便，我直接将两个站点的 Umami 配置文件都写在了 VitePress 的 head 配置中。

后来，观测 Umami 统计数据是，发现访问 Netlify 的数据全都在 Github Pages 上，当时发现了甚至都没想是配置写的问题，只觉得 Umami 或者 Supabase 是不是有问题。

直到后来，Umami 数据不更新，观察 Supabase 数据库写入的时候，发现数据库实时写入没问题，就是我明明访问 Netlify 站点的数据，记录还是显示 GitHub Pages 站点。才想起来配置写法有问题。（低级错误，轻喷）

暂时通过定义环境变量来区分部署站点的不同，从而写入唯一 Umami 配置项。

```ts showLineNumbers ins={2,6-17}
if (process.env.NODE_ENV === 'production') {
  const isGitHubPages = env.VITE_DEPLOY_PLATFORM === 'github'
  heads.push(
    // ...
    // Umami Analysis
    [
      'script',
      {
        defer: '',
        async: '',
        src: env.VITE_BASE + 'scripts/umm.js',
        'data-host-url': 'https://umami.versiw.com',
        'data-website-id': isGitHubPages
          ? 'f516de8c-**********-483b-b34b-**********'	// GitHub Page site ID
          : 'c50730fb-**********-4518-b757-**********'	// Netlify site ID
      }
    ]
  )
}
```

文档默认还是部署再 Github Pages 的，所以项目代码还是以 GitHub 为准。

部署在其它静态网站托管平台的，添加环境变量即可

```txt
VITE_DEPLOY_PLATFORM=netlify
```


### 数据库可以访问存储 Umami 的请求，但是前端不更新数据

#### 问题现象

访问网站，`Umami` 跟踪脚本数据可以正常发送给 `Supabase` 数据库中，但是在 `Netlify` 托管的 `Umami` 前端显示的数据总是停滞的。

具体现象为：如果重新部署 `Umami` 前端，当天的数据可以正常显示，第二天则不更新数据，仪表盘显示的是之前的数据。

据此，结合之前种种问题，大概推断 `Netlify` 平台对 `Umami` 支持的不够友好。

#### 问题分析

通过网络搜索有无相似案例，阅读[免费的才是最贵的：记站点功能迁移 - Xeonzilla's Note](https://xeonzilla.top/posts/free_is_the_most_expensive/) 这篇博客笔记，发现其中引申的三个案例略有相似。

[Fix Netlify and possible other cache issues by Maxime-J · Pull Request #3350 · umami-software/umami · GitHub](https://github.com/umami-software/umami/pull/3350) 提到：Netlify 可以从缓存中提供缓存的响应，而不考虑使用中的查询参数。所有度量请求将返回相同的数据，因此每个表中的数据都相同。

#### 解决方法

将 `Umami` 的前端重新部署至其他托管平台。选择了[[#在 Vercel 上部署前端界面]]

## 参考资料

[Umami与Supabase数据库连接问题的解决方案 - GitCode博客](https://blog.gitcode.com/e6a105de6d12f5781408459d9cf23997.html)

[如何不花一分钱搭建 Umami 统计工具](https://zexwoo.blog/posts/tutorials/build-umami/)

[Netlify + Supabase部署Umami - Xeonzilla's Note](https://xeonzilla.top/posts/netlify_supabase_umami/)

[解决 Umami 被 AdBlock 屏蔽问题 | 面条实验室](https://miantiao.me/posts/umami-kill-adblock/)

[免费的才是最贵的：记站点功能迁移 - Xeonzilla's Note](https://xeonzilla.top/posts/free_is_the_most_expensive/)

