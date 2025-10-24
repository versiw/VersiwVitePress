// .vitepress/extensions/composer.ts

import type { UserConfig } from 'vitepress'
import deepmerge from 'deepmerge'

/**
 * @fileoverview
 * VitePress 配置组合器核心实现。
 * 该模块提供了 `defineCompositeConfig` 函数，用于将一个基础配置与一系列
 * 配置扩展（插件）智能地合并成最终的 VitePress 配置。
 * 它的核心特性是能够正确处理 VitePress 的钩子函数，实现串联执行而非覆盖。
 */

/**
 * 定义 VitePress 配置扩展的统一类型。
 * VitePressConfigExtension 代表一个独立的配置单元，它可以是：
 * 1. 一个部分配置对象 (Partial<UserConfig>): 用于以声明式的方式与基础配置进行深度合并。
 * 2. 一个转换函数 ((config: UserConfig) => UserConfig): 用于以编程式的方式对现有配置进行动态修改或增强。
 */
export type VitePressConfigExtension = Partial<UserConfig> | ((config: UserConfig) => UserConfig)

/**
 * 智能的配置组合器，是实现 VitePress 配置插件化架构的核心。
 *
 * 它接收一个基础配置和一组扩展，然后按顺序应用这些扩展。
 * 其“智能”之处在于：
 * - 对于普通配置项，使用深度合并（deepmerge）。
 * - 对于值为函数的 VitePress 钩子（如 `postRender`），它不会相互覆盖，
 *   而是根据钩子特性将它们组合成一个调用链，确保所有扩展的钩子都能执行。
 *
 * @param baseConfig VitePress 的基础配置对象。
 * @param extensions 一个包含配置扩展的数组，数组顺序即为扩展的应用顺序。
 * @returns 经过所有扩展增强后的最终 VitePress 配置对象。
 */
export const defineCompositeConfig = (
  baseConfig: UserConfig,
  extensions: VitePressConfigExtension[]
): UserConfig => {
  // 定义需要特殊链式处理的 VitePress 钩子。
  // 管道型钩子：前一个钩子的返回值将作为后一个钩子的输入。
  const pipelineHooks = ['transformHtml']
  // 顺序执行型钩子：所有钩子按顺序依次执行，通常用于执行副作用，返回值被忽略。
  const sequentialHooks = ['postRender', 'buildEnd']

  // 使用 reduce 依次将每个扩展应用到配置上。
  // 关键：为 reduce 提供显式泛型 <UserConfig>，以确保 TypeScript
  // 正确推断累加器 `config` 的类型，避免类型错误。
  return extensions.reduce<UserConfig>((config, extension) => {
    // ---- 处理转换函数类型的扩展 ----
    if (typeof extension === 'function') {
      try {
        const newConfig = extension(config)
        // 如果转换函数没有返回（或返回 undefined/null），则保持原始配置不变。
        return newConfig || config
      } catch (error) {
        console.error('[Config Composer] 应用配置转换函数时出错:', error)
        return config
      }
    }

    // ---- 处理配置对象类型的扩展 ----
    if (typeof extension === 'object' && extension !== null) {
      const extensionHooks: Record<string, Function> = {}
      const extensionOtherProps: Record<string, any> = {}

      // 步骤 1: 将扩展对象分离为钩子函数和其它常规配置属性。
      for (const key in extension) {
        const ext = extension as Partial<UserConfig>
        if (pipelineHooks.includes(key) || sequentialHooks.includes(key)) {
          if (typeof ext[key] === 'function') {
            extensionHooks[key] = ext[key]
          }
        } else {
          extensionOtherProps[key] = ext[key]
        }
      }

      // 步骤 2: 将常规配置属性通过 deepmerge 进行深度合并。
      const mergedConfig = deepmerge(config, extensionOtherProps)

      // 步骤 3: 组合钩子函数，实现链式调用。
      for (const hookName in extensionHooks) {
        const newHook = extensionHooks[hookName]
        const existingHook = (mergedConfig as any)[hookName]

        // 如果当前配置中尚不存在该钩子，则直接赋值。
        if (typeof existingHook !== 'function') {
          ;(mergedConfig as any)[hookName] = newHook
          continue
        }

        // 如果已存在钩子，则根据其类型创建新的组合函数。
        if (pipelineHooks.includes(hookName)) {
          // 创建一个管道式执行的函数。
          ;(mergedConfig as any)[hookName] = async (...args: any[]) => {
            const result = await existingHook(...args)
            // VitePress 的 transformHtml 允许返回 void/undefined，此时应传入原始值。
            const nextInput = result === undefined ? args[0] : result
            return newHook(nextInput, ...args.slice(1))
          }
        } else if (sequentialHooks.includes(hookName)) {
          // 创建一个顺序执行的函数。
          ;(mergedConfig as any)[hookName] = async (...args: any[]) => {
            await existingHook(...args)
            await newHook(...args)
          }
        }
      }
      return mergedConfig
    }

    // 如果扩展格式不合法，则忽略并返回当前配置。
    return config
  }, baseConfig)
}
