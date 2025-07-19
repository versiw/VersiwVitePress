---
tags:
  - vitepress
createDateTime: 2025-07-19 12:32:22
publish: true
---

# VitePress 链接前显示站点图标

## 实现原理

主要通过 CSS 的伪元素 `::before` 和属性选择器，结合 `iconify` 图标库来实现。

## 具体实现

### scss 基础设置

新建 `link.scss` 文件，添加以下代码：

```scss
/**
链接显示站点图标
*/
.vp-doc:not(._nav,._book) a:not([href^='https://img.shields.io/'])
{
  //   默认
  &[target='_blank'],
  &[href^='./'],
  &[href^='../'] {
    &::before {
      content: '';
      background-image: url(https://api.iconify.design/heroicons-solid:link.svg?color=%23409eff);
      width: 20px;
      height: 20px;
      display: inline-block;
      vertical-align: middle;
      position: relative;
      background-size: cover;
      top: -2px;
      margin-right: 2px;
    }
  }

  //   vitepress
  &[href*='vitepress.dev']::before {
    background-image: url(https://vitepress.dev/vitepress-logo-mini.svg);
  }

  //   github
  &[href*='github.com']::before {
    background-image: url(https://api.iconify.design/mdi:github.svg);
  }

  //   bilibili
  &[href*='bilibili.com']::before {
    background-image: url(https://api.iconify.design/mingcute:bilibili-line.svg?color=%2300A8DF);
  }

  //   csdn
  &[href*='csdn.net']::before {
    background-image: url(https://g.csdnimg.cn/static/logo/favicon32.ico);
  }

  //   可仿照自定义追加
  //   ...
}

// 暗黑模式
.dark .vp-doc a {
  &[target='_blank'],
  &[href^='./'],
  &[href^='../'] {
    &::before {
      filter: brightness(0.8);
    }
  }
  &[href^='https://github.com']::before
  {
    background-image: url(https://api.iconify.design/mdi/github.svg);
  }
}

```

### scss 优化设置

进一步优化配置，集中管理

```scss
@use 'sass:meta';
@use 'sass:map';

$icon-size: 20px;

@mixin icon-base($size: $icon-size) {
  content: '';
  width: $size;
  height: $size;
  display: inline-block;
  vertical-align: middle;
  position: relative;
  background-size: cover;
  top: -2px;
  margin-right: 2px;
}

.vp-doc:not(._nav,._book) a:not([href^='https://img.shields.io/'])
{
  // 默认外部链接图标
  &:is([target='_blank'], [href^='./'], [href^='../'])::before {
    @include icon-base;
    background-image: url(https://api.iconify.design/heroicons-solid:link.svg?color=%23409eff);
  }

  // 定义站点图标映射表
  $site-icons: (
    'vitepress.dev': 'https://vitepress.dev/vitepress-logo-mini.svg',
    'github.com': 'https://api.iconify.design/mdi:github.svg',
    'bilibili.com': 'https://api.iconify.design/mingcute:bilibili-line.svg?color=%2300a8df',
    'csdn.net': (
      image: 'https://g.csdnimg.cn/static/logo/favicon32.ico',
      size: 18px
    )
  );

  // 自动生成站点图标样式
  @each $site, $config in $site-icons {
    &[href*='#{$site}']::before {
      @if meta.type-of($config) == 'map' {
        @include icon-base(map.get($config, 'size'));
        background-image: url(map.get($config, 'image'));
      } @else {
        @include icon-base;
        background-image: url($config);
      }
    }
  }
}

// 暗黑模式统一处理
.dark .vp-doc a::before {
  filter: brightness(0.8);
}

```

## 预览/调试

[VitePress](https://vitepress.dev/zh/)

[GitHub · Build and ship software on a single, collaborative platform · GitHub](https://github.com/)

[哔哩哔哩 (゜-゜)つロ 干杯\~-bilibili](https://www.bilibili.com/)

[CSDN博客-专业IT技术发表平台](https://blog.csdn.net/)

## 参考资料

[样式美化 | VitePress](https://vitepress.yiov.top/style#%E9%93%BE%E6%8E%A5%E5%9B%BE%E6%A0%87)

[VitePress 链接前加图标 - 唯知笔记](https://note.weizwz.com/vitepress/basic/link-icon)



