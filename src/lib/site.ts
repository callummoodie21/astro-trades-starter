import { site } from '@config';

/**
 * Small derived values used in more than one component. Keeping them here means
 * a component never has to know how to build a `tel:` link, and there's exactly
 * one place to fix if the rules change.
 *
 * All of this runs at build time. None of it ships to the browser.
 */

/**
 * True on portfolio demos built around a fictional business. Suppresses
 * indexing and structured data, and shows a visible notice. See `DemoMode` in
 * `config-types.ts`.
 */
export const isDemo = site.demo.enabled;

/**
 * Whether the feature bands (hero + reviews) are dark or light. Read straight
 * from `theme.bands`, exposed here so components can branch on it without
 * reaching into the config themselves.
 */
export const darkBands = site.theme.bands === 'dark';

/**
 * The four colours that differ between a dark and a light band.
 *
 * Everything else on a band works in both modes untouched, because the
 * translucent utilities (`text-on-band/85`, `border-on-band/15`) blend towards
 * whatever the band background happens to be. These four cannot: they need an
 * actually different colour, not a different opacity of the same one.
 *
 * `BaseLayout` writes these into `:root` alongside the rest of the palette, and
 * `global.css` maps them onto the `band`, `on-band`, `on-band-heading` and
 * `on-band-accent` Tailwind colours.
 *
 * White is hardcoded here on purpose. It is structural rather than brand: on a
 * dark band the text is white in every palette. Keeping it in `lib/` rather
 * than a component preserves the rule that components hold no colour values.
 */
const WHITE = '#ffffff';

export const bandTokens = {
  /** The band's own background. */
  band: darkBands ? site.theme.primary : site.theme.accentSoft,
  /** Body text sitting on the band. */
  onBand: darkBands ? WHITE : site.theme.ink,
  /** Headings on the band. Light mode uses the brand colour for a bit of lift. */
  onBandHeading: darkBands ? WHITE : site.theme.primary,
  /** Icons and small marks on the band. These flip rather than fade. */
  onBandAccent: darkBands ? site.theme.accentSurface : site.theme.accentText,
};

/** `tel:+447000000000` - the format phones actually dial reliably. */
export const telHref = `tel:${site.business.phone.href}`;

export const mailHref = `mailto:${site.business.email}`;

/** Expands the `"tel"` / `"email"` shorthands allowed in config CTAs. */
export function resolveHref(href: string): string {
  if (href === 'tel') return telHref;
  if (href === 'email') return mailHref;
  return href;
}

/**
 * True when the Web3Forms key is still the placeholder. The contact form uses
 * this to disable itself and shout at you, rather than silently binning
 * enquiries on a live client site.
 */
export const web3formsConfigured =
  site.contact.web3formsKey.length > 0

/** "14 Maxwell Drive, East Kilbride, G74 4AA" */
export const addressLine = [
  site.business.address.line1,
  site.business.address.line2,
  site.business.address.town,
  site.business.address.postcode,
]
  .filter(Boolean)
  .join(', ');
