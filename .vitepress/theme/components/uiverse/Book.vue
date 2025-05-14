<script setup lang="ts">
const props = defineProps<{
  data?: LibraryItem
}>()

const bookCoverRef = ref(null)
const headingRef = ref(null)

onMounted(() => {
  if (!props.data.link) {
    bookCoverRef.value.style.display = 'none'
    headingRef.value.style.opacity = '1'
  }
})

const handleImgError = () => {
  bookCoverRef.value.style.display = 'none'
  headingRef.value.style.opacity = '1'
}

const handleDownload = () => {
  if (!import.meta.env.SSR) {
    const link = document.createElement('a')
    link.href = 'https://raw.githubusercontent.com/versiw/pdfs/refs/heads/main/' + props.data.link
    link.download = `${props.data.title}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}
</script>
<template>
  <div class="card">
    <div ref="headingRef" class="heading">
      <NEllipsis :line-clamp="2">{{ data.title }}</NEllipsis>
      <!-- <span>Galaxy</span> -->
    </div>
    <div ref="bookCoverRef" class="book-cover">
      <img
        :src="'https://gcore.jsdelivr.net/gh/versiw/pdfs/' + data.img"
        :onerror="handleImgError"
      />
    </div>
    <div class="content no-copy">
      <a :href="'https://gcore.jsdelivr.net/gh/versiw/pdfs/' + props.data.link" target="_blank">
        <div class="item">
          <span> 在线阅读 </span>
        </div>
      </a>
      <div class="item" @click="handleDownload">
        <span style="color: greenyellow">下载</span>
      </div>
    </div>
    <div class="book-girdle no-copy">查看详情</div>
  </div>
</template>

<style lang="scss" scoped>
$bookHeight: 200px;
$bookWitdh: 140px;
a,
a:hover {
  color: white;
  text-decoration: none;
}

.no-copy {
  -webkit-user-select: none; /* Safari/Chrome */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE 10+ */
  user-select: none; /* 标准语法 */
}

.card {
  height: $bookHeight;
  width: $bookWitdh;
  padding: 14px;
  position: relative;
  background:
    linear-gradient(to top, rgba(0, 0, 0, 0.825), rgba(247, 28, 200, 0.13)),
    radial-gradient(
      circle at 0%,
      rgba(172, 56, 187, 0.329),
      rgba(121, 21, 179, 0.521) 50%,
      rgba(37, 26, 26, 0.432) 75%,
      rgba(33, 10, 54, 0.236) 75%
    ),
    radial-gradient(
      circle at 100%,
      rgba(171, 0, 238, 0.329),
      rgba(13, 115, 231, 0.514) 50%,
      rgba(37, 26, 26, 0.432) 75%,
      rgba(51, 51, 51, 0.315) 75%
    ),
    radial-gradient(
      circle at 100% 0%,
      rgba(5, 5, 5, 0.329),
      rgb(226, 226, 231) 50%,
      rgba(37, 26, 26, 0.432) 75%,
      rgba(51, 51, 51, 0.161) 75%
    ),
    radial-gradient(
      circle at 0% 100%,
      rgba(45, 10, 173, 0.541),
      rgba(178, 22, 245, 0.805) 50%,
      rgba(37, 26, 26, 0.432) 75%,
      rgba(51, 51, 51, 0.315) 75%
    ),
    radial-gradient(closest-side, #3f87a646, #ebf8e13d, #3cd1f654),
    linear-gradient(
      315deg,
      rgba(212, 212, 207, 0.74) 3%,
      rgb(11, 12, 12) 38%,
      rgba(16, 24, 23, 0.301) 68%,
      rgba(166, 168, 173, 0.942) 98%
    );
  background-size: 200% 200%;
  animation: cosmic 10s ease-in-out infinite;
  box-sizing: border-box;
  transform: skewY(-5deg);
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 25px;
  align-items: center;
}

.card::before {
  content: '';
  width: 10px;
  height: $bookHeight;
  background:
    linear-gradient(to top, rgba(0, 0, 0, 0.825), rgba(247, 28, 200, 0.13)),
    radial-gradient(
      circle at 0%,
      rgba(172, 56, 187, 0.329),
      rgba(121, 21, 179, 0.521) 50%,
      rgba(37, 26, 26, 0.432) 75%,
      rgba(33, 10, 54, 0.236) 75%
    ),
    radial-gradient(
      circle at 100%,
      rgba(171, 0, 238, 0.329),
      rgba(13, 115, 231, 0.514) 50%,
      rgba(37, 26, 26, 0.432) 75%,
      rgba(51, 51, 51, 0.315) 75%
    ),
    radial-gradient(
      circle at 100% 0%,
      rgba(5, 5, 5, 0.329),
      rgb(226, 226, 231) 50%,
      rgba(37, 26, 26, 0.432) 75%,
      rgba(51, 51, 51, 0.161) 75%
    ),
    radial-gradient(
      circle at 0% 100%,
      rgba(45, 10, 173, 0.541),
      rgba(178, 22, 245, 0.805) 50%,
      rgba(37, 26, 26, 0.432) 75%,
      rgba(51, 51, 51, 0.315) 75%
    ),
    radial-gradient(closest-side, #3f87a646, #ebf8e13d, #3cd1f654),
    linear-gradient(
      315deg,
      rgba(212, 212, 207, 0.74) 3%,
      rgb(11, 12, 12) 38%,
      rgba(16, 24, 23, 0.301) 68%,
      rgba(166, 168, 173, 0.942) 98%
    );
  background-size: 200% 200%;
  animation: cosmic 10s ease-in-out infinite;
  position: absolute;
  top: 0px;
  left: -9.5px;
  transform-origin: right;
  transform: skewY(45deg);
  border: none;
  transition: all 0.5s;
}

.card::after {
  content: '';
  height: 10px;
  width: $bookWitdh;
  background:
    linear-gradient(to top, rgba(0, 0, 0, 0.825), rgba(247, 28, 200, 0.13)),
    radial-gradient(
      circle at 0%,
      rgba(172, 56, 187, 0.329),
      rgba(121, 21, 179, 0.521) 50%,
      rgba(37, 26, 26, 0.432) 75%,
      rgba(33, 10, 54, 0.236) 75%
    ),
    radial-gradient(
      circle at 100%,
      rgba(171, 0, 238, 0.329),
      rgba(13, 115, 231, 0.514) 50%,
      rgba(37, 26, 26, 0.432) 75%,
      rgba(51, 51, 51, 0.315) 75%
    ),
    radial-gradient(
      circle at 100% 0%,
      rgba(5, 5, 5, 0.329),
      rgb(226, 226, 231) 50%,
      rgba(37, 26, 26, 0.432) 75%,
      rgba(51, 51, 51, 0.161) 75%
    ),
    radial-gradient(
      circle at 0% 100%,
      rgba(45, 10, 173, 0.541),
      rgba(178, 22, 245, 0.805) 50%,
      rgba(37, 26, 26, 0.432) 75%,
      rgba(51, 51, 51, 0.315) 75%
    ),
    radial-gradient(closest-side, #3f87a646, #ebf8e13d, #3cd1f654),
    linear-gradient(
      315deg,
      rgba(212, 212, 207, 0.74) 3%,
      rgb(11, 12, 12) 38%,
      rgba(16, 24, 23, 0.301) 68%,
      rgba(166, 168, 173, 0.942) 98%
    );
  background-size: 200% 200%;
  animation: cosmic 10s ease-in-out infinite;
  position: absolute;
  top: -9.5px;
  left: 0px;
  transform-origin: bottom;
  transform: skewX(45deg);
  transition: all 0.5s;
  box-shadow: -($bookHeight + 7px) ($bookHeight + 12px) 6px rgba(36, 4, 41, 0.5);
}

@keyframes cosmic {
  0% {
    background-position: 0% 0%;
  }

  50% {
    background-position: 100% 100%;
  }

  100% {
    background-position: 0% 0%;
  }
}

.card:hover {
  transform: skewY(0deg);
}

.card:hover::before {
  width: 0px;
  height: $bookHeight;
  left: 0;
  top: 0.1px;
}

.card:hover::after {
  width: $bookWitdh;
  height: 0px;
  left: 0.1px;
  top: 0;
  border: none;
}

.card > *:not(.heading) {
  opacity: 0;
}

.card .heading {
  width: 85%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  transition: 0.7s;
  color: #fff;
  font-size: 14px;
  font-weight: bolder;
  opacity: 0;
}

.card .book-cover {
  width: 90%;
  height: 90%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-image: url('/Git团队协作.jpg');
  background-size: cover;
  background-position: center;
  border-radius: 3px;
  opacity: 1;
  transform: translate(-50%, -50%);
  transition: opacity 0.7s ease-in-out;
}

.book-cover img {
  width: 100%;
  height: 100%;
}

.card:hover .heading {
  opacity: 1;
}
.card:hover .book-cover {
  display: none;
}

.card .heading span {
  font-weight: 700;
  letter-spacing: 1.5px;
  animation: flickering 3s linear infinite;
}

.card:hover .heading span::before {
  transform: rotate(90deg);
  left: 45%;
}

@keyframes flickering {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 1;
  }

  52% {
    opacity: 1;
  }

  54% {
    opacity: 0;
  }

  56% {
    opacity: 1;
  }

  90% {
    opacity: 1;
  }

  92% {
    opacity: 0;
  }

  94% {
    opacity: 1;
  }

  96% {
    opacity: 0;
  }

  98% {
    opacity: 1;
  }

  99% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.card:hover .heading {
  top: 20%;
}

.card:hover > *:not(.heading) {
  animation: fadeIn 0.5s ease 0.3s forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.card .content {
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: #fff;
}

.card .content .item {
  border-radius: 0px 5px 0 5px;
  cursor: pointer;
  display: flex;
  gap: 10px;
  transition: all 0.5s;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 1px 15px;
  justify-content: center;
  align-items: center;
  font-size: 12px;
}

.card .content .item:hover {
  background-color: rgba(0, 0, 0, 0.4);
}

@keyframes create {
  0% {
    transform: translateX(1px);
  }

  10% {
    transform: translateX(-1px);
  }

  20% {
    transform: translateX(1px);
  }

  30% {
    transform: translateX(-1px);
  }

  40% {
    transform: translateX(1px);
  }

  50% {
    transform: translateX(-1px);
  }

  60% {
    transform: translateX(1px);
  }

  70% {
    transform: translateX(-1px);
  }

  80% {
    transform: translateX(1px);
  }

  90% {
    transform: translateX(-1px);
  }

  100% {
    transform: translateX(1px);
  }
}

@keyframes rocket {
  0% {
    transform: rotate(0deg);
  }

  10% {
    transform: rotate(-2deg);
  }

  20% {
    transform: rotate(2deg);
  }

  30% {
    transform: rotate(-2deg);
  }

  40% {
    transform: rotate(2deg);
  }

  50% {
    transform: rotate(-2deg);
  }

  60% {
    transform: rotate(2deg);
  }

  70% {
    transform: rotate(-2deg);
  }

  80% {
    transform: rotate(2deg);
  }

  90% {
    transform: rotate(-2deg);
  }

  100% {
    transform: rotate(2deg);
  }
}

@keyframes inspire {
  0% {
    transform: scale(1);
  }

  10% {
    transform: scale(0.97);
  }

  20% {
    transform: scale(1.03);
  }

  30% {
    transform: scale(1);
  }

  40% {
    transform: scale(0.97);
  }

  50% {
    transform: scale(1.03);
  }

  60% {
    transform: scale(1);
  }

  70% {
    transform: scale(0.97);
  }

  80% {
    transform: scale(1.03);
  }

  90% {
    transform: scale(1);
  }

  100% {
    transform: scale(0.97);
  }
}

.book-girdle {
  cursor: pointer;
  border-radius: 0px 5px 0 5px;
  height: 30px;
  width: calc(100% + 40px);
  position: relative;
  border: none;
  transition: 0.2s;
  background-color: #cc014d;
  color: #fff;
  text-align: center;
  font-size: 12px;
  z-index: 0 !important;
}

.content::before {
  content: '';
  position: absolute;
  bottom: 5px;
  border: 15px solid #db0f5a;
  right: -28px;
  border-right-color: transparent;
  pointer-events: none;
  z-index: -1;
}

.content::after {
  content: '';
  position: absolute;
  border-style: solid;
  bottom: 5px;
  right: -9px;
  border-width: 10px 10px 0 0;
  border-color: #6b043a transparent transparent transparent;
}

.book-girdle:hover {
  letter-spacing: 1px;
}

.book-girdle:active {
  transform: translateY(1px);
}
</style>
