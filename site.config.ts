import type { SiteConfig } from './src/lib/config-types';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  THE ONLY FILE NEEDED TO EDIT FOR A NEW CLIENT.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  Everything on the site is read from here at BUILD time and baked into static
 *  HTML, so there is no runtime cost to any of it.
 *
 *  Workflow for a new client:
 *    1. Duplicate the repo.
 *    2. Edit this file top to bottom.
 *    3. Drop photos into `public/images/` (see the README in that folder).
 *    4. Deploy.
 *
 *  The `: SiteConfig` annotation gives you autocomplete on every field and turns
 *  a typo or a missing required field into a build error rather than a broken
 *  page. It also means the optional fields (`hero.image`, `about.image`,
 *  `business.credentials`) exist on the type even when commented out, so the
 *  components can check for them.
 */
export const site: SiteConfig = {
  /**
   * The exact host this site is served from. No trailing slash.
   *
   * Not cosmetic. This builds the canonical tag, the sitemap, and the contact
   * form's success redirect. Web3Forms' free plan only honours that redirect
   * when it points at the same host the form was submitted from, so if this
   * does not match the address bar character for character, visitors land on
   * web3forms.com/success instead of your own /thanks/ page.
   *
   * Subdomains count as different hosts. `demo.example.com` and
   * `calder.example.com` are not interchangeable here.
   *
   * Order of operations: set it to the `.pages.dev` URL while testing, then
   * change it to the custom domain once that is attached, and redeploy. It has
   * to follow wherever the site is actually being served from.
   */
  url: 'https://demo.callummoodie.xyz',

  /**
   * ⚠️ SET `enabled: false` FOR REAL CLIENT SITES.
   *
   * Calder & Son is fictional, so this site must stay out of search results -
   * see the DemoMode docs in src/lib/config-types.ts for why that matters more
   * than it sounds. Leaving it on costs a demo nothing: you're sending the link
   * to prospects directly, not hoping Google finds it.
   */
  demo: {
    enabled: true,
    notice:
      'Calder & Son is a fictional business. This is a demo site showing what a finished job looks like.',
  },

  business: {
    name: 'Calder & Son',
    legalName: 'Calder & Son Plumbing and Heating',
    tagline: 'Plumbing & heating in East Kilbride',

    // PLACEHOLDER NUMBER - swap both fields before going live.
    // `display` is what people read; `href` is what the phone dials.
    phone: {
      display: '07000 000000',
      href: '+447000000000',
    },

    email: 'hello@calderandson.co.uk',

    address: {
      line1: '14 Maxwell Drive',
      town: 'East Kilbride',
      region: 'South Lanarkshire',
      postcode: 'G74 4AA',
      country: 'GB',
    },

    hours: [
      { days: 'Monday – Friday', hours: '8am – 6pm' },
      { days: 'Saturday', hours: '9am – 2pm' },
      { days: 'Sunday', hours: 'Emergency call-out only' },
    ],

    serviceAreas: [
      'East Kilbride',
      'Calderwood',
      'Stewartfield',
      'The Village',
      'Westwood',
      'St Leonards',
      'Hairmyres',
      'Busby',
      'Eaglesham',
      'Thorntonhall',
    ],

    credentials: [
      'Gas Safe Registered - No. 000000',
      'Fully insured - £2m public liability',
      'SNIPEF member',
    ],
  },

  /**
   * ── Theme ──────────────────────────────────────────────────────────────────
   * These become CSS custom properties on `:root`, which Tailwind's colour
   * utilities point at. Change them here and the whole site re-skins - you never
   * touch a component.
   *
   * Contrast matters: `primary` carries white text, `accentSurface` carries dark
   * `ink` text, and `accentText` is the only accent shade safe for small text on
   * white. Every pair below is at 4.5:1 or better. If you change them, check the
   * new pairs at https://webaim.org/resources/contrastchecker/
   *
   * Two more palettes to copy over the top for other trades:
   *
   *   Joiner - walnut + brass
   *     primary '#3B2A1E'  primaryDark '#281C13'  primaryLight '#57402F'
   *     accent  '#B8873B'  accentText  '#7E5A1E'  accentSurface '#D6A44F'
   *     accentSoft '#F6EBD9'  motif 'chevron'
   *
   *   Salon / barber - ink + rose
   *     primary '#1F1B24'  primaryDark '#141017'  primaryLight '#332C3C'
   *     accent  '#C06C84'  accentText  '#8E4058'  accentSurface '#D98CA3'
   *     accentSoft '#F9EAEF'  motif 'rule'
   */
  theme: {
    primary: '#0E3A47', // petrol blue
    primaryDark: '#082932',
    primaryLight: '#17566A',
    accent: '#B87333', // copper
    accentText: '#8A5220',
    accentSurface: '#D08C46',
    accentSoft: '#F6EADC',
    ink: '#12212A',
    muted: '#4F626D',
    surface: '#FFFFFF',
    surfaceAlt: '#F3F6F7',
    line: '#DDE4E7',
    motif: 'pipe',
  },

  seo: {
    description:
      'Gas Safe registered plumbers and heating engineers in East Kilbride. Emergency repairs, boiler installation and servicing, bathroom fitting. Family run since 1998.',
    schemaType: 'Plumber',
  },

  nav: [
    { label: 'Services', href: '#services' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ],

  hero: {
    headline: 'Plumbing and heating you can actually get hold of',
    subheadline:
      'Family-run, Gas Safe registered, and based in East Kilbride since 1998. We answer the phone, we turn up when we say we will, and we tell you the price before we start.',
    primaryCta: { label: 'Call now', href: 'tel' },
    secondaryCta: { label: 'Request a quote', href: '#contact' },
    points: [
      '24/7 emergency call-out',
      'No call-out charge',
      'Fixed prices quoted up front',
    ],
    // To use a photo instead of the branded pattern, uncomment these two lines
    // and drop the file into `public/images/`. See public/images/README.md.
    // image: '/images/hero.jpg',
    // imageAlt: 'Calder & Son engineer servicing a boiler in a domestic kitchen',
  },

  services: {
    title: 'What we do',
    intro:
      'Domestic plumbing and heating across East Kilbride and the surrounding areas. No job too small - a dripping tap is as welcome as a full bathroom.',
    items: [
      {
        title: 'Emergency repairs',
        description:
          'Burst pipes, no heating, no hot water, leaks coming through a ceiling. We keep evening and weekend slots free so you are not waiting until Monday.',
        icon: 'droplet',
        points: ['Same-day where possible', 'Out of hours available', 'Water shut off and made safe first'],
      },
      {
        title: 'Boiler installation & servicing',
        description:
          'Replacement combi and system boilers from Worcester, Vaillant and Ideal, plus annual services and landlord gas safety certificates.',
        icon: 'flame',
        points: ['Free written quote', 'Manufacturer warranties registered', 'Old boiler removed and disposed of'],
      },
      {
        title: 'Bathroom fitting',
        description:
          'Full bathroom installs from first fix to final seal, including tiling, showers and wet rooms. We manage the whole job so you deal with one person.',
        icon: 'bath',
        points: ['Design and supply if you want it', 'Tiling and flooring included', 'Site left clean every evening'],
      },
      {
        title: 'General plumbing',
        description:
          'Taps, toilets, radiators, outside taps, stopcocks, washing machine and dishwasher connections, and the small jobs nobody else will come out for.',
        icon: 'wrench',
        points: ['Priced by the job, not the hour', 'Parts carried on the van', 'Honest advice on repair vs replace'],
      },
    ],
  },

  reviews: {
    title: 'What people round here say',
    intro:
      'Most of our work comes from neighbours telling neighbours. Here are a few of them.',
    items: [
      {
        quote:
          'Boiler packed in on the Sunday of the January cold snap and I had two wee ones in the house. Phoned at half eight in the morning and Ian was out by eleven. Fixed it there and then and did not charge a penny extra for the weekend.',
        name: 'Fiona M.',
        area: 'Calderwood',
        rating: 5,
      },
      {
        quote:
          'Got three quotes for a new combi and Calder & Son were not the cheapest, but they were the only ones who actually came out, looked at the whole system and explained what they were doing. Two days start to finish and the house was spotless after.',
        name: 'Derek H.',
        area: 'Stewartfield',
        rating: 5,
      },
      {
        quote:
          'They fitted our en suite and re-did the main bathroom. Ten days of work and I honestly never had to chase them once. Any wee snag I mentioned was sorted the next morning. Would not use anyone else now.',
        name: 'Anne-Marie C.',
        area: 'The Village',
        rating: 5,
      },
      {
        quote:
          'Been doing our annual service for six years. Turns up in the window he says, texts the night before, and tells you straight if something needs doing rather than inventing work. Rare enough these days.',
        name: 'Scott R.',
        area: 'Westwood',
        rating: 5,
      },
      {
        quote:
          'Radiator was leaking onto the laminate and I was in a bit of a panic. He talked me through turning the valve off on the phone before he even set off, which stopped it getting worse. Small thing but it saved the floor.',
        name: 'Jacqui B.',
        area: 'St Leonards',
        rating: 5,
      },
    ],
  },

  about: {
    title: 'A local firm, not a call centre',
    body: [
      'Calder & Son has been working out of East Kilbride since 1998. It started with Jim Calder and a van, and these days it is Jim, his son Ian, and one apprentice. That is deliberately the whole company.',
      'It means the person who quotes your job is the person who turns up to do it, and the person you phone afterwards already knows your house. There is no dispatch system, no rotating engineers, and no sales team.',
      'We work almost entirely on recommendations from customers we have already looked after, which is the only real reason to do the job properly every time.',
    ],
    highlights: [
      { value: '25+', label: 'years on the tools' },
      { value: 'Gas Safe', label: 'registered engineers' },
      { value: '3', label: 'people, start to finish' },
    ],
    // image: '/images/about.jpg',
    // imageAlt: 'Jim and Ian Calder outside the workshop in East Kilbride',
  },

  contact: {
    title: 'Get in touch',
    intro:
      'Quickest way to reach us is the phone - we answer it ourselves. If it is not urgent, leave your details below and we will come back to you the same working day.',
    /**
     * Web3Forms access key, read from the environment rather than hardcoded.
     *
     * Get a free one at https://web3forms.com - enter the address you want
     * enquiries sent to and they email you the key.
     *
     * Local dev:  put `PUBLIC_WEB3FORMS_KEY=...` in `.env` (gitignored).
     * Deployed:   set the same variable in Cloudflare Pages / Netlify settings.
     *
     * Why not just paste it here? This repo is a public template. A hardcoded
     * key would be inherited by every copy anyone makes of it, and their test
     * enquiries would arrive in your inbox. The key is not secret - it ends up
     * in the page HTML either way, which is why the `PUBLIC_` prefix is correct
     * - but it should not be in the repo.
     *
     * Unset, this falls back to an empty string, which trips the guard in
     * `src/lib/site.ts` and renders the form disabled with a visible warning.
     * A fresh copy of this template therefore fails loudly rather than
     * appearing to work while binning every enquiry.
     */
    web3formsKey: import.meta.env.PUBLIC_WEB3FORMS_KEY ?? '',

    emailSubject: 'New website enquiry - Calder & Son',
  },

  footer: {
    note: 'Demo site - built by Callum Moodie',
  },
};

export default site;
