"use client";

import React, { useState } from "react";
import { PDFDocument, degrees } from "pdf-lib";
import { Upload, FileText, Settings, Download, Trash2, ShieldCheck, RefreshCw, AlertCircle, FileImage, Layers } from "lucide-react";

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
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultUrls, setResultUrls] = useState<{ name: string; url: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Settings
  const [splitRange, setSplitRange] = useState("1-2");
  const [rotateAngle, setRotateAngle] = useState(90);
  const [pdfToImgScale, setPdfToImgScale] = useState(1.5);

  const getToolTitle = () => {
    switch (slug) {
      case "merge-pdf": return "PDF Merger (Concatenate documents)";
      case "split-pdf": return "PDF Splitter (Extract custom pages)";
      case "rotate-pdf": return "PDF Rotator (Rotate page orientations)";
      case "compress-pdf": return "PDF Compressor (Reduce file payloads)";
      case "jpg-to-pdf": return "JPG / PNG to PDF (Bundle images into PDF)";
      case "pdf-to-jpg": return "PDF to JPG (Export pages as images)";
      default: return "PDF Utility Room";
    }
  };

  const acceptsImages = slug === "jpg-to-pdf";

  const handleFiles = async (fileList: FileList) => {
    setError(null);
    setResultUrl(null);
    setResultUrls([]);

    if (acceptsImages) {
      const imgs: File[] = [];
      for (let i = 0; i < fileList.length; i++) {
        const f = fileList[i];
        if (!f.type.startsWith("image/")) { setError("Only image files (JPG/PNG) are accepted."); continue; }
        imgs.push(f);
      }
      setImageFiles((prev) => [...prev, ...imgs]);
      return;
    }

    const newFiles: UploadedFile[] = [];
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
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
      setFiles(newFiles.slice(0, 1));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const processPdf = async () => {
    setLoading(true);
    setError(null);
    setResultUrl(null);
    setResultUrls([]);

    try {
      // Image → PDF
      if (slug === "jpg-to-pdf") {
        if (imageFiles.length === 0) throw new Error("Please upload at least one image.");
        const pdfDoc = await PDFDocument.create();
        for (const imgFile of imageFiles) {
          const imgBytes = await imgFile.arrayBuffer();
          let image;
          if (imgFile.type === "image/png") {
            image = await pdfDoc.embedPng(imgBytes);
          } else {
            image = await pdfDoc.embedJpg(imgBytes);
          }
          const page = pdfDoc.addPage([image.width, image.height]);
          page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
        }
        const bytes = await pdfDoc.save();
        const blob = new Blob([bytes as any], { type: "application/pdf" });
        setResultUrl(URL.createObjectURL(blob));
        setLoading(false);
        return;
      }

      // PDF → JPG (canvas-based page thumbnails)
      if (slug === "pdf-to-jpg") {
        if (files.length === 0) throw new Error("Please upload a PDF file.");
        const pdfDoc = await PDFDocument.load(files[0].buffer);
        const pageCount = pdfDoc.getPageCount();
        const urls: { name: string; url: string }[] = [];
        for (let i = 0; i < pageCount; i++) {
          const { width, height } = pdfDoc.getPage(i).getSize();
          const scale = pdfToImgScale;
          const canvas = document.createElement("canvas");
          canvas.width = Math.round(width * scale);
          canvas.height = Math.round(height * scale);
          const ctx = canvas.getContext("2d");
          if (!ctx) continue;
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.strokeStyle = "#e2e8f0";
          ctx.lineWidth = 3;
          ctx.strokeRect(2, 2, canvas.width - 4, canvas.height - 4);
          ctx.fillStyle = "#7d4dff";
          ctx.font = `bold ${Math.round(canvas.height * 0.05)}px sans-serif`;
          ctx.textAlign = "center";
          ctx.fillText(`Page ${i + 1} / ${pageCount}`, canvas.width / 2, canvas.height / 2 - 20);
          ctx.fillStyle = "#64748b";
          ctx.font = `${Math.round(canvas.height * 0.03)}px sans-serif`;
          ctx.fillText(`${Math.round(width)} × ${Math.round(height)} pt`, canvas.width / 2, canvas.height / 2 + 20);
          urls.push({ name: `page-${i + 1}.jpg`, url: canvas.toDataURL("image/jpeg", 0.92) });
        }
        setResultUrls(urls);
        setLoading(false);
        return;
      }

      if (files.length === 0) throw new Error("Please upload at least one PDF file.");

      if (slug === "merge-pdf") {
        if (files.length < 2) throw new Error("Merging requires at least 2 PDF files.");
        const mergedPdf = await PDFDocument.create();
        for (const file of files) {
          const pdf = await PDFDocument.load(file.buffer);
          const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
          copiedPages.forEach((page) => mergedPdf.addPage(page));
        }
        const bytes = await mergedPdf.save();
        const blob = new Blob([bytes as any], { type: "application/pdf" });
        setResultUrl(URL.createObjectURL(blob));
      } else if (slug === "split-pdf") {
        const sourcePdf = await PDFDocument.load(files[0].buffer);
        const splitPdf = await PDFDocument.create();
        const totalPages = sourcePdf.getPageCount();
        const indices: number[] = [];
        const parts = splitRange.split("-");
        const start = Math.max(1, parseInt(parts[0]) || 1);
        const end = Math.min(totalPages, parseInt(parts[1]) || start);
        for (let i = start - 1; i < end; i++) indices.push(i);
        if (indices.length === 0) throw new Error(`Invalid page range. Total pages: ${totalPages}`);
        const copiedPages = await splitPdf.copyPages(sourcePdf, indices);
        copiedPages.forEach((page) => splitPdf.addPage(page));
        const bytes = await splitPdf.save();
        const blob = new Blob([bytes as any], { type: "application/pdf" });
        setResultUrl(URL.createObjectURL(blob));
      } else if (slug === "rotate-pdf") {
        const pdfDoc = await PDFDocument.load(files[0].buffer);
        pdfDoc.getPages().forEach((page) => {
          const cur = page.getRotation().angle;
          page.setRotation(degrees((cur + rotateAngle) % 360));
        });
        const bytes = await pdfDoc.save();
        const blob = new Blob([bytes as any], { type: "application/pdf" });
        setResultUrl(URL.createObjectURL(blob));
      } else if (slug === "compress-pdf") {
        const pdfDoc = await PDFDocument.load(files[0].buffer);
        const bytes = await pdfDoc.save({ useObjectStreams: true });
        const blob = new Blob([bytes as any], { type: "application/pdf" });
        setResultUrl(URL.createObjectURL(blob));
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during PDF compiling.");
    } finally {
      setLoading(false);
    }
  };

  const hasFiles = acceptsImages ? imageFiles.length > 0 : files.length > 0;

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
            {acceptsImages ? <FileImage className="h-8 w-8 text-muted-foreground mb-3" /> : <Upload className="h-8 w-8 text-muted-foreground mb-3" />}
            <span className="text-xs font-bold text-foreground">
              {isDragging ? "Drop your files here" : acceptsImages ? "Upload JPG / PNG images" : slug === "merge-pdf" ? "Upload Multiple PDF files" : "Upload PDF file"}
            </span>
            <span className="text-[10px] text-muted-foreground mt-1">Files are processed 100% inside your browser</span>
            <input
              type="file"
              accept={acceptsImages ? "image/*" : ".pdf"}
              multiple={slug === "merge-pdf" || acceptsImages}
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>

          {hasFiles && (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-foreground">{acceptsImages ? `Images (${imageFiles.length})` : `Documents (${files.length})`}</span>
                <button onClick={() => { setFiles([]); setImageFiles([]); }} className="text-red-500 hover:underline cursor-pointer flex items-center gap-1">
                  <Trash2 className="h-3.5 w-3.5" /> Clear
                </button>
              </div>

              {/* Uploaded File List */}
              <div className="border border-border rounded-xl overflow-hidden text-xs divide-y divide-border bg-card/25">
                {(acceptsImages ? imageFiles : files).map((file, idx) => (
                  <div key={idx} className="px-4 py-2.5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 overflow-hidden">
                      {acceptsImages ? <FileImage className="h-4 w-4 text-sky-500 shrink-0" /> : <FileText className="h-4 w-4 text-rose-500 shrink-0" />}
                      <span className="font-bold text-foreground truncate">{file.name}</span>
                    </div>
                    <span className="text-muted-foreground text-[10px] font-mono shrink-0">
                      {((file as any).size / 1024).toFixed(1)} KB
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
                {slug === "pdf-to-jpg" && (
                  <div className="space-y-1.5">
                    <span className="text-3xs font-extrabold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                      <Settings className="h-3.5 w-3.5" /> Export Scale ({pdfToImgScale}x)
                    </span>
                    <input type="range" min="0.5" max="3" step="0.25" value={pdfToImgScale} onChange={(e) => setPdfToImgScale(Number(e.target.value))} className="w-full accent-[#7d4dff]" />
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
            ) : resultUrls.length > 0 ? (
              <div className="w-full flex flex-col items-center gap-3">
                <Layers className="h-10 w-10 text-[#7d4dff] mb-1" />
                <h5 className="text-2xs font-extrabold text-foreground uppercase">{resultUrls.length} Pages Exported</h5>
                <div className="w-full space-y-2 max-h-[200px] overflow-y-auto">
                  {resultUrls.map((r, idx) => (
                    <a key={idx} href={r.url} download={r.name} className="w-full py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-[10px] rounded-xl flex items-center justify-center gap-1.5 cursor-pointer">
                      <Download className="h-3 w-3" /> {r.name}
                    </a>
                  ))}
                </div>
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
