# Trades site starter

A reusable Astro template for small local-business marketing sites - plumbers,
joiners, barbers, salons. One page, config-driven, static, and fast enough to
score 95+ on Lighthouse without any tuning.

The demo it ships with is a fictional plumbing firm, **Calder & Son Plumbing and
Heating** in East Kilbride.

**The whole point:** a new client is a repo duplicate and one edited file.

---

## Requirements

- **Node 22.12 or newer.** Astro 7 enforces this and will refuse to run on older
  versions. Check with `node --version`. If you use nvm: `nvm install 22.20.0`
  then `nvm use 22.20.0`.

## Running it

```bash
npm install
```

```bash
cp .env.example .env
```

```bash
npm run dev
```

Then open <http://localhost:4321>. The contact form stays disabled until you put
a Web3Forms key in `.env` — see [Wiring up the contact form](#wiring-up-the-contact-form).

| Command           | Does                                                     |
| ----------------- | -------------------------------------------------------- |
| `npm run dev`     | Dev server with hot reload                                |
| `npm run build`   | Static build into `dist/`                                 |
| `npm run preview` | Serve `dist/` locally - check this before every deploy    |
| `npm run check`   | Type-check everything, including `site.config.ts`         |

---

## New client in four steps

### 1. Duplicate

Copy the folder (or use it as a GitHub template), then:

```bash
rm -rf .git && git init
```

Each client gets its own repo. They're a few hundred KB and it means a change for
one client can never break another.

### 2. Edit `site.config.ts`

This is the only file needing to be edited. It holds the business name, phone,
email, address, opening hours, service areas, the services list, the reviews, the
colour palette, and the Web3Forms key.

Work top to bottom. Every field has a comment explaining what it's for. If you
mistype a field name or forget a required one, `npm run check` tells you rather
than the site silently rendering a blank section.

**Demo mode.** Set `demo.enabled` to `false` for a real client. See
[Demo mode](#demo-mode) - it is on by default in this repo, because what ships
here is a demo.

**Colours.** The `theme` block drives everything. There are three ready-made
palettes in the comments there (petrol/copper for the plumbing demo, walnut/brass
for a joiner, ink/rose for a salon) - paste one over the top and the entire site
re-skins. If you invent your own, keep these pairs at 4.5:1 or better:

| Pair                        | Where it shows up                    |
| --------------------------- | ------------------------------------ |
| white on `primary`          | Hero, buttons, reviews band, footer  |
| `ink` on `accentSurface`    | Call buttons                         |
| `accentText` on white       | Tick icons, required-field markers   |
| `muted` on white            | All secondary body copy              |

Check them at [WebAIM contrast checker](https://webaim.org/resources/contrastchecker/).

**Motif.** `theme.motif` picks the divider drawn between sections: `'pipe'`,
`'chevron'`, `'wave'`, `'rule'` or `'none'`. It's inline SVG that inherits the
accent colour, so it re-themes for free.

### 3. Swap the photos

See [`public/images/README.md`](public/images/README.md) for the slots, the
dimensions, and how to compress properly.

**The site is designed to look finished with no photos at all** - the hero falls
back to a branded pattern and the About section to a stats panel. Launch without
photography and add it later; nothing will look half-built in the meantime.

The favicon is generated from the business name and brand colours automatically.
Drop a real `public/favicon.svg` in when the client has a logo and it takes over.

### 4. Deploy

See [Deploying](#deploying) below.

---

## Demo mode

For portfolio pieces built around a **fictional** business - like the Calder & Son
demo this repo ships with.

```ts
demo: {
  enabled: true,
  notice: 'Calder & Son is a fictional business. This is a demo site showing what a finished job looks like.',
},
```

With it on:

- every page emits `noindex, nofollow`
- `robots.txt` becomes `Disallow: /` and the sitemap lists nothing
- the `LocalBusiness` structured data is **omitted entirely**
- a notice bar renders above the header

### Why this matters more than it sounds

A demo site isn't just marketing copy - it's a fictional local business with an
address, a postcode, opening hours, trade credentials and reviews, in a format
search engines are specifically built to ingest. Left indexable, the Calder demo
would put a plumbing firm that doesn't exist, with a fabricated Gas Safe
registration and five fabricated reviews, into local search results for a real
town in South Lanarkshire.

Nobody's being harmed by a clearly-labelled demo, but there's no upside to it
being crawled and a real downside if it is. Falsely claiming Gas Safe
registration is taken seriously in the UK, and fake reviews fall under the
DMCC Act. You're sending the link to prospects directly, so indexing buys you
nothing anyway.

The structured data is the sharp end of it: `noindex` is a request, but JSON-LD
is a machine-readable assertion that this business exists. Demo mode drops it.

### Turning it off

`enabled: false` for every real client site. It's a **required** field rather
than an optional one on purpose - forgetting it fails silently and in the wrong
direction, so the type system makes you say which one you meant.

---

## Wiring up the contact form

The form posts straight to [Web3Forms](https://web3forms.com), which emails the
enquiry on. It's free, needs no account, and - importantly - no backend, which is
what keeps this a purely static site.

1. Go to <https://web3forms.com>.
2. Enter the address the client wants enquiries sent to.
3. They email you an access key (a UUID).
4. Put it in your environment, **not** in `site.config.ts`:

```bash
cp .env.example .env
```

Then set the value in `.env`:

```
PUBLIC_WEB3FORMS_KEY=a1b2c3d4-0000-0000-0000-abcdef123456
```

5. When you deploy, set the same variable in your host's dashboard —
   Cloudflare Pages under **Settings → Environment variables**, Netlify under
   **Site settings → Environment variables**.

**Until you do this, the form is deliberately disabled** and shows a warning
banner. That's a guard, not a bug: shipping a form that looks like it works but
silently bins every enquiry is the worst possible failure on a client site, so
the template makes it impossible.

### Why the key lives in the environment

It isn't a secret — the key ends up in a hidden field in the page HTML no matter
what you do, which is why the `PUBLIC_` prefix is correct and required. Astro
only exposes prefixed variables to the built output.

The reason to keep it out of the repo is different: this is a **public template**.
A hardcoded key would be inherited by every copy anyone makes, and their test
submissions would land in your inbox. `.env` is gitignored; `.env.example`
is committed and documents what to set.

If a key ever does get abused, generate a new one at web3forms.com — there's
nothing to revoke, you just stop using the old one.

### After you set the key

1. Set `url` at the top of `site.config.ts` to the real deployed URL. The form's
   success redirect is built from it.
2. Deploy, then **submit the form yourself** and confirm the email arrives.
   Do this on every single client site. It takes thirty seconds.
3. Tell the client to check their spam folder for the first one.

### "It redirected to web3forms.com/success instead of /thanks"

Expected, if you were testing anywhere other than the live domain.

Web3Forms' free plan only honours the `redirect` field when the target is on the
**same domain the form was submitted from** - cross-domain redirects require a
paid plan. When they don't match it silently ignores the field and shows its own
success page.

| Submitting from        | Redirect works?                                  |
| ---------------------- | ------------------------------------------------ |
| `localhost:4321`       | No - different domain, and `redirect` must be https |
| `*.pages.dev` preview  | No - different domain from `site.url`            |
| the domain in `site.url` | Yes                                            |

So test the redirect on the live domain, and make sure `site.url` matches the
domain you're actually serving from, exactly. If you deploy a client to their
`*.pages.dev` URL before the custom domain is wired up, set `site.url` to the
`pages.dev` address in the meantime and it'll behave.

Nothing is lost when it falls back - the enquiry is still delivered. It's only
the landing page that differs.

### What the client receives

Name, phone, email, postcode, which service they picked, and their message. The
service dropdown is generated from your `services.items`, so it always matches
what the page offers.

There's a hidden honeypot field that catches most bots. If a client starts
getting spam anyway, turn on Web3Forms' built-in captcha from their dashboard.

---

## Deploying

The build is plain static HTML - no adapter, no server, no environment variables.
Both hosts below detect Astro and need nothing configured.

### Cloudflare Pages

1. Push the repo to GitHub.
2. Cloudflare dashboard -> **Workers & Pages** -> **Create** -> **Pages** ->
   **Connect to Git**, and pick the repo.
3. Build settings - Cloudflare usually pre-fills these correctly:

   | Setting                | Value           |
   | ---------------------- | --------------- |
   | Framework preset       | Astro           |
   | Build command          | `npm run build` |
   | Build output directory | `dist`          |

4. **Add an environment variable: `NODE_VERSION` = `22.20.0`.** Cloudflare's
   default Node is usually older than Astro 7 requires and the build will fail
   with an engine error without this. This is the one setting people get caught
   by.
5. **Save and Deploy.**

You get a `*.pages.dev` URL immediately. Every push to `main` redeploys, and
pull requests get their own preview URL - handy for showing a client a change
before it goes live.

**Custom domain:** Pages project -> **Custom domains** -> **Set up a domain**. If
the domain's nameservers are already on Cloudflare it's automatic. If not,
you'll add a CNAME at the current registrar. HTTPS is issued automatically
either way.

This works for a subdomain of a domain whose apex points somewhere else - the
Calder demo lives at `calder.callummoodie.xyz` while `callummoodie.xyz` itself
stays on Vercel. You add one CNAME for the `calder` subdomain pointing at the
`.pages.dev` target, and the apex is untouched.

Then go back and update `url` in `site.config.ts` to the real domain and
redeploy, so canonical tags, the sitemap and the form redirect all point at it.

### Netlify

Same idea: connect the repo, build command `npm run build`, publish directory
`dist`, and set `NODE_VERSION` to `22.20.0` under **Site settings -> Environment
variables**.

### Both

`public/_headers` ships security headers and cache rules, and both platforms read
it from the site root automatically. Astro writes `dist/404.html`, which both
serve for unknown paths. Nothing else to configure.

---

## How it's put together

```
site.config.ts              <- the only per-client file
astro.config.ts             <- reads site.url from the config; never edit per client
public/
  _headers                  <- security + caching, read by CF Pages and Netlify
  images/                   <- client photos (see the README in there)
src/
  lib/
    config-types.ts         <- the shape of site.config.ts
    site.ts                 <- derived values (tel: link, config guards)
  layouts/
    BaseLayout.astro        <- <head>, SEO, structured data, theme injection
  components/
    Header.astro            <- sticky nav + call button + mobile menu
    DemoNotice.astro        <- the visible half of demo mode
    Hero.astro
    Services.astro
    Reviews.astro
    About.astro
    ContactForm.astro
    Footer.astro
    Button.astro            <- shared button/link
    Icon.astro              <- inline SVG icons, no icon library
    SectionDivider.astro    <- the themeable motif
  pages/
    index.astro             <- composes the sections, contains no content itself
    thanks.astro            <- where the form redirects on success
    404.astro
    robots.txt.ts           <- generated from the config
    sitemap.xml.ts          <- generated from the config
    favicon.svg.ts          <- monogram generated from the config
  styles/
    global.css              <- Tailwind import, theme mapping, base styles
```

### The pattern to understand

Components never contain content and never contain hex colours. They import
`site` from the config and read from it. That's what makes "edit one file" true
rather than aspirational - there is nowhere else for client-specific detail to
hide.

Colours flow like this:

```
site.config.ts (theme.primary: '#0E3A47')
  -> BaseLayout writes :root { --brand-primary: #0E3A47 } into <head>
    -> global.css maps --color-primary -> var(--brand-primary)
      -> components use `bg-primary`, `text-primary`
```

Everything in an Astro `---` frontmatter block runs **at build time**, on your
machine, and never reaches the browser. That's why reading a big config object on
every component costs nothing - by the time a visitor loads the page it's all
plain HTML.

---

## Performance and accessibility

Both are properties of how it's built, not settings you switch on. If you extend
the template, these are the things not to break.

**Zero JavaScript ships by default.** `dist/` contains no `.js` files at all. The
only script is ~15 lines inlined into the HTML that close the mobile menu on link
click and Escape - and the menu is a native `<details>` element, so it opens,
closes and works by keyboard perfectly well without it.

The page is roughly **15 KB gzipped in total**. No webfonts (system font stack,
so text paints immediately and nothing shifts), no icon library, no analytics, no
cookie banner.

**Accessibility built in:** skip link, semantic landmarks, correct heading order
(one `h1`, sections as `h2`, cards as `h3`), labels on every form field, visible
focus rings on everything, `aria-label` on every phone link so screen readers
announce the number, decorative SVG hidden from assistive tech, and a
`prefers-reduced-motion` block.

### If needing to add things

- **Adding a webfont** costs you a request and usually some layout shift. Think
  about whether the client actually needs one.
- **Adding analytics** - use something cookieless (Cloudflare Web Analytics is
  free and needs no banner). Google Analytics means you now owe the client a
  cookie consent banner, which is more JavaScript and a worse experience.
- **Adding an embedded map** - an iframe map is typically 500 KB+ and will visibly
  dent the Lighthouse score. A linked static image, or just the address as text,
  is almost always better.
- Re-run Lighthouse against `npm run preview` (not `npm run dev` - the dev
  server is unoptimised and will score badly for reasons that don't apply in
  production).

---

## Adding a second page

Trades sites usually stay one page, but if a client wants "Prices" or "Areas we
cover":

1. Create `src/pages/prices.astro`.
2. Wrap it in `BaseLayout` and include `<Header />` and `<Footer />` - copy
   `src/pages/thanks.astro` as a starting point.
3. Add `{ label: 'Prices', href: '/prices' }` to `nav` in `site.config.ts`.
4. Add `'/prices'` to the `pages` array in `src/pages/sitemap.xml.ts`.

Astro routes by filename. There's no router to configure.
