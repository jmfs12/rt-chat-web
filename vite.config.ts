import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define:{
    global: 'window',
  },
  server: {
    proxy: {
      '/ws': {
        target: 'http://localhost:8080', // your backend WebSocket server address
        ws: true,  // crucial! enables websocket proxying
        changeOrigin: true,
      },
    },
  },
})
