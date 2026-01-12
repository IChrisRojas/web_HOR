// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://houseofravers.cl',
  output: 'static',
  integrations: [react(), keystatic()],
  vite: {
    plugins: [tailwindcss()]
  }
});