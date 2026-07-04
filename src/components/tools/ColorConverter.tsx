"use client";

import React, { useState, useEffect } from "react";
import { Copy, Check } from "lucide-react";

export default function ColorConverter() {
  const [hex, setHex] = useState("#046bd2");
  const [rgb, setRgb] = useState("rgb(4, 107, 210)");
  const [hsl, setHsl] = useState("hsl(210, 96%, 42%)");
  const [activeCopied, setActiveCopied] = useState<string | null>(null);

  // Conversion math helpers
  const hexToRgb = (hexVal: string) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    const fullHex = hexVal.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setHex(val);
    if (/^#[0-9A-F]{6}$/i.test(val)) {
      const rgbRes = hexToRgb(val);
      if (rgbRes) {
        setRgb(`rgb(${rgbRes.r}, ${rgbRes.g}, ${rgbRes.b})`);
        const hslRes = rgbToHsl(rgbRes.r, rgbRes.g, rgbRes.b);
        setHsl(`hsl(${hslRes.h}, ${hslRes.s}%, ${hslRes.l}%)`);
      }
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setActiveCopied(type);
    import("canvas-confetti").then((m) => m.default({ particleCount: 20, spread: 40, origin: { y: 0.85 } }));
    setTimeout(() => setActiveCopied(null), 2000);
  };

  const applyPresetColor = (presetHex: string) => {
    setHex(presetHex);
    const rgbRes = hexToRgb(presetHex);
    if (rgbRes) {
      const rgbStr = `rgb(${rgbRes.r}, ${rgbRes.g}, ${rgbRes.b})`;
      setRgb(rgbStr);
      const hslRes = rgbToHsl(rgbRes.r, rgbRes.g, rgbRes.b);
      setHsl(`hsl(${hslRes.h}, ${hslRes.s}%, ${hslRes.l}%)`);
    }
    import("canvas-confetti").then((m) => m.default({ particleCount: 20, spread: 40, origin: { y: 0.85 } }));
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 items-center justify-center">
      <div className="flex-1 flex flex-col gap-4 w-full">
        
        {/* Preset colors (inspired by Omni Calculator swatches) */}
        <div className="flex flex-col gap-1.5 mb-1 select-none">
          <label className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">Select Preset Palette Swatch</label>
          <div className="flex gap-2">
            {["#7d4dff", "#6530ef", "#10b981", "#ef4444", "#f59e0b", "#3b82f6"].map((c) => (
              <button
                key={c}
                onClick={() => applyPresetColor(c)}
                style={{ backgroundColor: c }}
                className="h-6 w-6 rounded-full border border-white/20 hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                title={c}
              />
            ))}
          </div>
        </div>
        {/* Hex Input */}
        <div className="flex flex-col gap-1.5">
          <label className="text-2xs font-semibold text-muted-foreground uppercase tracking-wider">Hex Code</label>
          <div className="flex bg-neutral-950 border border-border focus-within:border-primary/50 rounded-xl px-3 py-2 items-center justify-between">
            <input
              type="text"
              value={hex}
              onChange={handleHexChange}
              placeholder="#FFFFFF"
              className="bg-transparent border-0 outline-hidden text-xs font-mono text-white w-full"
            />
            <button
              onClick={() => copyToClipboard(hex, "hex")}
              className="p-1 hover:bg-neutral-800 rounded text-muted-foreground hover:text-white transition-colors"
            >
              {activeCopied === "hex" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* RGB Output */}
        <div className="flex flex-col gap-1.5">
          <label className="text-2xs font-semibold text-muted-foreground uppercase tracking-wider">RGB Format</label>
          <div className="flex bg-neutral-900 border border-border rounded-xl px-3 py-2 items-center justify-between">
            <span className="text-xs font-mono text-indigo-300">{rgb}</span>
            <button
              onClick={() => copyToClipboard(rgb, "rgb")}
              className="p-1 hover:bg-neutral-800 rounded text-muted-foreground hover:text-white transition-colors"
            >
              {activeCopied === "rgb" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* HSL Output */}
        <div className="flex flex-col gap-1.5">
          <label className="text-2xs font-semibold text-muted-foreground uppercase tracking-wider">HSL Format</label>
          <div className="flex bg-neutral-900 border border-border rounded-xl px-3 py-2 items-center justify-between">
            <span className="text-xs font-mono text-indigo-300">{hsl}</span>
            <button
              onClick={() => copyToClipboard(hsl, "hsl")}
              className="p-1 hover:bg-neutral-800 rounded text-muted-foreground hover:text-white transition-colors"
            >
              {activeCopied === "hsl" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Tailwind CSS Format */}
        <div className="flex flex-col gap-1.5">
          <label className="text-2xs font-semibold text-muted-foreground uppercase tracking-wider">Tailwind CSS Format</label>
          <div className="flex bg-neutral-900 border border-border rounded-xl px-3 py-2 items-center justify-between">
            <span className="text-xs font-mono text-indigo-300">bg-[{hex}]</span>
            <button
              onClick={() => copyToClipboard(`bg-[${hex}]`, "tw")}
              className="p-1 hover:bg-neutral-800 rounded text-muted-foreground hover:text-white transition-colors"
            >
              {activeCopied === "tw" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
        </div>

      </div>

      {/* Color Preview Block */}
      <div className="flex flex-col items-center justify-center gap-3 shrink-0 p-4 border border-border bg-neutral-900/40 rounded-2xl w-full md:w-48">
        <div 
          className="h-28 w-full md:w-36 rounded-xl border border-border/80 shadow-inner transition-colors duration-300"
          style={{ backgroundColor: hex }}
        />
        <div className="text-center">
          <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider block">Visual Preview</span>
          <span className="text-2xs font-mono font-bold text-white uppercase">{hex}</span>
        </div>
      </div>
    </div>
  );
}
