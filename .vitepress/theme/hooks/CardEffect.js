export const initCardEffect = () => {
  // 3D旋转卡片检视效果
  const logoContainer = document.querySelector('.VPHomeHero .image .custom-image-container')
  const logoImage = document.querySelector('.VPHomeHero .image .custom-image-container')
  const multiple = 8 // 控制旋转幅度

  if (!logoContainer || !logoImage) return

  const transformElement = (x, y) => {
    const box = logoImage.getBoundingClientRect()
    const rotateX = -(y - box.y - box.height / 2) / multiple // X轴旋转（上下移动鼠标控制前后倾斜）
    const rotateY = (x - box.x - box.width / 2) / multiple // Y轴旋转（左右移动鼠标控制左右倾斜）
    const percentage = parseInt(((x - box.x) / box.width) * 1000) / 10

    logoImage.style = `--per: ${percentage}%`

    logoImage.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  logoContainer.addEventListener('mousemove', (e) => {
    window.requestAnimationFrame(() => {
      transformElement(e.clientX, e.clientY)
    })
  })

  logoContainer.addEventListener('mouseleave', () => {
    window.requestAnimationFrame(() => {
      logoImage.style.transform = 'rotateX(0) rotateY(0)'
      logoImage.style = `--per: 30%`
    })
  })
}
