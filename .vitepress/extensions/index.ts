// .vitepress/extensions/index.ts

/**
 * @fileoverview
 * VitePress 配置扩展模块的入口文件 (Barrel File)。
 *
 * 该文件扮演着“扩展注册中心”的角色：
 * 1. 导入所有需要启用的具体扩展实现（如 naive-ssr, sidebar 等）。
 * 2. 在 `extensions` 数组中按期望的顺序注册它们。
 * 3. 导出 `defineCompositeConfig` 组合器和 `extensions` 数组，为外部提供统一、简洁的调用接口。
 *
 * 通过这种模式，主配置文件 `config.ts` 无需关心扩展的具体实现，只需从这里导入并使用即可。
 */

import { withSidebar } from 'vitepress-sidebar'

import { naiveSSRExtension } from './naive-ssr'
import sideBarConfig from '../configs/sideBar.config'
import { defineCompositeConfig, VitePressConfigExtension } from './composer'

/**
 * VitePress 配置扩展的注册表。
 *
 * 在此数组中添加或移除扩展即可启用或禁用相应功能。
 * 数组的顺序至关重要，它决定了扩展的应用顺序。
 * 后续的扩展会基于前面扩展处理后的配置继续进行处理。
 */
export const extensions: VitePressConfigExtension[] = [
  // Naive UI 服务端渲染 (SSR) 支持
  naiveSSRExtension({
    enableDebug: false
  }),

  // 基于文件目录结构的自动侧边栏生成
  (config) => withSidebar(config, sideBarConfig)
]

// 重新导出模块的公共 API，供主配置文件 `.vitepress/config.ts` 使用。
export { defineCompositeConfig, type VitePressConfigExtension }
