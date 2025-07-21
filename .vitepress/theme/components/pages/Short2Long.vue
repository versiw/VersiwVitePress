<template>
  <ClientOnly>
    <div v-if="!temp" class="h-screen flex items-center justify-center">
      <NResult
        status="404"
        size="large"
        title="404 资源不存在"
        :description="`${countdown} 秒后自动返回首页...`"
      >
        <template #footer>
          <NButton tertiary type="primary" @click="goHome">立即返回</NButton>
        </template>
      </NResult>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { useRouter, withBase } from 'vitepress'
// @ts-ignore
import { data as shortmap } from '../../loders/generateShortMap.data'

const router = useRouter()

const temp = ref(true)
const countdown = ref(3)
let timer: NodeJS.Timeout | null = null

onMounted(() => {
  if (import.meta.env.SSR) return
  if (typeof window !== 'undefined') {
    const queryString = window.location.search
    const params = new URLSearchParams(queryString)
    const hash = params.get('q')
    if (hash && shortmap[hash]) {
      router.go(withBase(shortmap[hash]))
    } else {
      temp.value = false
      timer = setInterval(() => {
        countdown.value--
        if (countdown.value <= 0) {
          goHome()
        }
      }, 1000)
    }
  }
})

const goHome = () => {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
  router.go(withBase('/'))
}
</script>
