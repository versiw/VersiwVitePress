<script setup lang="ts">
import { withBase } from 'vitepress'

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

const showGithubStars = ref(false)

onMounted(() => {
  const savedPreference = localStorage.getItem('showGithubStars')
  if (savedPreference !== null) {
    showGithubStars.value = JSON.parse(savedPreference)
  }
})

watch(showGithubStars, (newValue) => {
  localStorage.setItem('showGithubStars', JSON.stringify(newValue))
})
</script>

<template>
  <div class="controls-area">
    <span>显示项目星标</span>
    <NSwitch v-model:value="showGithubStars" />
  </div>

  <div v-for="{ group, items } in data">
    <h2 :id="slugify(group)" tabindex="-1">
      {{ group }}
      <a class="header-anchor" :href="`#${slugify(group)}`" aria-hidden="true"></a>
    </h2>

    <NGrid cols="2 s:3 m:4 l:5 xl:6 2xl:7" responsive="screen" :x-gap="12" :y-gap="8">
      <NGridItem v-for="item in items">
        <a :href="item.link" target="_blank" :data-umami-event="'导航 - ' + item.title">
          <NCard hoverable size="small" embedded class="card" header-extra-class="header-extra">
            <template #header>
              <NEllipsis :line-clamp="1">
                {{ item.title }}
              </NEllipsis>
            </template>
            <template #header-extra>
              <NAvatar
                size="small"
                :src="withBase(item.icon)"
                lazy
                :intersection-observer-options="{ root: null }"
                @click.stop
              />
            </template>
            <template #default>
              <NEllipsis :line-clamp="2">
                {{ item.desc }}
              </NEllipsis>

              <img
                v-if="showGithubStars && item.repo"
                :alt="`GitHub Repo stars for ${item.repo}`"
                :src="`https://img.shields.io/github/stars/${item.repo}`"
                @click.prevent.stop
                class="star-badge"
              />
            </template>
          </NCard>
        </a>
      </NGridItem>
    </NGrid>
  </div>
</template>

<style lang="scss" scoped>
.controls-area {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 24px 0px;
  padding: 12px;
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  width: fit-content;
}

.card {
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.2s ease-in-out;
  position: relative;

  &:hover {
    transform: scale(1.04);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  :deep(.n-card__content) {
    flex-grow: 1;
    padding: 8px 12px !important;
  }

  .card-desc {
    font-size: 12px;
    color: var(--vp-c-text-2);
  }

  :deep(.n-card__footer) {
    padding: 6px 12px !important;
  }
}

.star-badge {
  position: absolute;
  top: 40px;
  left: 16px;
}

.header-extra {
  position: absolute;
  top: 8px;
  right: 8px;
}
</style>
