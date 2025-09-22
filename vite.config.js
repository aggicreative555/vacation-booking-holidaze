import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/',
  plugins: [react({ fastRefresh: false })],
  publicDir: 'public',
  build: {
    outDir: 'build',
  },
  optimizeDeps: {
    exclude: ['lightningcss'],
  },
  ssr: {
    noExternal: ['lightningcss'],
  },
});
