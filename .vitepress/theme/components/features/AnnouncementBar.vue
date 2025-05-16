<script setup lang="ts">
import { ContentData, withBase } from 'vitepress'
// @ts-ignore
import { data as files } from '../../../utils/latestFiles.data'
import dayjs from 'dayjs'

const articles: ContentData[] = files.filter(
  (file: ContentData) => file.url.endsWith('.html') && file.frontmatter?.publish
)

articles.sort((a, b) => {
  const dateA = dayjs(a.frontmatter.createDateTime || '1970-01-01T00:00:00Z')
  const dateB = dayjs(b.frontmatter.createDateTime || '1970-01-01T00:00:00Z')
  return dateB.valueOf() - dateA.valueOf()
})

const newArticles = articles.slice(0, 3).map((article) => {
  return {
    title: article.url.split('/').pop()?.replace('.html', ''),
    date: dayjs(article.frontmatter?.createDateTime).format('YYYY-MM-DD'),
    tags: article.frontmatter?.tags || [],
    url: article.url
  }
})
</script>

<template>
  <ClientOnly>
    <NCarousel
      class="announcement-bar"
      autoplay
      :interval="3000"
      trigger="hover"
      direction="vertical"
      dot-placement="right"
      mousewheel
    >
      <!-- From Uiverse.io by 0xnihilism -->
      <div class="card" v-for="article in newArticles" :key="article.url">
        <a :href="withBase(article.url)">
          <div class="banner">
            <span class="banner-text">NEW</span>
            <span class="banner-text">GO TO</span>
          </div>
          <span class="card__title"
            ><img
              :src="withBase('/images/emoji/Party Popper.png')"
              width="24"
              height="24"
              style="display: inline"
            />&nbsp;最新记录</span
          >
          <p class="card__date">{{ article.date }}</p>
          <p class="card__subtitle">《{{ article.title }}》</p>
        </a>
      </div>
    </NCarousel>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.announcement-bar {
  width: 380px;
  height: 170px;
  margin: 0.5em;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border-radius: 0.8em;
  /* border: 1px solid; */
  /* padding: 0.3em 1.5em; */
}

/* From Uiverse.io by 0xnihilism */
$bg-color: var(--vp-c-bg-elv);
$border-color: var(--vp-c-text-1);
$title-color: var(--vp-c-text-1);
$subtitle-color: var(--vp-c-text-2);
$rainbow-color: var(--vp-c-brand-1);

.card {
  width: 320px;
  padding: 18px;
  background: $bg-color;
  border: 4px solid $border-color;
  box-shadow: 8px 8px 0 $border-color;
  transform: rotate(-3deg);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  margin: 10px 10px;
}
.card:active {
  animation: shake 0.5s ease-in-out;
}
.card:hover {
  transform: rotate(0deg) scale(1.02);
  box-shadow: 15px 15px 0 $border-color;
}
.banner {
  position: absolute;
  top: 3px;
  right: -120px;
  background: $border-color;
  color: $bg-color;
  padding: 15px;
  width: 350px;
  text-align: center;
  transform: rotate(45deg);
  font-weight: bold;
  font-size: 18px;
  letter-spacing: 2px;
  overflow: hidden;
  transition: background 0.5s ease;
}
.banner-text {
  display: inline-block;
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
  width: 100%;
  position: absolute;
  left: 7%;
  top: 50%;
  transform: translateY(-50%);
}
.card:hover .banner-text:first-child {
  opacity: 0;
  transform: translateY(-100%);
}
.card:hover .banner-text:last-child {
  opacity: 1;
  transform: translateY(-40%);
}
.banner-text:last-child {
  opacity: 0;
  transform: translateY(60%);
}
.card:hover .banner {
  background: $rainbow-color;
}
.card__title {
  font-size: 24px;
  font-weight: 700;
  color: $border-color;
  text-transform: uppercase;
  margin-bottom: 5px;
  display: block;
  border-bottom: 2px solid $border-color;
  width: 50%; /* or any other percentage or pixel value */
}

.card__date {
  font-size: 14px;
  line-height: 1.4;
  color: $subtitle-color;
}

.card__subtitle {
  font-size: 16px;
  line-height: 1.4;
  color: $subtitle-color;
  /* margin-top: 20px; */
  padding-bottom: 10px;
}

@keyframes shake {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  50% {
    transform: translateX(5px);
  }
  75% {
    transform: translateX(-5px);
  }
  100% {
    transform: translateX(0);
  }
}

.announcement-bar ::v-deep .n-carousel__dot {
  background-color: rgb(from var(--vp-c-text-1) r g b / 30%) !important;
}

.announcement-bar ::v-deep .n-carousel__dot--active {
  background-color: var(--vp-c-text-1) !important;
}
</style>
