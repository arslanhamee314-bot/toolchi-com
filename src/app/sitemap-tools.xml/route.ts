import { NextResponse } from "next/server";
import { TOOLS_REGISTRY } from "@/lib/tools-registry";

export async function GET() {
  const baseUrl = "https://toolchi.online";
  const lastmod = "2026-07-18";

  const urlElements = TOOLS_REGISTRY.map(
    (tool) =>
      `  <url>\n    <loc>${baseUrl}/tools/${tool.slug}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`
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
