// vite.config.js

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'url';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)), // Configura l'alias "@"
    },
  },
  server: {
    historyApiFallback: true, // Aggiungi questo per gestire le rotte SPA
  },
});