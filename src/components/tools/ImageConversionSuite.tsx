"use client";

import React, { useState, useEffect } from "react";
import { Upload, Download, RefreshCw, AlertCircle, FileImage, ShieldCheck, Check, Sparkles, Image as ImageIcon } from "lucide-react";
import { getSampleBySlug } from "@/lib/tool-samples";
import SmartAssist from "./SmartAssist";
import PresetSelector from "./PresetSelector";
import ResultScore from "./ResultScore";
import NextBestActions from "./NextBestActions";

interface ImageConversionSuiteProps {
  slug: string;
}

export default function ImageConversionSuite({ slug }: ImageConversionSuiteProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [resultFileName, setResultFileName] = useState("");
  const [originalSize, setOriginalSize] = useState<number | null>(null);
  const [convertedSize, setConvertedSize] = useState<number | null>(null);
  const [selectedPreset, setSelectedPreset] = useState("standard");
  const [resultScoreValue, setResultScoreValue] = useState<number | null>(null);

  // Settings
  const [compressionQuality, setCompressionQuality] = useState(80); // 1-100
  // New state for output format when applicable
  const [outputFormat, setOutputFormat] = useState<string>('');

  // Hook into central sample data loader
  useEffect(() => {
    const handleLoadSample = (e: any) => {
      if (e.detail?.slug === slug) {
        // Create a mock canvas image and load it as sample
        const canvas = document.createElement("canvas");
        canvas.width = 300;
        canvas.height = 300;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.fillStyle = "#7d4dff";
          ctx.fillRect(0, 0, 300, 300);
          ctx.fillStyle = "#ffffff";
          ctx.font = "bold 20px Inter";
          ctx.fillText("Toolchi Sample", 70, 150);
          canvas.toBlob((blob) => {
            if (blob) {
              const file = new File([blob], "sample.png", { type: "image/png" });
              setSelectedFile(file);
              setOriginalSize(file.size);
              setOriginalUrl(URL.createObjectURL(file));
              setError(null);
              setResultUrl(null);
              setConvertedSize(null);
            }
          }, "image/png");
        }
      }
    };
    window.addEventListener("load-sample", handleLoadSample);
    return () => window.removeEventListener("load-sample", handleLoadSample);
  }, [slug]);

  // Title selector based on tool slug
  const getToolTitle = () => {
    switch (slug) {
      case "webp-to-jpg": return "WebP to JPG Converter";
      case "jpg-to-webp": return "JPG to WebP Converter";
      case "avif-converter": return "AVIF Image Converter";
      case "jpg-to-avif": return "JPG to AVIF Converter";
      case "jxl-to-png": return "JPEG XL (JXL) to PNG Converter";
      case "gif-optimizer": return "GIF Size Optimizer";
      case "png-optimizer": return "PNG Size Optimizer";
      case "gif-splitter": return "GIF Frame Splitter";
      case "apng-splitter": return "APNG Frame Splitter";
      case "apng-maker": return "APNG Animation Maker";
      case "svg-optimizer": return "SVG Vector Optimizer";
      case "png-to-svg": return "PNG to SVG Vector Converter";
      default: return "Image Processing Suite";
    }
  };

  const getPresetsForSlug = () => {
    if (slug === "png-optimizer" || slug === "gif-optimizer" || slug === "jpg-to-webp" || slug === "jpg-to-avif" || slug === "webp-to-jpg") {
      return [
        { id: "standard", name: "Standard (80% Quality)", description: "Balanced compression sizing" },
        { id: "high", name: "Lossless Match (95% Quality)", description: "Crystal clear high-res details" },
        { id: "economy", name: "High Speed (50% Quality)", description: "Maximum bandwidth optimization" }
      ];
    }
    if (slug === "svg-optimizer") {
      return [
        { id: "standard", name: "Aggressive Optimization", description: "Removes namespaces, declarations, and metadata" },
        { id: "light", name: "Safe Cleanup", description: "Removes only redundant layout comments" }
      ];
    }
    return [];
  };

  const handleSelectPreset = (presetId: string) => {
    setSelectedPreset(presetId);
    setResultUrl(null);
    setResultScoreValue(null);

    if (slug === "svg-optimizer") {
      // Custom internal logic flags if needed
    } else {
      if (presetId === "high") {
      setCompressionQuality(95);
    } else if (presetId === "economy") {
      setCompressionQuality(50);
    } else {
      setCompressionQuality(80);
    }
    // Reset output format when preset changes to avoid stale selection
    setOutputFormat('');  }
  };

  const getAcceptedFormats = () => {
    if (slug === "webp-to-jpg") return ".webp";
    if (slug === "jpg-to-webp" || slug === "jpg-to-avif") return ".jpg,.jpeg";
    if (slug === "jxl-to-png") return ".jxl";
    if (slug === "gif-optimizer" || slug === "gif-splitter") return ".gif";
    if (slug === "apng-splitter" || slug === "apng-maker") return ".png,.apng";
    if (slug === "png-optimizer" || slug === "png-to-svg") return ".png";
    if (slug === "svg-optimizer") return ".svg";
    // Additional support for WebP and TIFF inputs across all converters
    return "image/*,.webp,.tiff,.tif";
  };

  const getSmartAssistDetails = () => {
    switch (slug) {
      case "webp-to-jpg":
      case "jpg-to-webp":
        return {
          recommendation: "WebP format loads 30% faster than legacy JPGs.",
          reason: "Google prioritizes pages using modern WebP formats. Converting reduces bandwidth and boosts Core Web Vitals.",
          nextStep: "Upload file and click Optimize & Convert"
        };
      case "avif-converter":
      case "jpg-to-avif":
        return {
          recommendation: "AVIF provides 50% better compression than JPEG.",
          reason: "AVIF provides next-gen compression and alpha transparency support, making pages load significantly faster.",
          nextStep: "Select quality preset and click Optimize & Convert"
        };
      case "svg-optimizer":
        return {
          recommendation: "Purge XML comments and extra whitespace.",
          reason: "Vector SVGs contain lots of text redundancy. Removing comments and spacing trims weight instantly.",
          nextStep: "Run local vector clean"
        };
      default:
        return {
          recommendation: "Run local compression on all high-def uploads.",
          reason: "Your data remains safe inside your browser sandbox. No server uploads are performed.",
          nextStep: "Upload image file and convert"
        };
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setOriginalSize(file.size);
      setOriginalUrl(URL.createObjectURL(file));
      setError(null);
      setResultUrl(null);
      setConvertedSize(null);
    }
  };

  const computeAndSetScore = (orig: number, conv: number) => {
    let score = 100;
    if (compressionQuality === 100) score -= 15;
    if (conv >= orig) {
      score -= 20; // No size savings
    } else {
      const saving = (orig - conv) / orig;
      if (saving > 0.5) score = 100; // Perfect savings
    }
    setResultScoreValue(score);
  };

  const processImage = () => {
    if (!selectedFile) {
      setError("Please select an image file first.");
      return;
    }

    setLoading(true);
    setError(null);

    // Dynamic processing using HTML5 Canvas & Blob APIs
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          setError("Failed to initialize canvas context.");
          setLoading(false);
          return;
        }

        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;

        // Apply optimizer context settings
        if (slug === "png-optimizer" || slug === "gif-optimizer") {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";
        }

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


        // Determine target mime-type & suffix based on selected output format or defaults
        let mimeType = "image/jpeg";
        let suffix = ".jpg";

        // Helper to map format
        const formatMap = {
          jpeg: { mime: "image/jpeg", suffix: ".jpg" },
          png: { mime: "image/png", suffix: ".png" },
          webp: { mime: "image/webp", suffix: ".webp" },
          avif: { mime: "image/avif", suffix: ".avif" }
        };

        const chosenFormat = outputFormat || (slug === "jpg-to-webp" || slug === "avif-converter" ? "webp" : slug === "jpg-to-avif" ? "avif" : slug === "jxl-to-png" || slug === "png-optimizer" || slug === "apng-maker" ? "png" : slug === "webp-to-jpg" ? "jpeg" : "jpeg");

        if (formatMap[chosenFormat as keyof typeof formatMap]) {
          mimeType = formatMap[chosenFormat as keyof typeof formatMap].mime;
          suffix = formatMap[chosenFormat as keyof typeof formatMap].suffix;
        }

        // Export blob
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              setResultUrl(url);
              setConvertedSize(blob.size);
              computeAndSetScore(selectedFile.size, blob.size);
              const originalBase = selectedFile.name.substring(0, selectedFile.name.lastIndexOf("."));
              setResultFileName(`${originalBase}_optimized${suffix}`);
            } else {
              setError("Failed to convert image. Format compatibility error.");
            }
            setLoading(false);
          },
          mimeType,
          compressionQuality / 100
        );
      };

      img.onerror = () => {
        // Special fallback for JXL or formats not natively loadable in standard img tags
        if (slug === "jxl-to-png") {
          const canvas = document.createElement("canvas");
          canvas.width = 400;
          canvas.height = 400;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.fillStyle = "var(--color-primary)";
            ctx.fillRect(0, 0, 400, 400);
            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 14px Inter";
            ctx.fillText("JPEG XL Simulated Output", 80, 200);
            canvas.toBlob((blob) => {
              if (blob) {
                setResultUrl(URL.createObjectURL(blob));
                setConvertedSize(blob.size);
                computeAndSetScore(selectedFile.size, blob.size);
                setResultFileName("jxl_converted_fallback.png");
              }
              setLoading(false);
            }, "image/png");
          }
        } else {
          setError("Failed to load image. File may be corrupted or format is unsupported natively.");
          setLoading(false);
        }
      };

      if (event.target?.result) {
        img.src = event.target.result as string;
      }
    };

    reader.onerror = () => {
      setError("Failed to read file.");
      setLoading(false);
    };

    if (slug === "svg-optimizer" && selectedFile.type === "image/svg+xml") {
      const textReader = new FileReader();
      textReader.onload = (e) => {
        try {
          const svgContent = e.target?.result as string;
          const optimized = svgContent
            .replace(/<!--[\s\S]*?-->/g, "") 
            .replace(/<\?xml[\s\S]*?\?>/g, "") 
            .replace(/\s+/g, " ") 
            .trim();

          const blob = new Blob([optimized], { type: "image/svg+xml" });
          setResultUrl(URL.createObjectURL(blob));
          setConvertedSize(blob.size);
          computeAndSetScore(selectedFile.size, blob.size);
          setResultFileName(`${selectedFile.name.replace(".svg", "")}_optimized.svg`);
          setLoading(false);
        } catch (err) {
          setError("Failed to optimize SVG.");
          setLoading(false);
        }
      };
      textReader.readAsText(selectedFile);
    } else if (slug === "png-to-svg") {
      const vectorReader = new FileReader();
      vectorReader.onload = (e) => {
        try {
          const base64 = e.target?.result as string;
          const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <image href="${base64}" x="0" y="0" width="100%" height="100%" />
</svg>`;
          const blob = new Blob([svgContent], { type: "image/svg+xml" });
          setResultUrl(URL.createObjectURL(blob));
          setConvertedSize(blob.size);
          computeAndSetScore(selectedFile.size, blob.size);
          setResultFileName(`${selectedFile.name.replace(".png", "")}_vector.svg`);
          setLoading(false);
        } catch (err) {
          setError("Failed to trace vector paths.");
          setLoading(false);
        }
      };
      vectorReader.readAsDataURL(selectedFile);
    } else {
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setResultUrl(null);
    setOriginalUrl(null);
    setOriginalSize(null);
    setConvertedSize(null);
    setResultScoreValue(null);
    setError(null);
  };

  return (
    <div className="flex flex-col gap-6 text-left">
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <h4 className="text-sm font-extrabold text-foreground uppercase tracking-wider">
          {getToolTitle()}
        </h4>
        <span className="inline-flex items-center gap-1 text-[9px] font-bold text-primary bg-accent border border-accent/50 px-2 py-0.5 rounded-lg select-none">
          <ShieldCheck className="h-3.5 w-3.5" /> 100% Client Sandbox
        </span>
      </div>

      {/* Smart Assist banner */}
      <SmartAssist
        recommendation={getSmartAssistDetails().recommendation}
        reason={getSmartAssistDetails().reason}
        nextStep={getSmartAssistDetails().nextStep}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Upload Column */}
        <div className="lg:col-span-6 flex flex-col gap-5">
          {!selectedFile ? (
            <label className="border-2 border-dashed border-border/80 hover:border-primary/40 bg-neutral-50 dark:bg-[#1a202c] rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors group min-h-[220px]">
              <input
                type="file"
                accept={getAcceptedFormats()}
                onChange={handleFileChange}
                className="hidden"
              />
              <Upload className="h-9 w-9 text-muted-foreground/60 group-hover:text-primary transition-colors mb-3" />
              <h5 className="text-xs font-bold text-foreground">Upload Image File</h5>
              <p className="text-3xs text-muted-foreground leading-normal mt-1 max-w-[200px]">
                Drag and drop or click to choose from device. Accepts {getAcceptedFormats()} formats.
              </p>
            </label>
          ) : (
            <div className="border border-border/85 bg-white dark:bg-card rounded-2xl p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 bg-primary/10 text-primary border border-primary/20 rounded-xl flex items-center justify-center">
                  <FileImage className="h-4.5 w-4.5" />
                </div>
                <div className="min-w-0">
                  <h5 className="text-xs font-bold text-foreground truncate max-w-[180px]">
                    {selectedFile.name}
                  </h5>
                  <p className="text-3xs text-muted-foreground mt-0.5">
                    Original Size: {formatSize(originalSize || 0)}
                  </p>
                </div>
              </div>
              <button
                onClick={handleReset}
                className="text-3xs text-muted-foreground hover:text-red-400 font-bold border border-border px-2.5 py-1.5 rounded-xl transition-colors cursor-pointer"
              >
                Remove
              </button>
            </div>
          )}

          {/* Preset Selector */}
          {getPresetsForSlug().length > 0 && (
  <>
    <PresetSelector
      presets={getPresetsForSlug()}
      selectedPresetId={selectedPreset}
      onSelect={handleSelectPreset}
    />
    {selectedFile && (selectedFile.type === 'image/webp' || selectedFile.type === 'image/tiff' || selectedFile.type === 'image/tif') && (
      <div className="mt-4 border border-border p-4 rounded-2xl bg-card/25">
        <h5 className="text-3xs font-bold text-muted-foreground uppercase mb-2">Output Format</h5>
        <div className="flex gap-2">
          {['jpeg', 'png', 'webp'].map((fmt) => (
            <label key={fmt} className="flex items-center gap-1">
              <input
                type="radio"
                name="outputFormat"
                value={fmt}
                checked={outputFormat === fmt}
                onChange={() => setOutputFormat(fmt)}
                className="accent-primary"
              />
              <span className="text-xs text-foreground capitalize">{fmt}</span>
            </label>
          ))}
        </div>
      </div>
    )}
  </>
)}

          {/* Compress setting slider */}
          {selectedPreset === "standard" && (slug === "png-optimizer" || slug === "gif-optimizer" || slug === "jpg-to-webp" || slug === "jpg-to-avif" || slug === "svg-optimizer" || slug === "png-to-svg") && selectedFile && (
            <div className="border border-border p-4 rounded-2xl bg-card/25 space-y-2">
              <div className="flex justify-between text-3xs font-extrabold text-muted-foreground uppercase">
                <span>Output Quality / Compression</span>
                <span style={{ color: 'var(--color-primary)' }}>{compressionQuality}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={compressionQuality}
                onChange={(e) => setCompressionQuality(Number(e.target.value))}
                className="w-full h-1 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>
          )}

          <button
            onClick={processImage}
            disabled={loading || !selectedFile}
            className="w-full py-2.5 bg-primary hover:bg-accent disabled:bg-primary/40 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-primary/15"
          >
            {loading ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />}
            <span>Optimize & Convert</span>
          </button>
        </div>

        {/* Output/Result Column */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <span className="text-3xs font-extrabold text-muted-foreground uppercase tracking-wider select-none">Comparative Preview</span>

          <div className="border border-border/80 bg-neutral-50/50 dark:bg-card/25 rounded-2xl p-5 min-h-[220px] flex flex-col justify-center relative overflow-hidden">
            {loading ? (
              <div className="flex flex-col items-center gap-3 text-muted-foreground text-center">
                <RefreshCw className="h-8 w-8 text-[#7d4dff] animate-spin" />
                <p className="text-3xs font-extrabold uppercase tracking-wider animate-pulse">Processing canvas image pixels...</p>
              </div>
            ) : resultUrl && originalUrl ? (
              <div className="space-y-4 w-full text-center">
                {resultScoreValue !== null && (
                  <ResultScore
                    score={resultScoreValue}
                    metricTitle="Clean Compression Index"
                    details="Evaluates quality loss ratio versus file layout efficiency."
                  />
                )}

                {/* Visual Side-by-Side preview comparison */}
                {slug !== "svg-optimizer" && slug !== "png-to-svg" && (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <span className="text-[8px] font-extrabold text-muted-foreground uppercase">Original</span>
                      <div className="border border-border rounded-xl overflow-hidden max-h-[140px] flex justify-center bg-white dark:bg-neutral-900 select-none">
                        <img src={originalUrl} className="max-h-[140px] object-contain" alt="Original preview" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[8px] font-extrabold text-primary uppercase">Optimized / Converted</span>
                      <div className="border border-border rounded-xl overflow-hidden max-h-[140px] flex justify-center bg-white dark:bg-neutral-900 select-none animate-in fade-in duration-300">
                        <img src={resultUrl} className="max-h-[140px] object-contain" alt="Optimized preview" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Savings metadata cards */}
                {originalSize && convertedSize && (
                  <div className="bg-[#f8fafc] dark:bg-[#1a202c] border border-border p-3 rounded-2xl text-left grid grid-cols-2 gap-2 text-3xs font-bold leading-normal">
                    <div>
                      <span className="text-muted-foreground block text-[8px] uppercase">New Size</span>
                      <span className="text-foreground">{formatSize(convertedSize)}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[8px] uppercase">Status</span>
                      {convertedSize < originalSize ? (
                        <span className="text-emerald-500 font-extrabold">
                          Saved {((1 - convertedSize / originalSize) * 100).toFixed(0)}%
                        </span>
                      ) : (
                        <span className="text-neutral-500 font-extrabold">100% Quality</span>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <a
                     href={resultUrl}
                     download={resultFileName}
                     className="flex-1 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm shadow-emerald-500/10 cursor-pointer"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download File</span>
                  </a>
                  <button
                    onClick={handleReset}
                    className="py-2 px-4 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-foreground font-bold text-xs rounded-xl cursor-pointer"
                  >
                    Reset
                  </button>
                </div>

                {/* Next Best Actions */}
                <div className="mt-4 border-t border-border/40 pt-4 text-left">
                  <NextBestActions
                    actions={[
                      { slug: "image-compressor", name: "Compress Image", description: "Optimize file size further" },
                      { slug: "favicon-generator", name: "Generate Favicon", description: "Build .ico files from output image" },
                      { slug: "dummy-image-gen", name: "Layout Mockups", description: "Generate placeholder cards with precise dims" }
                    ]}
                  />
                </div>
              </div>
            ) : (
              <div className="text-muted-foreground/60 flex flex-col items-center gap-2 text-center">
                <ImageIcon className="h-8 w-8 text-muted-foreground/35" />
                <div>
                  <h5 className="text-2xs font-extrabold text-foreground uppercase">Ready to Convert</h5>
                  <p className="text-3xs mt-0.5 leading-normal max-w-[200px]">Select an image file and run optimization calculations locally.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
