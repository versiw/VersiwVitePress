<script setup lang="ts">
// import { defineAsyncComponent, onMounted, ref } from 'vue'
import { withBase } from 'vitepress'

// const NGrid = defineAsyncComponent(() => import('naive-ui').then((m) => m.NGrid))
// const NGridItem = defineAsyncComponent(() => import('naive-ui').then((m) => m.NGridItem))

// const NGrid = ref(null)
// const NGridItem = ref(null)
// onMounted(() => {
//   import('naive-ui').then((module) => {
//     NGrid.value = module.NGrid
//     NGridItem.value = module.NGridItem
//   })
// })

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
</script>

<template>
  <div v-for="{ group, items } in data">
    <h2 :id="slugify(group)" tabindex="-1">
      {{ group }}
      <a class="header-anchor" :href="`#${slugify(group)}`" aria-hidden="true"></a>
    </h2>

    <NGrid cols="2 s:3 m:4 l:5 xl:6 2xl:7" responsive="screen" :x-gap="12" :y-gap="8">
      <NGridItem v-for="item in items" class="place-content-center p-10">
        <Book class="book-item">
          <BookHeader>
            <!-- <Icon name="heroicons:book-open-solid" size="24" /> -->
          </BookHeader>
          <BookTitle>
            <h1>{{ item.title }}</h1>
          </BookTitle>
          <BookDescription>
            <p>{{ item.desc }}</p>
          </BookDescription>
        </Book>
      </NGridItem>
    </NGrid>
  </div>
</template>

<style>
.book-item {
  height: 200px;
}
</style>
