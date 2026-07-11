import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
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
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization"
      }
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: "Invalid Request Payload",
      reason: err.message
    }, { status: 400 });
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization"
    }
  });
}
