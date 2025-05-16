<script setup lang="ts">
import { getMessage } from '../../hooks/useCreateDiscreteApi'
import * as packageObj from '../../../../package.json'
import Book from '../uiverse/Book.vue'

const props = defineProps<{
  data: LibraryData[]
}>()

const slugify = (str) => {
  return (
    str
      .toLowerCase()
      .trim()
      // 移除所有非字母、数字、空格和连字符的字符
      .replace(/[^\p{L}\p{N}\s-]/gu, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-|-$/g, '')
  )
}

const handleClick = () => {
  const message = getMessage('top')
  navigator.clipboard
    .writeText(packageObj.author.email)
    .then(() => {
      message.success('邮箱已复制')
    })
    .catch((err) => {
      message.error('复制失败: ' + err.message)
    })
}
</script>

<template>
  <ClientOnly>
    <!-- prettier-ignore -->
    <NMarquee class="library-marquee">
      ⚠️ 1. 当前页面显示加载、文件下载可能需要网络加速 
      ⚠️ 2. 声明：本站收录的资源链接（包括PDF、EPUB、网盘、BT等）均来源于网络公开信息，基于个人偏好整理分享。所有资源仅供学习交流使用。
      <span style="font-weight:bold;color:#d32f2f">
        • 请于下载后24小时内删除
        • 使用者需自行甄别资源合法性、安全性
        • 本站不承担任何直接或间接责任
        • 如涉及侵权请联系删除：
          <span style="color: #18A058;" @click="handleClick">
            点我复制
          </span>
      </span>
      <span style="color: red"><b> 访问即视为同意本声明。</b></span>
    </NMarquee>

    <div v-for="{ group, items } in data">
      <h2 :id="slugify(group)" tabindex="-1">
        {{ group }}
        <a class="header-anchor" :href="`#${slugify(group)}`" aria-hidden="true"></a>
      </h2>
      <NGrid
        class="library-grid"
        cols="2 s:3 m:4 l:5 xl:6 2xl:7"
        responsive="screen"
        :x-gap="12"
        :y-gap="36"
      >
        <NGridItem v-for="item in items" class="place-content-center p-10">
          <Book :data="item" />
        </NGridItem>
      </NGrid>
    </div>
  </ClientOnly>
</template>

<style>
.library-marquee {
  background-color: #f6e0bd;
  color: black;
  margin-top: 20px;
}
.library-grid {
  margin: 30px 0;
}
</style>
