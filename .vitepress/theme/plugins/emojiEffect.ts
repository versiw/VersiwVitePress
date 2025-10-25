import type { Router } from 'vitepress'
import { inBrowser } from 'vitepress'
import { gsap } from 'gsap'
import Draggable from 'gsap/Draggable'
import { composeHandlers } from '../lib/compose'

gsap.registerPlugin(Draggable)

type EmojiStatus = 'IDLE' | 'AIMING' | 'BOUNCING' | 'RESETTING'

interface EmojiState {
  id: number
  status: EmojiStatus
  target: HTMLImageElement
  originalRect: DOMRect
  x: number
  y: number
  vx: number
  vy: number
  rotation: number
  draggable: Draggable
  resetTimer?: number
  centerX: number
  centerY: number
  launchVector: { dx: number; dy: number; distance: number }
}

let emojiEffectCleanup: (() => void) | undefined

export function setupEmojiEffect(router: Router) {
  if (!inBrowser) return

  const emojiSelector = '.bouncing-emoji-item'
  const allEmojiStates: EmojiState[] = []
  let mouse = { x: 0, y: 0 }

  const config = {
    gravity: 0.4,
    damping: 0.985,
    bounceFactor: -0.75,
    proximityDistance: 100,
    resetTimeout: 5000,
    pullLimit: 120,
    launchPowerMultiplier: 0.3
  }

  const onMouseMove = (event: MouseEvent) => {
    mouse.x = event.clientX
    mouse.y = event.clientY
  }

  const animationLoop = () => {
    allEmojiStates.forEach((state) => {
      switch (state.status) {
        case 'IDLE': {
          const centerX = state.originalRect.left + state.originalRect.width / 2
          const centerY = state.originalRect.top + state.originalRect.height / 2
          const dx = mouse.x - centerX,
            dy = mouse.y - centerY,
            distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < config.proximityDistance) {
            const angle = Math.atan2(dy, dx),
              pullFactor = 1 - distance / config.proximityDistance
            gsap.to(state.target, {
              x: Math.cos(angle) * 10 * pullFactor,
              y: Math.sin(angle) * 10 * pullFactor,
              rotation: Math.cos(angle) * 15 * pullFactor,
              scale: 1 + 0.1 * pullFactor,
              duration: 0.3,
              ease: 'power1.out',
              overwrite: 'auto'
            })
          } else {
            gsap.to(state.target, {
              x: 0,
              y: 0,
              rotation: 0,
              scale: 1,
              duration: 0.5,
              ease: 'elastic.out(1, 0.5)',
              overwrite: 'auto'
            })
          }
          break
        }
        case 'BOUNCING': {
          state.vy += config.gravity
          state.vx *= config.damping
          state.vy *= config.damping
          state.x += state.vx
          state.y += state.vy
          state.rotation += state.vx * 0.1
          const bounds = { minX: 0, maxX: window.innerWidth, minY: 0, maxY: window.innerHeight }

          const currentScale = (gsap.getProperty(state.target, 'scale') as number) || 1
          const scaledWidth = state.originalRect.width * currentScale
          const scaledHeight = state.originalRect.height * currentScale

          // 假设 emoji 图片有 15% 的透明边距，让这部分可以溢出屏幕
          const visualMarginFactor = 0.15

          // 水平方向碰撞检测
          if (state.x + scaledWidth * (1 - visualMarginFactor) > bounds.maxX) {
            state.x = bounds.maxX - scaledWidth * (1 - visualMarginFactor)
            state.vx *= config.bounceFactor
          } else if (state.x + scaledWidth * visualMarginFactor < bounds.minX) {
            state.x = bounds.minX - scaledWidth * visualMarginFactor
            state.vx *= config.bounceFactor
          }

          // 垂直方向碰撞检测
          if (state.y + scaledHeight * (1 - visualMarginFactor) > bounds.maxY) {
            state.y = bounds.maxY - scaledHeight * (1 - visualMarginFactor)
            state.vy *= config.bounceFactor
          } else if (state.y + scaledHeight * visualMarginFactor < bounds.minY) {
            state.y = bounds.minY - scaledHeight * visualMarginFactor
            state.vy *= config.bounceFactor
          }

          gsap.set(state.target, { x: state.x, y: state.y, rotation: state.rotation })
          break
        }
      }
    })
  }

  const initialize = () => {
    const emojiElements = document.querySelectorAll<HTMLImageElement>(emojiSelector)
    if (!emojiElements.length) return

    emojiElements.forEach((el, index) => {
      const state: Partial<EmojiState> = {
        id: index,
        status: 'IDLE',
        target: el,
        originalRect: el.getBoundingClientRect(),
        launchVector: { dx: 0, dy: 0, distance: 0 }
      }

      const proxy = document.createElement('div')

      state.draggable = Draggable.create(proxy, {
        trigger: el,
        cursor: 'grab',
        activeCursor: 'grabbing',
        onPress() {
          if (state.status !== 'IDLE') return
          state.status = 'AIMING'
          gsap.killTweensOf(el)
          clearTimeout(state.resetTimer)
          const rect = el.getBoundingClientRect()
          state.centerX = rect.left + rect.width / 2
          state.centerY = rect.top + rect.height / 2
        },
        onDrag() {
          if (state.status !== 'AIMING') return
          let dx = this.pointerX - state.centerX!,
            dy = this.pointerY - state.centerY!
          let distance = Math.sqrt(dx * dx + dy * dy)
          if (distance > config.pullLimit) {
            const angle = Math.atan2(dy, dx)
            dx = Math.cos(angle) * config.pullLimit
            dy = Math.sin(angle) * config.pullLimit
          }
          state.launchVector = { dx, dy, distance }
          gsap.to(el, { x: dx, y: dy, scale: 1 + distance * 0.002, duration: 0.1 })
        },
        onDragEnd() {
          if (state.status !== 'AIMING') return
          const currentRect = el.getBoundingClientRect()
          state.x = currentRect.left
          state.y = currentRect.top
          state.vx = -state.launchVector!.dx * config.launchPowerMultiplier
          state.vy = -state.launchVector!.dy * config.launchPowerMultiplier
          state.rotation = 0
          gsap.set(el, {
            position: 'fixed',
            top: 0,
            left: 0,
            x: state.x,
            y: state.y,
            zIndex: 101
          })
          state.status = 'BOUNCING'
          state.resetTimer = window.setTimeout(() => {
            if (state.status !== 'BOUNCING') return
            state.status = 'RESETTING'
            state.draggable?.disable()

            const lastX = gsap.getProperty(el, 'x') as number
            const lastY = gsap.getProperty(el, 'y') as number
            const lastRotation = gsap.getProperty(el, 'rotation') as number
            const lastScale = gsap.getProperty(el, 'scale') as number

            gsap.set(el, { clearProps: 'position,top,left,z-index' })
            const finalRect = el.getBoundingClientRect()

            const invertX = lastX - finalRect.left
            const invertY = lastY - finalRect.top

            gsap.fromTo(
              el,
              { x: invertX, y: invertY, rotation: lastRotation, scale: lastScale },
              {
                x: 0,
                y: 0,
                rotation: 0,
                scale: 1,
                duration: 0.8,
                ease: 'elastic.out(1, 0.7)',
                onComplete: () => {
                  state.status = 'IDLE'
                  state.draggable?.enable()
                  gsap.set(el, { clearProps: 'transform' })
                  el.style.cursor = 'grab'
                }
              }
            )
          }, config.resetTimeout)
        }
      })[0]

      allEmojiStates.push(state as EmojiState)
    })

    window.addEventListener('mousemove', onMouseMove)
    gsap.ticker.add(animationLoop)

    emojiEffectCleanup = () => {
      window.removeEventListener('mousemove', onMouseMove)
      gsap.ticker.remove(animationLoop)
      while (allEmojiStates.length) {
        const state = allEmojiStates.pop()
        if (state) {
          clearTimeout(state.resetTimer)
          state.draggable.kill()
          gsap.killTweensOf(state.target)
          gsap.set(state.target, { clearProps: 'all' })
        }
      }
    }
  }

  const routeChangeHandler = (to: string) => {
    if (emojiEffectCleanup) {
      emojiEffectCleanup()
      emojiEffectCleanup = undefined
    }
    if (to === '/') {
      setTimeout(initialize, 100)
    }
  }

  router.onAfterRouteChange = composeHandlers(router.onAfterRouteChange, routeChangeHandler)
}
