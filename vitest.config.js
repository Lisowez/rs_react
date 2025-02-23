import { mergeConfig } from 'vitest/config';
import { defineConfig } from 'vitest/config';
import viteConfig from './vite.config';
import react from '@vitejs/plugin-react';

export default mergeConfig(
  viteConfig,
  defineConfig({
    plugins: [react()],
    test: {
      globals: true,
      environment: 'jsdom',
      include: ['src/**/*.test.ts', 'src/**/*.test.tsx'], // Исправлено
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        reportsDirectory: 'coverage',
      },
    },
  })
);
