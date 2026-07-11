"use client";

import React, { useState, useRef, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Download, RotateCcw, QrCode } from "lucide-react";
import BrandingOptions, { getBrandingConfig } from "@/components/workspace/BrandingOptions";
import { isProUser } from "@/lib/pro-features";

export default function QrGenerator() {
  const [text, setText] = useState("https://toolchi.online");
  const [isPro, setIsPro] = useState(false);
  const [brandText, setBrandText] = useState("Powered by Toolchi");
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsPro(isProUser());
    const brand = getBrandingConfig();
    if (brand.enabled) setBrandText(brand.text);

    const handler = () => {
      setIsPro(isProUser());
      const b = getBrandingConfig();
      if (b.enabled) setBrandText(b.text);
    };
    window.addEventListener("toolchi_pro_change", handler);
    window.addEventListener("toolchi_branding_change", handler);
    return () => {
      window.removeEventListener("toolchi_pro_change", handler);
      window.removeEventListener("toolchi_branding_change", handler);
    };
  }, []);

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
      const brand = getBrandingConfig();
      const hasBrand = brand.enabled;
      
      const canvas = document.createElement("canvas");
      canvas.width = 256;
      // If branding is enabled, add bottom strip
      canvas.height = hasBrand ? 284 : 256;
      
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, 256, canvas.height);
        ctx.drawImage(img, 0, 0, 256, 256);
        
        if (hasBrand) {
          ctx.fillStyle = "rgba(100, 100, 100, 0.75)";
          ctx.font = "bold 10px sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          // Draw thin separation line
          ctx.strokeStyle = "#f3f4f6";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(12, 256);
          ctx.lineTo(244, 256);
          ctx.stroke();
          ctx.fillText(brand.text, 128, 270);
        }

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

  const brand = getBrandingConfig();

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start justify-center p-4 w-full">
      <div className="flex-1 flex flex-col gap-5 w-full">
        <div className="flex flex-col gap-4">
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

        {/* Branding Settings Option Panel */}
        <BrandingOptions />
      </div>

      <div className="flex flex-col items-center justify-center gap-3 shrink-0 p-6 border border-border bg-neutral-900/40 rounded-2xl w-full lg:w-fit">
        <div ref={qrRef} className="bg-white p-4 rounded-xl border border-neutral-200">
          {text ? (
            <QRCodeSVG 
              value={text} 
              size={160} 
              imageSettings={
                (brand.enabled && isPro)
                  ? {
                      src: "/logo.jpg",
                      x: undefined,
                      y: undefined,
                      height: 24,
                      width: 24,
                      excavate: true,
                    }
                  : undefined
              }
            />
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
