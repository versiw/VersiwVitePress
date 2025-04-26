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

/**
 * Gallery 数据
 */
interface GalleryData {
  /** 标题 */
  title: string
  /** 描述 */
  desc?: string
  imgs: string[]
}

/**
 * Library 数据
 */
interface LibraryItem {
  /** 图书封面 */
  img?: string
  /** 图书名称 */
  title: string
  /** 图书描述 */
  desc?: string
  /** 图书链接 */
  link: string
}
interface LibraryData {
  /**分组 */
  group: string
  /**图书集合 */
  items: LibraryItem[]
}
