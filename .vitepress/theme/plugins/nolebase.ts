import {
  InjectionKey,
  LayoutMode,
  Options
} from '@nolebase/vitepress-plugin-enhanced-readabilities'
import type { App } from 'vue'

/**
 * Nólëbase 集成 阅读增强 配置
 *
 * @url https://nolebase-integrations.ayaka.io/pages/zh-CN/integrations/vitepress-plugin-enhanced-readabilities/#%E9%85%8D%E7%BD%AE
 */
export function setupReadability(app: App) {
  app.provide(InjectionKey, {
    layoutSwitch: {
      defaultMode: LayoutMode.BothWidthAdjustable,
      contentLayoutMaxWidth: {
        defaultMaxWidth: 100
      }
    },
    spotlight: {
      defaultToggle: true
    }
  } as Options)
}
