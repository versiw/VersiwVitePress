export const initCardEffect = (): void => {
  // 控制旋转幅度
  const ROTATION_MULTIPLIER = 8
  // 中性位置百分比
  const NEUTRAL_POSITION_PERCENT = 30

  const cardContainer = document.querySelector<HTMLElement>(
    '.VPHomeHero .image .custom-hero-image-container'
  )

  if (!cardContainer) return

  const cardElement = cardContainer

  let mouseX = 0
  let mouseY = 0

  const applyRotation = (): void => {
    if (!cardElement) return

    const rect = cardElement.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const deltaX = mouseX - centerX
    const deltaY = mouseY - centerY

    const rotateX = -deltaY / ROTATION_MULTIPLIER
    const rotateY = deltaX / ROTATION_MULTIPLIER

    const percentage = ((mouseX - rect.left) / rect.width) * 100

    cardElement.style.setProperty('--per', `${Math.min(Math.max(percentage, 0), 100)}%`)
    cardElement.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  const handleMouseMove = (e: MouseEvent): void => {
    mouseX = e.clientX
    mouseY = e.clientY
    window.requestAnimationFrame(applyRotation)
  }

  const handleMouseLeave = (): void => {
    window.requestAnimationFrame(() => {
      if (!cardElement) return
      cardElement.style.transform = 'rotateX(0) rotateY(0)'
      cardElement.style.setProperty('--per', `${NEUTRAL_POSITION_PERCENT}%`)
    })
  }

  cardContainer.addEventListener('mousemove', handleMouseMove)
  cardContainer.addEventListener('mouseleave', handleMouseLeave)
}
