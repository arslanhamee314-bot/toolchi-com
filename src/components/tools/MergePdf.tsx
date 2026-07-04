"use client";

import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { Upload, ArrowUp, ArrowDown, Trash2, Combine, CheckCircle, FileCode } from "lucide-react";

interface FileItem {
  id: string;
  name: string;
  size: string;
  file: File;
}

export default function MergePdf() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isMerging, setIsMerging] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const list = Array.from(e.target.files).map((f) => ({
      id: Math.random().toString(36).substring(2, 9),
      name: f.name,
      size: (f.size / (1024 * 1024)).toFixed(2) + " MB",
      file: f,
    }));
    setFiles((prev) => [...prev, ...list]);
    setSuccess(false);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
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
      // Create a new PDF document
      const mergedPdf = await PDFDocument.create();

      for (const fileItem of files) {
        // Read file array buffer
        const fileBuffer = await fileItem.file.arrayBuffer();
        
        // Load the PDF
        const pdf = await PDFDocument.load(fileBuffer);
        
        // Copy all pages
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      // Save PDF bytes
      const mergedPdfBytes = await mergedPdf.save();
      
      // Trigger browser download
      const blob = new Blob([mergedPdfBytes.buffer as ArrayBuffer], { type: "application/pdf" });
      const downloadUrl = URL.createObjectURL(blob);
      const downloadLink = document.createElement("a");
      downloadLink.href = downloadUrl;
      downloadLink.download = "toolchi-merged.pdf";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      
      setIsMerging(false);
      setSuccess(true);
      import("canvas-confetti").then((m) => m.default({ particleCount: 50, spread: 80, origin: { y: 0.8 } }));
    } catch (error) {
      console.error(error);
      setIsMerging(false);
      alert("Error occurred during PDF merging. Ensure files are not password-protected.");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      
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

      {/* Files List */}
      {files.length > 0 && (
        <div className="flex flex-col gap-3">
          <label className="text-2xs font-semibold text-muted-foreground uppercase tracking-wider">Staged Documents</label>
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
      )}

      {success && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle className="h-4 w-4 shrink-0" />
          <span>Documents merged and downloaded successfully!</span>
        </div>
      )}

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

    </div>
  );
}
