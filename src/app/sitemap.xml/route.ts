import { NextResponse } from "next/server";
import { TOOLS_REGISTRY } from "@/lib/tools-registry";
import { BLOG_POSTS } from "@/lib/blog-registry";
import { WORKFLOWS } from "@/lib/workflows-registry";

export async function GET() {
  const baseUrl = "https://toolchi.online";
  const lastmod = new Date().toISOString().split("T")[0];
  const locales = ["ur", "tr"];

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
  ];

  const xmlUrls: string[] = [];

  // Add static URLs
  staticUrls.forEach(item => {
    xmlUrls.push(
      `  <url>\n    <loc>${baseUrl}${item.loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${item.changefreq}</changefreq>\n    <priority>${item.priority}</priority>\n  </url>`
    );
  });

  // Add localized static URLs
  locales.forEach(locale => {
    xmlUrls.push(`  <url>\n    <loc>${baseUrl}/${locale}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>0.9</priority>\n  </url>`);
    xmlUrls.push(`  <url>\n    <loc>${baseUrl}/${locale}/workspace</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.85</priority>\n  </url>`);
    xmlUrls.push(`  <url>\n    <loc>${baseUrl}/${locale}/pricing</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`);
    xmlUrls.push(`  <url>\n    <loc>${baseUrl}/${locale}/blog</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>`);
  });

  // Workflows
  WORKFLOWS.forEach(w => {
    xmlUrls.push(`  <url>\n    <loc>${baseUrl}/workflows/${w.id}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.85</priority>\n  </url>`);
  });

  // Tools
  TOOLS_REGISTRY.forEach(tool => {
    xmlUrls.push(`  <url>\n    <loc>${baseUrl}/tools/${tool.slug}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`);
    locales.forEach(locale => {
      xmlUrls.push(`  <url>\n    <loc>${baseUrl}/${locale}/tools/${tool.slug}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.75</priority>\n  </url>`);
    });
  });

  // Blog posts
  BLOG_POSTS.forEach(post => {
    xmlUrls.push(`  <url>\n    <loc>${baseUrl}/blog/${post.slug}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`);
    locales.forEach(locale => {
      xmlUrls.push(`  <url>\n    <loc>${baseUrl}/${locale}/blog/${post.slug}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>`);
    });
  });

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls.join("\n")}
</urlset>`;

  return new NextResponse(xmlContent, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate",
    },
  });
}
