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
    const topic = body.topic || "SEO Optimization Guidelines";
    const depth = body.depth || "detailed";

    const headings = [
      {
        heading: "1. Introduction to " + topic,
        subheadings: ["Historical Background", "Core Value Proposition", "Why it matters today"]
      },
      {
        heading: "2. Essential Strategies for " + topic,
        subheadings: ["Step-by-Step implementation", "Common Pitfalls & Mistakes", "Required Tools & Software"]
      },
      {
        heading: "3. Advanced Concepts in " + topic,
        subheadings: ["Performance Tuning", "Scale challenges", "Automation scripts"]
      },
      {
        heading: "4. Conclusion and Summary",
        subheadings: ["Key takeaways", "Next action items"]
      }
    ];

    const resultHeadings = depth === "brief" ? headings.slice(0, 2) : headings;

    return NextResponse.json({
      success: true,
      topic,
      depth,
      outline: resultHeadings,
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
