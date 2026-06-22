# Alvex Creative — Website

Marketing website for **Alvex Creative**, a Leicestershire web design agency helping local
businesses win more customers online. Built as a fast, mobile-first **static site** — semantic
HTML, one CSS file, and a little vanilla JavaScript. No framework, no build step, no dependencies.

> **Tagline:** *Websites That Work As Hard As You Do*
> **Live domain:** alvexcreative.com · **Repo:** github.com/Alvexcreative/Alvex-creative-website-

---

## Tech stack

- **HTML** — five hand-written, semantic pages
- **CSS** — a single design-system stylesheet (`css/styles.css`), CSS custom properties, no preprocessor
- **JavaScript** — one vanilla file (`js/main.js`): sticky nav, mobile menu, scroll reveals, FAQ accordion, AJAX contact form
- **Fonts** — Google Fonts: Space Grotesk (display), Inter (body), JetBrains Mono (labels)
- **Forms** — [Formspree](https://formspree.io) (no backend needed)

---

## Project structure

```
.
├── index.html          # Home
├── services.html       # Services (Design, Dev, SEO, Hosting, Lead Gen)
├── portfolio.html      # Portfolio — "coming soon", built to expand
├── about.html          # Story, mission, values
├── contact.html        # Consultation form (Formspree)
├── 404.html            # Custom not-found page (noindex)
├── css/
│   └── styles.css      # Whole design system — shared by every page
├── js/
│   └── main.js         # Nav, mobile menu, scroll reveal, FAQ, contact form
├── assets/
│   ├── logo.svg        # Brand lockup (gradient "A" + wordmark)
│   ├── og-image.jpg    # 1200×630 social share image
│   ├── landing-bg.jpg  # Home hero background
│   └── pages-bg.jpg    # Inner-page background
├── robots.txt
└── sitemap.xml
```

---

## Run it locally

It's a static site, so either:

```bash
# Option 1 — just open it
open index.html            # (or double-click the file)

# Option 2 — serve it (nicer; lets the JS fetch work as in production)
python -m http.server 5510
# then visit http://localhost:5510
```

---

## Design

A **dark, holographic glassmorphism** theme.

| Token | Value | Use |
|-------|-------|-----|
| Base | `#070a14` | Page background (space-indigo) |
| Gradient | `#22D3EE → #6366F1 → #A855F7 → #EC4899` | Accents, buttons, logo, glass-card glow |
| Text | `#E9EDF8` / muted `#9AA2BD` | Body / secondary text |
| Display | **Space Grotesk** (uppercase titles) | Headlines |
| Body | **Inter** | Paragraphs, UI |
| Mono | **JetBrains Mono** | `// LABEL` eyebrows, tags, data |

Signature touches: an aurora gradient backdrop, glass cards with a gradient hairline that lights up on
hover, a floating glass nav pill inside a full-width frosted band, a looping image background that's sharp
in the hero and blurs below the fold, and per-section blur variation. All motion respects
`prefers-reduced-motion`. To re-theme, edit the custom properties in the `:root` block of `css/styles.css`.

---

## Contact form (Formspree)

The form submits via AJAX (visitors stay on the page and get inline success/error messages). It is
**connected and live** — endpoint `https://formspree.io/f/mrewgdbj`, sending to
`enquiries@alvexcreative.com`.

Included: Name, Business name, Email, Phone, Project description · a hidden `_subject` line · a `_gotcha`
honeypot for spam · labelled, `autocomplete`-enabled inputs · an `aria-live` status region.

---

## SEO

Targeted at **local search in Leicestershire**. Implemented:

- Unique `<title>` + meta description + keywords per page (Leicestershire-focused)
- Canonical URLs · Open Graph + Twitter tags · `og:image` (1200×630) with dimensions/alt · `theme-color`
- `robots` meta (`max-image-preview:large`) · SVG favicon
- Structured data: `ProfessionalService` (LocalBusiness-style, area served = Leicestershire) + `FAQPage` + `WebSite`
- `robots.txt` + `sitemap.xml`
- Semantic landmarks, one `<h1>` per page, logical heading order
- Fast by default: compressed images, hero-image `preload`, `preconnect` fonts, transform/opacity-only motion

A guarded **GA4** snippet sits in every `<head>` — paste your Measurement ID over `G-XXXXXXXXXX` to
activate (it makes no network requests until you do).

---

## Deploying

Any static host works (Netlify, Vercel, Cloudflare Pages, traditional shared hosting). Because the code
already lives on GitHub, the easiest free route is **GitHub Pages**:

1. **Settings → Pages → Deploy from a branch → `main` / `/ (root)`**.
2. Add **alvexcreative.com** as the custom domain and set the DNS records at your registrar.
3. GitHub provisions free HTTPS.

> After launch: ensure both `www` and the apex resolve, verify the site in **Google Search Console** and
> submit `sitemap.xml`, and finish the **Google Business Profile** (keep name/phone identical to the site).

---

## Status

**Done** — design, copy, mobile-responsive layout, Leicestershire SEO + structured data, real logo,
domain/email/phone, live Formspree form, favicon, og-image, 404 page.

**Remaining**
- [ ] Go live: point `alvexcreative.com` at hosting (GitHub Pages is an option) + DNS
- [ ] Paste real **GA4** Measurement ID to switch analytics on
- [ ] Real **footer social links** (then add `sameAs` to the schema)
- [ ] Finish **Google Business Profile** (created, awaiting approval) + Search Console
- [ ] Add real **portfolio projects** + **testimonials** (templates are ready)
- [ ] Optional: a `/blog` for ongoing content SEO

---

## Adding a portfolio project

The portfolio grid is built to expand with no redesign — replace one `.work-card` placeholder in
`portfolio.html` with the template commented at the top of that file (a linked card with a screenshot,
industry tag, client name and one-line result). Collect a testimonial at the same time and drop it into the
reserved quote cards on the home page (`#testimonials`).

---

## Accessibility

- Skip-to-content link, visible focus states, keyboard-operable nav, menu and FAQ
- Labelled form inputs, `aria-live` status, `aria-label` on icon-only buttons
- Decorative SVGs marked `aria-hidden`; meaningful images have descriptive `alt`
- `prefers-reduced-motion` respected (the decorative marquee is the one intentional exception)
- Responsive with no horizontal scroll; 16px+ body text on mobile
