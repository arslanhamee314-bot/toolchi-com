import { NextRequest, NextResponse } from "next/server";
import { validateApiKey, rateLimitCheck, sanitizeError } from "@/lib/api-helper";

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting Check
    const rate = rateLimitCheck(req);
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, x-api-key",
      "X-RateLimit-Limit": String(rate.limit),
      "X-RateLimit-Remaining": String(rate.remaining)
    };

    if (!rate.allowed) {
      return NextResponse.json({
        success: false,
        error: "Rate Limit Exceeded",
        reason: "You have exceeded the limit of 30 requests per minute."
      }, { status: 429, headers });
    }

    // 2. Authentication Check
    if (!validateApiKey(req)) {
      return NextResponse.json({
        success: false,
        error: "Unauthorized Access",
        reason: "Invalid API credentials or missing Authorization token."
      }, { status: 401, headers });
    }

    const body = await req.json();
    const url = body.url || "https://toolchi.online/sitemap.xml";

    let status = 404;
    let valid = false;
    let sizeBytes = 0;
    let totalUrls = 0;
    let format = "unknown";

    try {
      const response = await fetch(url, {
        signal: AbortSignal.timeout(5000)
      });
      status = response.status;
      if (response.ok) {
        const text = await response.text();
        sizeBytes = Buffer.byteLength(text, "utf8");

        if (text.includes("<urlset") || text.includes("<sitemapindex")) {
          valid = true;
          format = text.includes("<sitemapindex") ? "sitemap_index" : "urlset";
          
          // Simple tag match to count total mapped loc URLs
          const locs = text.match(/<loc>/g);
          if (locs) {
            totalUrls = locs.length;
          }
        }
      }
    } catch (e: any) {
      status = 500;
    }

    return NextResponse.json({
      success: true,
      url,
      status_code: status,
      is_valid_xml: valid,
      sitemap_format: format,
      size_bytes: sizeBytes,
      total_mapped_urls: totalUrls,
      timestamp: new Date().toISOString()
    }, {
      status: 200,
      headers
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: "Request Processing Failed",
      reason: sanitizeError(err)
    }, { status: 400 });
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, x-api-key"
    }
  });
}
