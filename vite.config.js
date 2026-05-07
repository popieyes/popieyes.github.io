import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  theme: {
    extend: {
      fontFamily: {
        ink: ['BadInk', 'serif'],
      },
    }
  },
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'build',
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
});