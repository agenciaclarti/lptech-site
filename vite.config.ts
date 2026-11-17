import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // GitHub Actions supplies the repository path during its build.
  // Locally, or on a custom domain, the site remains rooted at '/'.
  base: process.env.BASE_PATH ?? '/',
  plugins: [react()],
})
