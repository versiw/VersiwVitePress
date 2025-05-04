<script setup lang="ts">
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
          <NCard hoverable size="small" embedded class="card" header-extra-class="header-extra">
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
            <template #default>
              <NEllipsis :line-clamp="2">
                {{ item.desc }}
              </NEllipsis>
            </template>
          </NCard>
        </a>
      </NGridItem>
    </NGrid>
  </div>
</template>

<style lang="scss">
.card {
  height: 130px;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(255, 255, 255, 0.2);
}

.header-extra {
  position: absolute;
  top: 5px;
  right: 5px;
}
</style>
