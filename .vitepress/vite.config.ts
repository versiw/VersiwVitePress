import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

import { compression } from 'vite-plugin-compression2'
import { visualizer } from 'rollup-plugin-visualizer'
import path from 'node:path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './theme')
    }
  },
  plugins: [
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
    visualizer({
      filename: 'stats.html',
      gzipSize: true,
      brotliSize: true,
      emitFile: false,
      open: false
    })
  ],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true // 移除 console
      },
      format: {
        comments: false // 移除注释
      }
    },
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'naive-ui-vendor': ['naive-ui']
        }
      }
    }
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
      '@css-render/vue3-ssr',
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
