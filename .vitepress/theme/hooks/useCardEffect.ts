import { tryOnScopeDispose } from '@vueuse/core'
import gsap from 'gsap'

/**
 * 为指定选择器的元素应用一个基于鼠标位置的3D视差卡片效果。
 * 使用 GSAP 提高动画性能和流畅度。
 *
 * @param selector - 需要应用效果的DOM元素选择器。
 */
export function useCardEffect(selector: string) {
  const cardContainer = document.querySelector<HTMLElement>(selector)
  if (!cardContainer) {
    return
  }

  // --- 配置常量 ---
  const ROTATION_MULTIPLIER = 15 // 显著增加旋转乘数，让3D效果更明显
  const NEUTRAL_POSITION_PERCENT = 30
  const LEAVE_DELAY = 100 // 鼠标移出后延迟100毫秒再执行归位动画，防止边缘抖动

  let leaveTimeoutId: ReturnType<typeof setTimeout> | null = null

  // 使用 GSAP 的 quickTo 创建高性能的动画函数
  const rotateXTo = gsap.quickTo(cardContainer, 'rotationX', {
    duration: 0.5, // 缩短动画时间，响应更灵敏
    ease: 'power3.out'
  })
  const rotateYTo = gsap.quickTo(cardContainer, 'rotationY', {
    duration: 0.5, // 缩短动画时间，响应更灵敏
    ease: 'power3.out'
  })
  const glossPercentTo = gsap.quickTo(cardContainer, '--per', {
    duration: 0.4,
    ease: 'power2.out'
  })

  const handleMouseMove = (e: MouseEvent): void => {
    // 如果存在待执行的“离开”动画，则清除它
    if (leaveTimeoutId) {
      clearTimeout(leaveTimeoutId)
      leaveTimeoutId = null
    }

    const { clientX, clientY } = e
    const rect = cardContainer.getBoundingClientRect()
    const { top, left, width, height } = rect
    const centerX = left + width / 2
    const centerY = top + height / 2

    const deltaX = clientX - centerX
    const deltaY = clientY - centerY

    const rotateX = gsap.utils.mapRange(
      -height / 2,
      height / 2,
      ROTATION_MULTIPLIER,
      -ROTATION_MULTIPLIER,
      deltaY
    )
    const rotateY = gsap.utils.mapRange(
      -width / 2,
      width / 2,
      -ROTATION_MULTIPLIER,
      ROTATION_MULTIPLIER,
      deltaX
    )

    const percentage = ((clientX - left) / width) * 100

    rotateXTo(rotateX)
    rotateYTo(rotateY)
    glossPercentTo(Math.min(Math.max(percentage, 0), 100))
  }

  const handleMouseLeave = (): void => {
    // 设置一个延迟，以防止在边缘快速移动时产生的抖动
    leaveTimeoutId = setTimeout(() => {
      gsap.to(cardContainer, {
        duration: 0.8, // 调整归位动画时长
        rotationX: 0,
        rotationY: 0,
        '--per': `${NEUTRAL_POSITION_PERCENT}%`,
        ease: 'elastic.out(1, 0.7)' // 调整弹性效果
      })
    }, LEAVE_DELAY)
  }

  cardContainer.addEventListener('mousemove', handleMouseMove)
  cardContainer.addEventListener('mouseleave', handleMouseLeave)

  const cleanup = () => {
    // 清理时，也要确保清除可能存在的定时器
    if (leaveTimeoutId) {
      clearTimeout(leaveTimeoutId)
    }
    cardContainer.removeEventListener('mousemove', handleMouseMove)
    cardContainer.removeEventListener('mouseleave', handleMouseLeave)
    // 恢复GSAP可能修改的transform，防止样式残留
    gsap.set(cardContainer, { clearProps: 'all' })
  }

  tryOnScopeDispose(cleanup)

  return {
    cleanup
  }
}
