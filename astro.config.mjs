// @ts-check
import { defineConfig, envField } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";

import cloudflare from "@astrojs/cloudflare";

import preact from '@astrojs/preact';

export default defineConfig({
  env: {
    schema: {
      PROD: envField.boolean({ context: 'server', access: 'public' }),
      DB_URL: envField.string({ context: 'server', access: 'secret' }),
      DB_ANON_KEY: envField.string({ context: 'server', access: 'secret' }),
    }
  },

  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ['@supabase/supabase-js']
    },
  },

  output: "server",
  adapter: cloudflare(),
  integrations: [preact()],
});