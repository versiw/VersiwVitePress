<template>
  <div
    class="before:hidden sm:before:block flex items-center h-[var(--vp-nav-height)] p-[12px] before:mr-4 before:ml-2 before:w-px before:h-6 before:bg-[var(--vp-c-divider)] before:content-[''] cursor-pointer"
  >
    <ClientOnly>
      <NPopover
        trigger="hover"
        placement="bottom"
        :style="{
          borderRadius: '12px',
          border: '1px solid var(--vp-c-divider)',
          backgroundColor: 'var(--vp-c-bg-elv)'
        }"
        @update:show="(value) => (value ? generateCurrentPageShortLink() : null)"
      >
        <template #trigger>
          <NIcon :size="20" :component="ShareOutlined" />
        </template>
        <div class="w-50 h-full p-2">
          <NFlex vertical justify="center">
            <NFlex justify="center"><h1>分享当前页面</h1></NFlex>
            <NFlex justify="center">
              <div class="p-2 bg-gray-100 flex items-center justify-center rounded-md">
                <NQrCode :value="currentPageShortLink" :size="100" :padding="0" />
              </div>
            </NFlex>
            <NFlex justify="center">
              <n-button secondary type="primary" @click="copyShortLink">复制短链接</n-button>
            </NFlex>
          </NFlex>
        </div>
      </NPopover>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'
import { ShareOutlined } from '@vicons/material'
import { getMessage } from '../../hooks/useCreateDiscreteApi'

const { page } = useData()
const currentPageShortLink = ref('')

const copyShortLink = () => {
  const message = getMessage('top')

  if (typeof window !== 'undefined') {
    navigator.clipboard
      .writeText(currentPageShortLink.value)
      .then(() => {
        message.success('当前页面短链接已复制')
      })
      .catch((err) => {
        message.error('复制失败: ' + err.message)
      })
  }
}

const generateCurrentPageShortLink = async () => {
  if (import.meta.env.SSR) return
  if (typeof window !== 'undefined') {
    const basePath = import.meta.env.BASE_URL || '/'
    const { protocol, hostname, port } = window.location
    const hash = await generateBrowserHash(
      decodeURIComponent(('/' + page.value.filePath).replace(/(\/index)?\.md$/, '/'))
    )
    currentPageShortLink.value = `${protocol}//${hostname}${port ? `:${port}` : ''}${basePath}s?q=${hash}`
  }
}

/**
 * 浏览器端计算 SHA-256 哈希（前10位）
 * @param content 输入字符串
 * @returns 16进制哈希值
 */
async function generateBrowserHash(content: string): Promise<string> {
  if (import.meta.env.SSR) return
  // 检测是否在浏览器环境
  if (typeof window === 'undefined') return

  // 计算哈希
  const encoder = new TextEncoder()
  const data = encoder.encode(content)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)

  // 转为16进制字符串并截取前10位
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
    .substring(0, 10)
}
</script>

<style lang="scss" scoped></style>
