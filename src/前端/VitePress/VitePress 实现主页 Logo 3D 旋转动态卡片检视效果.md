---
tags:
  - vitepress
createDateTime: 2025-04-28 19:06:58
publish: true
---

# VitePress 实现主页 Logo 3D 旋转动态卡片检视效果


在 `VitePress` 默认主题上进行扩展实现，自定义主题官方教程：[自定义主题 | VitePress](https://vitepress.dev/zh/guide/custom-theme)

## 预览

![[preview2.gif|200x200]]


## 参考目录结构树

```
.\.vitepress\theme\
├─index.ts
├─styles
|   ├─cardEffect.scss
|   ├─index.scss
├─hooks
|   └CardEffect.js
├─components
|     ├─Layout.vue
```

## 编辑自定义根布局组件

目的是在原有的 `img` 标签外添加一个自定义 `div` 标签作为容器，并添加自定义类名`custom-hero-image-container`

```vue
<DefaultTheme.Layout>
  <template #home-hero-image>
    <div class="custom-hero-image-container">
      <img class="VPImage image-src" src="/versiw.svg" alt="诗维 - Versiw" />
    </div>
  </template>
</DefaultTheme.Layout>
```

## 添加样式文件

`index.scss` 部分

```scss
@use './cardEffect.scss';
```

`cardEffect.scss` 部分

```scss
@keyframes float {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  12.5% {
    transform: translateY(-8px) rotate(2deg);
  }
  25% {
    transform: translateY(-16px) rotate(3deg);
  }
  37.5% {
    transform: translateY(-8px) rotate(1deg);
  }
  50% {
    transform: translateY(0) rotate(-2deg);
  }
  62.5% {
    transform: translateY(8px) rotate(-1deg);
  }
  75% {
    transform: translateY(16px) rotate(1deg);
  }
  87.5% {
    transform: translateY(8px) rotate(2deg);
  }
}

.VPHomeHero {
  .image {
    .custom-hero-image-container {
      will-change: transform;
      --per: 30%;
      position: relative;
      transform-style: preserve-3d; /* 保持 3D 变换 */
      perspective: 1000px; /* 调整值控制透视强度 */
      transform-origin: center;
      will-change: transform; /* 优化动画性能 */
      backface-visibility: hidden; /* 防止翻转时闪烁 */

      transition: all 0.1s;

      animation: float 3s infinite linear;

      /* 光泽层 - 使用伪元素实现 */
      &::before {
        content: '';
        position: absolute;
        display: none;
        inset: 0;
        border-radius: 24px;
        background: linear-gradient(
          115deg,
          transparent 0%,
          #03a9f4 var(--per),
          #e91e63 calc(var(--per) + 35%),
          #9c27b0 calc(var(--per) + 65%),
          transparent 100%
        );
        mix-blend-mode: overlay;

        transform: translateZ(-15px); /* 创建厚度 */
        box-shadow:
          0 0 15px rgba(255, 255, 255, 0.5) inset,
          0 8px 32px 0 rgba(31, 38, 135, 0.15);
        filter: blur(10px);
        z-index: -1;
      }

      &::after {
        content: '';
        display: none;
        border-radius: 24px;
        position: absolute;
        inset: 0;
        background: url('/sparkles.gif');
        mix-blend-mode: color-dodge;
      }

      /* 鼠标移入时显示特效并暂停浮动动画 */
      &:hover {
        animation: none; /* 暂停浮动动画 */

        &::before,
        &::after {
          display: block; /* 显示伪元素 */
        }
      }
    }

    .image-container {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 320px;
      height: 320px;
    }
    @media (min-width: 640px) {
      .image-container {
        width: 392px;
        height: 392px;
      }
    }
    @media (min-width: 960px) {
      .image-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        transform: translate(-32px, -32px);
      }
    }

    .image-src {
      position: unset;
      transform: unset;
    }
    @media (min-width: 640px) {
      .image-src {
        max-width: 256px;
        max-height: 256px;
      }
    }
    @media (min-width: 960px) {
      .image-src {
        max-width: 320px;
        max-height: 320px;
      }
    }

    img {
      border-radius: 24px;
      padding: 1.5rem; /* 增加内边距让毛玻璃区域更大 */
      background-color: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      box-shadow: 0 38px 32px 0 rgba(31, 38, 135, 0.15);
      border: 1px solid rgba(255, 255, 255, 0.18);

      // logo不可选取
      -webkit-user-select: none; /* Safari */
      -moz-user-select: none; /* Firefox */
      -ms-user-select: none; /* Internet Explorer/Edge */
      user-select: none; /* 标准语法 */
    }
  }
}

```

## 3D 旋转卡片检视交互效果

`CardEffect.js` 部分，也是参考大佬的代码，没有修改的完全。

```js
export const initCardEffect = () => {
  // 3D旋转卡片检视效果
  const logoContainer = document.querySelector('.VPHomeHero .image .custom-hero-image-container')
  const logoImage = document.querySelector('.VPHomeHero .image .custom-hero-image-container')
  const multiple = 8 // 控制旋转幅度

  if (!logoContainer || !logoImage) return

  const transformElement = (x, y) => {
    const box = logoImage.getBoundingClientRect()
    const rotateX = -(y - box.y - box.height / 2) / multiple // X轴旋转（上下移动鼠标控制前后倾斜）
    const rotateY = (x - box.x - box.width / 2) / multiple // Y轴旋转（左右移动鼠标控制左右倾斜）
    const percentage = parseInt(((x - box.x) / box.width) * 1000) / 10

    logoImage.style = `--per: ${percentage}%`

    logoImage.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  logoContainer.addEventListener('mousemove', (e) => {
    window.requestAnimationFrame(() => {
      transformElement(e.clientX, e.clientY)
    })
  })

  logoContainer.addEventListener('mouseleave', () => {
    window.requestAnimationFrame(() => {
      logoImage.style.transform = 'rotateX(0) rotateY(0)'
      logoImage.style = `--per: 30%`
    })
  })
}

```

## 修改主题入口文件

这里主要问题是 build 后首次进入页面会存在交互特效消失的 bug，暂时还没研究明白，等后续有时间优化。

```ts
import DefaultTheme from 'vitepress/theme-without-fonts'
import { EnhanceAppContext } from 'vitepress'
import { h, nextTick, onMounted } from 'vue'

import Layout from './components/Layout.vue'

import './styles/index.scss'

let initCardEffect = () => {}

export default {
  Layout: () => {
    return h(Layout, null, {
    })
  },

  async enhanceApp({ app, router, siteData }: EnhanceAppContext) {
    // 动态导入包含 document 的文件
    if (!import.meta.env.SSR) {
      const module = await import('./hooks/CardEffect.js')
      initCardEffect = module.initCardEffect
    }
    
    // SPA切换页面导致监听事件丢失
    router.onAfterRouteChange = () => {
      initCardEffect()
    }
  },

  setup() {
    onMounted(async () => {
      if (!import.meta.env.SSR) {
        const module = await import('./hooks/CardEffect.js')
        initCardEffect = module.initCardEffect
        console.log('ssr')
      }
      // 只在客户端执行
      if (typeof window !== 'undefined') {
        // 使用nextTick确保DOM更新
        nextTick(() => {
          // 初始加载时执行
          setTimeout(initCardEffect, 100) // 小延迟确保 DOM 完全渲染
          window.addEventListener('load', initCardEffect)
        })
      }
    })
  },

  extends: DefaultTheme
}

```

## 参考文章

[javascript - 【动画进阶】神奇的 3D 卡片反光闪烁动效 - iCSS - SegmentFault 思否](https://segmentfault.com/a/1190000044576516)

