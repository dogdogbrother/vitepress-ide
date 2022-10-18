import { defineConfig } from 'unocss'

export default defineConfig({
  shortcuts: [
    ['f-c-c', 'flex justify-center items-center'],
    ['f-b-c', 'flex justify-between items-center'],
    ['f-c', 'flex items-center'],
  ],
  rules: [
    [/^bc-(.+)$/, ([, color]) => ({ 'border-color': `#${color}` })]
  ]
})