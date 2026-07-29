import type { APIRoute } from 'astro';
import { site } from '@config';

/**
 * Hand-rolled sitemap rather than the `@astrojs/sitemap` integration.
 *
 * For a one-page site the integration is more machinery than the job needs, and
 * keeping the dependency list at zero is worth more here. If a client's site
 * grows past a handful of pages, swap this file for the integration.
 *
 * `/thanks` and `/404` are deliberately absent - both are `noindex`.
 */

/** Demo sites list nothing - robots.txt disallows everything anyway. */
const pages = site.demo.enabled ? [] : ['/'];

export const GET: APIRoute = () => {
  const lastmod = new Date().toISOString().split('T')[0];

  const urls = pages
    .map(
      (path) => `  <url>
    <loc>${site.url}${path}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`,
    )
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
