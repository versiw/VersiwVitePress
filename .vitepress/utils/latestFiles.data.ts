import { createContentLoader } from 'vitepress'

export default {
  load() {
    return data
  }
}

const data = await createContentLoader('**/*.md').load()
