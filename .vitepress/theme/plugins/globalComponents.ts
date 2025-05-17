import NavPage from '../components/pages/NavPage.vue'
import Gallery from '../components/pages/Gallery.vue'
import Library from '../components/pages/Library.vue'
import ResourceRepo from '../components/pages/ResourceRepo.vue'
import type { App } from 'vue'

export function setupGlobalComponents(app: App) {
  app.component('NavPage', NavPage)
  app.component('Gallery', Gallery)
  app.component('Library', Library)
  app.component('ResourceRepo', ResourceRepo)
}
