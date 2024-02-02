import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: 'lib/main.ts',
      name: 'BangoRound',
      fileName: 'bango-round'
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        format: 'es',
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})