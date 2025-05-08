<script setup lang="ts">
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme-without-fonts'
import { nextTick, provide } from 'vue'
import { darkTheme, zhCN, dateZhCN } from 'naive-ui'
const { isDark } = useData()

import VisitData from './features/VisitData.vue'
import BackTop from './features/BackTop.vue'

// 检测浏览器是否支持 View Transitions API  && 检查用户是否偏好减少动画
const enableTransitions = () =>
  'startViewTransition' in document &&
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches

provide('toggle-appearance', async ({ clientX: x, clientY: y }: MouseEvent) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value
    return
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )}px at ${x}px ${y}px)`
  ]

  await document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  }).ready

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: 'ease-in',
      pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`
    }
  )
})
</script>

<template>
  <NConfigProvider
    :theme="isDark ? darkTheme : undefined"
    :locale="zhCN"
    :date-locale="dateZhCN"
    preflight-style-disabled
  >
    <DefaultTheme.Layout>
      <template #home-hero-actions-after>
        <VisitData src="https://umami.versiw.com/share/nOYbjdbGnPmgkE3x/docs.versiw.com" />
      </template>
      <template #home-hero-image>
        <div class="custom-hero-image-container">
          <img class="VPImage image-src" src="/versiw.svg" alt="诗维 - Versiw" />
        </div>
      </template>
      <template #nav-bar-content-after>
        <slot name="nav-bar-content-after" />
      </template>
      <template #nav-screen-content-after>
        <slot name="nav-screen-content-after" />
      </template>
      <template #layout-top>
        <slot name="layout-top" />
      </template>
      <template #doc-after>
        <slot name="doc-after" />
      </template>
    </DefaultTheme.Layout>
  </NConfigProvider>
  <BackTop />
</template>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 9999;
}

/* .VPSwitchAppearance {
  width: 22px !important;
}

.VPSwitchAppearance .check {
  transform: none !important;
} */
</style>
