import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: '172.20.10.10',
    proxy: {
      '/api': {
        target: 'http://172.20.10.10:5173',
        changeOrigin: true,
      },
    },
  },
})
