/**
 * 站点数据
 */
interface NavItem {
  /** 站点图标 */
  icon?: string
  /** 站点名称 */
  title: string
  /** 站点描述 */
  desc?: string
  /** 站点链接 */
  link: string
}
interface NavData {
  /**分组 */
  group: string
  /**站点集合 */
  items: NavItem[]
}
