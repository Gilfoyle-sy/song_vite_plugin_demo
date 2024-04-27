import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
// import vitePluginSongDemo from './plugins/vite-plugin-song-demo/index.js'
import vitePluginPromptDev from './plugins/vite-plugin-prompt-dev'
import serverOptions from './serverOptions'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueDevTools(),
    // vitePluginSongDemo(),
    vitePluginPromptDev(serverOptions)
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
})
