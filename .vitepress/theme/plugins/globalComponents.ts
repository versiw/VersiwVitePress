import NavPage from '../components/pages/NavPage.vue'
import Gallery from '../components/pages/Gallery.vue'
import type { App } from 'vue'

export function setupGlobalComponents(app: App) {
  app.component('NavPage', NavPage)
  app.component('Gallery', Gallery)
}
