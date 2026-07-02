import { NextResponse } from "next/server";

export async function GET() {
  const robotsText = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /old-vite-backup/

Sitemap: https://toolchi.online/sitemap.xml
`;

  return new NextResponse(robotsText, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate",
    },
  });
}
