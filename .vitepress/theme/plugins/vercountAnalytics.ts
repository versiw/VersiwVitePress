import { inBrowser } from 'vitepress'
import type { Router } from 'vitepress'

/**
 * 初始化 Vercount 访问统计脚本
 * 用于 SPA 应用的页面浏览统计
 *
 * @see https://cn.vercount.one/
 */
const initVercountAnalytics = () => {
  const script = document.createElement('script')
  script.defer = true
  script.async = true
  script.src = 'https://cn.vercount.one/js'
  document.head.appendChild(script)
}

export function setupAnalytics(router: Router) {
  /**​
   * 设置网站访问量统计
   * 在路由加载完成后初始化统计脚本
   */
  if (inBrowser) {
    router.onAfterPageLoad = (to: string) => {
      initVercountAnalytics()
    }
  }
}
