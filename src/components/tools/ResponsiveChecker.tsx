"use client";

import React, { useState } from "react";
import { Laptop, Tablet, Smartphone, Play, ArrowRight } from "lucide-react";

export default function ResponsiveChecker() {
  const [inputUrl, setInputUrl] = useState("https://example.com");
  const [iframeUrl, setIframeUrl] = useState("https://example.com");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;
    
    let target = inputUrl.trim();
    if (!/^https?:\/\//i.test(target)) {
      target = "https://" + target;
    }
    setIframeUrl(target);
  };

  return (
    <div className="flex flex-col gap-6 text-foreground text-xs">
      
      <div className="flex flex-col gap-2">
        <label className="font-bold text-sm block">Enter URL to Test Responsiveness</label>
        <p className="text-muted leading-relaxed text-3xs">Type a site address to load preview frames. (Note: Some domains restrict iframe embedding via X-Frame-Options policies).</p>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          placeholder="Enter website link (e.g., example.com)..."
          className="flex-1 px-4 py-2.5 text-xs bg-white dark:bg-card border border-border rounded-xl outline-none focus:border-[#7d4dff]"
          required
        />
        <button
          type="submit"
          className="px-6 py-2.5 font-bold bg-[#7d4dff] hover:bg-[#6530ef] text-white rounded-xl transition-colors cursor-pointer flex items-center gap-1 shrink-0"
        >
          <Play className="h-4 w-4" /> Load Frames
        </button>
      </form>

      {/* Viewport containers */}
      <div className="flex flex-col gap-8 mt-4">
        
        {/* Mobile Viewport Container */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5 font-bold text-3xs uppercase tracking-wider text-muted">
            <Smartphone className="h-4 w-4 text-[#7d4dff]" /> Smartphone (Mobile Preview - 375px × 640px)
          </div>
          <div className="w-[375px] h-[500px] border border-border bg-white rounded-3xl overflow-hidden shadow-md relative">
            <iframe
              src={iframeUrl}
              title="Mobile Responsive Frame"
              className="w-full h-full border-0"
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        </div>

        {/* Tablet Viewport Container */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5 font-bold text-3xs uppercase tracking-wider text-muted">
            <Tablet className="h-4 w-4 text-[#7d4dff]" /> Tablet Frame (768px × 600px)
          </div>
          <div className="w-full max-w-[768px] h-[500px] border border-border bg-white rounded-3xl overflow-hidden shadow-md relative">
            <iframe
              src={iframeUrl}
              title="Tablet Responsive Frame"
              className="w-full h-full border-0"
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        </div>

      </div>

    </div>
  );
}
