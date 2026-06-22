# Alvex Creative — Website

A production-ready, mobile-first marketing website for **Alvex Creative**, a web design agency for local businesses.
Built with semantic HTML, modern CSS and vanilla JavaScript — no build step, no dependencies.

> **Tagline:** *Websites That Work As Hard As You Do*

---

## 1. File structure

```
Alvex Creative/
├── index.html          # Home
├── services.html       # Services (Design, Dev, SEO, Hosting, Lead Gen)
├── portfolio.html      # Portfolio — "coming soon", built to expand
├── about.html          # Story, mission, values
├── contact.html        # Free-consultation form (Formspree)
├── css/
│   └── styles.css      # Single design-system stylesheet (all pages)
├── js/
│   └── main.js         # Nav, mobile menu, scroll reveal, FAQ, form
├── robots.txt
├── sitemap.xml
└── README.md
```

Open `index.html` directly in a browser, or serve the folder with any static host.

---

## 2. Design system

| Token | Value | Use |
|-------|-------|-----|
| Ink | `#0a0a0a` | Primary text, buttons, dark sections |
| Off-white | `#f6f5f2` | Alternating section backgrounds |
| Greys | `#5f5f5c` → `#e7e5e0` | Body text, borders, muted text |
| Display font | **Space Grotesk** | Headlines |
| Body font | **Inter** | Paragraphs, UI |

Strictly monochrome — contrast and typography carry the hierarchy. Generous whitespace,
subtle hover lifts, IntersectionObserver scroll-reveals, a sticky blur nav that hides on scroll-down,
a full-screen mobile menu and an accessible FAQ accordion. All motion respects `prefers-reduced-motion`.

To re-theme, edit the CSS custom properties in the `:root` block of `css/styles.css`.

---

## 3. Logo

The navigation and footer use a **placeholder logo** — a black `A` mark plus the "Alvex Creative" wordmark.
When the final logo arrives:

- **SVG/PNG:** replace `<span class="logo__mark">A</span>` with
  `<img src="assets/logo.svg" alt="Alvex Creative" width="140" height="36">` in each page's nav and footer,
  and remove the `.logo__text`.
- Add a `favicon.ico` / `apple-touch-icon.png` to the root and link them in each `<head>`.

There are 5 nav blocks and 5 footer blocks (one per page) — update all for consistency.

---

## 4. Formspree integration (contact form)

The contact form posts via AJAX so visitors stay on the page and see inline success/error messages.

**To go live:**

1. Create a free form at <https://formspree.io>.
2. Copy your endpoint (e.g. `https://formspree.io/f/abcdwxyz`).
3. In `contact.html`, replace the placeholder in the form's `action`:
   ```html
   <form id="contact-form" action="https://formspree.io/f/your-form-id" method="POST" novalidate>
   ```
   with your real ID. Until you do, the form shows a friendly "not yet connected" notice instead of failing silently.

**Included already:**
- Fields: Name, Business name, Email, Phone, Project description (matches the brief).
- A hidden `_subject` line so enquiries are easy to spot in your inbox.
- A `_gotcha` honeypot field for spam protection.
- Labelled, `autocomplete`-enabled inputs and an `aria-live` status region for accessibility.

Email is set to `enquiries@alvexcreative.com` and phone to `07956 920810` (`+44 7956 920810` in JSON-LD,
`tel:+447956920810` for click-to-call). Keep these identical on the Google Business Profile and any directories.

---

## 5. SEO — what's done & next steps

**Already implemented**
- Unique `<title>` + meta description per page, targeting local keywords.
- Canonical URLs, Open Graph / Twitter tags, `theme-color`.
- Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`), one `<h1>` per page, logical heading order.
- `ProfessionalService` + `ContactPage` JSON-LD structured data.
- `robots.txt` and `sitemap.xml`.
- Keywords woven naturally into copy and headings: *Web Design Agency, Small Business Websites,
  Local Business Web Design, Website Development, SEO Services, Lead Generation.* (Add a town/region back in
  if you later decide to target a specific location.)
- Fast by default: no frameworks, system-friendly fonts with `preconnect`, transform/opacity-only animations.

**Before / after launch**
1. Domain is set to `https://www.alvexcreative.com/` (canonicals, OG, sitemap, robots, JSON-LD). Make sure both `www` and apex resolve via a host redirect.
2. Add a real `og:image` (1200×630) and reference it in each `<head>`.
3. Create & verify a **Google Business Profile** — the single biggest local-SEO lever; keep NAP (name, address, phone) identical to the site.
4. Submit `sitemap.xml` in **Google Search Console**; set up **Bing Webmaster Tools** too.
5. Add the business to consistent local directories (Yell, Bing Places, FreeIndex, etc.) with matching NAP.
6. Compress and serve images as **WebP** with `loading="lazy"` (the portfolio template already does this).
7. Consider a `/blog` with intent-driven posts (e.g. "How much should a tradesperson's website cost?").

---

## 6. Portfolio expansion strategy

The portfolio page is built to grow with zero redesign.

**To add a real project**, replace one `.work-card` placeholder in `portfolio.html` with the template that's
commented at the top of the portfolio grid:

```html
<a class="work-card" href="https://client-site.co.uk" target="_blank" rel="noopener"
   style="aspect-ratio:4/3;background:#fff;">
  <img src="assets/work/client.webp" alt="Homepage of Client — Web Design"
       loading="lazy" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;">
  <div class="work-card__body">
    <span class="work-card__tag"><span class="pulse"></span>Industry</span>
    <h3>Client Name</h3>
    <p>One-line result — e.g. "3× more enquiries in the first month."</p>
  </div>
</a>
```

**Recommended growth path**
1. **Capture results from day one** — screenshot the old site, agree a simple metric (calls, bookings, form fills) and record the before/after. Results sell far better than screenshots.
2. **Add case-study sub-pages** later (`portfolio/client-name.html`) using the existing section/`split` components: Challenge → Approach → Result. The "What you'll see here" section already previews this structure.
3. **Collect a testimonial** at the same time and swap it into the reserved quote cards on the home page (`#testimonials`).
4. **Keep the grid balanced** — 2 or 4 live cards read best; retire placeholders as real work lands.
5. When you have 6+ projects, add simple filter chips (Trades / Salons / Shops) above the grid.

---

## 7. Accessibility & performance checklist

- ✅ Skip-to-content link, visible focus states, keyboard-operable nav, menu and FAQ.
- ✅ Labelled form inputs, `aria-live` status, icon-only buttons have `aria-label`.
- ✅ Decorative SVGs marked `aria-hidden`; meaningful images get descriptive `alt`.
- ✅ 4.5:1+ contrast throughout the monochrome palette.
- ✅ `prefers-reduced-motion` disables reveals, marquee and hover transforms.
- ✅ Responsive at 375 / 768 / 1024 / 1440px; no horizontal scroll; 16px+ body text.

---

## 8. Quick launch checklist

- [ ] Drop in final logo + favicons (5 nav + 5 footer blocks)
- [ ] Connect Formspree endpoint in `contact.html`
- [ ] Add real email, phone and (optional) address everywhere
- [ ] Swap placeholder domain for the real one (URLs, canonicals, OG, sitemap, robots, JSON-LD)
- [ ] Add `og:image`
- [ ] Set up Google Business Profile + Search Console, submit sitemap
- [ ] Hook up real social links in the footer
```
