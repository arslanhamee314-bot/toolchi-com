# Toolchi Technical SEO, AdSense, & Marketing Launch Manual

This manual documents the implementation details and checklists for **Phase 7 (AdSense)**, **Phase 9 (Authority)**, and **Phase 10 (Measurement)** of the Toolchi Growth Strategy.

---

## 💎 Phase 7: AdSense & Sponsorship Revenue Engine

### 1. Script Initialization
Google AdSense is loaded dynamically in [src/app/layout.tsx](file:///e:/Toolchi%20web%20tool%20kit/src/app/layout.tsx) using the client environment variable:
```typescript
process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID
```
This script runs in `lazyOnload` mode to avoid blocking crucial Core Web Vitals parameters during initial painting.

### 2. Ad Zones & Placements Map
Ad slots are integrated using the custom `<AdUnit />` component:
*   **Homepage:** Placed in the popular utilities grid and the footer footer space.
*   **Category Landing Pages:** Embedded below the card grid to monetize category searches.
*   **Tool Workspace Pages:** Placed below the interactive workspace to capture impressions during conversions.
*   **Blog Post Pages:** Embedded directly below the article prose content.

### 3. Fallback Sponsor Logic
To maintain a premium appearance, the sponsor card placeholder is conditionally hidden in production when a real AdSense client ID is active, preventing redundant layouts.

---

## 🔗 Phase 9: Domain Authority & Backlinks Campaign

To grow Toolchi's Domain Authority (DA) from 0 to 45+, submit the tool directory to these platforms:

### 1. Free Software & SaaS Directories
| Directory | URL | Link Profile | Action |
| :--- | :--- | :--- | :--- |
| **AlternativeTo** | `https://alternativeto.net` | do-follow contextual backlink | List as a free alternative to TinyWow, ezgif, and Smallpdf |
| **Product Hunt** | `https://producthunt.com` | high DA social signals | Launch the Toolchi browser suite as a free product launch |
| **BetaList** | `https://betalist.com` | high authority listing | Submit for early adopter feedback |
| **Indie Hackers** | `https://indiehackers.com` | forum mentions | Write a product story on 'Running 100% serverless browser tools' |
| **Devpost** | `https://devpost.com` | developer authority | List as a developer submission project |

### 2. High-Value Linkable Assets
*   Publish comparative charts (like our JPG vs PNG vs WebP vs AVIF guide) to attract mentions from tech bloggers.
*   Share high-performance benchmarks of browser-native canvas operations.

---

## 📊 Phase 10: Measurement & Analytics Pipeline

### 1. GA4 Configuration
Google Analytics runs globally from the layout using:
```typescript
process.env.NEXT_PUBLIC_GA_ID
```
It tracks session durations, scroll depth on category pages, and click rates on tool items.

### 2. Search Console Verification
To verify the site in Google Search Console:
1.  **HTML Tag Method:** Copy the verification meta tag and paste it in the `<head>` block of [src/app/layout.tsx](file:///e:/Toolchi%20web%20tool%20kit/src/app/layout.tsx).
2.  **DNS TXT Method (Recommended):** Add the `google-site-verification` TXT record to your DNS zone file.
3.  **Sitemap Indexing:** Submit `https://toolchi.online/sitemap.xml` in Search Console to index all 124 pre-rendered static routes.
