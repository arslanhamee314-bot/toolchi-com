"use client";

import React, { useState } from "react";
import { Play, CheckCircle, AlertTriangle } from "lucide-react";

export default function MultipleUrlOpener() {
  const [urlsInput, setUrlsInput] = useState("https://google.com\nhttps://github.com");
  const [openedCount, setOpenedCount] = useState<number | null>(null);

  const handleOpen = () => {
    if (!urlsInput.trim()) return;

    const lines = urlsInput.split("\n");
    const urlsToOpen: string[] = [];

    lines.forEach((line) => {
      let trimmed = line.trim();
      if (!trimmed) return;

      if (!/^https?:\/\//i.test(trimmed)) {
        trimmed = "https://" + trimmed;
      }
      urlsToOpen.push(trimmed);
    });

    urlsToOpen.forEach((url) => {
      window.open(url, "_blank");
    });

    setOpenedCount(urlsToOpen.length);
    import("canvas-confetti").then((m) => m.default({ particleCount: 30, spread: 50, origin: { y: 0.85 } }));
  };

  return (
    <div className="flex flex-col gap-6 text-foreground text-xs">
      
      <div className="flex flex-col gap-2">
        <label className="font-bold text-sm block">Enter URLs to Open (one per line)</label>
        <p className="text-muted leading-relaxed text-3xs">
          Open multiple destinations simultaneously. If URLs fail to open, check and enable <strong>Popups and Redirects</strong> settings in your browser address bar.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <textarea
          value={urlsInput}
          onChange={(e) => setUrlsInput(e.target.value)}
          placeholder="Enter list of links (e.g. google.com)..."
          className="h-32 w-full p-4 bg-white dark:bg-card border border-border rounded-xl outline-none focus:border-[#7d4dff] font-mono leading-relaxed"
        />
        
        <button
          onClick={handleOpen}
          className="px-6 py-2.5 font-bold bg-[#7d4dff] hover:bg-[#6530ef] text-white rounded-xl transition-colors cursor-pointer w-fit select-none flex items-center gap-1.5"
        >
          <Play className="h-4 w-4" /> Open All URLs
        </button>
      </div>

      {openedCount !== null && (
        <div className="p-4 border border-border rounded-2xl bg-white dark:bg-[#1c2230] flex flex-col gap-2">
          <div className="flex items-center gap-2 text-emerald-400 font-bold">
            <CheckCircle className="h-5 w-5" />
            <span>Attempted to open {openedCount} tabs!</span>
          </div>
          <div className="flex items-start gap-2 p-3 bg-amber-500/5 text-amber-500 rounded-xl border border-amber-500/10 text-3xs">
            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>If some tabs did not load, please verify that popup blocker settings allow redirects on this site.</span>
          </div>
        </div>
      )}

    </div>
  );
}
