import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    let url = body.url || "http://toolchi.online";

    const chain: { url: string; status: number; location: string | null }[] = [];
    let redirectCount = 0;
    let finalUrl = url;
    let isLoop = false;

    // Follow redirects manually up to a limit of 5 hops to prevent endless loop hangs
    let currentUrl = url;
    const visited = new Set<string>();

    for (let hop = 0; hop < 5; hop++) {
      if (visited.has(currentUrl)) {
        isLoop = true;
        break;
      }
      visited.add(currentUrl);

      try {
        const res = await fetch(currentUrl, {
          method: "GET",
          redirect: "manual", // Prevent automatic redirection following
          signal: AbortSignal.timeout(4000)
        });

        const redirectLocation = res.headers.get("location");
        chain.push({
          url: currentUrl,
          status: res.status,
          location: redirectLocation
        });

        if (res.status >= 300 && res.status < 400 && redirectLocation) {
          redirectCount++;
          // Resolve relative redirect locations if present
          let nextUrl = redirectLocation;
          if (nextUrl.startsWith("/")) {
            const parsed = new URL(currentUrl);
            nextUrl = `${parsed.origin}${nextUrl}`;
          }
          currentUrl = nextUrl;
          finalUrl = currentUrl;
        } else {
          // No more redirects
          break;
        }
      } catch (e) {
        chain.push({
          url: currentUrl,
          status: 500,
          location: null
        });
        break;
      }
    }

    return NextResponse.json({
      success: true,
      initial_url: url,
      final_url: finalUrl,
      total_redirects: redirectCount,
      is_redirect_loop: isLoop,
      redirect_chain: chain,
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
