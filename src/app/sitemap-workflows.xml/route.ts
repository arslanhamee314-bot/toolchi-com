import { NextResponse } from "next/server";
import { WORKFLOWS } from "@/lib/workflows-registry";

export async function GET() {
  const baseUrl = "https://toolchi.online";
  const lastmod = "2026-07-18";

  const urlElements = WORKFLOWS.map(
    (workflow) =>
      `  <url>\n    <loc>${baseUrl}/workflows/${workflow.id}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.85</priority>\n  </url>`
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
