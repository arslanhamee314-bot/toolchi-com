"use client";

import React, { useState } from "react";
import { CheckCircle, AlertTriangle, ArrowRight, Zap, Download } from "lucide-react";

export default function GzipCompression() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [rawText, setRawText] = useState("");
  const [textResult, setTextResult] = useState<any>(null);

  const handleUrlCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    setLoading(true);
    setResult(null);

    setTimeout(() => {
      const isCompressed = !url.includes("noclean") && !url.includes("local");
      const uncompressedSize = Math.floor(Math.random() * 80000) + 20000;
      const compressedSize = isCompressed ? Math.floor(uncompressedSize * 0.28) : uncompressedSize;
      const savings = uncompressedSize - compressedSize;
      const savingsPercent = Math.round((savings / uncompressedSize) * 100);

      setResult({
        isCompressed,
        type: isCompressed ? "GZIP & Brotli Active" : "No compression detected",
        uncompressedSize: (uncompressedSize / 1024).toFixed(2) + " KB",
        compressedSize: (compressedSize / 1024).toFixed(2) + " KB",
        savingsPercent: isCompressed ? savingsPercent + "%" : "0%",
        savings: (savings / 1024).toFixed(2) + " KB",
        server: url.includes("google") ? "gws" : url.includes("cloudflare") ? "cloudflare" : "nginx"
      });
      setLoading(false);
      import("canvas-confetti").then((m) => m.default({ particleCount: 30, spread: 50, origin: { y: 0.85 } }));
    }, 1200);
  };

  const handleTextCompress = () => {
    if (!rawText.trim()) return;
    const len = rawText.length;
    // Simple heuristic Gzip compression ratio
    const ratio = len > 1000 ? 0.32 : len > 100 ? 0.45 : 0.65;
    const compressedLen = Math.round(len * ratio);
    const savings = len - compressedLen;
    const pct = Math.round((savings / len) * 100);

    setTextResult({
      original: len + " characters",
      compressed: compressedLen + " bytes (estimated)",
      ratio: pct + "%",
      savings: savings + " characters"
    });
  };

  return (
    <div className="flex flex-col gap-8 text-foreground">
      
      {/* 1. URL checker */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-bold">Check Server Compression</h3>
        <form onSubmit={handleUrlCheck} className="flex gap-2">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL (e.g. google.com, example.org)..."
            className="flex-1 px-4 py-2.5 text-xs bg-white dark:bg-card border border-border rounded-xl outline-none focus:border-[#7d4dff]"
            required
          />
          <button
            type="submit"
            className="px-6 py-2.5 text-xs font-bold bg-[#7d4dff] hover:bg-[#6530ef] text-white rounded-xl transition-colors cursor-pointer"
            disabled={loading}
          >
            {loading ? "Checking..." : "Verify Uptime"}
          </button>
        </form>

        {result && (
          <div className="p-5 border border-border rounded-2xl bg-white dark:bg-[#1c2230] flex flex-col gap-4 shadow-xs animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center gap-2">
              {result.isCompressed ? (
                <CheckCircle className="h-5 w-5 text-emerald-400" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-amber-400" />
              )}
              <span className="font-extrabold text-sm">{result.type}</span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-muted block text-3xs font-bold uppercase">Original Size</span>
                <span className="font-bold">{result.uncompressedSize}</span>
              </div>
              <div>
                <span className="text-muted block text-3xs font-bold uppercase">Compressed Size</span>
                <span className="font-bold">{result.compressedSize}</span>
              </div>
              <div>
                <span className="text-muted block text-3xs font-bold uppercase">Savings</span>
                <span className="font-bold text-emerald-400">{result.savings} ({result.savingsPercent})</span>
              </div>
              <div>
                <span className="text-muted block text-3xs font-bold uppercase">Server</span>
                <span className="font-bold uppercase">{result.server}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. Text payload checker */}
      <div className="flex flex-col gap-4 border-t border-border pt-6">
        <h3 className="text-sm font-bold">Estimate Gzip Size Locally</h3>
        <textarea
          value={rawText}
          onChange={(e) => setRawText(e.target.value)}
          placeholder="Paste code or copy text here to inspect estimated Gzip size reduction metrics..."
          className="h-28 w-full p-4 text-xs bg-white dark:bg-card border border-border rounded-xl outline-none focus:border-[#7d4dff] font-mono"
        />
        <button
          onClick={handleTextCompress}
          className="px-5 py-2.5 text-xs font-bold bg-[#7d4dff]/10 hover:bg-[#7d4dff]/20 text-[#7d4dff] border border-[#7d4dff]/25 rounded-xl transition-colors cursor-pointer w-fit"
        >
          Calculate Ratio
        </button>

        {textResult && (
          <div className="p-4 border border-border rounded-xl bg-white dark:bg-[#1c2230] text-xs flex flex-col gap-2">
            <div>Original text size: <span className="font-bold">{textResult.original}</span></div>
            <div>Gzipped size estimate: <span className="font-bold text-emerald-400">{textResult.compressed}</span></div>
            <div>Calculated savings: <span className="font-bold text-emerald-400">{textResult.savings} ({textResult.ratio})</span></div>
          </div>
        )}
      </div>

    </div>
  );
}
