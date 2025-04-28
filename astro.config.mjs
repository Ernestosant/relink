import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  integrations: [tailwind()],
  output: 'server',
  adapter: cloudflare({
    mode: 'directory',
    functionPerRoute: false,
    runtime: {
      mode: 'local',
      persistToStorage: false // No usar KV para la persistencia de compilación
    }
  })
}); 