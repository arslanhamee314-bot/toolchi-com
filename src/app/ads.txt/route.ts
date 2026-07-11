import { NextResponse } from "next/server";

export async function GET() {
  const pubId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  if (!pubId || pubId.includes("XXXXXX")) {
    return new NextResponse("# Configure NEXT_PUBLIC_ADSENSE_CLIENT_ID to publish ads.txt\n", {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  }

  // Clean prefix if "ca-pub-" exists to comply with Google standard
  const cleanPubId = pubId.replace(/^ca-/, "");
  
  const content = `google.com, ${cleanPubId}, DIRECT, f08c47fec0942fa0\n`;

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate",
    },
  });
}
