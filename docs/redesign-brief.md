# Samyun Wan Armenia Redesign Brief

This brief is mandatory for future redesign work. Use it together with:

- `AGENTS.md`
- `design-system/samyun-wan-armenia/MASTER.md`
- installed Codex skill `ui-ux-pro-max`

## Goal

Redesign the site so it looks premium, modern, rich, alive, professional, and trustworthy, as if handled by a top-tier design team.

The site must not feel boring, generic, or template-like. It should feel like an official wellness brand with a strong product, real credibility, tasteful nature accents, and refined motion.

## What The Site Is

Samyun Wan Armenia is not only a product landing page. It is:

- the official Armenia distributor site;
- a product showcase for weight gain and weight loss products;
- an authenticity/anti-counterfeit verification channel;
- a customer order/contact funnel;
- a multilingual trust and SEO asset.

Every design decision must support trust, clarity, ordering, and authenticity.

## Creative Direction

Use the phrase **premium botanical authority** as the mental model.

The UI should combine:

- botanical/nature atmosphere;
- official proof and verification confidence;
- premium product storytelling;
- calm healthcare-adjacent credibility;
- warm human consultation/service feeling.

It should not look like:

- a cheap supplement shop;
- a generic pharmacy template;
- a neon fitness brand;
- an overdecorated AI-style landing page;
- a plain corporate brochure.

## Recommended Look

Visual tone:

- warm ivory backgrounds;
- deep evergreen text and sections;
- sage botanical accents;
- trust-blue verification and official links;
- controlled gold accents for premium proof, ratings, seals, and highlights;
- soft natural shadows;
- subtle grain or paper/leaf texture;
- product media as the center of the design.

Use organic curves and botanical layers, but keep cards and controls disciplined with 8px or 12px radii unless there is a clear organic visual moment.

## Typography Direction

Because the site supports Armenian, Russian, and English, font choice must be language-safe.

Preferred:

- UI/body: Inter or Noto Sans Armenian.
- Headings/display: Noto Serif Armenian or another premium serif with Armenian/Cyrillic support.
- Labels: Inter Medium/SemiBold.

Do not choose a beautiful Latin-only display font if Armenian/Russian pages become visually broken.

## Animation Direction

Use animation to create life and polish, not decoration for its own sake.

Good animations:

- cinematic hero product entrance;
- slow botanical background/light movement;
- scroll reveal for sections;
- staggered benefit/product/testimonial items;
- stable product hover states;
- certificate/proof sequence reveals;
- gentle carousel transitions;
- small CTA feedback.

Technical rules:

- Prefer Framer Motion, already installed.
- Animate `transform` and `opacity`.
- Use `150-250ms` for micro-interactions.
- Use `350-600ms` for section reveals.
- Respect `prefers-reduced-motion`.
- Keep animations interruptible and non-blocking.
- Avoid large pinned-scroll experiences on mobile.

## Video And Media Direction

The redesign should include or prepare for strong visual assets:

- product pack hero image or short video;
- macro loop of product/packaging/leaves/daylight;
- certificate/official proof visuals;
- realistic botanical texture backgrounds;
- optional social proof/customer video area if real assets exist.

Rules:

- Real product must be visible early.
- Do not use dark, blurred, generic stock footage.
- Use poster images for videos.
- Compress video and provide reduced-motion fallback.
- Use `next/image` for images and reserve aspect ratios.

## Page-Level Priorities

Home page should be redesigned first.

Priority order:

1. Hero with product, official distributor signal, order CTA, verify/contact secondary CTA.
2. Trust strip: original product, Armenia official contact, QR verification, phone/WhatsApp.
3. Product showcase with rich product visuals, price, benefits, proof/warning, CTA.
4. Verification/anti-counterfeit section with certificate and QR path.
5. Benefits section with calm evidence-aware copy.
6. Official proof section: Spyur, Google Business, address, social channels.
7. Testimonials/reviews with verified feel.
8. FAQ and contact/order.

## Implementation Expectations

Future UI agents must:

- read `ui-ux-pro-max` before visual work;
- read this brief and `design-system/samyun-wan-armenia/MASTER.md`;
- inspect existing components and locale text before changing layout;
- use existing stack: Next.js, Tailwind, Framer Motion, Lucide;
- keep multilingual text and mobile layout safe;
- test mobile and desktop;
- run typecheck/lint/build when changes are significant;
- deploy only using `docs/deployment.md`.

## Do Not Do

- Do not make a generic landing page.
- Do not hide the product behind abstract decoration.
- Do not use emoji icons.
- Do not use purple AI gradients as the brand.
- Do not overuse glass blur.
- Do not create nested cards.
- Do not use animations that shift layout.
- Do not choose fonts that fail Armenian/Russian.
- Do not remove trust/verification content for aesthetics.
