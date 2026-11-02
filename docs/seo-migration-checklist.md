# Ampledia SEO & Rebrand Migration Checklist

Manual steps required by the site owner outside code deployment to ensure zero SEO rank loss and preserve brand equity during the transition from **Rollix Media** to **Ampledia**.

---

## 1. Domain & DNS Setup (Before Deploy)
- [ ] Confirm ownership of new domain (`ampledia.in` / `ampledia.com`).
- [ ] In **Vercel Project Settings > Domains**:
  - Add `ampledia.in` and `www.ampledia.in` (set as Production).
  - **CRITICAL**: Do **NOT** remove `rollixmedia.vercel.app` from the project! Keep it attached so `next.config.ts` 301 host redirects remain active.
- [ ] Set `NEXT_PUBLIC_SITE_URL=https://ampledia.in` in Vercel Environment Variables (Production & Preview).

---

## 2. Google Search Console (Day of Deploy)
- [ ] **Add New Property**: Add `https://ampledia.in` (Domain or URL Prefix property).
- [ ] Verify ownership (via DNS TXT record or HTML verification file `public/google7ae04aa8f91c229b.html`).
- [ ] **Submit Sitemap**: Submit `https://ampledia.in/sitemap.xml` in the new Search Console property.
- [ ] **Change of Address Tool** (if using a custom domain previously): In the old property Settings > *Change of Address*, validate that the 301 redirects are in place.
- [ ] **Request Indexing**: Manually inspect and request indexing for top pages:
  - `https://ampledia.in/`
  - `https://ampledia.in/services`
  - `https://ampledia.in/portfolio`
  - `https://ampledia.in/portfolio/vision-classes-bhilwara`
  - `https://ampledia.in/about`
  - `https://ampledia.in/contact`
- [ ] **Keep Old Property**: Monitor the old `rollixmedia.vercel.app` property for the next 60 days to confirm Googlebot discovers the 301 redirects.

---

## 3. Bing Webmaster Tools & IndexNow
- [ ] Log in to [Bing Webmaster Tools](https://www.bing.com/webmasters).
- [ ] Import or add `https://ampledia.in`.
- [ ] Submit `https://ampledia.in/sitemap.xml`.
- [ ] Trigger IndexNow API push:
  - Visit `https://ampledia.in/api/indexnow` in your browser to submit all 16 core URLs immediately to Bing and Yandex using key file `/ampledia2026indexnow.txt`.

---

## 4. Google Business Profile (GBP) & Local SEO
- [ ] Update Business Name: Change to **Ampledia** (or temporarily **Ampledia - Formerly Rollix Media** for 30–60 days).
- [ ] Update Website Link: Set to `https://ampledia.in`.
- [ ] Update Business Description: Highlight *"Ampledia (formerly Rollix Media) is a premier digital marketing and creative agency in Bhilwara, Rajasthan..."*
- [ ] Upload new branded logo, cover photo, and office/workstation images.
- [ ] Post a GBP update announcement: *"Rollix Media is now Ampledia! Same founding team, expanded video & ad growth services."*

---

## 5. Social Media & External Channels
- [ ] **Instagram**:
  - Keep the **same account** (preserves existing followers and history).
  - Update display name to **Ampledia**.
  - Update handle/username to `@ampledia` (or `@ampledia.in` if taken).
  - Update Bio: *"Digital | Creative | Growth. Formerly Rollix Media."*
  - Update link in bio to `https://ampledia.in`.
- [ ] **WhatsApp Business**:
  - Update business profile name, catalog, profile photo, and website link.
- [ ] **Facebook Page / LinkedIn Company Page / YouTube Channel**:
  - Update name, handle, avatar, banner, and website link.
- [ ] **Email & Identity**:
  - Once new domain email is ready (e.g. `hello@ampledia.in`), update `SMTP_USER` and `ADMIN_EMAIL` in Vercel environment variables and `lib/brand.ts`.

---

## 6. Next 2–6 Weeks Monitoring
- [ ] Check Google Search Console weekly for crawl errors, redirect confirmations, and index status.
- [ ] Search "Rollix Media" on Google in an incognito window to see the knowledge panel transition to Ampledia.
- [ ] After 3–6 months of healthy search traffic, the phrase `(formerly Rollix Media)` in meta titles and footer can be phased out.

