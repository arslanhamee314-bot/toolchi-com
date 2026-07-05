"use client";

import React, { useState, useRef, useEffect } from "react";
import { Upload, Download, CheckCircle, RefreshCw, AlertCircle } from "lucide-react";

export default function ImageCompressor() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [quality, setQuality] = useState(0.75);
  const [exportFormat, setExportFormat] = useState("image/webp"); // image/webp, image/png, image/jpeg, original
  const [compressing, setCompressing] = useState(false);
  const [stats, setStats] = useState<any>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Hook into central sample data event
  useEffect(() => {
    const handleLoadSample = async (e: any) => {
      if (e.detail?.slug === "compress-image") {
        setCompressing(true);
        try {
          const response = await fetch("/logo.jpg");
          const blob = await response.blob();
          const file = new File([blob], "toolchi-logo.jpg", { type: "image/jpeg" });
          loadSelectedFile(file);
        } catch (err) {
          console.error("Failed to load image sample", err);
        } finally {
          setCompressing(false);
        }
      }
    };

    window.addEventListener("load-sample", handleLoadSample);
    return () => window.removeEventListener("load-sample", handleLoadSample);
  }, []);

  const loadSelectedFile = (file: File) => {
    setSelectedFile(file);
    setStats(null);
    setCompressedUrl(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      setOriginalUrl(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    loadSelectedFile(file);
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

      const mimeType = exportFormat === "original" ? selectedFile.type : exportFormat;
      const resultDataUrl = canvas.toDataURL(mimeType, quality);

      // Estimate compressed size
      const base64Length = resultDataUrl.split(",")[1].length;
      const compressedSize = Math.round(base64Length * 0.75); // base64 to byte approximation

      const savings = selectedFile.size - compressedSize;
      const pct = Math.round((savings / selectedFile.size) * 100);

      // Generate a pretty filename extension matching the target mime
      const formatExt = mimeType === "image/webp" ? "webp" : mimeType === "image/png" ? "png" : "jpg";

      setCompressedUrl(resultDataUrl);
      setStats({
        originalSize: (selectedFile.size / 1024).toFixed(1) + " KB",
        compressedSize: (compressedSize / 1024).toFixed(1) + " KB",
        savingsPercent: pct > 0 ? pct + "%" : "0%",
        savings: (savings / 1024).toFixed(1) + " KB",
        targetFilename: `optimized-${selectedFile.name.split(".")[0]}.${formatExt}`
      });
      setCompressing(false);
      import("canvas-confetti").then((m) => m.default({ particleCount: 30, spread: 50, origin: { y: 0.85 } }));
    };
  };

  const handleDownload = () => {
    if (!compressedUrl || !selectedFile || !stats) return;
    const link = document.createElement("a");
    link.href = compressedUrl;
    link.download = stats.targetFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setOriginalUrl(null);
    setCompressedUrl(null);
    setStats(null);
  };

  return (
    <div className="flex flex-col gap-6 text-foreground text-xs">
      <canvas ref={canvasRef} className="hidden" />

      {/* Standardized Alert Notice for Limits & Formats */}
      <div className="flex items-start gap-3 bg-neutral-50 dark:bg-neutral-800/30 border border-border p-4 rounded-xl">
        <AlertCircle className="h-4.5 w-4.5 text-primary shrink-0 mt-0.5" />
        <div className="flex-1 flex flex-col gap-0.5">
          <span className="font-extrabold text-foreground">Local Browser Processing</span>
          <p className="text-muted-foreground leading-normal text-3xs">
            Supports JPEG, PNG, and WebP format imports. Suggested max file size limit: 10MB. 100% private, files never leave your system.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center border-2 border-dashed border-border hover:border-[#7d4dff] rounded-2xl p-8 bg-white dark:bg-card/50 transition-colors relative group select-none min-h-[160px]">
        {!originalUrl && (
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg, image/webp"
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        )}
        {originalUrl ? (
          <div className="flex flex-col items-center gap-3">
            <img src={originalUrl} alt="Original Preview" className="max-h-36 object-contain rounded-lg border border-border shadow-xs" />
            <div className="flex flex-col items-center gap-0.5">
              <span className="font-bold">{selectedFile?.name}</span>
              <span className="text-[10px] text-muted-foreground">Original: {(selectedFile!.size / 1024).toFixed(1)} KB</span>
            </div>
            <button
              onClick={clearSelection}
              className="px-3 py-1.5 border border-border hover:bg-neutral-100 dark:hover:bg-neutral-800 text-foreground font-bold text-3xs rounded-lg transition-colors cursor-pointer flex items-center gap-1"
            >
              <RefreshCw className="h-3 w-3" /> Clear selection
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted group-hover:text-[#7d4dff] transition-colors">
            <Upload className="h-8 w-8" />
            <span className="font-bold">Upload image file</span>
            <span className="text-3xs">Drag and drop here, or click to browse</span>
          </div>
        )}
      </div>

      {originalUrl && (
        <div className="flex flex-col gap-5 border border-border/60 rounded-2xl p-5 bg-neutral-50 dark:bg-neutral-900/35">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Format Selection Dropdown */}
            <div className="flex flex-col gap-2">
              <label className="font-bold text-3xs uppercase tracking-wider text-muted-foreground">Export Target Format</label>
              <select
                value={exportFormat}
                onChange={(e) => setExportFormat(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-[#1a1f2c] border border-border rounded-xl outline-none focus:border-primary text-foreground text-xs font-semibold"
              >
                <option value="image/webp">WebP format (Recommended for web)</option>
                <option value="image/jpeg">JPEG format (Best for photos)</option>
                <option value="image/png">PNG format (Lossless / transparency)</option>
                <option value="original">Original imported format</option>
              </select>
            </div>

            {/* Quality Slider Control */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="font-bold text-3xs uppercase tracking-wider text-muted-foreground">Compression Level</label>
                <span className="font-extrabold text-[#7d4dff] text-2xs">{Math.round(quality * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.05"
                value={quality}
                onChange={(e) => setQuality(parseFloat(e.target.value))}
                className="w-full h-2 rounded-lg bg-neutral-200 dark:bg-neutral-800 accent-[#7d4dff] cursor-pointer mt-1"
              />
            </div>
          </div>

          <button
            onClick={handleCompress}
            className="px-6 py-2.5 font-bold bg-[#7d4dff] hover:bg-[#6530ef] text-white rounded-xl transition-all cursor-pointer w-fit select-none active:scale-95 shadow-sm shadow-[#7d4dff]/10"
            disabled={compressing}
          >
            {compressing ? "Optimizing..." : "Compress Image"}
          </button>
        </div>
      )}

      {stats && (
        <div className="border border-border rounded-2xl p-5 bg-white dark:bg-[#1c2230] flex flex-col gap-4 shadow-xs animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-2 border-b border-border/40 pb-3">
            <CheckCircle className="h-5 w-5 text-emerald-400" />
            <h3 className="font-extrabold text-sm">Optimization Complete</h3>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-neutral-50 dark:bg-neutral-800/40 rounded-xl border border-border/40">
              <span className="text-muted-foreground block text-[9px] font-semibold uppercase tracking-wider mb-0.5">Original Size</span>
              <span className="font-extrabold text-sm text-foreground">{stats.originalSize}</span>
            </div>
            <div className="p-3 bg-neutral-50 dark:bg-neutral-800/40 rounded-xl border border-border/40">
              <span className="text-muted-foreground block text-[9px] font-semibold uppercase tracking-wider mb-0.5">Optimized Size</span>
              <span className="font-extrabold text-sm text-emerald-400">{stats.compressedSize}</span>
            </div>
            <div className="p-3 bg-neutral-50 dark:bg-neutral-800/40 rounded-xl border border-border/40 bg-emerald-500/5 border-emerald-500/10">
              <span className="text-emerald-500/80 block text-[9px] font-semibold uppercase tracking-wider mb-0.5">Saved Percentage</span>
              <span className="font-extrabold text-sm text-emerald-500">{stats.savingsPercent}</span>
            </div>
          </div>

          <button
            onClick={handleDownload}
            className="px-6 py-2.5 font-bold bg-[#7d4dff] hover:bg-[#6530ef] text-white rounded-xl transition-all cursor-pointer flex items-center gap-1.5 w-fit select-none shadow-md shadow-[#7d4dff]/15 active:scale-95"
          >
            <Download className="h-4 w-4" /> Download optimized file ({stats.compressedSize})
          </button>
        </div>
      )}

    </div>
  );
}
