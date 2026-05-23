import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  return {
    base: command === 'build' ? '/React_2026_Q2-Walle908/' : '/',
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@api': path.resolve(__dirname, './src/api'),
        '@appTypes': path.resolve(__dirname, './src/types'),
        '@components': path.resolve(__dirname, './src/components'),
        '@constants': path.resolve(__dirname, './src/constants'),
        '@hooks': path.resolve(__dirname, './src/hooks'),
        '@router': path.resolve(__dirname, './src/router'),
        '@test-utils': path.resolve(__dirname, './src/test-utils'),
      },
    },
    server: {
      open: true,
    },
    test: {
      coverage: {
        exclude: [
          'src/**/*.test.{js,jsx,ts,tsx}',
          'src/**/*.spec.{js,jsx,ts,tsx}',
          'src/main.{js,jsx,ts,tsx}',
          'src/setupTests.{js,ts}',
          'src/**/*.d.ts',
          'src/constants/**',
          'src/types/**',
          'src/__tests__/**',
        ],
        include: ['src/**/*.{js,jsx,ts,tsx}'],
        provider: 'v8',
        thresholds: {
          global: {
            branches: 50,
            functions: 50,
            lines: 50,
            statements: 80,
          },
        },
      },
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./src/setupTests.ts'],
    },
  };
});
