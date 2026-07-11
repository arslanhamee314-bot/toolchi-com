"use client";

import React, { useState, useRef, useEffect } from "react";
import { Upload, FileImage, Settings, Crop, Download, RefreshCw, AlertCircle, ShieldCheck, Sliders, Type } from "lucide-react";
import SmartAssist from "./SmartAssist";
import PresetSelector from "./PresetSelector";
import ResultScore from "./ResultScore";
import NextBestActions from "./NextBestActions";

interface TransformSuiteProps {
  slug: string;
}

export default function TransformSuite({ slug }: TransformSuiteProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState("standard");
  const [resultScoreValue, setResultScoreValue] = useState<number | null>(null);

  // Image Dimensions
  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalHeight, setOriginalHeight] = useState(0);

  // Settings
  const [resizeW, setResizeW] = useState(300);
  const [resizeH, setResizeH] = useState(300);
  const [cropX, setCropX] = useState(0);
  const [cropY, setCropY] = useState(0);
  const [cropW, setCropW] = useState(200);
  const [cropH, setCropH] = useState(200);
  const [rotateAngle, setRotateAngle] = useState(0);
  
  // Filters
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [grayscale, setGrayscale] = useState(0);
  const [sepia, setSepia] = useState(0);
  const [blur, setBlur] = useState(0);

  // Overlays (Add Text / Watermark)
  const [overlayText, setOverlayText] = useState("Toolchi Watermark");
  const [textX, setTextX] = useState(20);
  const [textY, setTextY] = useState(50);
  const [fontSize, setFontSize] = useState(24);
  const [textColor, setTextColor] = useState("#ffffff");
  const [watermarkOpacity, setWatermarkOpacity] = useState(0.4);

  // Phase 2: Censor / Rounded Corners
  const [censorX, setCensorX] = useState(0);
  const [censorY, setCensorY] = useState(0);
  const [censorW, setCensorW] = useState(100);
  const [censorH, setCensorH] = useState(100);
  const [censorPixelSize, setCensorPixelSize] = useState(12);
  const [cornerRadius, setCornerRadius] = useState(30);

  const imageRef = useRef<HTMLImageElement>(null);

  const getToolTitle = () => {
    switch (slug) {
      case "resize-image": return "Image Resizer (Scale dimensions locally)";
      case "crop-image": return "Image Cropper (Trim canvas segments)";
      case "rotate-image": return "Image Rotator (Spin and flip layout)";
      case "photo-effects":
      case "image-filters":
        return "Image Filters & Creative Effects";
      case "write-on-image": return "Write Text on Image (Captions/Memes)";
      case "watermark-image": return "Watermark Image (Protect creative assets)";
      case "censor-image": return "Censor / Pixelate Image (Blur sensitive areas)";
      case "invert-colors": return "Invert Colors (Negate RGB channels)";
      case "rounded-corners": return "Rounded Corners (Add border radius to image)";
      default: return "Image Transformation Workspace";
    }
  };

  const getPresetsForSlug = () => {
    if (slug === "resize-image") {
      return [
        { id: "standard", name: "Responsive HD (800x600)", description: "Standard layout viewport scaling" },
        { id: "economy", name: "Mobile optimized (480x320)", description: "Aggressive dimensions reduction" },
        { id: "high", name: "Full Presentation (1920x1080)", description: "Crystal clear presentation details" }
      ];
    }
    if (slug === "crop-image") {
      return [
        { id: "standard", name: "Square Avatar (200x200)", description: "Balanced ratio viewport crop" },
        { id: "economy", name: "Header Banner (600x150)", description: "Perfect fit layouts for hero covers" }
      ];
    }
    if (slug === "rotate-image") {
      return [
        { id: "standard", name: "Rotate 90°", description: "Perpendicular landscape rotation" },
        { id: "economy", name: "Flip 180°", description: "Inverted orientation match" }
      ];
    }
    if (slug === "rounded-corners") {
      return [
        { id: "standard", name: "Soft Rounded (12px)", description: "Modern curve corner highlights" },
        { id: "economy", name: "Circular avatar (99px)", description: "Circular avatar design shape" }
      ];
    }
    return [];
  };

  const handleSelectPreset = (presetId: string) => {
    setSelectedPreset(presetId);
    setResultUrl(null);
    setResultScoreValue(null);

    if (slug === "resize-image") {
      if (presetId === "economy") {
        setResizeW(480);
        setResizeH(320);
      } else if (presetId === "high") {
        setResizeW(1920);
        setResizeH(1080);
      } else {
        setResizeW(800);
        setResizeH(600);
      }
    } else if (slug === "crop-image") {
      if (presetId === "economy") {
        setCropW(600);
        setCropH(150);
      } else {
        setCropW(200);
        setCropH(200);
      }
    } else if (slug === "rotate-image") {
      if (presetId === "economy") {
        setRotateAngle(180);
      } else {
        setRotateAngle(90);
      }
    } else if (slug === "rounded-corners") {
      if (presetId === "economy") {
        setCornerRadius(99);
      } else {
        setCornerRadius(12);
      }
    }
  };

  const calculateTransformationScore = () => {
    let score = 98;
    if (slug === "resize-image") {
      if (resizeW > originalWidth || resizeH > originalHeight) {
        score -= 15; // Pixelation risk
      }
    } else if (slug === "crop-image") {
      if (cropW < 50 || cropH < 50) {
        score -= 10; // Low resolution crop
      }
    }
    setResultScoreValue(score);
  };

  const getSmartAssistDetails = () => {
    switch (slug) {
      case "resize-image":
        return {
          recommendation: "Scaling down dimensions speeds up page loading.",
          reason: "Smaller layouts load faster on mobile screens, improving Core Web Vitals score.",
          nextStep: "Select preset values or manually input resize dimensions"
        };
      case "crop-image":
        return {
          recommendation: "Trim unwanted borders to center element focus.",
          reason: "Cropping trims redundant visual margins and details, focusing attention on avatars/subjects.",
          nextStep: "Choose Square Avatar or draw layout dimensions"
        };
      case "censor-image":
        return {
          recommendation: "Secure personal privacy before saving files.",
          reason: "Blur sensitive attributes like user names, licenses, or faces locally in canvas context.",
          nextStep: "Position censor bounding box and click Apply"
        };
      case "watermark-image":
        return {
          recommendation: "Overlay text copyright signatures on media.",
          reason: "Watermarking tags creative property, making scrapers and content crawlers legally liable.",
          nextStep: "Type overlay text caption and click Apply"
        };
      default:
        return {
          recommendation: "Transform image pixels entirely client-side.",
          reason: "No file streams leave your network interface. Image conversions happen inside memory sandboxes.",
          nextStep: "Upload file image and choose adjustments"
        };
    }
  };

  useEffect(() => {
    setImageUrl(null);
    setResultUrl(null);
    setError(null);
  }, [slug]);

  const handleFiles = (fileList: FileList) => {
    const file = fileList[0];
    if (!file) return;
    setImageUrl(URL.createObjectURL(file));
    setError(null);
    setResultUrl(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) handleFiles(e.target.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleImageLoad = () => {
    if (imageRef.current) {
      setOriginalWidth(imageRef.current.naturalWidth || 400);
      setOriginalHeight(imageRef.current.naturalHeight || 300);
      setResizeW(imageRef.current.naturalWidth || 300);
      setResizeH(imageRef.current.naturalHeight || 300);
      setCropW(Math.min(200, imageRef.current.naturalWidth || 200));
      setCropH(Math.min(200, imageRef.current.naturalHeight || 200));
      setTextY(Math.round((imageRef.current.naturalHeight || 300) - 40));
    }
  };

  const applyTransformation = async () => {
    if (!imageRef.current || !imageUrl) return;
    setLoading(true);
    setError(null);
    setResultUrl(null);

    const img = imageRef.current;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setError("Canvas context failed.");
      setLoading(false);
      return;
    }

    try {
      // 1. Determine canvas size based on tool
      let w = originalWidth;
      let h = originalHeight;

      if (slug === "resize-image") {
        w = resizeW;
        h = resizeH;
      } else if (slug === "crop-image") {
        w = cropW;
        h = cropH;
      } else if (slug === "rotate-image" && (rotateAngle === 90 || rotateAngle === 270)) {
        w = originalHeight;
        h = originalWidth;
      }

      canvas.width = w;
      canvas.height = h;

      // 2. Apply general filters to canvas
      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) grayscale(${grayscale}%) sepia(${sepia}%) blur(${blur}px)`;

      // 3. Draw image with offsets/rotations
      if (slug === "crop-image") {
        ctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);
      } else if (slug === "rotate-image" && rotateAngle !== 0) {
        ctx.translate(w / 2, h / 2);
        ctx.rotate((rotateAngle * Math.PI) / 180);
        ctx.drawImage(img, -originalWidth / 2, -originalHeight / 2, originalWidth, originalHeight);
      } else if (slug === "rounded-corners") {
        // Clip to rounded rect then draw
        ctx.beginPath();
        ctx.roundRect(0, 0, w, h, cornerRadius);
        ctx.clip();
        ctx.drawImage(img, 0, 0, w, h);
      } else {
        ctx.drawImage(img, 0, 0, w, h);
      }

      // 3b. Invert colors
      if (slug === "invert-colors") {
        const imageData = ctx.getImageData(0, 0, w, h);
        const d = imageData.data;
        for (let i = 0; i < d.length; i += 4) {
          d[i] = 255 - d[i];
          d[i + 1] = 255 - d[i + 1];
          d[i + 2] = 255 - d[i + 2];
        }
        ctx.putImageData(imageData, 0, 0);
      }

      // 3c. Censor / Pixelate a region
      if (slug === "censor-image") {
        const ps = Math.max(1, censorPixelSize);
        for (let row = censorY; row < censorY + censorH; row += ps) {
          for (let col = censorX; col < censorX + censorW; col += ps) {
            const blockW = Math.min(ps, censorX + censorW - col);
            const blockH = Math.min(ps, censorY + censorH - row);
            const sample = ctx.getImageData(col, row, 1, 1).data;
            ctx.fillStyle = `rgb(${sample[0]},${sample[1]},${sample[2]})`;
            ctx.fillRect(col, row, blockW, blockH);
          }
        }
      }

      // 4. Apply text or watermark overlays
      if (slug === "write-on-image" || slug === "watermark-image") {
        ctx.font = `bold ${fontSize}px sans-serif`;
        ctx.fillStyle = textColor;
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = Math.max(2, fontSize / 8);

        if (slug === "watermark-image") {
          ctx.globalAlpha = watermarkOpacity;
        }

        ctx.strokeText(overlayText, textX, textY);
        ctx.fillText(overlayText, textX, textY);
      }

      // 5. Export result
      canvas.toBlob((blob) => {
        if (blob) {
          setResultUrl(URL.createObjectURL(blob));
          calculateTransformationScore();
        } else {
          setError("Failed to compile image blob.");
        }
        setLoading(false);
      }, "image/png");

    } catch (err: any) {
      setError("Transformation failed: " + err.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 text-left">
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <h4 className="text-sm font-extrabold text-foreground uppercase tracking-wider">{getToolTitle()}</h4>
        <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-lg select-none">
          <ShieldCheck className="h-3.5 w-3.5" /> 100% Client Canvas-Engine
        </span>
      </div>

      {/* Smart Assist Banner */}
      <SmartAssist
        recommendation={getSmartAssistDetails().recommendation}
        reason={getSmartAssistDetails().reason}
        nextStep={getSmartAssistDetails().nextStep}
      />

      <div className="grid grid-cols-1 grid-rows-none lg:grid-cols-12 gap-6 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {!imageUrl ? (
            <label 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all select-none ${
                isDragging 
                  ? "border-[#7d4dff] bg-[#7d4dff]/5 dark:bg-[#7d4dff]/10 scale-[0.99] animate-pulse" 
                  : "border-border/80 hover:border-[#7d4dff] hover:bg-neutral-50/50 dark:hover:bg-neutral-800/10"
              }`}
            >
              <FileImage className="h-8 w-8 text-muted-foreground mb-3" />
              <span className="text-xs font-bold text-foreground">
                {isDragging ? "Drop your image here" : "Upload Image File"}
              </span>
              <span className="text-[10px] text-muted-foreground mt-1">Select PNG, JPG, WebP, or SVG</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
          ) : (
            <div className="space-y-4 border border-border p-4 rounded-3xl bg-card/10">
              <img 
                ref={imageRef}
                src={imageUrl}
                onLoad={handleImageLoad}
                alt="Source preview"
                className="max-h-[200px] mx-auto rounded-xl border border-border object-contain"
              />

              {/* Preset Selector */}
              {getPresetsForSlug().length > 0 && (
                <PresetSelector
                  presets={getPresetsForSlug()}
                  selectedPresetId={selectedPreset}
                  onSelect={handleSelectPreset}
                />
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border border-border/50 p-4 rounded-2xl text-xs">
                
                {/* TOOL: Resize */}
                {slug === "resize-image" && selectedPreset === "standard" && (
                  <div className="space-y-3 col-span-2 grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <span className="text-3xs font-extrabold text-muted-foreground uppercase">Width (px)</span>
                      <input 
                        type="number" 
                        value={resizeW}
                        onChange={(e) => setResizeW(Number(e.target.value))}
                        className="w-full px-3 py-1.5 bg-neutral-50 dark:bg-[#1a202c] border border-border rounded-xl outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-3xs font-extrabold text-muted-foreground uppercase">Height (px)</span>
                      <input 
                        type="number" 
                        value={resizeH}
                        onChange={(e) => setResizeH(Number(e.target.value))}
                        className="w-full px-3 py-1.5 bg-neutral-50 dark:bg-[#1a202c] border border-border rounded-xl outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* TOOL: Crop */}
                {slug === "crop-image" && selectedPreset === "standard" && (
                  <div className="space-y-3 col-span-2 grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <span className="text-3xs font-extrabold text-muted-foreground uppercase">X Offset</span>
                      <input 
                        type="number" 
                        value={cropX}
                        onChange={(e) => setCropX(Number(e.target.value))}
                        className="w-full px-3 py-1.5 bg-neutral-50 dark:bg-[#1a202c] border border-border rounded-xl outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-3xs font-extrabold text-muted-foreground uppercase">Y Offset</span>
                      <input 
                        type="number" 
                        value={cropY}
                        onChange={(e) => setCropY(Number(e.target.value))}
                        className="w-full px-3 py-1.5 bg-neutral-50 dark:bg-[#1a202c] border border-border rounded-xl outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-3xs font-extrabold text-muted-foreground uppercase">Crop Width</span>
                      <input 
                        type="number" 
                        value={cropW}
                        onChange={(e) => setCropW(Number(e.target.value))}
                        className="w-full px-3 py-1.5 bg-neutral-50 dark:bg-[#1a202c] border border-border rounded-xl outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-3xs font-extrabold text-muted-foreground uppercase">Crop Height</span>
                      <input 
                        type="number" 
                        value={cropH}
                        onChange={(e) => setCropH(Number(e.target.value))}
                        className="w-full px-3 py-1.5 bg-neutral-50 dark:bg-[#1a202c] border border-border rounded-xl outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* Censor tool */}
                {slug === "censor-image" && (
                  <div className="space-y-3 col-span-2 grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <span className="text-3xs font-extrabold text-muted-foreground uppercase">Censor X</span>
                      <input type="number" value={censorX} onChange={(e) => setCensorX(Number(e.target.value))} className="w-full px-3 py-1.5 bg-neutral-50 dark:bg-[#1a202c] border border-border rounded-xl outline-none" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-3xs font-extrabold text-muted-foreground uppercase">Censor Y</span>
                      <input type="number" value={censorY} onChange={(e) => setCensorY(Number(e.target.value))} className="w-full px-3 py-1.5 bg-neutral-50 dark:bg-[#1a202c] border border-border rounded-xl outline-none" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-3xs font-extrabold text-muted-foreground uppercase">Width</span>
                      <input type="number" value={censorW} onChange={(e) => setCensorW(Number(e.target.value))} className="w-full px-3 py-1.5 bg-neutral-50 dark:bg-[#1a202c] border border-border rounded-xl outline-none" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-3xs font-extrabold text-muted-foreground uppercase">Height</span>
                      <input type="number" value={censorH} onChange={(e) => setCensorH(Number(e.target.value))} className="w-full px-3 py-1.5 bg-neutral-50 dark:bg-[#1a202c] border border-border rounded-xl outline-none" />
                    </div>
                    <div className="space-y-1 col-span-2">
                      <span className="text-3xs font-extrabold text-muted-foreground uppercase">Pixel Block Size ({censorPixelSize}px)</span>
                      <input type="range" min="4" max="40" value={censorPixelSize} onChange={(e) => setCensorPixelSize(Number(e.target.value))} className="w-full accent-[#7d4dff]" />
                    </div>
                  </div>
                )}

                {/* Rounded corners */}
                {slug === "rounded-corners" && selectedPreset === "standard" && (
                  <div className="space-y-1.5 col-span-2">
                    <span className="text-3xs font-extrabold text-muted-foreground uppercase">Corner Radius ({cornerRadius}px)</span>
                    <input type="range" min="0" max="200" value={cornerRadius} onChange={(e) => setCornerRadius(Number(e.target.value))} className="w-full accent-[#7d4dff]" />
                  </div>
                )}
                {/* TOOL: Rotate */}
                {slug === "rotate-image" && selectedPreset === "standard" && (
                  <div className="space-y-1.5 col-span-2">
                    <span className="text-3xs font-extrabold text-muted-foreground uppercase">Rotation Angle</span>
                    <select 
                      value={rotateAngle}
                      onChange={(e) => setRotateAngle(Number(e.target.value))}
                      className="w-full px-3 py-1.5 bg-neutral-50 dark:bg-[#1a202c] border border-border rounded-xl outline-none font-bold"
                    >
                      <option value={0}>No rotation</option>
                      <option value={90}>90° Right</option>
                      <option value={180}>180° Half Turn</option>
                      <option value={270}>270° Left</option>
                    </select>
                  </div>
                )}

                {/* TOOL: Filters & Effects */}
                {(slug === "photo-effects" || slug === "image-filters") && (
                  <div className="space-y-3 col-span-2 grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <span className="text-3xs font-extrabold text-muted-foreground uppercase flex items-center gap-1">
                        <Sliders className="h-3 w-3" /> Brightness ({brightness}%)
                      </span>
                      <input 
                        type="range" min="50" max="150" value={brightness} 
                        onChange={(e) => setBrightness(Number(e.target.value))}
                        className="w-full accent-[#7d4dff]"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-3xs font-extrabold text-muted-foreground uppercase flex items-center gap-1">
                        <Sliders className="h-3 w-3" /> Contrast ({contrast}%)
                      </span>
                      <input 
                        type="range" min="50" max="150" value={contrast} 
                        onChange={(e) => setContrast(Number(e.target.value))}
                        className="w-full accent-[#7d4dff]"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-3xs font-extrabold text-muted-foreground uppercase flex items-center gap-1">
                        <Sliders className="h-3 w-3" /> Grayscale ({grayscale}%)
                      </span>
                      <input 
                        type="range" min="0" max="100" value={grayscale} 
                        onChange={(e) => setGrayscale(Number(e.target.value))}
                        className="w-full accent-[#7d4dff]"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-3xs font-extrabold text-muted-foreground uppercase flex items-center gap-1">
                        <Sliders className="h-3 w-3" /> Sepia ({sepia}%)
                      </span>
                      <input 
                        type="range" min="0" max="100" value={sepia} 
                        onChange={(e) => setSepia(Number(e.target.value))}
                        className="w-full accent-[#7d4dff]"
                      />
                    </div>
                  </div>
                )}

                {/* TOOL: Add Text / Watermark */}
                {(slug === "write-on-image" || slug === "watermark-image") && (
                  <div className="space-y-3 col-span-2 grid grid-cols-2 gap-3">
                    <div className="space-y-1 col-span-2">
                      <span className="text-3xs font-extrabold text-muted-foreground uppercase flex items-center gap-1">
                        <Type className="h-3.5 w-3.5" /> Overlay Text Caption
                      </span>
                      <input 
                        type="text" 
                        value={overlayText}
                        onChange={(e) => setOverlayText(e.target.value)}
                        className="w-full px-3 py-1.5 bg-neutral-50 dark:bg-[#1a202c] border border-border rounded-xl outline-none font-bold text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-3xs font-extrabold text-muted-foreground uppercase">X Position</span>
                      <input 
                        type="number" max={originalWidth} value={textX}
                        onChange={(e) => setTextX(Number(e.target.value))}
                        className="w-full px-3 py-1.5 bg-neutral-50 dark:bg-[#1a202c] border border-border rounded-xl outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-3xs font-extrabold text-muted-foreground uppercase">Y Position</span>
                      <input 
                        type="number" max={originalHeight} value={textY}
                        onChange={(e) => setTextY(Number(e.target.value))}
                        className="w-full px-3 py-1.5 bg-neutral-50 dark:bg-[#1a202c] border border-border rounded-xl outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-3xs font-extrabold text-muted-foreground uppercase">Font Size (px)</span>
                      <input 
                        type="number" value={fontSize}
                        onChange={(e) => setFontSize(Number(e.target.value))}
                        className="w-full px-3 py-1.5 bg-neutral-50 dark:bg-[#1a202c] border border-border rounded-xl outline-none"
                      />
                    </div>
                    {slug === "watermark-image" ? (
                      <div className="space-y-1">
                        <span className="text-3xs font-extrabold text-muted-foreground uppercase">Opacity ({Math.round(watermarkOpacity * 100)}%)</span>
                        <input 
                          type="range" min="0.1" max="1.0" step="0.05" value={watermarkOpacity}
                          onChange={(e) => setWatermarkOpacity(Number(e.target.value))}
                          className="w-full accent-[#7d4dff]"
                        />
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <span className="text-3xs font-extrabold text-muted-foreground uppercase">Text Color</span>
                        <input 
                          type="color" value={textColor}
                          onChange={(e) => setTextColor(e.target.value)}
                          className="w-full h-8 px-1 py-0.5 bg-neutral-50 dark:bg-[#1a202c] border border-border rounded-xl outline-none cursor-pointer"
                        />
                      </div>
                    )}
                  </div>
                )}

              </div>

              <button 
                onClick={applyTransformation}
                disabled={loading}
                className="w-full py-2.5 bg-[#7d4dff] hover:bg-[#6530ef] disabled:bg-[#7d4dff]/45 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-[#7d4dff]/10"
              >
                {loading ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <Settings className="h-3.5 w-3.5" />}
                <span>Apply Transformation</span>
              </button>
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-3xs font-bold rounded-xl flex items-center gap-1.5">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Live Output Column */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <span className="text-3xs font-extrabold text-muted-foreground uppercase select-none tracking-wider">Processed Image Render</span>
          
          <div className="border border-border/80 bg-neutral-50/50 dark:bg-card/20 rounded-2xl p-6 min-h-[220px] flex flex-col items-center justify-center text-center relative overflow-hidden select-none">
            {loading ? (
              <div className="flex flex-col items-center gap-3 text-muted-foreground">
                <RefreshCw className="h-8 w-8 text-[#7d4dff] animate-spin" />
                <p className="text-3xs font-bold uppercase tracking-wider animate-pulse">Encoding canvas raster buffers...</p>
              </div>
            ) : resultUrl ? (
              <div className="w-full flex flex-col items-center gap-4">
                {resultScoreValue !== null && (
                  <ResultScore
                    score={resultScoreValue}
                    metricTitle="Alignment Integrity"
                    details="Validates image transformation parameters configuration details."
                  />
                )}

                <img src={resultUrl} alt="Output Render" className="max-h-[160px] rounded-xl border border-border shadow-xs object-contain" />
                
                <div className="w-full flex flex-col gap-2">
                  <a 
                    href={resultUrl} 
                    download={`toolchi-${slug}-${Date.now()}.png`}
                    className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm shadow-emerald-500/10 cursor-pointer"
                  >
                    <Download className="h-3.5 w-3.5" /> Download PNG Image
                  </a>
                  <button 
                    onClick={() => {
                      setResultUrl(null);
                      setResultScoreValue(null);
                    }} 
                    className="w-full py-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-foreground font-extrabold text-3xs rounded-xl cursor-pointer"
                  >
                    Reset and Try Again
                  </button>
                </div>

                {/* Next Best Actions */}
                <div className="mt-4 border-t border-border/40 pt-4 text-left w-full">
                  <NextBestActions
                    actions={[
                      { slug: "image-compressor", name: "Compress Image", description: "Optimize layout assets weight" },
                      { slug: "webp-to-jpg", name: "Convert Formats", description: "Convert outputs to high speed WebP formats" },
                      { slug: "gif-maker", name: "GIF Animation Maker", description: "Compile frame sequences into layout files" }
                    ]}
                  />
                </div>
              </div>
            ) : (
              <div className="text-muted-foreground/60 flex flex-col items-center gap-2">
                <AlertCircle className="h-8 w-8 text-muted-foreground/35" />
                <div>
                  <h5 className="text-2xs font-extrabold text-foreground uppercase">Waiting for image</h5>
                  <p className="text-3xs mt-0.5 leading-normal max-w-[200px]">Upload an image file and apply custom configurations to run compile.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
