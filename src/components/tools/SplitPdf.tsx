"use client";

import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { Upload, Trash2, Scissors, CheckCircle, FileCode } from "lucide-react";

interface FileInfo {
  name: string;
  size: string;
  pageCount: number;
  file: File;
}

export default function SplitPdf() {
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [selectedPages, setSelectedPages] = useState<number[]>([]);
  const [pageRange, setPageRange] = useState("");
  const [isSplitting, setIsSplitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const pageCount = pdf.getPageCount();

      setFileInfo({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
        pageCount,
        file
      });

      // Default to select all pages initially
      const allPages = Array.from({ length: pageCount }, (_, i) => i + 1);
      setSelectedPages(allPages);
      setPageRange(`1-${pageCount}`);
      setSuccess(false);
    } catch (error) {
      console.error(error);
      alert("Invalid PDF file. Please ensure it is not password-protected.");
    }
  };

  const handleCheckboxChange = (page: number) => {
    setSelectedPages((prev) => {
      const updated = prev.includes(page)
        ? prev.filter((p) => p !== page)
        : [...prev, page].sort((a, b) => a - b);
      
      // Update page range text representation
      setPageRange(updated.join(", "));
      return updated;
    });
    setSuccess(false);
  };

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPageRange(val);
    setSuccess(false);

    if (!fileInfo) return;

    // Parse the range text to update visual checkbox states
    const pages = new Set<number>();
    const parts = val.split(",");
    
    for (let part of parts) {
      part = part.trim();
      if (part.includes("-")) {
        const [start, end] = part.split("-").map(Number);
        if (!isNaN(start) && !isNaN(end) && start > 0 && end <= fileInfo.pageCount) {
          for (let i = start; i <= end; i++) {
            pages.add(i);
          }
        }
      } else {
        const num = Number(part);
        if (!isNaN(num) && num > 0 && num <= fileInfo.pageCount) {
          pages.add(num);
        }
      }
    }

    setSelectedPages(Array.from(pages).sort((a, b) => a - b));
  };

  const selectAll = () => {
    if (!fileInfo) return;
    const all = Array.from({ length: fileInfo.pageCount }, (_, i) => i + 1);
    setSelectedPages(all);
    setPageRange(`1-${fileInfo.pageCount}`);
  };

  const deselectAll = () => {
    setSelectedPages([]);
    setPageRange("");
  };

  const removeFile = () => {
    setFileInfo(null);
    setSelectedPages([]);
    setPageRange("");
    setSuccess(false);
  };

  const splitPDF = async () => {
    if (!fileInfo || selectedPages.length === 0) return;
    setIsSplitting(true);
    try {
      const fileBuffer = await fileInfo.file.arrayBuffer();
      const srcPdf = await PDFDocument.load(fileBuffer);
      const splitPdf = await PDFDocument.create();

      // pdf-lib page indices are 0-indexed, whereas user selection is 1-indexed
      const targetIndices = selectedPages.map((p) => p - 1);
      const copiedPages = await splitPdf.copyPages(srcPdf, targetIndices);
      copiedPages.forEach((page) => splitPdf.addPage(page));

      const splitPdfBytes = await splitPdf.save();
      
      const blob = new Blob([splitPdfBytes.buffer as ArrayBuffer], { type: "application/pdf" });
      const downloadUrl = URL.createObjectURL(blob);
      const downloadLink = document.createElement("a");
      downloadLink.href = downloadUrl;
      downloadLink.download = `split-${fileInfo.name}`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      
      setIsSplitting(false);
      setSuccess(true);
      import("canvas-confetti").then((m) => m.default({ particleCount: 50, spread: 80, origin: { y: 0.8 } }));
    } catch (error) {
      console.error(error);
      setIsSplitting(false);
      alert("Error occurred during PDF splitting. Please verify the file.");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Upload Zone */}
      {!fileInfo ? (
        <div className="border-2 border-dashed border-border hover:border-primary/50 bg-neutral-950/40 hover:bg-neutral-950/80 rounded-2xl p-6 transition-all text-center relative flex flex-col items-center justify-center gap-3">
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer z-10"
          />
          <div className="h-10 w-10 bg-primary/10 text-primary border border-primary/20 rounded-xl flex items-center justify-center">
            <Upload className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-foreground">Select PDF File</p>
            <p className="text-3xs text-muted-foreground mt-0.5">Drag & drop or browse your local files</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-5 bg-card/45 p-6 rounded-2xl border border-border">
          {/* File Card Header */}
          <div className="flex items-center justify-between pb-4 border-b border-border/40">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-neutral-900 rounded-xl flex items-center justify-center text-red-500 border border-border">
                <FileCode className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground truncate max-w-[220px] sm:max-w-xs">{fileInfo.name}</p>
                <p className="text-3xs text-muted-foreground mt-0.5">{fileInfo.size} • {fileInfo.pageCount} Pages</p>
              </div>
            </div>
            <button
              onClick={removeFile}
              className="p-2 hover:bg-red-500/10 text-muted-foreground hover:text-red-500 rounded-lg transition-colors cursor-pointer"
              title="Remove File"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          {/* Settings / Controls */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="pageRangeInput" className="text-3xs font-semibold text-muted-foreground uppercase">Page Selection Range</label>
              <input
                id="pageRangeInput"
                type="text"
                value={pageRange}
                onChange={handleRangeChange}
                placeholder="e.g. 1-3, 5, 7-10"
                className="bg-neutral-950 border border-border text-xs text-white rounded-lg p-2.5 outline-hidden w-full focus:border-primary/50"
              />
            </div>

            {/* Selection Actions */}
            <div className="flex gap-2">
              <button 
                onClick={selectAll} 
                className="px-3 py-1.5 text-3xs font-bold bg-neutral-900 text-white rounded-md border border-border hover:bg-neutral-800 cursor-pointer"
              >
                Select All
              </button>
              <button 
                onClick={deselectAll} 
                className="px-3 py-1.5 text-3xs font-bold bg-neutral-900 text-white rounded-md border border-border hover:bg-neutral-800 cursor-pointer"
              >
                Deselect All
              </button>
            </div>

            {/* Visual Page Grid */}
            <div className="flex flex-col gap-2 mt-2">
              <span className="text-3xs font-semibold text-muted-foreground uppercase">Select Pages Manually</span>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2.5 max-h-48 overflow-y-auto pr-1">
                {Array.from({ length: fileInfo.pageCount }, (_, i) => i + 1).map((page) => {
                  const isChecked = selectedPages.includes(page);
                  return (
                    <button
                      key={page}
                      onClick={() => handleCheckboxChange(page)}
                      className={`h-11 rounded-lg border text-xs font-bold flex items-center justify-center transition-all cursor-pointer ${
                        isChecked 
                          ? "bg-primary border-primary text-white shadow-sm" 
                          : "bg-neutral-950 border-border text-muted-foreground hover:border-neutral-700"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Action Trigger Row */}
          <div className="flex items-center justify-between border-t border-border/40 pt-4 mt-2">
            <span className="text-3xs text-muted-foreground">
              {selectedPages.length} of {fileInfo.pageCount} pages selected
            </span>
            <button
              onClick={splitPDF}
              disabled={isSplitting || selectedPages.length === 0}
              className="px-5 py-2.5 text-xs font-extrabold bg-primary hover:bg-[#6530ef] disabled:bg-neutral-800 disabled:text-muted-foreground text-white rounded-full flex items-center gap-1.5 transition-all shadow-md shadow-primary/10 select-none cursor-pointer"
            >
              {success ? (
                <>
                  <CheckCircle className="h-4 w-4" /> Download Complete
                </>
              ) : (
                <>
                  <Scissors className="h-4 w-4" /> {isSplitting ? "Splitting..." : "Split PDF"}
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
