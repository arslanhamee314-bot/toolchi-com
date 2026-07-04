"use client";

import React, { useState, useRef, useEffect } from "react";
import { Download, CheckCircle, Image as ImageIcon } from "lucide-react";

export default function DummyImageGen() {
  const [width, setWidth] = useState(350);
  const [height, setHeight] = useState(250);
  const [text, setText] = useState("");
  const [bgColor, setBgColor] = useState("#7d4dff");
  const [textColor, setTextColor] = useState("#ffffff");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const drawImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    // Draw background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    // Draw text
    ctx.fillStyle = textColor;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Dynamic font sizing based on resolution
    const fontSize = Math.max(12, Math.floor(Math.min(width, height) * 0.08));
    ctx.font = `bold ${fontSize}px sans-serif`;

    const displayText = text.trim() || `${width} x ${height}`;
    ctx.fillText(displayText, width / 2, height / 2);
  };

  useEffect(() => {
    drawImage();
  }, [width, height, text, bgColor, textColor]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `placeholder-${width}x${height}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    import("canvas-confetti").then((m) => m.default({ particleCount: 30, spread: 50, origin: { y: 0.85 } }));
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 text-foreground text-xs">
      
      {/* Settings inputs */}
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="font-bold text-sm block">Configure Image Dimensions</label>
          <p className="text-muted leading-relaxed text-3xs">Configure widths, backgrounds, and custom text tags to build prototypes.</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-muted block text-3xs font-bold uppercase mb-1">Width (px)</label>
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full px-4 py-2.5 bg-white dark:bg-card border border-border rounded-xl outline-none focus:border-[#7d4dff]"
            />
          </div>
          <div>
            <label className="text-muted block text-3xs font-bold uppercase mb-1">Height (px)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full px-4 py-2.5 bg-white dark:bg-card border border-border rounded-xl outline-none focus:border-[#7d4dff]"
            />
          </div>
        </div>

        <div>
          <label className="text-muted block text-3xs font-bold uppercase mb-1">Overlay Text (Optional)</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Defaults to resolution (e.g. 350x250)..."
            className="w-full px-4 py-2.5 bg-white dark:bg-card border border-border rounded-xl outline-none focus:border-[#7d4dff]"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-muted block text-3xs font-bold uppercase mb-1">Background HEX</label>
            <div className="flex gap-2 items-center">
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="h-9 w-9 rounded-xl border border-border overflow-hidden cursor-pointer shrink-0"
              />
              <input
                type="text"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-card border border-border rounded-xl outline-none focus:border-[#7d4dff] font-mono"
              />
            </div>
          </div>
          <div>
            <label className="text-muted block text-3xs font-bold uppercase mb-1">Text Color HEX</label>
            <div className="flex gap-2 items-center">
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="h-9 w-9 rounded-xl border border-border overflow-hidden cursor-pointer shrink-0"
              />
              <input
                type="text"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-card border border-border rounded-xl outline-none focus:border-[#7d4dff] font-mono"
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleDownload}
          className="px-6 py-2.5 font-bold bg-[#7d4dff] hover:bg-[#6530ef] text-white rounded-xl transition-colors cursor-pointer w-fit select-none flex items-center gap-1.5"
        >
          <Download className="h-4 w-4" /> Download PNG
        </button>
      </div>

      {/* Canvas preview */}
      <div className="flex-1 flex flex-col gap-3 justify-center items-center">
        <span className="text-muted text-3xs font-bold uppercase">Image Preview</span>
        <div className="border border-border/80 rounded-2xl p-4 bg-white dark:bg-card/40 flex items-center justify-center max-w-full overflow-auto shadow-sm">
          <canvas ref={canvasRef} className="max-w-full rounded border border-border" />
        </div>
      </div>

    </div>
  );
}
