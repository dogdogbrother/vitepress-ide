import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Unocss from 'unocss/vite'
import { presetAttributify, presetUno } from 'unocss'
import path from 'path'
import { prismjsPlugin } from 'vite-plugin-prismjs'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  plugins: [
    react(),
    Unocss({
      presets: [
        presetUno(),
        presetAttributify(),
      ]
    }),
    prismjsPlugin({
      theme: "dark", //主题名称
      languages: 'all',
      css: true,
      // plugins: ["line-numbers", "show-language"]
      plugins: ["show-language"]
    }),
  ],
  build: {
    outDir: '_dist'
  }
})
