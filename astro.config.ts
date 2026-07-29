// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import { site } from './site.config';

// https://astro.build/config
export default defineConfig({
  /**
   * `site` feeds Astro.site, which we use for canonical URLs, the sitemap and
   * the contact form's redirect target. Reading it from site.config.ts keeps the
   * "edit one file" promise intact - you never edit this file per client.
   */
  site: site.url,

  /**
   * Static output. Every page is rendered to plain HTML at build time, which is
   * what lets this deploy to Cloudflare Pages / Netlify with no adapter, no
   * server and no configuration.
   */
  output: 'static',

  vite: {
    plugins: [tailwindcss()],
  },
});
