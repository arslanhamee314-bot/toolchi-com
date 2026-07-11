"use client";

import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { Upload, ArrowUp, ArrowDown, Trash2, Combine, CheckCircle, FileCode } from "lucide-react";
import SmartAssist from "./SmartAssist";
import PresetSelector from "./PresetSelector";
import ResultScore from "./ResultScore";
import NextBestActions from "./NextBestActions";
import BrandingOptions from "@/components/workspace/BrandingOptions";


interface FileItem {
  id: string;
  name: string;
  size: string;
  sizeBytes: number;
  file: File;
}

export default function MergePdf() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isMerging, setIsMerging] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState("print");
  const [mergedStats, setMergedStats] = useState<any>(null);

  const presets = [
    { id: "print", name: "Print Quality", description: "Keep original high resolution" },
    { id: "email", name: "Email Friendly", description: "Optimize for quick attachments" },
    { id: "smallest", name: "Smallest Size", description: "Minimal parameters for file budget" }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const list = Array.from(e.target.files).map((f) => ({
      id: Math.random().toString(36).substring(2, 9),
      name: f.name,
      size: (f.size / (1024 * 1024)).toFixed(2) + " MB",
      sizeBytes: f.size,
      file: f,
    }));
    setFiles((prev) => [...prev, ...list]);
    setSuccess(false);
    setMergedStats(null);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
    setMergedStats(null);
  };

  const moveFile = (index: number, direction: "up" | "down") => {
    const nextIndex = direction === "up" ? index - 1 : index + 1;
    if (nextIndex < 0 || nextIndex >= files.length) return;

    const list = [...files];
    const temp = list[index];
    list[index] = list[nextIndex];
    list[nextIndex] = temp;
    setFiles(list);
  };

  const mergePDFs = async () => {
    if (files.length < 2) return;
    setIsMerging(true);
    try {
      const mergedPdf = await PDFDocument.create();

      for (const fileItem of files) {
        const fileBuffer = await fileItem.file.arrayBuffer();
        const pdf = await PDFDocument.load(fileBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      // Render branding watermark if enabled
      try {
        const { getBrandingConfig } = require("@/components/workspace/BrandingOptions");
        const { rgb } = require("pdf-lib");
        const brand = getBrandingConfig();
        if (brand.enabled) {
          const pages = mergedPdf.getPages();
          pages.forEach((page) => {
            const { width } = page.getSize();
            page.drawText(brand.text, {
              x: width / 2 - (brand.text.length * 2.4),
              y: 12,
              size: 7,
              color: rgb(0.5, 0.5, 0.5),
              opacity: brand.opacity
            });
          });
        }
      } catch (e) {
        // ignore
      }

      const mergedPdfBytes = await mergedPdf.save();
      const outputSize = mergedPdfBytes.buffer.byteLength;
      
      const blob = new Blob([mergedPdfBytes.buffer as ArrayBuffer], { type: "application/pdf" });
      const downloadUrl = URL.createObjectURL(blob);
      const downloadLink = document.createElement("a");
      downloadLink.href = downloadUrl;
      downloadLink.download = "toolchi-merged.pdf";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      
      // Calculate Share Ready Score (0-100)
      let shareScore = 100;
      const totalOriginalBytes = files.reduce((acc, f) => acc + f.sizeBytes, 0);
      if (outputSize > 15000000) {
        shareScore -= 20; // Hard to email
      } else if (outputSize > 8000000) {
        shareScore -= 10;
      }
      if (selectedPreset === "smallest") {
        shareScore += 5; // User optimized
      }
      shareScore = Math.max(30, Math.min(100, shareScore));

      setMergedStats({
        outputSizeStr: (outputSize / (1024 * 1024)).toFixed(2) + " MB",
        shareScore
      });

      setIsMerging(false);
      setSuccess(true);
      import("canvas-confetti").then((m) => m.default({ particleCount: 50, spread: 80, origin: { y: 0.8 } }));
    } catch (error) {
      console.error(error);
      setIsMerging(false);
      alert("Error occurred during PDF merging. Ensure files are not password-protected.");
    }
  };

  // Dynamic Smart Assist recommendations
  const totalMB = files.reduce((acc, f) => acc + f.sizeBytes, 0) / (1024 * 1024);
  let recommendation = "Add page numbers and cover pages for professional layouts.";
  let reason = "Multi-document merges are easier to navigate when pages are logically structured.";
  let nextStep = "Verify document order";

  if (totalMB > 10) {
    recommendation = "This combined PDF will exceed 10MB in size.";
    reason = "Most email clients have a 10MB file limit. We recommend compressing the output PDF.";
    nextStep = "Compress PDF after download completes";
  } else if (selectedPreset === "smallest") {
    recommendation = "Try using the Compress PDF tool next.";
    reason = "Merging doesn't shrink assets. Running compression next will decrease size by up to 60%.";
    nextStep = "Go to Compress PDF tool";
  }

  const nextActions = [
    { slug: "compress-pdf", name: "Compress PDF", description: "Compress document size to send easily as email attachment." },
    { slug: "split-pdf", name: "Split PDF", description: "Extract individual chapters or specific page ranges from documents." },
    { slug: "pdf-to-jpg", name: "PDF to JPG", description: "Convert high-resolution document pages into images." }
  ];

  return (
    <div className="flex flex-col gap-6 text-foreground text-xs">
      
      {/* Smart Assist Panel */}
      <SmartAssist recommendation={recommendation} reason={reason} nextStep={nextStep} />

      {/* Upload Zone */}
      <div className="border-2 border-dashed border-border hover:border-primary/50 bg-neutral-950/40 hover:bg-neutral-950/80 rounded-2xl p-6 transition-all text-center relative flex flex-col items-center justify-center gap-3">
        <input
          type="file"
          multiple
          accept="application/pdf"
          onChange={handleFileChange}
          className="absolute inset-0 opacity-0 cursor-pointer z-10"
        />
        <div className="h-10 w-10 bg-primary/10 text-primary border border-primary/20 rounded-xl flex items-center justify-center">
          <Upload className="h-5 w-5" />
        </div>
        <div>
          <h4 className="font-bold text-white text-sm">Upload PDF files</h4>
          <p className="text-2xs text-muted-foreground mt-1">Select 2 or more PDFs. Files are processed entirely locally.</p>
        </div>
      </div>

      {/* Privacy Guarantee Panel */}
      <div className="p-3.5 bg-emerald-500/5 text-emerald-500 rounded-xl border border-emerald-500/10 text-3xs font-semibold flex items-start gap-2.5">
        <span className="shrink-0 text-sm mt-0.5">🔒</span>
        <div className="flex flex-col gap-0.5">
          <span className="font-extrabold text-emerald-400">Zero Server Storage Guarantee</span>
          <span className="text-muted text-[10px] leading-relaxed">
            All PDF merges, splits, and compressions are processed strictly within your browser's local sandbox. Files never touch any servers.
          </span>
        </div>
      </div>

      {/* Staging & Presets */}
      {files.length > 0 && (
        <div className="flex flex-col gap-5 border border-border/60 rounded-2xl p-5 bg-neutral-50 dark:bg-neutral-900/35">
          {/* Preset Selector */}
          <PresetSelector presets={presets} selectedPresetId={selectedPreset} onSelect={setSelectedPreset} />
          
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center select-none">
              <label className="text-2xs font-semibold text-muted-foreground uppercase tracking-wider">Staged Documents</label>
              <label className="text-3xs font-extrabold text-[#7d4dff] hover:text-[#6530ef] cursor-pointer flex items-center gap-1">
                <span>+ Add More Files</span>
                <input type="file" multiple accept="application/pdf" onChange={handleFileChange} className="hidden" />
              </label>
            </div>
            <div className="flex flex-col gap-2 max-h-60 overflow-y-auto divide-y divide-border/20 border border-border/80 rounded-xl bg-card/10">
              {files.map((file, index) => (
                <div key={file.id} className="flex items-center justify-between p-3 gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <FileCode className="h-5 w-5 text-indigo-400 shrink-0" />
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-white truncate max-w-xs md:max-w-md">{file.name}</div>
                      <div className="text-3xs text-muted-foreground">{file.size}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => moveFile(index, "up")}
                      disabled={index === 0}
                      className="p-1 hover:bg-muted text-muted-foreground hover:text-white rounded disabled:opacity-30 transition-colors"
                    >
                      <ArrowUp className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => moveFile(index, "down")}
                      disabled={index === files.length - 1}
                      className="p-1 hover:bg-muted text-muted-foreground hover:text-white rounded disabled:opacity-30 transition-colors"
                    >
                      <ArrowDown className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => removeFile(file.id)}
                      className="p-1 hover:bg-rose-500/10 text-muted-foreground hover:text-rose-400 rounded transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {success && mergedStats && (
        <div className="border border-border rounded-2xl p-5 bg-white dark:bg-[#1c2230] flex flex-col gap-5 shadow-xs">
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
            <CheckCircle className="h-4 w-4 shrink-0" />
            <span>Documents merged and downloaded successfully! ({mergedStats.outputSizeStr})</span>
          </div>

          <ResultScore score={mergedStats.shareScore} metricTitle="Share Readiness Score" details="Measures output file sizes for common email and sharing service limits." />
        </div>
      )}

      {/* Branding Settings Option Panel */}
      <div className="border border-border/60 rounded-2xl p-5 bg-neutral-50 dark:bg-neutral-900/35">
        <BrandingOptions />
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between border-t border-border/40 pt-4">
        <span className="text-3xs text-muted-foreground font-semibold">
          {files.length} document{files.length !== 1 ? "s" : ""} staged
        </span>
        <button

          onClick={mergePDFs}
          disabled={files.length < 2 || isMerging}
          className="px-5 py-2.5 text-xs font-bold bg-primary border border-primary text-primary-foreground hover:bg-primary-hover disabled:opacity-50 rounded-xl transition-all active:scale-95 shadow-md shadow-primary/10 flex items-center gap-1.5"
        >
          <Combine className="h-4 w-4" />
          {isMerging ? "Merging PDFs..." : "Merge PDFs"}
        </button>
      </div>

      {/* Next Best Actions */}
      <NextBestActions actions={nextActions} />
    </div>
  );
}
