# Samyun Wan Armenia Design System

> Source of truth for future UI/UX redesign work.
> Before changing UI, read this file, `docs/redesign-brief.md`, and use the installed Codex skill `ui-ux-pro-max`.

---

**Project:** Samyun Wan Armenia  
**Site:** `https://www.samyun-wan.life`  
**Stack:** Next.js 14, React, TypeScript, Tailwind CSS, Framer Motion, Lucide React  
**Product Type:** Official distributor website, wellness supplement e-commerce, authenticity verification, local trust/consultation funnel  
**Design Direction:** Premium botanical authority

---

## Brand Position

Samyun Wan Armenia must feel like an official, trusted, premium wellness brand, not a generic supplement shop.

The design should communicate:

- Official distributor in Armenia.
- Original product verification and anti-counterfeit confidence.
- Weight gain and weight loss consultation support.
- Premium natural wellness with a rich, modern visual layer.
- Human warmth, local trust, and professional healthcare-adjacent credibility.

## Visual Style

Use a hybrid style:

- **Organic Biophilic:** nature, botanical depth, calm green, real materials, subtle texture.
- **Trust & Authority:** certificates, official proof, clear contacts, verified badges, direct CTAs.
- **Premium Product Storytelling:** cinematic product hero, editorial spacing, immersive section rhythm.
- **Controlled Liquid Glass:** use glass/blur only where it improves hierarchy; never make text low contrast.

Avoid a sterile pharmacy UI and avoid loud gym/supplement aesthetics. The site should feel expensive, calm, alive, and trustworthy.

## Color System

Use a multi-accent palette. Do not make the site one-note green.

| Role | Hex | Usage |
|------|-----|-------|
| Botanical Primary | `#14532D` | Main brand surfaces, headings, trust blocks |
| Deep Evergreen | `#0C1A12` | Premium dark text, dark bands |
| Sage | `#6B8F71` | Soft nature accents, illustrations, secondary UI |
| Leaf Mist | `#EDF7EF` | Light section background |
| Warm Ivory | `#FAFAF5` | Main page background |
| Stone | `#E6E0D3` | Borders, dividers, calm neutral contrast |
| Trust Blue | `#0369A1` | Official proof, links, verification, contact confidence |
| Premium Gold | `#A16207` | Small premium accents, ratings, seals, highlights |
| Clay Warning | `#B45309` | Caution/anti-counterfeit emphasis |
| Error | `#DC2626` | Error/destructive states only |

Rules:

- Primary CTAs may use Trust Blue or Botanical Primary depending on section context.
- Gold is an accent, not a background theme.
- Nature colors should be balanced with ivory, stone, and deep evergreen for a premium look.
- Every foreground/background pair must meet WCAG AA contrast.
- Define semantic CSS variables; avoid raw hex values inside components.

## Typography

The site is multilingual: Armenian, Russian, and English. Typography must support all three well.

Recommended direction:

- **Body/UI:** Inter or Noto Sans Armenian, 16px minimum.
- **Display/Headings:** Noto Serif Armenian or another serif with Armenian/Cyrillic support; use a premium serif only if it supports the locale being rendered.
- **Labels/metadata:** Inter Medium/SemiBold, uppercase only sparingly.

Rules:

- Do not use a luxury Latin-only font for Armenian/Russian headings.
- Keep body line-height around `1.55-1.7`.
- Hero headings can be editorial, but compact UI headings must stay tight and readable.
- Prices and phone numbers should use tabular figures where possible.

## Layout Principles

- Hero must make the product and brand obvious in the first viewport.
- Do not create a generic marketing landing page. Show the actual product, official proof, and order path.
- Prefer full-width bands and unframed layouts. Use cards only for repeated items, product tiles, testimonials, and modals.
- Avoid cards inside cards.
- Maintain consistent desktop max-width (`max-w-6xl`/`max-w-7xl`) and mobile gutters.
- Mobile first: no horizontal scroll, no text overflow, no hidden CTAs.
- Every major page section needs a clear job: trust, product choice, verification, benefit, proof, social proof, contact.

## Motion System

Use Framer Motion first, because it is already installed.

Motion should make the site feel alive, not noisy:

- Micro-interactions: `150-250ms`, ease-out, opacity/transform only.
- Section reveals: `350-600ms`, small `y: 12-24`, stagger `0.03-0.08`.
- Hero product motion: slow float/tilt/parallax, subtle and interruptible.
- Parallax: background/nature layers only, never body text or controls.
- Use one immersive motion moment per page, not everywhere.
- Respect `prefers-reduced-motion`.
- Never animate width/height/top/left when transform can do the job.
- Do not block user input during animations.

Good motion ideas:

- Product pack gently settles into hero on load.
- Leaf/light texture moves subtly behind the product.
- Certificate/official proof cards reveal as a trust sequence.
- Product cards have stable hover lift, glow, and CTA reveal without layout shift.
- Testimonials carousel uses smooth fade/slide with clear controls.

Avoid:

- Excessive pinned scroll sections on mobile.
- Text split animation for long Armenian/Russian copy.
- Decorative motion that distracts from ordering or verification.
- Slow animations above `700ms`.

## Media Direction

The redesign needs real visual assets.

Preferred media:

- Real product pack photos on clean natural backgrounds.
- Macro video loop: product, leaves, soft daylight, hands, packaging details.
- Certificate/official proof imagery.
- Subtle botanical texture overlays, not generic stock backgrounds.
- Short muted hero video with poster image, WebM/MP4, compressed and lazy-loaded when not critical.

Rules:

- Do not use dark, blurred, anonymous stock imagery.
- Do not use decorative SVG-only hero art when real/generated bitmap product media would communicate better.
- Use `next/image` for images and reserve dimensions/aspect ratios to prevent layout shift.
- Any video must have a poster, reduced-motion fallback, and not hide the product.

## Section Priorities

Recommended home flow:

1. **Hero:** product-first cinematic hero, official distributor signal, main CTA, secondary verification/contact CTA.
2. **Trust Strip:** official distributor, QR verification, phone/WhatsApp, Armenia/Yerevan proof.
3. **Products:** weight gain and weight loss products with clear price, benefits, warning against fakes, order CTA.
4. **Verification:** QR/authenticity explanation with certificate and anti-counterfeit visual language.
5. **Benefits:** calm, evidence-aware benefit grid; no exaggerated medical claims.
6. **Official Proof:** Spyur/Google/social/contact credentials, certificate, address/hours.
7. **Testimonials:** verified customer stories, ratings, before/after only if legally and ethically safe.
8. **FAQ:** practical, trust-building answers.
9. **Contact/Order:** low-friction order/contact section with phone, WhatsApp, Messenger, Telegram.

## Component Rules

- Buttons: minimum 44px height, visible focus, icon + label when useful, no text overflow.
- Product cards: stable dimensions, clear image area, price, warning/proof, CTA.
- Navigation: predictable, no overloaded visual effects, active state obvious.
- Mobile nav: fast, clear, thumb-friendly, no hidden primary order/contact action.
- Forms/modals: visible labels, loading/success/error feedback, close/escape route.
- Icons: Lucide React only unless a stronger official icon is required; no emojis as structural icons.

## Anti-Patterns

Do not use:

- Purple/blue AI gradients as the main identity.
- Beige-only, green-only, or dark-slate-only palettes.
- Generic supplement/gym neon design.
- Heavy glassmorphism behind body text.
- Nested cards and decorative card-heavy layouts.
- Random shadows, random radii, random gradients.
- Hover-only interactions.
- Missing focus rings.
- Text smaller than 16px for body content on mobile.
- Animation that causes layout shift or hides content from SEO/no-JS users.

## Validation Checklist

Before delivering UI work:

- Run `npm run typecheck`.
- Run `npm run lint`.
- Run `npm run build` for broad UI changes.
- Verify responsive layouts at `375`, `768`, `1024`, and `1440` widths.
- Check no horizontal scroll on mobile.
- Check text contrast and visible focus states.
- Check `prefers-reduced-motion`.
- Check all major images have meaningful `alt`.
- Check live-like product images/video do not break layout or performance.
