import { NextResponse } from "next/server";

export async function GET() {
  const robotsText = `User-agent: Googlebot
Allow: /
Disallow: /api/
Disallow: /old-vite-backup/

User-agent: Bingbot
Allow: /
Disallow: /api/
Disallow: /old-vite-backup/

User-agent: GPTBot
Allow: /
Disallow: /api/
Disallow: /old-vite-backup/

User-agent: ClaudeBot
Allow: /
Disallow: /api/
Disallow: /old-vite-backup/

User-agent: PerplexityBot
Allow: /
Disallow: /api/
Disallow: /old-vite-backup/

User-agent: Google-Extended
Allow: /
Disallow: /api/
Disallow: /old-vite-backup/

User-agent: *
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
