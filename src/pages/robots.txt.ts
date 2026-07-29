import type { APIRoute } from 'astro';
import { site } from '@config';

/**
 * Astro pattern: a static endpoint.
 *
 * Any `.ts` file in `src/pages` that exports `GET` becomes a route. In static
 * mode it runs once at build time and the response body is written to disk - so
 * this produces a real `dist/robots.txt`, with no server involved.
 *
 * Doing it this way rather than dropping a file in `public/` means the sitemap
 * URL follows `site.url` from the config automatically. One less thing to
 * remember to change per client.
 */
const body = site.demo.enabled
  ? // Demo mode: shut crawlers out completely, and don't advertise a sitemap
    // for a business that doesn't exist. The `noindex` meta tag is the belt;
    // this is the braces.
    `User-agent: *
Disallow: /
`
  : `User-agent: *
Allow: /

Sitemap: ${site.url}/sitemap.xml
`;

export const GET: APIRoute = () =>
  new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
