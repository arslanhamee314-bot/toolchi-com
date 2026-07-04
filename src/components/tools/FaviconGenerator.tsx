"use client";

import React, { useState, useRef } from "react";
import { Upload, Download, CheckCircle, Image as ImageIcon } from "lucide-react";

export default function FaviconGenerator() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [generatedSizes, setGeneratedSizes] = useState<any[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreviewUrl(event.target?.result as string);
      setGeneratedSizes([]);
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = () => {
    if (!previewUrl) return;
    setGenerating(true);
    setGeneratedSizes([]);

    const img = new Image();
    img.src = previewUrl;
    img.onload = () => {
      const sizes = [16, 32, 48, 64];
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const outputs: any[] = [];

      sizes.forEach((size) => {
        canvas.width = size;
        canvas.height = size;
        ctx.clearRect(0, 0, size, size);
        ctx.drawImage(img, 0, 0, size, size);
        const dataUrl = canvas.toDataURL("image/png");
        outputs.push({
          size: `${size}x${size}`,
          dataUrl
        });
      });

      setGeneratedSizes(outputs);
      setGenerating(false);
      import("canvas-confetti").then((m) => m.default({ particleCount: 30, spread: 50, origin: { y: 0.85 } }));
    };
  };

  const downloadFavicon = (dataUrl: string, size: string) => {
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `favicon-${size}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col gap-6 text-foreground text-xs">
      <canvas ref={canvasRef} className="hidden" />

      <div className="flex flex-col gap-2">
        <label className="font-bold text-sm block">Select Image to Convert</label>
        <p className="text-muted leading-relaxed text-3xs">Provide a square PNG, JPG, or SVG image layout to packaging multi-size browser tab icons.</p>
      </div>

      <div className="flex flex-col items-center justify-center border-2 border-dashed border-border hover:border-[#7d4dff] rounded-2xl p-8 bg-white dark:bg-card/50 transition-colors relative group select-none">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        {previewUrl ? (
          <div className="flex flex-col items-center gap-3">
            <img src={previewUrl} alt="Preview" className="h-16 w-16 object-contain rounded-lg border border-border shadow-xs" />
            <span className="font-bold">{selectedFile?.name}</span>
            <span className="text-3xs text-muted">Click or drag another image to replace</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted group-hover:text-[#7d4dff] transition-colors">
            <Upload className="h-8 w-8" />
            <span className="font-bold">Upload PNG, JPG, or SVG</span>
            <span className="text-3xs">Drag and drop here, or click to browse</span>
          </div>
        )}
      </div>

      {previewUrl && generatedSizes.length === 0 && (
        <button
          onClick={handleGenerate}
          className="px-6 py-2.5 font-bold bg-[#7d4dff] hover:bg-[#6530ef] text-white rounded-xl transition-colors cursor-pointer w-fit select-none"
          disabled={generating}
        >
          {generating ? "Converting..." : "Generate Favicon Package"}
        </button>
      )}

      {generatedSizes.length > 0 && (
        <div className="border border-border rounded-2xl p-5 bg-white dark:bg-[#1c2230] flex flex-col gap-4 shadow-xs animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-2 border-b border-border/40 pb-3">
            <CheckCircle className="h-5 w-5 text-emerald-400" />
            <h3 className="font-extrabold text-sm">Generated Icons</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {generatedSizes.map((item, idx) => (
              <div key={idx} className="p-4 bg-neutral-50 dark:bg-neutral-800/40 rounded-xl border border-border/40 flex flex-col items-center gap-3 text-center">
                <span className="font-bold text-3xs block text-muted uppercase">{item.size}</span>
                <img src={item.dataUrl} alt={item.size} className="h-10 w-10 object-contain bg-neutral-100 dark:bg-neutral-900 border border-border rounded p-1" />
                <button
                  onClick={() => downloadFavicon(item.dataUrl, item.size)}
                  className="px-3 py-1.5 text-3xs font-bold bg-white dark:bg-card border border-border hover:border-[#7d4dff] text-foreground rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Download className="h-3.5 w-3.5" /> Download
                </button>
              </div>
            ))}
          </div>

          <div className="p-3 bg-neutral-100 dark:bg-neutral-800/60 rounded-xl text-muted text-3xs leading-relaxed mt-2 border border-border">
            <strong>Setting up your favicon:</strong> Place the downloaded files in the root folder of your project, and add the following tags inside your head block:
            <pre className="mt-2 font-mono text-[9px] bg-neutral-200 dark:bg-neutral-950 p-2 rounded text-foreground overflow-x-auto select-all">
{`<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />`}
            </pre>
          </div>
        </div>
      )}

    </div>
  );
}
