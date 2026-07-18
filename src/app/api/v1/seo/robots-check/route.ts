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
    let domain = body.domain || "github.com";

    // Clean domain protocols if present
    domain = domain.replace(/^(https?:\/\/)?(www\.)?/, "");

    const robotsUrl = `https://${domain}/robots.txt`;

    let status = 404;
    let found = false;
    let sitemaps: string[] = [];
    let sizeBytes = 0;
    let contentSnippet = "";

    try {
      const response = await fetch(robotsUrl, {
        signal: AbortSignal.timeout(5000)
      });
      status = response.status;
      if (response.ok) {
        found = true;
        const text = await response.text();
        sizeBytes = Buffer.byteLength(text, "utf8");
        contentSnippet = text.slice(0, 300);

        // Simple regex search for sitemap URLs in robots.txt
        const matches = text.match(/sitemap:\s*(https?:\/\/[^\s]+)/gi);
        if (matches) {
          sitemaps = matches.map(m => m.replace(/sitemap:\s*/i, "").trim());
        }
      }
    } catch (e: any) {
      status = 500;
    }

    return NextResponse.json({
      success: true,
      domain,
      robots_url: robotsUrl,
      status_code: status,
      exists: found,
      size_bytes: sizeBytes,
      sitemaps,
      snippet: contentSnippet,
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
