# SEO & Technical Improvements — Samyun Wan Armenia Official Site

## What Was Changed
- Added or verified full OpenGraph, Twitter, canonical, and robots meta for all localized, main, and legal pages.
- Provided localized, concise meta descriptions emphasizing “official distributor”, authenticity, and Armenian delivery.
- Structured data (JSON-LD) output for Organization, Product, FAQ, and Website schema on all main and product pages.
  - **TODOs remain for official logo image, phone number, and social links — see below!**
- All images are loaded via component with mandatory descriptive alt.
- Language and accessibility best practices (h1/h2/h3 structure, aria-labels, dynamic <html lang>). 
- Preconnect and lazy loading for performance; Netlify caching and headers are leveraged.
- Canonical redirect rules added to Netlify for HTTPS and trailing slash consistency.
- `sitemap.xml` and `robots.txt` are exhaustive and referenced from the root.

## Manual Steps Required
1. **Google Search Console**
    - Add and verify domain at https://search.google.com/search-console (HTML tag or file method, already partially present)
    - Submit updated sitemap.xml: `/sitemap.xml`
    - Use URL Inspection tool for critical and recent pages (`/`, `/hy`, `/privacy`, `/products`, `/testimonials` etc) then click “Request Indexing”
2. **Google My Business (GMB)**
    - Claim or create a business profile that matches the site’s business name, phone, and address
    - Link to your site and verify with Google’s postcard/phone process
3. **Schema/Structured Data Test**
    - Use [Google Rich Results](https://search.google.com/test/rich-results) and [Schema Validator](https://validator.schema.org/) on every important page
    - Confirm there are no warnings for Organization, Product, FAQ
    - Fix any flagged missing fields (logo, phone, social) and update code/structured data accordingly — see TODO below
4. **Reindexing After Deployment**
    - After deploying new code, repeat Search Console “Request Indexing” for all key URLs

## Performance (Core Web Vitals / Lighthouse)
- **Preconnect** for Google Fonts and critical assets; all images use `loading="lazy"` or eager when appropriate
- **Compression**: Netlify does Brotli/gzip automatically
- **Critical CSS**: Provided by Next.js + Tailwind; for true inline critical-CSS, use a plugin or SSR tool (see Next.js perf docs)
- **JS Defer**: All non-critical scripts (e.g., analytics) should use ‘defer’; further review for render-blocking in production

**Scores Before / After (fill in after Lighthouse run):**
```
| Device   | Perf | Acc | Best Pract | SEO |
|----------|------|-----|-----------|-----|
| mobile   |      |     |           |     |
| desktop  |      |     |           |     |
```
_TODO: Run complete Lighthouse tests before launch!_


## Remaining TODOs — Official Data to Confirm
- [ ] **Logo**: Provide/confirm a PNG or SVG logo hosted at `/logo.png` (currently using og-image or preview box if not supplied)
- [ ] **Phone Number**: Is `+37495653666` the only official contact? Update everywhere if not.
- [ ] **Social URLs**: Only list Facebook/Instagram/Telegram that you actually control. Remove or correct as appropriate in `/src/utils/structuredDataUtils.ts`.
- [ ] **Business Registration**: If available, add LegalEntity/Registration fields to Organization schema.

For questions or edits, reference the code comments marked with `TODO` for items that need your data or legal review before push to production.
