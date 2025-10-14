<template>
  <div class="noise-effect"></div>
</template>

<style>
.noise-effect {
  position: fixed;
  inset: 0;
  /* 确保在最顶层，但低于模态框等需要交互的UI */
  z-index: 999;

  /* 设置背景图片为噪点图并平铺 */
  background-image: url(/images/noise.png);

  /* 混合模式，实现纱感 */
  mix-blend-mode: hard-light;

  /* 让鼠标可以穿透这个图层，操作下方的元素 */
  pointer-events: none;

  /* 透明度 */
  opacity: 0.8;
}
</style>
