"use client";

import React, { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Download, RotateCcw, QrCode } from "lucide-react";

export default function QrGenerator() {
  const [text, setText] = useState("https://toolchi.online");
  const qrRef = useRef<HTMLDivElement>(null);

  const downloadQR = () => {
    if (!qrRef.current) return;
    const svgElement = qrRef.current.querySelector("svg");
    if (!svgElement) return;

    // Convert SVG to XML String
    const svgString = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    
    // Create image and draw to canvas to download as PNG
    const img = new Image();
    const svgUrl = URL.createObjectURL(svgBlob);
    
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, 256, 256);
        ctx.drawImage(img, 0, 0, 256, 256);
        
        const pngUrl = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "toolchi-qr.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        
        import("canvas-confetti").then((m) => m.default({ particleCount: 30, spread: 50, origin: { y: 0.8 } }));
      }
      URL.revokeObjectURL(svgUrl);
    };
    
    img.src = svgUrl;
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 items-center justify-center p-4">
      <div className="flex-1 flex flex-col gap-4 w-full">
        <label className="text-2xs font-semibold text-muted-foreground uppercase tracking-wider">
          QR Code Content (URL or Text)
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter link or information to encode..."
          className="w-full min-h-24 bg-neutral-950 border border-border focus:border-primary/50 outline-hidden rounded-xl p-4 text-sm text-white placeholder-muted-foreground/60 resize-y transition-colors"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={() => setText("")}
            className="p-2.5 hover:bg-muted text-muted-foreground hover:text-white rounded-lg border border-border/40 transition-colors"
            title="Reset"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            onClick={downloadQR}
            disabled={!text}
            className="px-4 py-2.5 text-xs font-bold bg-primary border border-primary text-primary-foreground hover:bg-primary-hover disabled:opacity-50 rounded-xl transition-all active:scale-95 shadow-md shadow-primary/10 flex items-center gap-1.5"
          >
            <Download className="h-4 w-4" /> Download PNG
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-3 shrink-0 p-4 border border-border bg-neutral-900/40 rounded-2xl">
        <div ref={qrRef} className="bg-white p-4 rounded-xl border border-neutral-200">
          {text ? (
            <QRCodeSVG value={text} size={160} />
          ) : (
            <div className="h-40 w-40 flex items-center justify-center text-neutral-300">
              <QrCode className="h-12 w-12 stroke-thin" />
            </div>
          )}
        </div>
        <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Live Preview</span>
      </div>
    </div>
  );
}
