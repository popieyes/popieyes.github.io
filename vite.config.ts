import { copyFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

/**
 * GitHub Pages serves 404.html for any path it doesn't have a file for. Since
 * this is a client-routed SPA, emitting the app itself as 404.html means a
 * direct load of /projects/hernan-engine boots the app and the router reads
 * the path — clean URLs, no redirect hop, no hash.
 */
function spaFallback(): Plugin {
  return {
    name: 'spa-404-fallback',
    apply: 'build',
    // closeBundle rather than generateBundle: the HTML is written by Vite's own
    // plugin after the JS bundle is sealed, so it isn't in the bundle object yet.
    closeBundle() {
      const dir = resolve(__dirname, 'build');
      const index = resolve(dir, 'index.html');
      if (existsSync(index)) {
        copyFileSync(index, resolve(dir, '404.html'));
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), spaFallback()],
  build: {
    outDir: 'build',
  },
});
