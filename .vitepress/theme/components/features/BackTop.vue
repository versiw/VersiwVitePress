<script setup lang="ts">
import { withBase } from 'vitepress'

const backTopRef = ref(null)
</script>

<template>
  <div ref="backTopRef">
    <NBackTop :right="100" :bottom="40" :to="backTopRef">
      <img
        :src="withBase('/images/emoji/Rocket.png')"
        alt="Rocket 返回顶部"
        width="50"
        height="50"
      />
    </NBackTop>
  </div>
</template>

<style lang="scss" scoped>
::v-deep .n-back-top {
  background-color: transparent !important;
  box-shadow: unset !important;
}
</style>
