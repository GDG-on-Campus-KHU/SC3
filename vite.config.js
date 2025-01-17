import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "components", replacement: "/src/components" },
      { find: "assets", replacement: "/src/assets" },
      { find: "styles", replacement: "/src/styles" },
      { find: "hooks", replacement: "/src/hooks" },
    ],
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://34.64.162.130:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
