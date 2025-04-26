<script setup lang="ts">
import { defineAsyncComponent, onMounted, ref } from 'vue'
import { withBase } from 'vitepress'

const props = defineProps<{
  data: GalleryData
}>()

// const NCarousel = ref(null)
// const NImage = ref(null)
// onMounted(() => {
//   import('naive-ui').then((module) => {
//     NCarousel.value = module.NCarousel
//     NImage.value = module.NImage
//   })
// })
const NCarousel = defineAsyncComponent(() => import('naive-ui').then((m) => m.NCarousel))
const NImage = defineAsyncComponent(() => import('naive-ui').then((m) => m.NImage))
</script>

<template>
  <ClientOnly>
    <BlurReveal :delay="0.2" :duration="0.75" class="p-8">
      <h1 class="gallery-title">{{ data.title }}</h1>
      <div class="gallery-desc-div">
        <p class="gallery-desc-p">{{ data.desc }}</p>
        <!-- <div class="gallery-desc-p" v-html="data.desc"></div> -->
      </div>
      <NCarousel
        class="gallery-carousel"
        autoplay
        dot-type="line"
        trigger="hover"
        :centered-slides="true"
        draggable
        :interval="3000"
      >
        <NImage
          class="gallery-carousel-img"
          v-for="img in data.imgs"
          :src="withBase(img)"
          width="65%"
          height="100%"
          object-fit="contain"
        />
      </NCarousel>
    </BlurReveal>
  </ClientOnly>
</template>

<style>
.gallery-title {
  letter-spacing: -0.02em;
  font-size: 32px;
  line-height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.gallery-desc-div {
  display: flex;
  justify-content: center;
  align-items: center;
}

.gallery-desc-p {
  width: 80%;
  white-space: pre-wrap;
}

.gallery-carousel {
  /* background-color: rgb(229, 229, 229); */
}

.gallery-carousel-img {
  width: 100%;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
