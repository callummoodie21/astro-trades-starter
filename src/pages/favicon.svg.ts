import type { APIRoute } from 'astro';
import { site } from '@config';

/**
 * The favicon, generated from the config.
 *
 * A monogram in the client's brand colours means a new client gets a correct
 * favicon with no design work - one less asset to chase before launch. Replace
 * this file with a real `public/favicon.svg` the moment the client has an actual
 * logo; a static file in `public/` wins over this route.
 */

const initial = (site.business.name.trim()[0] ?? '?')
  .toUpperCase()
  .replace(/[<>&"']/g, '');

export const GET: APIRoute = () =>
  new Response(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="${initial}">
  <rect width="64" height="64" rx="14" fill="${site.theme.primary}"/>
  <text x="32" y="45" text-anchor="middle"
        font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
        font-size="38" font-weight="700" fill="${site.theme.accentSurface}">${initial}</text>
</svg>
`,
    { headers: { 'Content-Type': 'image/svg+xml' } },
  );
