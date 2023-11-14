import react from '@vitejs/plugin-react';
import { readdirSync } from 'fs';
import path from 'path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: true,
      eslint: { lintCommand: 'eslint --max-warnings=0 src' },
    }),
  ],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src/') },
      { find: '@styles', replacement: path.resolve(__dirname, 'src/styles/') },
    ],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: readdirSync(path.resolve(__dirname, 'src/styles/global/'))
          .map(file => `@use "./src/styles/global/${file}" as *;\n`)
          .join(''),
      },
    },
  },
});
