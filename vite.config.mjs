import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode === 'analyze' &&
      visualizer({
        filename: 'dist/stats.html',
        open: true,
        gzipSize: true,
        brotliSize: true
      })
  ].filter(Boolean),
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          utils: ['lucide-react', 'framer-motion']
        }
      }
    }
  },
  optimizeDeps: {
    exclude: [] // Removed vite-imagetools from exclude
  },
  server: {
    port: 3000,
    open: true
  },
  preview: {
    port: 4173
  }
}))