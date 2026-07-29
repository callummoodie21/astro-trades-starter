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
