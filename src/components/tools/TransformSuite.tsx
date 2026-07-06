"use client";

import React, { useState, useRef, useEffect } from "react";
import { Upload, FileImage, Settings, Crop, Download, RefreshCw, AlertCircle, ShieldCheck, Sliders, Type } from "lucide-react";

interface TransformSuiteProps {
  slug: string;
}

export default function TransformSuite({ slug }: TransformSuiteProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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
      default: return "Image Transformation Workspace";
    }
  };

  useEffect(() => {
    setImageUrl(null);
    setResultUrl(null);
    setError(null);
  }, [slug]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageUrl(URL.createObjectURL(file));
    setError(null);
    setResultUrl(null);
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
      } else {
        ctx.drawImage(img, 0, 0, w, h);
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {!imageUrl ? (
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-border/80 hover:border-[#7d4dff] rounded-2xl p-8 text-center cursor-pointer transition-all hover:bg-neutral-50/50 dark:hover:bg-neutral-800/10 select-none">
              <FileImage className="h-8 w-8 text-muted-foreground mb-3" />
              <span className="text-xs font-bold text-foreground">Upload Image File</span>
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border border-border/50 p-4 rounded-2xl text-xs">
                
                {/* TOOL: Resize */}
                {slug === "resize-image" && (
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
                {slug === "crop-image" && (
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

                {/* TOOL: Rotate */}
                {slug === "rotate-image" && (
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
                    onClick={() => setResultUrl(null)} 
                    className="w-full py-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-foreground font-extrabold text-3xs rounded-xl cursor-pointer"
                  >
                    Reset and Try Again
                  </button>
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
