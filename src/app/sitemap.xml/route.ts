import { NextResponse } from "next/server";
import { TOOLS_REGISTRY } from "@/lib/tools-registry";
import { BLOG_POSTS } from "@/lib/blog-registry";
import { WORKFLOWS } from "@/lib/workflows-registry";

export async function GET() {
  const baseUrl = "https://toolchi.online";

  const locales = ["ur", "tr"];
  const xmlUrls = [
    // Default English
    `  <url>\n    <loc>${baseUrl}</loc>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>`,
    `  <url>\n    <loc>${baseUrl}/workspace</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.95</priority>\n  </url>`,
    `  <url>\n    <loc>${baseUrl}/tools</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`,
    `  <url>\n    <loc>${baseUrl}/blog</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`,
    `  <url>\n    <loc>${baseUrl}/ai-tools</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.9</priority>\n  </url>`,
    `  <url>\n    <loc>${baseUrl}/pdf-tools</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.9</priority>\n  </url>`,
    `  <url>\n    <loc>${baseUrl}/image-tools</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.9</priority>\n  </url>`,
    `  <url>\n    <loc>${baseUrl}/developer-tools</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.9</priority>\n  </url>`,
    `  <url>\n    <loc>${baseUrl}/seo-tools</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.9</priority>\n  </url>`,
    `  <url>\n    <loc>${baseUrl}/blogging-tools</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.9</priority>\n  </url>`,
    `  <url>\n    <loc>${baseUrl}/webmaster-tools</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.9</priority>\n  </url>`,
    `  <url>\n    <loc>${baseUrl}/video-tools</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.85</priority>\n  </url>`,
    `  <url>\n    <loc>${baseUrl}/audio-tools</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.85</priority>\n  </url>`,
    `  <url>\n    <loc>${baseUrl}/gif-tools</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.85</priority>\n  </url>`,
    `  <url>\n    <loc>${baseUrl}/business-tools</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.85</priority>\n  </url>`,
    `  <url>\n    <loc>${baseUrl}/developers</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.95</priority>\n  </url>`,
    `  <url>\n    <loc>${baseUrl}/developers/image-compression-api</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.85</priority>\n  </url>`,
    `  <url>\n    <loc>${baseUrl}/developers/pdf-tools-api</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.85</priority>\n  </url>`,
    `  <url>\n    <loc>${baseUrl}/developers/seo-audit-api</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.85</priority>\n  </url>`,
    `  <url>\n    <loc>${baseUrl}/developers/ai-blogging-api</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.85</priority>\n  </url>`,
    `  <url>\n    <loc>${baseUrl}/docs/api</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.9</priority>\n  </url>`,

    
    // Localized Alternates
    ...locales.flatMap(locale => [
      `  <url>\n    <loc>${baseUrl}/${locale}</loc>\n    <changefreq>daily</changefreq>\n    <priority>0.9</priority>\n  </url>`,
      `  <url>\n    <loc>${baseUrl}/${locale}/workspace</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.85</priority>\n  </url>`,
      `  <url>\n    <loc>${baseUrl}/${locale}/pricing</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`,
      `  <url>\n    <loc>${baseUrl}/${locale}/blog</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>`
    ]),

    ...WORKFLOWS.map(w => {
      return `  <url>\n    <loc>${baseUrl}/workflows/${w.id}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.85</priority>\n  </url>`;
    }),
    ...TOOLS_REGISTRY.flatMap(tool => {
      return [
        `  <url>\n    <loc>${baseUrl}/tools/${tool.slug}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`,
        ...locales.map(locale => `  <url>\n    <loc>${baseUrl}/${locale}/tools/${tool.slug}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.75</priority>\n  </url>`)
      ];
    }),
    ...BLOG_POSTS.flatMap(post => {
      return [
        `  <url>\n    <loc>${baseUrl}/blog/${post.slug}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`,
        ...locales.map(locale => `  <url>\n    <loc>${baseUrl}/${locale}/blog/${post.slug}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>`)
      ];
    })
  ];


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
