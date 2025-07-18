import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

import { compression } from 'vite-plugin-compression2'
import { chunkSplitPlugin } from 'vite-plugin-chunk-split'
import { visualizer } from 'rollup-plugin-visualizer'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    AutoImport({
      imports: [
        'vue',
        {
          'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar']
        }
      ]
    }),
    Components({
      resolvers: [NaiveUiResolver()]
    }),
    compression(),
    chunkSplitPlugin({
      strategy: 'single-vendor',
      customSplitting: {}
    }),
    visualizer({
      filename: 'stats.html',
      gzipSize: true,
      brotliSize: true,
      emitFile: false,
      open: false
    })
  ],
  build: {
    minify: true
  },
  optimizeDeps: {
    exclude: [
      '@nolebase/vitepress-plugin-enhanced-readabilities/client',
      'vitepress',
      '@nolebase/ui'
    ]
  },
  ssr: {
    noExternal: [
      'naive-ui',
      'date-fns',
      'vueuc',
      '@nolebase/vitepress-plugin-enhanced-readabilities',
      '@nolebase/vitepress-plugin-highlight-targeted-heading',
      '@nolebase/ui'
    ]
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  }
})
