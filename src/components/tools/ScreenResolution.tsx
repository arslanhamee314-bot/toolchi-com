"use client";

import React, { useState, useEffect } from "react";
import { Monitor, RefreshCw } from "lucide-react";

export default function ScreenResolution() {
  const [metrics, setMetrics] = useState<any>(null);

  const loadMetrics = () => {
    if (typeof window === "undefined") return;

    setMetrics({
      screenWidth: window.screen.width + " px",
      screenHeight: window.screen.height + " px",
      windowWidth: window.innerWidth + " px",
      windowHeight: window.innerHeight + " px",
      dpr: window.devicePixelRatio,
      colorDepth: window.screen.colorDepth + " bits",
      orientation: window.screen.orientation ? window.screen.orientation.type : "N/A"
    });
  };

  useEffect(() => {
    loadMetrics();
    window.addEventListener("resize", loadMetrics);
    return () => window.removeEventListener("resize", loadMetrics);
  }, []);

  return (
    <div className="flex flex-col gap-6 text-foreground text-xs">
      
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Monitor className="h-5 w-5 text-[#7d4dff]" />
          <label className="font-bold text-sm block">My Screen Resolution Parameters</label>
        </div>
        <p className="text-muted leading-relaxed text-3xs">Read device resolutions, viewport window sizes, and pixel ratios dynamically.</p>
      </div>

      {metrics ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-white dark:bg-card border border-border rounded-2xl text-center shadow-xs">
            <span className="text-muted block text-3xs font-bold uppercase mb-1">Screen Width</span>
            <span className="font-extrabold text-sm text-foreground">{metrics.screenWidth}</span>
          </div>
          <div className="p-4 bg-white dark:bg-card border border-border rounded-2xl text-center shadow-xs">
            <span className="text-muted block text-3xs font-bold uppercase mb-1">Screen Height</span>
            <span className="font-extrabold text-sm text-foreground">{metrics.screenHeight}</span>
          </div>
          <div className="p-4 bg-white dark:bg-card border border-border rounded-2xl text-center shadow-xs">
            <span className="text-muted block text-3xs font-bold uppercase mb-1">Window Width</span>
            <span className="font-extrabold text-sm text-[#7d4dff]">{metrics.windowWidth}</span>
          </div>
          <div className="p-4 bg-white dark:bg-card border border-border rounded-2xl text-center shadow-xs">
            <span className="text-muted block text-3xs font-bold uppercase mb-1">Window Height</span>
            <span className="font-extrabold text-sm text-[#7d4dff]">{metrics.windowHeight}</span>
          </div>
          <div className="p-4 bg-white dark:bg-card border border-border rounded-2xl text-center shadow-xs">
            <span className="text-muted block text-3xs font-bold uppercase mb-1">Device Pixel Ratio</span>
            <span className="font-extrabold text-sm text-foreground">{metrics.dpr}</span>
          </div>
          <div className="p-4 bg-white dark:bg-card border border-border rounded-2xl text-center shadow-xs">
            <span className="text-muted block text-3xs font-bold uppercase mb-1">Color Depth</span>
            <span className="font-extrabold text-sm text-foreground">{metrics.colorDepth}</span>
          </div>
        </div>
      ) : (
        <div className="text-center py-6 text-muted text-3xs">Loading device indicators...</div>
      )}

      <button
        onClick={loadMetrics}
        className="px-5 py-2 text-xs font-bold bg-[#7d4dff]/10 hover:bg-[#7d4dff]/20 text-[#7d4dff] border border-[#7d4dff]/25 rounded-xl transition-colors cursor-pointer w-fit flex items-center gap-1"
      >
        <RefreshCw className="h-3.5 w-3.5" /> Reload Parameters
      </button>

    </div>
  );
}
