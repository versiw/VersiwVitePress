<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { MusicNoteOutlined, MusicOffOutlined } from '@vicons/material'
import { useData } from 'vitepress'

const NIcon = ref(null)
const NButton = ref(null)

const { isDark } = useData()
const active = ref(true)

const audioEl = ref<HTMLAudioElement>()

// 处理音乐播放状态
const toggleMusic = () => {
  if (!audioEl.value) return

  if (active.value) {
    audioEl.value.play().catch((e) => {
      console.log('自动播放被阻止:', e)
      active.value = false // 如果播放失败，自动关闭开关
    })
  } else {
    audioEl.value.pause()
  }
}

// 监听开关状态变化
watch(active, toggleMusic)

onMounted(() => {
  import('naive-ui').then((module) => {
    NIcon.value = module.NIcon
    NButton.value = module.NButton
  })

  // 初始尝试自动播放（需要用户交互后才能真正播放）
  toggleMusic()

  // 用户首次点击页面时解除静音限制
  const handleFirstClick = () => {
    if (audioEl.value) {
      audioEl.value.muted = false
      // 如果开关是开启状态但音乐没播放，则重新尝试播放
      if (active.value && audioEl.value.paused) {
        toggleMusic()
      }
    }
    document.body.removeEventListener('click', handleFirstClick)
  }

  document.body.addEventListener('click', handleFirstClick)
})
</script>

<template>
  <div class="music-button-container">
    <NButton
      size="tiny"
      tertiary
      ghost
      text
      circle
      class="music-button"
      :class="{ dark: isDark }"
      @click="active = !active"
    >
      <template #icon>
        <NIcon
          :size="18"
          :component="active ? MusicNoteOutlined : MusicOffOutlined"
          :color="isDark ? '#fff' : 'var(--vp-c-text-1)'"
        />
      </template>
    </NButton>
  </div>
  <audio ref="audioEl" autoplay loop muted style="display: none">
    <source src="/Dancing-in-a-dream.flac" />
  </audio>
</template>

<style lang="scss" scoped>
/* 容器确保与导航栏同高 */
.music-button-container {
  display: flex;
  align-items: center;
  height: var(--vp-nav-height);
  padding: 0 10px;
  &::before {
    margin-right: 16px;
    margin-left: 8px;
    width: 1px;
    height: 24px;
    background-color: var(--vp-c-divider);
    content: '';
  }
}

/* 按钮样式调整 */
.music-button {
  --n-height: 32px; /* 调整按钮高度 */
  --n-width: 32px; /* 圆形按钮保持宽高一致 */
  --n-padding: 0; /* 移除内边距 */

  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
}
</style>
