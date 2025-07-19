import { nextTick } from 'vue'
import { Fancybox } from '@fancyapps/ui'

// 导入Fancybox相关样式
import '@fancyapps/ui/dist/fancybox/fancybox.css'

// 当前主题设置：auto(自动)、dark(暗色)、light(亮色)
let currentTheme: 'auto' | 'dark' | 'light' = 'auto'

// 监听本地存储变化（用于跨标签页主题同步）
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === 'vitepress-theme-appearance') {
      currentTheme = e.newValue as 'auto' | 'dark' | 'light'
      // 主题变化时重新绑定Fancybox以应用新主题
      bindFancybox()
    }
  })
}

/**
 * 查找图片元素最近的标题文本
 * @param imgElement 图片DOM元素
 * @returns 最近的标题文本，如果没有找到则返回空字符串
 */
const findNearestHeading = (imgElement: HTMLElement): string => {
  let currentElement = imgElement

  // 向上遍历DOM树
  while (currentElement && currentElement !== document.body) {
    // 检查当前元素的前一个兄弟节点
    let previousSibling = currentElement.previousElementSibling

    // 向前查找标题元素(h1-h6)
    while (previousSibling) {
      if (previousSibling.tagName.match(/^H[1-6]$/)) {
        // 找到标题后返回清理后的文本（移除零宽空格并去除首尾空格）
        return previousSibling.textContent?.replace(/\u200B/g, '').trim() || ''
      }
      previousSibling = previousSibling.previousElementSibling
    }

    // 如果没有找到，继续向上查找父元素
    currentElement = currentElement.parentElement
  }

  return ''
}

/**
 * 绑定Fancybox图片查看器到文档中的图片
 * 功能包括：
 * 1. 为图片添加Fancybox标识
 * 2. 自动设置alt属性（从最近标题获取）
 * 3. 设置图片描述（使用alt文本）
 * 4. 应用Fancybox配置
 */
export const bindFancybox = () => {
  nextTick(async () => {
    // 获取所有需要绑定Fancybox的图片
    const imgs = document.querySelectorAll('.vp-doc img')

    // 处理每张图片
    imgs.forEach((img) => {
      const image = img as HTMLImageElement

      // 确保图片有Fancybox标识
      if (!image.hasAttribute('data-fancybox')) {
        image.setAttribute('data-fancybox', 'gallery')
      }

      // 自动设置alt属性（如果未设置）
      if (!image.hasAttribute('alt') || image.getAttribute('alt') === '') {
        const heading = findNearestHeading(image)
        image.setAttribute('alt', heading)
      }

      // 设置图片描述（使用alt文本）
      const altString = image.getAttribute('alt') || ''
      image.setAttribute('data-caption', altString)
    })

    // 初始化Fancybox并应用配置
    Fancybox.bind('[data-fancybox="gallery"]', {
      theme: currentTheme, // 应用当前主题
      Hash: false, // 禁用URL hash导航
      Carousel: {
        Thumbs: {
          type: 'classic' // 经典缩略图，"modern" 现代缩略图
        },
        Toolbar: {
          absolute: true,
          enabled: true, // 启用工具栏
          display: {
            left: ['counter'], // 左侧显示操作按钮
            middle: [
              // 中间显示操作按钮
              'zoomIn',
              'zoomOut',
              'toggle1to1',
              'toggleFull',
              'rotateCCW',
              'rotateCW',
              'flipX',
              'flipY',
              'reset'
            ],
            right: [
              // 右侧显示功能按钮
              'autoplay',
              'fullscreen',
              'thumbs',
              'close'
            ]
          }
        }
      }
    })
  })
}

/**
 * 销毁Fancybox实例
 * 用于清理资源和事件监听器
 */
export const destroyFancybox = async () => {
  Fancybox.destroy()
}
