import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve('src'),
      '@types': resolve('src/types'),
      '@api': resolve('src/api'),
      '@img': resolve('src/assets/img'),
      '@config': resolve('src/config'),
      '@mixins': resolve('src/mixins'),
      '@router': resolve('src/router'),
      '@store': resolve('src/store'),
      '@stores': resolve('src/stores'),
      '@components': resolve('src/components'),
      '@utils': resolve('src/utils'),
      '@layout': resolve('src/layout'),
      '@const': resolve('src/modules/constant.ts'),
      '@modules': resolve('src/modules'),
    },
  },
})
