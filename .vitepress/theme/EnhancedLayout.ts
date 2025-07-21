import {
  NolebaseEnhancedReadabilitiesMenu,
  NolebaseEnhancedReadabilitiesScreenMenu
} from '@nolebase/vitepress-plugin-enhanced-readabilities'
import { NolebaseHighlightTargetedHeading } from '@nolebase/vitepress-plugin-highlight-targeted-heading'
import Layout from './components/Layout.vue'
import GiscusComment from './components/features/GiscusComment.vue'
import SharePage from '../theme/components/features/SharePage.vue'

import '@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css'

export default {
  name: 'EnhancedLayout',
  setup() {
    return () =>
      h(Layout, null, {
        // PC端导航栏尾部插槽，Nólëbase 阅读增强
        'nav-bar-content-after': () => [h(SharePage), h(NolebaseEnhancedReadabilitiesMenu)],
        // 移动端导航栏尾部插槽
        'nav-screen-content-after': () => h(NolebaseEnhancedReadabilitiesScreenMenu),
        // Nólëbase 闪烁高亮当前的目标标题
        'layout-top': () => [h(NolebaseHighlightTargetedHeading)],
        // giscus 评论
        'doc-after': () => h(GiscusComment)
      })
  }
}
