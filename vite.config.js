import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    // Increase chunk size warning threshold
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React runtime
          'react-vendor': ['react', 'react-dom'],
          // Routing
          'router': ['react-router-dom'],
          // Animation library (heaviest dependency)
          'framer': ['framer-motion'],
          // Icon library
          'icons': ['lucide-react'],
          // Supabase (only loaded when needed)
          'supabase': ['@supabase/supabase-js'],
        },
      },
    },
  },
  // Faster dev server
  server: {
    hmr: { overlay: false },
  },
})
