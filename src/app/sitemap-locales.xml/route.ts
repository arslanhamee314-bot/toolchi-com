import { NextResponse } from "next/server";
import { TOOLS_REGISTRY } from "@/lib/tools-registry";
import { BLOG_POSTS } from "@/lib/blog-registry";

export async function GET() {
  const baseUrl = "https://toolchi.online";
  const stableLastmod = "2026-07-18";
  const locales = ["ur", "tr"];
  const urlElements: string[] = [];

  locales.forEach((locale) => {
    // 1. Static Localized Paths
    urlElements.push(
      `  <url>\n    <loc>${baseUrl}/${locale}</loc>\n    <lastmod>${stableLastmod}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>0.9</priority>\n  </url>`
    );
    urlElements.push(
      `  <url>\n    <loc>${baseUrl}/${locale}/workspace</loc>\n    <lastmod>${stableLastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.85</priority>\n  </url>`
    );
    urlElements.push(
      `  <url>\n    <loc>${baseUrl}/${locale}/pricing</loc>\n    <lastmod>${stableLastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`
    );
    urlElements.push(
      `  <url>\n    <loc>${baseUrl}/${locale}/blog</loc>\n    <lastmod>${stableLastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>`
    );

    // 2. Dynamic Tool Localized Paths
    TOOLS_REGISTRY.forEach((tool) => {
      urlElements.push(
        `  <url>\n    <loc>${baseUrl}/${locale}/tools/${tool.slug}</loc>\n    <lastmod>${stableLastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.75</priority>\n  </url>`
      );
    });

    // 3. Dynamic Blog Localized Paths
    BLOG_POSTS.forEach((post) => {
      const postDate = new Date(post.date).toISOString().split("T")[0];
      urlElements.push(
        `  <url>\n    <loc>${baseUrl}/${locale}/blog/${post.slug}</loc>\n    <lastmod>${postDate}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>`
      );
    });
  });

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
