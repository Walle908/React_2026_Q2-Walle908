import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/React_2026_Q2-Walle908/',
  server: {
    open: true,
  },
});
