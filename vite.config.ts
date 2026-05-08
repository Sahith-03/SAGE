import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/SAGE/',
  resolve: {
    alias: {
      // Use the self-contained UMD build which bundles its own Three.js copy
      // This avoids the dual-Three.js instance problem with the .mjs entry
      'globe.gl': path.resolve(__dirname, 'node_modules/globe.gl/dist/globe.gl.min.js'),
    },
  },
  optimizeDeps: {
    include: ['globe.gl'],
    // Prevent Vite from trying to analyse globe.gl's deps separately
    exclude: [],
  },
})

