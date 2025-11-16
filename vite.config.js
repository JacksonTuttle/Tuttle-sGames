import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/TuttlesGames/',   // 👈 IMPORTANT: your repo name EXACTLY
  plugins: [react()],
})
