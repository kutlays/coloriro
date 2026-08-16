import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { cloudflare } from "@cloudflare/vite-plugin";

// Keep ordinary local development lightweight. The Cloudflare plugin is only
// needed for the production build/deployment path, where it remains enabled.
export default defineConfig(({ command }) => ({
  plugins: [react(), ...(command === 'build' ? [cloudflare()] : [])],
}))
