"use client";

import React, { useState, useEffect } from "react";
import { Copy, Check, RotateCcw, AlertTriangle, FileCode, CheckCircle2 } from "lucide-react";
import { getSampleBySlug } from "@/lib/tool-samples";

export default function JsonFormatter() {
  const [jsonInput, setJsonInput] = useState("");
  const [jsonOutput, setJsonOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [tabSpacing, setTabSpacing] = useState<2 | 4 | "minify">(2);

  useEffect(() => {
    const handleLoadSampleEvent = (e: any) => {
      if (e.detail?.slug === "json-formatter") {
        setJsonInput(getSampleBySlug("json-formatter"));
        setError(null);
      }
    };
    window.addEventListener("load-sample", handleLoadSampleEvent);
    return () => window.removeEventListener("load-sample", handleLoadSampleEvent);
  }, []);

  // Live formatting loop
  useEffect(() => {
    if (!jsonInput.trim()) {
      setJsonOutput("");
      setError(null);
      return;
    }

    try {
      const parsed = JSON.parse(jsonInput);
      setError(null);
      if (tabSpacing === "minify") {
        setJsonOutput(JSON.stringify(parsed));
      } else {
        setJsonOutput(JSON.stringify(parsed, null, tabSpacing));
      }
    } catch (e: any) {
      // Show dynamic parsing error warnings without clearing output
      setError(e.message);
    }
  }, [jsonInput, tabSpacing]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setJsonInput(event.target?.result as string);
      setError(null);
    };
    reader.readAsText(file);
  };

  const handleCopy = () => {
    if (!jsonOutput) return;
    navigator.clipboard.writeText(jsonOutput);
    setCopied(true);
    import("canvas-confetti").then((m) => m.default({ particleCount: 30, spread: 50, origin: { y: 0.85 } }));
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setJsonInput("");
    setJsonOutput("");
    setError(null);
  };

  return (
    <div className="flex flex-col gap-4 text-left">
      {/* Tab spacing selectors */}
      <div className="flex flex-wrap items-center gap-2 select-none border-b border-border/40 pb-3">
        <button
          onClick={() => setTabSpacing(2)}
          className={`px-3 py-1.5 rounded-xl text-3xs font-extrabold transition-all cursor-pointer ${
            tabSpacing === 2 ? "bg-primary text-white" : "bg-neutral-100 dark:bg-neutral-800 text-muted-foreground"
          }`}
        >
          2 Spaces Format
        </button>
        <button
          onClick={() => setTabSpacing(4)}
          className={`px-3 py-1.5 rounded-xl text-3xs font-extrabold transition-all cursor-pointer ${
            tabSpacing === 4 ? "bg-primary text-white" : "bg-neutral-100 dark:bg-neutral-800 text-muted-foreground"
          }`}
        >
          4 Spaces Format
        </button>
        <button
          onClick={() => setTabSpacing("minify")}
          className={`px-3 py-1.5 rounded-xl text-3xs font-extrabold transition-all cursor-pointer ${
            tabSpacing === "minify" ? "bg-primary text-white" : "bg-neutral-100 dark:bg-neutral-800 text-muted-foreground"
          }`}
        >
          Minify JSON
        </button>

        <div className="flex gap-1.5 ml-auto text-3xs">
          <label className="px-2.5 py-1.5 font-extrabold bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-foreground rounded-xl transition-all border border-border/60 cursor-pointer flex items-center gap-1">
            <FileCode className="h-3.5 w-3.5" /> Upload File
            <input type="file" accept=".json,application/json" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Raw Input JSON</label>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder='Paste raw JSON here (e.g. {"name":"toolchi","active":true})...'
            className="w-full h-48 bg-neutral-50 dark:bg-[#1a202c] border border-border focus:border-primary/50 outline-hidden rounded-xl p-4 text-xs font-mono text-foreground placeholder-muted-foreground/60 resize-none transition-colors"
          />
        </div>

        {/* Output */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Formatted Output</label>
          <textarea
            value={jsonOutput}
            readOnly
            placeholder="Formatted outcome will appear here in real-time..."
            className="w-full h-48 bg-neutral-50/50 dark:bg-card/25 border border-border outline-hidden rounded-xl p-4 text-xs font-mono text-foreground placeholder-muted-foreground/45 resize-none"
          />
        </div>
      </div>

      {/* Parse Status Indicator */}
      {jsonInput.trim() && (
        <div className="animate-in fade-in duration-200">
          {error ? (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-3xs font-semibold flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              <span><strong>JSON Parse Warning:</strong> {error}</span>
            </div>
          ) : (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-3xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span><strong>Valid JSON Format:</strong> Code parsed successfully.</span>
            </div>
          )}
        </div>
      )}

      {/* Control Actions bar */}
      <div className="flex items-center justify-between border-t border-border/40 pt-3">
        <span className="text-[10px] text-muted-foreground/80 font-medium">
          Original size: {formatSize(jsonInput.length)} • New size: {formatSize(jsonOutput.length)}
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={handleClear}
            disabled={!jsonInput}
            className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-muted-foreground hover:text-foreground rounded-lg border border-border/40 transition-colors cursor-pointer"
            title="Reset"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            onClick={handleCopy}
            disabled={!jsonOutput || !!error}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 active:scale-95 border cursor-pointer ${
              copied
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                : "bg-primary border-primary text-primary-foreground disabled:opacity-50"
            }`}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied!" : "Copy Result"}
          </button>
        </div>
      </div>
    </div>
  );

  function formatSize(charsCount: number) {
    if (charsCount < 1024) return `${charsCount} B`;
    return `${(charsCount / 1024).toFixed(1)} KB`;
  }
}
