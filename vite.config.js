import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "./src/style/_variables.scss";` // Automatisk import av SCSS-variabler
      },
    },
  },
});
