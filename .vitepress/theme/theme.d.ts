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

type resourceRepoTagValue =
  | '720P'
  | '1080P'
  | '2K'
  | '4K'
  | '8K'
  | '蓝光'
  | '简中'
  | '繁中'
  | '英文'
  | '无字幕'
  | '收藏级'

/**
 * ResourceRepo 数据
 */
interface ResourceItem {
  /** 资源分类 */
  category: string
  /** 资源名称 */
  name: string
  /** 资源下载方式 */
  type: 'BT' | 'HTTP'
  /** 资源链接 */
  src: `http://${string}` | `https://${string}` | `magnet:?xt=urn:btih:${string}`
  /** 资源标签 */
  tags?: resourceRepoTagValue[]
  /** 文件哈希值 */
  hash?: `md5:${string}` | `sha1:${string}` | `sha256:${string}`
  /** 资源描述 */
  desc?: string
}
