import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Tuttle-sGames/',   // ← MUST MATCH REPO NAME EXACTLY
  plugins: [react()],
})
