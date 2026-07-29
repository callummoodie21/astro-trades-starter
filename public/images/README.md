# Photos

Drop client photos in this folder, then point at them from `site.config.ts`.
Anything in `public/` is copied to the site root as-is, so a file saved here as
`hero.jpg` is referenced as `/images/hero.jpg`.

The site is built to look finished **without any photos at all** - the hero
falls back to a branded pattern and the About section falls back to a stats
panel. So you can launch on day one and add photography later without the site
ever looking half-built.

## Slots

| Config field   | Path to use          | Size (px)   | Notes                                        |
| -------------- | -------------------- | ----------- | -------------------------------------------- |
| `hero.image`   | `/images/hero.jpg`   | 1920 × 1080 | Sits under a dark scrim. Keep the subject off-centre-left so the headline doesn't cover it. |
| `about.image`  | `/images/about.jpg`  | 1200 × 900  | 4:3. A photo of the actual people beats a stock van every time. |

To enable one, uncomment the pair of lines in the relevant section of
`site.config.ts`:

```ts
hero: {
  // ...
  image: '/images/hero.jpg',
  imageAlt: 'Ian Calder servicing a boiler in a domestic kitchen',
},
```

`imageAlt` is not optional in practice - if a photo carries meaning, describe it.
If it is purely decorative (most hero backgrounds are, because the headline says
everything), pass an empty string and screen readers will skip it.

## Before commiting a photo

Phone cameras produce 4–8 MB files. Uploading one of those straight into `public/`
is the single easiest way to lose the 95+ Lighthouse score.

1. **Resize** to the dimensions in the table above. No wider than 1920px, ever.
2. **Convert to WebP** - usually 25–35% smaller than JPEG at the same quality.
   [Squoosh](https://squoosh.app) does both steps in the browser, free.
3. **Aim for under 200 KB** for the hero, under 120 KB for anything else.

## Favicon

There's no file here - `src/pages/favicon.svg.ts` generates a monogram from the
business name and brand colours at build time. When a client has a real logo,
save it as `public/favicon.svg` and it'll take over automatically (a static file
in `public/` beats the generated route).
