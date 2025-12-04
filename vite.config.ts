import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/chipify/projects/c24601ee-9cc5-4fc4-bb4c-013c7dd93e1e/preview',
  plugins: [react()],
  css: {
    // Ensure CSS is processed and injected correctly
    devSourcemap: true,
  },
  server: {
    port: 5233,
    host: true,
    strictPort: true,
    hmr: {
      // HMR will be proxied through our backend
      port: 5233,
    },
  },
})
