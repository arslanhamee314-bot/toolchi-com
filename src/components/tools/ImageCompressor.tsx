"use client";

import React, { useState, useRef } from "react";
import { Upload, Download, CheckCircle } from "lucide-react";

export default function ImageCompressor() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [quality, setQuality] = useState(0.7);
  const [compressing, setCompressing] = useState(false);
  const [stats, setStats] = useState<any>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setStats(null);
    setCompressedUrl(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      setOriginalUrl(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleCompress = () => {
    if (!originalUrl || !selectedFile) return;
    setCompressing(true);

    const img = new Image();
    img.src = originalUrl;
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0);

      const mimeType = selectedFile.type === "image/png" ? "image/png" : "image/jpeg";
      const resultDataUrl = canvas.toDataURL(mimeType, quality);

      // Estimate compressed size
      const base64Length = resultDataUrl.split(",")[1].length;
      const compressedSize = Math.round(base64Length * 0.75); // base64 to byte approximation

      const savings = selectedFile.size - compressedSize;
      const pct = Math.round((savings / selectedFile.size) * 100);

      setCompressedUrl(resultDataUrl);
      setStats({
        originalSize: (selectedFile.size / 1024).toFixed(2) + " KB",
        compressedSize: (compressedSize / 1024).toFixed(2) + " KB",
        savingsPercent: pct > 0 ? pct + "%" : "0%",
        savings: (savings / 1024).toFixed(2) + " KB"
      });
      setCompressing(false);
      import("canvas-confetti").then((m) => m.default({ particleCount: 30, spread: 50, origin: { y: 0.85 } }));
    };
  };

  const handleDownload = () => {
    if (!compressedUrl || !selectedFile) return;
    const link = document.createElement("a");
    link.href = compressedUrl;
    link.download = `compressed-${selectedFile.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col gap-6 text-foreground text-xs">
      <canvas ref={canvasRef} className="hidden" />

      <div className="flex flex-col gap-2">
        <label className="font-bold text-sm block">Upload PNG or JPG Image</label>
        <p className="text-muted leading-relaxed text-3xs">Optimize image file sizes client-side before loading web pages.</p>
      </div>

      <div className="flex flex-col items-center justify-center border-2 border-dashed border-border hover:border-[#7d4dff] rounded-2xl p-8 bg-white dark:bg-card/50 transition-colors relative group select-none">
        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          onChange={handleFileChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        {originalUrl ? (
          <div className="flex flex-col items-center gap-3">
            <img src={originalUrl} alt="Original" className="max-h-36 object-contain rounded-lg border border-border shadow-xs" />
            <span className="font-bold">{selectedFile?.name}</span>
            <span className="text-3xs text-muted">Click or drag another image to replace</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted group-hover:text-[#7d4dff] transition-colors">
            <Upload className="h-8 w-8" />
            <span className="font-bold">Upload image</span>
            <span className="text-3xs">Drag and drop here, or click to browse</span>
          </div>
        )}
      </div>

      {originalUrl && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <span className="font-bold">Compression Quality: {Math.round(quality * 100)}%</span>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.05"
              value={quality}
              onChange={(e) => setQuality(parseFloat(e.target.value))}
              className="flex-1 max-w-xs accent-[#7d4dff]"
            />
          </div>

          <button
            onClick={handleCompress}
            className="px-6 py-2.5 font-bold bg-[#7d4dff] hover:bg-[#6530ef] text-white rounded-xl transition-colors cursor-pointer w-fit select-none"
            disabled={compressing}
          >
            {compressing ? "Compressing..." : "Compress Image"}
          </button>
        </div>
      )}

      {stats && (
        <div className="border border-border rounded-2xl p-5 bg-white dark:bg-[#1c2230] flex flex-col gap-4 shadow-xs animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-2 border-b border-border/40 pb-3">
            <CheckCircle className="h-5 w-5 text-emerald-400" />
            <h3 className="font-extrabold text-sm">Compression Statistics</h3>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-neutral-50 dark:bg-neutral-800/40 rounded-xl border border-border/40">
              <span className="text-muted block text-3xs font-semibold uppercase">Original Size</span>
              <span className="font-extrabold text-base text-foreground">{stats.originalSize}</span>
            </div>
            <div className="p-3 bg-neutral-50 dark:bg-neutral-800/40 rounded-xl border border-border/40">
              <span className="text-muted block text-3xs font-semibold uppercase">Compressed Size</span>
              <span className="font-extrabold text-base text-emerald-400">{stats.compressedSize}</span>
            </div>
            <div className="p-3 bg-neutral-50 dark:bg-neutral-800/40 rounded-xl border border-border/40">
              <span className="text-muted block text-3xs font-semibold uppercase">Savings</span>
              <span className="font-extrabold text-base text-emerald-400">{stats.savingsPercent}</span>
            </div>
          </div>

          <button
            onClick={handleDownload}
            className="px-6 py-2.5 font-bold bg-[#7d4dff] hover:bg-[#6530ef] text-white rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 w-fit select-none shadow-md shadow-[#7d4dff]/15"
          >
            <Download className="h-4 w-4" /> Download Optimized Image
          </button>
        </div>
      )}

    </div>
  );
}
