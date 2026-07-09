// Centralized sample data payloads for Toolchi interactive utilities

export const TOOL_SAMPLES: Record<string, string> = {
  "robots-txt-checker": `User-agent: *
Disallow: /admin/
Disallow: /api/
Allow: /admin/login

Sitemap: https://toolchi.online/sitemap.xml`,

  "xml-sitemap-validator": `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://toolchi.online/</loc>
    <lastmod>2026-07-05</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://toolchi.online/tools</loc>
    <lastmod>2026-07-05</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`,

  "json-formatter": `{"name":"Toolchi","description":"All-in-one free online tools","status":"active","stats":{"toolsCount":40,"private":true},"categories":["documents","webmaster","performance","developer","ai"],"author":{"name":"Toolchi Team","website":"https://toolchi.online"}}`,

  "ai-detector": `In today's digital landscape, the integration of automation platforms has revolutionized workflow throughput. It is essential to leverage advanced computational methodologies to maximize efficiency metrics. However, human oversight remains a critical factor in synthesizing qualitative outputs that resonate with audiences. We must strive to maintain balance between automation and human ingenuity.`,

  "case-converter": `The quick brown fox jumps over the lazy dog. Toolchi offers 100% free, private, and local browser-based utility tools for developers and webmasters.`,

  "text-counter": `The quick brown fox jumps over the lazy dog. Toolchi offers 100% free, private, and local browser-based utility tools for developers and webmasters.`,

  "multiple-url-opener": `https://toolchi.online
https://toolchi.online/tools
https://toolchi.online/blog`,

  "minify-code": `body {
  background-color: #f6f7fb;
  color: #11141c;
  font-family: 'Inter', sans-serif;
  margin: 0;
}
.card {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}`,

  "unminify-code": `body{background-color:#f6f7fb;color:#11141c;font-family:'Inter',sans-serif;margin:0;}.card{border:1px solid rgba(0,0,0,0.1);border-radius:12px;padding:20px;box-shadow:0 4px 6px rgba(0,0,0,0.05);}`,

  "base64": `Toolchi is 100% secure, client-side, and free!`,

  "url-encoder": `https://toolchi.online/tools?search=sitemap validator & query=xml checker`,

  "hash-generator": `security-salt-value-for-testing-purposes-12345`,

  "color-converter": `#7d4dff`,

  "ab-test-calculator": `control-visitors: 10000\ncontrol-conversions: 500\nvariant-visitors: 10500\nvariant-conversions: 620`,

  "spell-checker": `This is a simple text containig some common spelling mistakes like recieve, dynamicly, and validator. Let us run a check.`,

  "amp-validator": `<!doctype html>
<html amp lang="en">
  <head>
    <meta charset="utf-8">
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <title>Hello World</title>
    <link rel="canonical" href="hello-world.html">
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
  </head>
  <body>
    <h1>Hello World</h1>
  </body>
</html>`,

  "domain-generator": `seo, tools, fast, web, builder`,

  "share-link-creator": `https://toolchi.online/tools/qr-generator`,

  "redirect-checker": `https://toolchi.online`,

  "site-down-checker": `toolchi.online`,

  "domain-expiration-checker": `toolchi.online`,

  "ssl-checker": `toolchi.online`,

  "ai-summarizer": `In modern web performance tuning, visual assets are the single largest source of bloat. Uncompressed high-definition hero banners and blog thumbnails can easily degrade your Core Web Vitals score. Optimizing images locally is the fastest win to double your loading speeds. Historically, diagnostic tools required sending server requests, parsing responses remotely, and logging results in databases. This added latency, server costs, and potential data leakage. Modern web tools leverage in-browser APIs - such as Web Crypto, native Canvas, and local fetch loops - to perform critical scans safely on the client side.`,

  "ai-paragraph-rewriter": `We need to work hard on optimizing our sitemap files because currently search engine crawlers are taking a very long time to find and index all the fresh utility pages that we have published on the website.`,

  "ai-title-generator": `image compression web performance nextjs pagespeed optimization`
};

export const getSampleBySlug = (slug: string): string => {
  return TOOL_SAMPLES[slug] || "";
};
