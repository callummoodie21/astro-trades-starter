/**
 * Type contract for `site.config.ts`.
 *
 * You should almost never need to edit this file when setting up a new client.
 * It exists so that `site.config.ts` gets full editor autocomplete and so that a
 * typo (or a missing field) fails the build instead of shipping a broken page.
 */

/** Every icon the template can render. See `src/components/Icon.astro`. */
export type IconName =
  | 'wrench'
  | 'flame'
  | 'bath'
  | 'droplet'
  | 'hammer'
  | 'scissors'
  | 'sparkles'
  | 'zap'
  | 'leaf'
  | 'home'
  | 'phone'
  | 'mail'
  | 'map-pin'
  | 'clock'
  | 'shield'
  | 'star'
  | 'check'
  | 'check-circle'
  | 'menu'
  | 'close'
  | 'arrow-right';

/** The themeable divider drawn between sections. See `src/components/SectionDivider.astro`. */
export type MotifName = 'pipe' | 'wave' | 'chevron' | 'rule' | 'none';

/**
 * schema.org business type, used for the LocalBusiness structured data in the
 * page head. Picking an accurate one helps Google show opening hours, phone and
 * reviews directly in search results.
 */
export type SchemaBusinessType =
  | 'Plumber'
  | 'Electrician'
  | 'HVACBusiness'
  | 'RoofingContractor'
  | 'GeneralContractor'
  | 'HomeAndConstructionBusiness'
  | 'HairSalon'
  | 'BeautySalon'
  | 'LocalBusiness';

export interface Phone {
  /** How the number is shown on screen, e.g. "07000 000000". */
  display: string;
  /** E.164 format for the `tel:` link, e.g. "+447000000000". No spaces. */
  href: string;
}

export interface Address {
  line1: string;
  line2?: string;
  town: string;
  region: string;
  postcode: string;
  /** ISO 3166-1 alpha-2, e.g. "GB". Used by the structured data only. */
  country: string;
}

export interface OpeningHours {
  /** e.g. "Monday – Friday" */
  days: string;
  /** e.g. "8am – 6pm", or "Emergency call-out only" */
  hours: string;
}

export interface Service {
  title: string;
  description: string;
  icon: IconName;
  /** Optional short list of what's included. Rendered as ticks under the description. */
  points?: string[];
}

export interface Review {
  quote: string;
  name: string;
  /** Neighbourhood or town. Local place names build a lot of trust. */
  area: string;
  /** 1–5. Defaults to 5 if omitted. */
  rating?: number;
}

export interface Highlight {
  /** Big number or short value, e.g. "25+" or "Gas Safe". */
  value: string;
  /** What it means, e.g. "years on the tools". */
  label: string;
}

export interface CallToAction {
  label: string;
  /**
   * Any href: "#contact", "/thanks", "https://…".
   * Two shorthands are expanded for you: `"tel"` becomes a `tel:` link built
   * from `business.phone.href`, and `"email"` becomes a `mailto:` link.
   */
  href: string;
}

export interface Theme {
  /** Main brand colour. Dark enough that white text sits on it at 4.5:1 or better. */
  primary: string;
  /** Darker shade of `primary`, used for hover states. */
  primaryDark: string;
  /** Lighter shade of `primary`, used for subtle dark-on-dark separation. */
  primaryLight: string;
  /** Accent colour, used decoratively: motif, rules, icon strokes on dark. */
  accent: string;
  /** A darker accent that passes 4.5:1 as *text* on white. */
  accentText: string;
  /** A lighter accent used as a button/badge background under dark `ink` text. */
  accentSurface: string;
  /** A very pale accent tint for soft section backgrounds. */
  accentSoft: string;
  /** Body text colour on light backgrounds. */
  ink: string;
  /** Secondary text colour on light backgrounds. Must still hit 4.5:1 on white. */
  muted: string;
  /** Page background. */
  surface: string;
  /** Alternate section background, for banding sections apart. */
  surfaceAlt: string;
  /** Hairline border colour. */
  line: string;
  /** Which section divider to draw. */
  motif: MotifName;
}

/**
 * Demo mode - for portfolio pieces built around a fictional business.
 *
 * A demo site is a marketing asset, but it's also a fictional local business
 * with an address, credentials and reviews that a search engine cannot tell
 * apart from a real one. Left indexable, a plumbing demo puts a firm that
 * doesn't exist - with a fabricated Gas Safe number and five fabricated
 * reviews - into local search results for a real town, on your own domain.
 *
 * Turning this on:
 *   - emits `noindex, nofollow`
 *   - makes robots.txt disallow everything and drops the sitemap entries
 *   - omits the LocalBusiness structured data entirely
 *   - renders a visible notice above the header
 *
 * Set `enabled: false` for real client sites. It's a required field rather than
 * an optional one on purpose: forgetting it fails silently and in the wrong
 * direction, so you should have to say which one you meant.
 */
export interface DemoMode {
  enabled: boolean;
  /** Notice bar text. Say plainly that the business is fictional. */
  notice: string;
}

export interface SiteConfig {
  /** Full deployed URL, no trailing slash. Used for canonical tags + form redirect. */
  url: string;

  demo: DemoMode;

  business: {
    /** Short name used in the header and footer. */
    name: string;
    /** Full trading name, used in structured data and the page title. */
    legalName: string;
    /** One line, under ~60 chars. Sits under the business name. */
    tagline: string;
    phone: Phone;
    email: string;
    address: Address;
    hours: OpeningHours[];
    /** Towns/areas covered. Shown in the footer and used for local SEO. */
    serviceAreas: string[];
    /** Optional trust credentials, e.g. "Gas Safe Registered - 000000". */
    credentials?: string[];
  };

  theme: Theme;

  seo: {
    /** ~155 chars max. Shown in Google results. */
    description: string;
    schemaType: SchemaBusinessType;
  };

  nav: { label: string; href: string }[];

  hero: {
    headline: string;
    subheadline: string;
    primaryCta: CallToAction;
    secondaryCta?: CallToAction;
    /** Three short trust signals shown under the buttons. */
    points: string[];
    /** Optional background photo, e.g. "/images/hero.jpg". Omit for the branded pattern. */
    image?: string;
    /** Required if `image` is set. Describes the photo for screen readers. */
    imageAlt?: string;
  };

  services: {
    title: string;
    intro: string;
    items: Service[];
  };

  reviews: {
    title: string;
    intro: string;
    items: Review[];
  };

  about: {
    title: string;
    /** Each string becomes its own paragraph. */
    body: string[];
    highlights: Highlight[];
    image?: string;
    imageAlt?: string;
  };

  contact: {
    title: string;
    intro: string;
    /**
     * Web3Forms access key. Get a free one at https://web3forms.com - you enter
     * an email address and they send you the key. Leave the placeholder in place
     * and the form renders in a disabled state with a visible warning.
     */
    web3formsKey: string;
    /** Subject line on the email you receive. */
    emailSubject: string;
  };

  footer: {
    /** Small print under the footer columns, e.g. a demo credit. */
    note?: string;
  };
}
