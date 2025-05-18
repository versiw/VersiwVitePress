<style lang="scss" scoped>
.loader {
  width: 265px;
  height: 18px;
  background: repeating-linear-gradient(45deg, var(--vp-c-brand-1) 0 30px, #0000 0 40px) right/200%
    100%;
  animation: i3 2s infinite linear;
  border-radius: 10px;
  border: 1px solid var(--vp-c-brand-1);
}

@media (max-width: 960px) {
  .loader {
    margin: 0 auto;
  }
}

@keyframes i3 {
  100% {
    background-position: left;
  }
}
</style>

<template>
  <div class="loader"></div>
</template>
