<script setup lang="ts">
import { onMounted, ref } from 'vue'

const NGrid = ref(null)
const NGridItem = ref(null)
const NCard = ref(null)
const NAvatar = ref(null)
const NEllipsis = ref(null)
onMounted(() => {
  import('naive-ui').then((module) => {
    NGrid.value = module.NGrid
    NGridItem.value = module.NGridItem
    NCard.value = module.NCard
    NAvatar.value = module.NAvatar
    NEllipsis.value = module.NEllipsis
  })
})

const props = defineProps<{
  data: NavData[]
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
      <NGridItem v-for="item in items">
        <a :href="item.link" target="_blank">
          <NCard hoverable size="small" embedded style="height: 130px">
            <template #header>
              <NEllipsis :line-clamp="2">
                {{ item.title }}
              </NEllipsis>
            </template>
            <template #header-extra>
              <NAvatar
                size="small"
                :src="item.icon"
                lazy
                :intersection-observer-options="{ root: null }"
              />
            </template>
            <NEllipsis :line-clamp="2">
              {{ item.desc }}
            </NEllipsis>
          </NCard>
        </a>
      </NGridItem>
    </NGrid>
  </div>
</template>

<style lang="scss" scoped></style>
