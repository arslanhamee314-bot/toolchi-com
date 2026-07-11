import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
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
