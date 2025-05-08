<script setup>
import Giscus from '@giscus/vue'
import { useRoute, useData } from 'vitepress'
const { frontmatter } = useData()
const comment = computed(() => frontmatter.value?.comment !== false)

const route = useRoute()
const { isDark } = useData()
</script>

<template>
  <div v-if="comment" style="margin-top: 24px">
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
