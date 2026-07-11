"use client";

import React, { useState, useRef, useEffect } from "react";
import { Upload, Download, CheckCircle, RefreshCw, AlertCircle } from "lucide-react";
import SmartAssist from "./SmartAssist";
import PresetSelector from "./PresetSelector";
import ResultScore from "./ResultScore";
import NextBestActions from "./NextBestActions";
import BrandingOptions from "@/components/workspace/BrandingOptions";


export default function ImageCompressor() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [quality, setQuality] = useState(0.75);
  const [exportFormat, setExportFormat] = useState("image/webp"); // image/webp, image/png, image/jpeg, original
  const [compressing, setCompressing] = useState(false);
  const [stats, setStats] = useState<any>(null);
  const [selectedPreset, setSelectedPreset] = useState("balanced");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const presets = [
    { id: "balanced", name: "Balanced", description: "75% WebP, optimized size" },
    { id: "smallest", name: "Smallest Size", description: "40% WebP for max savings" },
    { id: "best", name: "Best Quality", description: "90% WebP for high fidelity" },
    { id: "blog", name: "Blog Optimized", description: "80% WebP for fast page speeds" }
  ];

  const handleSelectPreset = (presetId: string) => {
    setSelectedPreset(presetId);
    setExportFormat("image/webp");
    if (presetId === "balanced") {
      setQuality(0.75);
    } else if (presetId === "smallest") {
      setQuality(0.4);
    } else if (presetId === "best") {
      setQuality(0.9);
    } else if (presetId === "blog") {
      setQuality(0.8);
    }
  };

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

      // Render branding watermark if enabled
      try {
        const { getBrandingConfig } = require("@/components/workspace/BrandingOptions");
        const brandConfig = getBrandingConfig();
        if (brandConfig.enabled) {
          ctx.save();
          ctx.globalAlpha = brandConfig.opacity;
          // Proportional font sizing
          const fontSize = Math.max(12, Math.round(canvas.width * 0.022));
          ctx.font = `bold ${fontSize}px sans-serif`;
          ctx.fillStyle = "rgba(120, 120, 120, 0.9)";
          ctx.textBaseline = "middle";
          
          const padding = fontSize * 1.5;
          let x = canvas.width - padding;
          let y = canvas.height - padding;
          let align: CanvasTextAlign = "right";

          if (brandConfig.placement === "bottom-left") {
            x = padding;
            align = "left";
          } else if (brandConfig.placement === "bottom-center") {
            x = canvas.width / 2;
            align = "center";
          } else if (brandConfig.placement === "top-right") {
            x = canvas.width - padding;
            y = padding;
            align = "right";
          }

          ctx.textAlign = align;
          // White outline shadow for readability on dark/complex regions
          ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
          ctx.lineWidth = Math.max(2, Math.round(fontSize * 0.15));
          ctx.strokeText(brandConfig.text, x, y);
          ctx.fillText(brandConfig.text, x, y);
          ctx.restore();
        }
      } catch (e) {
        // ignore
      }

      const mimeType = exportFormat === "original" ? selectedFile.type : exportFormat;
      const resultDataUrl = canvas.toDataURL(mimeType, quality);


      // Estimate compressed size
      const base64Length = resultDataUrl.split(",")[1].length;
      const compressedSize = Math.round(base64Length * 0.75); // base64 to byte approximation

      const savings = selectedFile.size - compressedSize;
      const pct = Math.round((savings / selectedFile.size) * 100);

      // Calculate web readiness score (0-100)
      let webScore = 100;
      if (mimeType !== "image/webp" && mimeType !== "image/avif") {
        webScore -= 15; // WebP/AVIF are preferred
      }
      if (quality > 0.85) {
        webScore -= 10; // High quality limits savings
      }
      if (compressedSize > 500000) {
        webScore -= 15; // Still heavy for web
      } else if (compressedSize < 150000) {
        webScore += 5; // Perfect lightweight banner
      }
      webScore = Math.max(20, Math.min(100, webScore));

      // Generate a pretty filename extension matching the target mime
      const formatExt = mimeType === "image/webp" ? "webp" : mimeType === "image/png" ? "png" : "jpg";

      setCompressedUrl(resultDataUrl);
      setStats({
        originalSize: (selectedFile.size / 1024).toFixed(1) + " KB",
        compressedSize: (compressedSize / 1024).toFixed(1) + " KB",
        savingsPercent: pct > 0 ? pct + "%" : "0%",
        savings: (savings / 1024).toFixed(1) + " KB",
        targetFilename: `optimized-${selectedFile.name.split(".")[0]}.${formatExt}`,
        webScore
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

  // Dynamic Smart Assist recommendations
  let recommendation = "WebP 75-80% is recommended for blogs.";
  let reason = "It provides up to 80% size savings compared to PNG/JPEG with imperceptible quality loss.";
  let nextStep = "Convert to WebP format";

  if (exportFormat === "image/png") {
    recommendation = "Convert to WebP format instead of PNG.";
    reason = "PNG is lossless but produces significantly larger files. WebP will shrink file size by up to 80%.";
    nextStep = "Change Export Target Format to WebP";
  } else if (selectedFile && selectedFile.size > 2000000) {
    recommendation = "This image is too large for standard blogs (over 2MB).";
    reason = "We recommend resizing it to 1200px width before compression to prevent slow loading penalty.";
    nextStep = "Resize image under Image Transform tools";
  } else if (quality > 0.85) {
    recommendation = "Try lowering compression level to Balanced (75%).";
    reason = "Quality settings above 85% significantly increase file size without human-visible changes.";
    nextStep = "Select Balanced Preset";
  }

  const nextActions = [
    { slug: "resize-image", name: "Resize Image", description: "Scale image dimensions to match blog heroes or social headers." },
    { slug: "watermark-image", name: "Watermark Image", description: "Protect your graphics with custom copyright text overlays." },
    { slug: "jpg-to-webp", name: "JPG to WebP", description: "Batch convert multiple static files to next-gen formats." }
  ];

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

      {/* Smart Assist Panel */}
      <SmartAssist recommendation={recommendation} reason={reason} nextStep={nextStep} />

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
          {/* Preset Selector */}
          <PresetSelector presets={presets} selectedPresetId={selectedPreset} onSelect={handleSelectPreset} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Format Selection Dropdown */}
            <div className="flex flex-col gap-2">
              <label className="font-bold text-3xs uppercase tracking-wider text-muted-foreground">Export Target Format</label>
              <select
                value={exportFormat}
                onChange={(e) => {
                  setExportFormat(e.target.value);
                  setSelectedPreset(""); // Clear preset on manual select
                }}
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
                onChange={(e) => {
                  setQuality(parseFloat(e.target.value));
                  setSelectedPreset(""); // Clear preset on manual adjust
                }}
                className="w-full h-2 rounded-lg bg-neutral-200 dark:bg-neutral-800 accent-[#7d4dff] cursor-pointer mt-1"
              />
            </div>
          </div>

          {/* Branding Settings Option Panel */}
          <div className="pt-2 border-t border-border/40">
            <BrandingOptions />
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
        <div className="border border-border rounded-2xl p-5 bg-white dark:bg-[#1c2230] flex flex-col gap-5 shadow-xs animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex justify-between items-center border-b border-border/40 pb-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-emerald-400" />
              <h3 className="font-extrabold text-sm">Optimization Complete</h3>
            </div>
          </div>

          {/* Quality Result Score Gauge */}
          <ResultScore score={stats.webScore} metricTitle="Web Speed Readiness Score" details="Measures compression depth, load times suitability, and format next-gen checks." />

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

      {/* Next Best Actions recommendation block */}
      <NextBestActions actions={nextActions} />
    </div>
  );
}
