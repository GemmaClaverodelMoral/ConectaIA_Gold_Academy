# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**ConectaIA Gold Academy Landing Page** — A Spanish-language conversion-focused landing page targeting seniors and non-technical users. The goal is to teach digital autonomy with patience and no jargon.

**Tech Stack:**
- Vanilla HTML5, CSS3, and JavaScript (no frameworks)
- Three.js for animated background waves
- SweetAlert2 for modal dialogs
- n8n webhook for form submission
- Responsive design optimized for accessibility (presbyopia-friendly: large fonts, high contrast)

**Key Philosophy:**
- Large typography (base 20px, h1 2.8rem) for readability
- High contrast color scheme (`#FDFBF7` cream background with dark text)
- Zero external dependencies beyond libraries loaded from CDN
- Vanilla JS for simplicity and control

## Project Structure

```
landing_vcl/
├── index.html              # Main page (356 lines) — structure & semantic HTML
├── style.css               # All styling (947 lines) — Tailwind-like utility approach
├── script.js               # Logic (290 lines) — form handling, scroll reveal animations
├── aviso-legal.html        # Legal notice page
├── politica-privacidad.html # Privacy policy page
├── politica-cookies.html    # Cookie policy page
├── terminos-condiciones.html # Terms & conditions page
├── logos/                  # Brand assets (PNG, transparent backgrounds)
│   ├── ConectaIA sin fondo.png
│   ├── ConectaIA Gold Academy sin fondo Gold en amarillo.png
│   └── ICONO_CIA.png
└── directivas/             # (Reserved for future use or CDN-hosted directives)
```

## Key Architecture Decisions

### 1. Form & Webhook Integration
- Form collects: `name`, `email`, `consent` checkbox
- Submits to n8n webhook: `https://n8n.conectaia.cloud/webhook/d7a84d3a-2854-4793-affa-5c1b3324af03`
- Uses `await Swal.fire()` to ensure modal closes before button re-enables (prevents accidental double-submits)
- Error handling with fallback message directing users to WhatsApp
- **Important:** The checkbox validation must be explicit — `setCustomValidity()` is required because HTML5 `required` on checkboxes doesn't provide user-friendly messaging

### 2. Scroll Reveal + Stagger Animations
- Uses Intersection Observer (two separate observers):
  - **Section observer** (`.reveal` class): Toggles `active` class when section enters/exits viewport
  - **Item observer** (`.stagger-item` class): Animates individual elements with configurable delay (`--stagger-delay` CSS variable)
- Animations are **reversible** — elements reset on scroll-out for re-animation on scroll-back (intentional for accessibility)
- Threshold: `0.1`, root margin: `0px 0px -40px 0px` (triggers slightly before section fully visible)

### 3. Animated Background (Three.js)
- Canvas element (`#waves-canvas`) in hero section
- Generates procedurally animated waves using Three.js geometry
- Runs only if canvas is supported; degrades gracefully (page still works without it)
- **Note:** Three.js is loaded from CDN — if CDN is down, site still displays (no JS error thrown)

### 4. Legal & Accessibility
- All pages include required links: privacy policy, terms, cookie policy, legal notice
- GDPR/CCPA consent checkbox on form (required for submission)
- WhatsApp link in footer: `https://wa.me/573208347273`
- Contact emails: `conectaia.empresarial@gmail.com` and `gemmaclaverodelmoral@gmail.com`
- WCAG compliance focus: large fonts, high contrast, semantic HTML, ARIA labels on form

## Common Development Tasks

### Testing the Form Submission
1. Open DevTools → Network tab
2. Fill form and submit
3. Watch for POST request to n8n webhook
4. Verify response is 200 OK before SweetAlert fires
5. **To test without internet:** Modify webhook URL temporarily to a local endpoint or disable form to test animations only

### Updating Copy/Text
- All text is in `index.html` — no separate content files
- Sections are clearly marked with comments: `<!-- SECTION N: Description -->`
- Keep text concise; the CSS will handle reflow with large fonts
- When adding new sections: always include `.reveal` class on section and `.stagger-item` on child elements for consistency

### Modifying Colors
- **Primary colors** in CSS `:root` variables:
  - `--bg-primary`: `#FDFBF7` (cream, very light)
  - `--bg-dark`: `#0A1128` (navy, for hero/footer contrast)
  - `--accent-blue`: `#007BFF`
  - `--neon-highlight`: `#00E5FF` (cyan accent)
- **Always test contrast ratios** — accessibility is non-negotiable for this audience (seniors with presbyopia)

### Adding New Pages
1. Create new `.html` file in root
2. Include the same header structure (fonts, SweetAlert2, Three.js if needed)
3. Link from main page and footer
4. Update footer nav links if it's a primary page

### Testing Animations Locally
- Most animations use CSS (`@keyframes`) and Intersection Observer
- To disable animations temporarily for debugging: Add `animation: none !important;` to body
- To test stagger delays: Modify `--stagger-delay` variable in CSS or browser DevTools

## Git & Deployment Notes

- **Branch strategy:** Use `main` as the production branch
- **Before committing:** Verify no hardcoded URLs point to dev/staging environments
- **Webhook URL:** Currently hardcoded in `script.js` — consider moving to environment variable if deploying to CI/CD
- **CDN links:** All external libraries (Three.js, SweetAlert2, Google Fonts) are pinned to specific versions — update if needed, but test first
- **Static hosting:** This is a pure static site — can be deployed to any CDN (Netlify, Vercel, GitHub Pages, etc.)

## Performance & Browser Support

- **No build step required** — files are served as-is
- **Browser support:** Modern browsers (Chrome, Firefox, Safari, Edge) with fallback for older browsers
  - Three.js animations skip on unsupported browsers (graceful degradation)
  - Intersection Observer is widely supported; no polyfill needed
- **Page size:** ~1.6KB HTML + 947KB CSS + 290KB JS (all inline, no separate requests except CDN libraries)
- **Optimization:** Consider minifying before final deployment; currently unminified for debugging

## Contact & Stakeholder Info

- **Business Owner:** ConectaIA Gold Academy
- **Primary Contact Channels:**
  - WhatsApp: `+57 320 834 7273`
  - Email: `conectaia.empresarial@gmail.com`, `gemmaclaverodelmoral@gmail.com`
- **Target Audience:** Spanish-speaking seniors (55+) with limited digital literacy
- **Brand Colors:** Gold accents (see logos), navy blue, cream background

## When Modifying This Project

1. **Always preserve accessibility first** — large fonts, high contrast, simple language
2. **Test on mobile & tablet** — layout must stack gracefully
3. **Test form submission end-to-end** — mock the webhook if needed
4. **Keep animations subtle** — no motion sickness triggers; respect `prefers-reduced-motion`
5. **Update CLAUDE.md** if architecture or key decisions change
