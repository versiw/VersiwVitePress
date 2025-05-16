<script setup lang="ts">
import * as packageObj from '../../../../package.json'
import { getMessage } from '../../hooks/useCreateDiscreteApi'

interface Props {
  /**
   * 是否显示作者信息
   *
   * @default true
   */
  showAuthor?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showAuthor: false
})

const docsFooterConfig = {
  author: packageObj?.author?.name || '',
  authorUrl: packageObj?.author?.url || '',
  license: {
    type: 'CC BY 4.0',
    url: 'https://creativecommons.org/licenses/by/4.0/?ref=chooser-v1',
    icons: {
      cc: 'https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1',
      by: 'https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1'
    }
  },
  startYear: 2024,
  attributionNotice: {
    required: true,
    template: '转载、引用和复制时必须标注原文地址：'
  }
}

const copyrightYears = computed(() => {
  const currentYear = new Date().getFullYear()
  return currentYear > docsFooterConfig.startYear
    ? `${docsFooterConfig.startYear}-${currentYear}`
    : docsFooterConfig.startYear.toString()
})

const handleClick = () => {
  const fullUrl = window.location.href

  const message = getMessage('bottom')

  navigator.clipboard
    .writeText(fullUrl)
    .then(() => {
      message.success('文章链接已复制到剪贴板')
    })
    .catch((err) => {
      message.error('复制失败: ' + err.message)
    })
}
</script>

<template>
  <NFlex class="copyright-footer" justify="center" vertical>
    <!-- 版权声明 -->
    <div class="copyright-content">
      <span>本文档 © {{ copyrightYears }} by </span>
      <a :href="docsFooterConfig.authorUrl" target="_blank" class="author-link">
        {{ docsFooterConfig.author }}
      </a>
      <span> 采用 </span>
      <a :href="docsFooterConfig.license.url" target="_blank" class="license-link">
        {{ docsFooterConfig.license.type }}
        <!-- 内联图标实现 -->
        <img :src="docsFooterConfig.license.icons.cc" alt="CC" class="license-icon" />
        <img :src="docsFooterConfig.license.icons.by" alt="BY" class="license-icon" />
      </a>
      许可协议授权
    </div>
    <!-- 署名复制 -->
    <div v-if="docsFooterConfig.attributionNotice.required" class="attribution-notice">
      <span>
        {{ docsFooterConfig.attributionNotice.template }}
      </span>
      <NButton type="success" size="tiny" strong secondary round @click="handleClick">
        点我复制
      </NButton>
    </div>
  </NFlex>
</template>

<style scoped>
.copyright-footer {
  padding: 40px 0;
  text-align: center;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.copyright-content {
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  line-height: 1.5;
}

.author-link {
  color: inherit;
  text-decoration: underline;
  margin: 0 0.2em;
  transition: color 0.25s;
}

.author-link:hover {
  color: var(--vp-c-brand);
}

.license-link {
  color: #d14500;
  display: inline-flex;
  align-items: center;
  margin-left: 0.3em;
  transition: color 0.25s;
}

.license-link:hover {
  color: #a83700;
}

.license-icon {
  height: 22px;
  margin-left: 3px;
  vertical-align: text-bottom;
  transition: opacity 0.25s;
}

.license-link:hover .license-icon {
  opacity: 0.8;
}

.attribution-notice span:last-child {
  color: #46a800;
  display: inline-flex;
  align-items: center;
  margin-left: 0.3em;
  transition: color 0.25s;
}

.attribution-notice span:last-child:hover {
  color: #317600;
}
</style>
