"use client";

import React, { useState } from "react";
import { PDFDocument, degrees } from "pdf-lib";
import { Upload, FileText, Settings, Download, Trash2, ShieldCheck, RefreshCw, AlertCircle } from "lucide-react";

interface PdfSuiteProps {
  slug: string;
}

interface UploadedFile {
  name: string;
  size: number;
  buffer: ArrayBuffer;
}

export default function PdfSuite({ slug }: PdfSuiteProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Settings
  const [splitRange, setSplitRange] = useState("1-2");
  const [rotateAngle, setRotateAngle] = useState(90);

  const getToolTitle = () => {
    switch (slug) {
      case "merge-pdf": return "PDF Merger (Concatenate documents)";
      case "split-pdf": return "PDF Splitter (Extract custom pages)";
      case "rotate-pdf": return "PDF Rotator (Rotate page orientations)";
      case "compress-pdf": return "PDF Compressor (Reduce file payloads)";
      default: return "PDF Utility Room";
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setError(null);
    const newFiles: UploadedFile[] = [];

    for (let i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i];
      if (file.type !== "application/pdf") {
        setError("Only valid PDF files are supported.");
        continue;
      }
      try {
        const buffer = await file.arrayBuffer();
        newFiles.push({ name: file.name, size: file.size, buffer });
      } catch (err: any) {
        setError("Could not read file: " + err.message);
      }
    }

    if (slug === "merge-pdf") {
      setFiles((prev) => [...prev, ...newFiles]);
    } else {
      setFiles(newFiles.slice(0, 1)); // Single file for split/rotate/compress
    }
  };

  const processPdf = async () => {
    if (files.length === 0) {
      setError("Please upload at least one PDF file.");
      return;
    }

    setLoading(true);
    setError(null);
    setResultUrl(null);

    try {
      if (slug === "merge-pdf") {
        if (files.length < 2) {
          throw new Error("Merging requires at least 2 PDF files.");
        }
        const mergedPdf = await PDFDocument.create();
        for (const file of files) {
          const pdf = await PDFDocument.load(file.buffer);
          const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
          copiedPages.forEach((page) => mergedPdf.addPage(page));
        }
        const bytes = await mergedPdf.save();
        exportBlob(bytes);
      } 
      
      else if (slug === "split-pdf") {
        const sourcePdf = await PDFDocument.load(files[0].buffer);
        const splitPdf = await PDFDocument.create();
        const totalPages = sourcePdf.getPageCount();
        
        // Parse range like "1-3" or "1"
        const indices: number[] = [];
        const parts = splitRange.split("-");
        const start = Math.max(1, parseInt(parts[0]) || 1);
        const end = Math.min(totalPages, parseInt(parts[1]) || start);

        for (let i = start - 1; i < end; i++) {
          indices.push(i);
        }

        if (indices.length === 0) {
          throw new Error(`Invalid page range. Total pages: ${totalPages}`);
        }

        const copiedPages = await splitPdf.copyPages(sourcePdf, indices);
        copiedPages.forEach((page) => splitPdf.addPage(page));
        
        const bytes = await splitPdf.save();
        exportBlob(bytes);
      } 
      
      else if (slug === "rotate-pdf") {
        const pdfDoc = await PDFDocument.load(files[0].buffer);
        const pages = pdfDoc.getPages();
        pages.forEach((page) => {
          const currentRotation = page.getRotation().angle;
          page.setRotation(degrees((currentRotation + rotateAngle) % 360));
        });
        const bytes = await pdfDoc.save();
        exportBlob(bytes);
      } 
      
      else if (slug === "compress-pdf") {
        const pdfDoc = await PDFDocument.load(files[0].buffer);
        // Optimize object structures and stream compression
        const bytes = await pdfDoc.save({ useObjectStreams: true });
        exportBlob(bytes);
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during PDF compiling.");
    } finally {
      setLoading(false);
    }
  };

  const exportBlob = (bytes: Uint8Array) => {
    const blob = new Blob([bytes as any], { type: "application/pdf" });
    setResultUrl(URL.createObjectURL(blob));
  };

  return (
    <div className="flex flex-col gap-6 text-left">
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <h4 className="text-sm font-extrabold text-foreground uppercase tracking-wider">{getToolTitle()}</h4>
        <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-lg select-none">
          <ShieldCheck className="h-3.5 w-3.5" /> 100% Client PDF-Engine
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-border/80 hover:border-[#7d4dff] rounded-2xl p-8 text-center cursor-pointer transition-all hover:bg-neutral-50/50 dark:hover:bg-neutral-800/10 select-none">
            <Upload className="h-8 w-8 text-muted-foreground mb-3" />
            <span className="text-xs font-bold text-foreground">
              {slug === "merge-pdf" ? "Upload Multiple PDF files" : "Upload PDF file"}
            </span>
            <span className="text-[10px] text-muted-foreground mt-1">Files are processed 100% inside your browser</span>
            <input 
              type="file" 
              accept=".pdf" 
              multiple={slug === "merge-pdf"} 
              className="hidden" 
              onChange={handleFileUpload} 
            />
          </label>

          {files.length > 0 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-foreground">Uploaded Documents ({files.length})</span>
                <button onClick={() => setFiles([])} className="text-red-500 hover:underline cursor-pointer flex items-center gap-1">
                  <Trash2 className="h-3.5 w-3.5" /> Clear
                </button>
              </div>

              {/* Uploaded File List */}
              <div className="border border-border rounded-xl overflow-hidden text-xs divide-y divide-border bg-card/25">
                {files.map((file, idx) => (
                  <div key={idx} className="px-4 py-2.5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <FileText className="h-4 w-4 text-rose-500 shrink-0" />
                      <span className="font-bold text-foreground truncate">{file.name}</span>
                    </div>
                    <span className="text-muted-foreground text-[10px] font-mono shrink-0">
                      {(file.size / 1024).toFixed(1)} KB
                    </span>
                  </div>
                ))}
              </div>

              {/* Setup Configuration Controls */}
              <div className="border border-border p-4 rounded-2xl space-y-4">
                {slug === "split-pdf" && (
                  <div className="space-y-1.5">
                    <span className="text-3xs font-extrabold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                      <Settings className="h-3.5 w-3.5" /> Page Extract Range
                    </span>
                    <input 
                      type="text" 
                      placeholder="e.g. 1-3" 
                      value={splitRange} 
                      onChange={(e) => setSplitRange(e.target.value)} 
                      className="w-full px-3 py-1.5 text-xs bg-neutral-50 dark:bg-[#1a202c] border border-border rounded-xl outline-none font-bold"
                    />
                  </div>
                )}

                {slug === "rotate-pdf" && (
                  <div className="space-y-1.5">
                    <span className="text-3xs font-extrabold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                      <Settings className="h-3.5 w-3.5" /> Rotation Angle
                    </span>
                    <select 
                      value={rotateAngle} 
                      onChange={(e) => setRotateAngle(Number(e.target.value))} 
                      className="w-full px-3 py-1.5 text-xs bg-neutral-50 dark:bg-[#1a202c] border border-border rounded-xl outline-none font-bold"
                    >
                      <option value={90}>90° Right</option>
                      <option value={180}>180° Half Turn</option>
                      <option value={270}>270° Left</option>
                    </select>
                  </div>
                )}

                <button 
                  onClick={processPdf}
                  disabled={loading}
                  className="w-full py-2.5 bg-[#7d4dff] hover:bg-[#6530ef] disabled:bg-[#7d4dff]/45 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-[#7d4dff]/10"
                >
                  {loading ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <Settings className="h-3.5 w-3.5" />}
                  <span>Process PDF Document</span>
                </button>
              </div>
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
          <span className="text-3xs font-extrabold text-muted-foreground uppercase select-none tracking-wider">Processed PDF Output</span>
          
          <div className="border border-border/80 bg-neutral-50/50 dark:bg-card/20 rounded-2xl p-6 min-h-[220px] flex flex-col items-center justify-center text-center relative overflow-hidden select-none">
            {loading ? (
              <div className="flex flex-col items-center gap-3 text-muted-foreground">
                <RefreshCw className="h-8 w-8 text-[#7d4dff] animate-spin" />
                <p className="text-3xs font-bold uppercase tracking-wider animate-pulse">Running local PDF-Lib encoder...</p>
              </div>
            ) : resultUrl ? (
              <div className="w-full flex flex-col items-center gap-4">
                <FileText className="h-16 w-16 text-rose-500 animate-bounce" />
                <div className="text-center">
                  <h5 className="text-2xs font-extrabold text-foreground uppercase">Processing Complete</h5>
                  <p className="text-3xs mt-0.5 leading-normal text-muted-foreground">PDF file successfully generated client-side.</p>
                </div>
                
                <div className="w-full flex flex-col gap-2">
                  <a 
                    href={resultUrl} 
                    download={`toolchi-${slug}-${Date.now()}.pdf`}
                    className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm shadow-emerald-500/10 cursor-pointer"
                  >
                    <Download className="h-3.5 w-3.5" /> Download PDF File
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
                  <h5 className="text-2xs font-extrabold text-foreground uppercase">Waiting for data</h5>
                  <p className="text-3xs mt-0.5 leading-normal max-w-[200px]">Upload a PDF file and set parameters to run compile.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
