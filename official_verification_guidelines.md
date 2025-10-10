# Official Verification Guidelines for Samyun Wan Armenia

## 1. Google Search Console (GSC) Verification
- Go to https://search.google.com/search-console/
- Click ‘Add Property’ > enter `https://samyunwanarmenia.netlify.app/` as the canonical URL
- Choose verification method:
  - **HTML File**: If possible, upload the verification HTML (googleae71d8a26990efe6.html is already set).
  - **Meta Tag**: Check `<meta name="google-site-verification">` is present (already in Next.js layout/meta).
- Once verified, go to ‘Sitemaps’ > submit `/sitemap.xml`
- Use the URL Inspection tool to request indexing for primary and new legal pages after deployment

## 2. Google Business Profile/Map Listing (Local SEO)
- Visit https://www.google.com/business/
- Click ‘Manage now’ and search for your business/location
- If not found, ‘Add your business to Google’
- Fill out business name: **Samyun Wan Armenia**
- Use official phone and address (match site footer/contact exactly)
- Add your website URL: `https://samyunwanarmenia.netlify.app/`
- Choose relevant category (e.g., Health & Wellness Shop, Supplement Store)
- Complete Google’s verification (mail, SMS, or video call as prompted)
- Add business hours and additional info for authority

## 3. How to Report Fake or Impersonator Sites
- Use the templates in `IMPOSTOR_ACTION_TEMPLATES.txt`
- Collect links, screenshots, and proof of official status (business registration, trademark, photos of packaging, official invoices)
- Report via Google Legal, Facebook/Instagram report, Telegram abuse, TikTok report, and relevant complaint forms
- Always reference the official site: https://samyunwanarmenia.netlify.app/

## 4. Ongoing Verification & Best Practices
- Ensure meta title always says: “Samyun Wan Armenia – Official Distributor”
- The only verified socials should be listed in both schema.org JSON-LD and in the site footer
- Sitemaps and robots.txt should always be available from `/`
- For each major site change (domain, social, logo), update verification details everywhere
- Keep proof-of-ownership docs ready for new batches of complaints or if your listing is disputed
- Run Google Rich Results Test and Search Console enhancements every quarter

---
**Questions?**
Refer to `SEO-IMPROVEMENTS.md` for the latest code/SEO structure
or contact your developer/SEO lead for schema and verification changes.
