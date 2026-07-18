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
    const topic = body.topic || "Web Development";
    const tone = body.tone || "professional";

    const baseTitles = [
      `Ultimate Guide to ${topic}`,
      `Why ${topic} Matters in 2026`,
      `Mastering ${topic}: 5 Expert Strategies`,
      `How to Get Started with ${topic} Safely`,
      `Top 10 Best Practices for ${topic}`
    ];

    const professionalModifier = [
      `An Industry Analysis of ${topic}`,
      `Streamlining ${topic} Workflows`
    ];

    const causalModifier = [
      `Why Everyone is Talking About ${topic}`,
      `The Honest Truth About ${topic}`
    ];

    const titles = [
      ...baseTitles,
      ...(tone === "professional" ? professionalModifier : causalModifier)
    ].slice(0, 5);

    return NextResponse.json({
      success: true,
      topic,
      tone,
      titles,
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
