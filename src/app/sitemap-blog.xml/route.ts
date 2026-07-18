import { NextResponse } from "next/server";
import { BLOG_POSTS } from "@/lib/blog-registry";

export async function GET() {
  const baseUrl = "https://toolchi.online";
  const lastmod = new Date().toISOString().split("T")[0];

  const urlElements = BLOG_POSTS.map(
    (post) => {
      const postDate = new Date(post.date).toISOString().split("T")[0];
      return `  <url>\n    <loc>${baseUrl}/blog/${post.slug}</loc>\n    <lastmod>${postDate}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`;
    }
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
