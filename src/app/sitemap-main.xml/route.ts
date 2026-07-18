import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://toolchi.online";
  const lastmod = "2026-07-18";

  const staticUrls = [
    { loc: "", changefreq: "daily", priority: "1.0" },
    { loc: "/workspace", changefreq: "weekly", priority: "0.95" },
    { loc: "/tools", changefreq: "weekly", priority: "0.8" },
    { loc: "/blog", changefreq: "weekly", priority: "0.8" },
    { loc: "/ai-tools", changefreq: "weekly", priority: "0.9" },
    { loc: "/pdf-tools", changefreq: "weekly", priority: "0.9" },
    { loc: "/image-tools", changefreq: "weekly", priority: "0.9" },
    { loc: "/developer-tools", changefreq: "weekly", priority: "0.9" },
    { loc: "/seo-tools", changefreq: "weekly", priority: "0.9" },
    { loc: "/blogging-tools", changefreq: "weekly", priority: "0.9" },
    { loc: "/webmaster-tools", changefreq: "weekly", priority: "0.9" },
    { loc: "/video-tools", changefreq: "weekly", priority: "0.85" },
    { loc: "/audio-tools", changefreq: "weekly", priority: "0.85" },
    { loc: "/gif-tools", changefreq: "weekly", priority: "0.85" },
    { loc: "/business-tools", changefreq: "weekly", priority: "0.85" },
    { loc: "/developers", changefreq: "weekly", priority: "0.95" },
    { loc: "/developers/image-compression-api", changefreq: "weekly", priority: "0.85" },
    { loc: "/developers/pdf-tools-api", changefreq: "weekly", priority: "0.85" },
    { loc: "/developers/seo-audit-api", changefreq: "weekly", priority: "0.85" },
    { loc: "/developers/ai-blogging-api", changefreq: "weekly", priority: "0.85" },
    { loc: "/docs/api", changefreq: "weekly", priority: "0.9" },
    { loc: "/pricing", changefreq: "weekly", priority: "0.8" },
    { loc: "/about", changefreq: "weekly", priority: "0.7" },
    { loc: "/contact", changefreq: "weekly", priority: "0.7" },
    { loc: "/privacy", changefreq: "monthly", priority: "0.5" },
    { loc: "/terms", changefreq: "monthly", priority: "0.5" },
    { loc: "/about/editorial", changefreq: "monthly", priority: "0.6" },
    { loc: "/about/security", changefreq: "monthly", priority: "0.6" },
    { loc: "/about/changelog", changefreq: "weekly", priority: "0.6" },
  ];

  const urlElements = staticUrls.map(
    (item) =>
      `  <url>\n    <loc>${baseUrl}${item.loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${item.changefreq}</changefreq>\n    <priority>${item.priority}</priority>\n  </url>`
  );

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements.join("\n")}
</urlset>`;

  return new NextResponse(xmlContent, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=86400",
    },
  });
}
