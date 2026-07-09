"use client";

import React, { useState, useEffect } from "react";
import { Copy, Check, RotateCcw, AlertTriangle, ShieldCheck, List, Settings } from "lucide-react";

export default function UrlEncoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [queryParams, setQueryParams] = useState<{ key: string; value: string }[]>([]);

  // Hook into central sample data loader
  useEffect(() => {
    const handleLoadSample = (e: any) => {
      if (e.detail?.slug === "url-encoder") {
        setInput("https://toolchi.online/search?q=free developer tools&sort=popular&active=true");
        setMode("encode");
      }
    };
    window.addEventListener("load-sample", handleLoadSample);
    return () => window.removeEventListener("load-sample", handleLoadSample);
  }, []);

  // Live URL encoder loop
  useEffect(() => {
    if (!input.trim()) {
      setOutput("");
      setError(null);
      setQueryParams([]);
      return;
    }

    try {
      setError(null);
      if (mode === "encode") {
        setOutput(encodeURIComponent(input));
      } else {
        setOutput(decodeURIComponent(input));
      }

      // Dynamic Query parameters parser
      const parsedParams: { key: string; value: string }[] = [];
      try {
        const decodedString = mode === "decode" ? input : decodeURIComponent(input);
        const urlObj = new URL(decodedString.startsWith("http") ? decodedString : `http://mock.com/${decodedString}`);
        urlObj.searchParams.forEach((value, key) => {
          parsedParams.push({ key, value });
        });
      } catch (e) {
        // Fallback simple parsing split
        const parts = input.split("?");
        const queryStr = parts[1] || parts[0];
        if (queryStr.includes("=") || queryStr.includes("&")) {
          queryStr.split("&").forEach((param) => {
            const [k, v] = param.split("=");
            if (k) parsedParams.push({ key: k, value: decodeURIComponent(v || "") });
          });
        }
      }
      setQueryParams(parsedParams);
    } catch (e: any) {
      if (mode === "decode") {
        setOutput("");
        setError("Invalid URL encoding sequence detected.");
      }
    }
  }, [input, mode]);

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    import("canvas-confetti").then((m) => m.default({ particleCount: 30, spread: 50, origin: { y: 0.85 } }));
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
    setQueryParams([]);
  };

  return (
    <div className="flex flex-col gap-6 text-left">
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <h4 className="text-sm font-extrabold text-foreground uppercase tracking-wider">URL Encoder & Decoder</h4>
        <span className="inline-flex items-center gap-1 text-[9px] font-bold text-[#7d4dff] bg-[#f3eeff] border border-[#e8ddff] px-2 py-0.5 rounded-lg select-none">
          <ShieldCheck className="h-3.5 w-3.5" /> 100% Client URL Sandbox
        </span>
      </div>

      {/* Mode Selector */}
      <div className="flex items-center gap-2 select-none">
        <button
          onClick={() => setMode("encode")}
          className={`px-3.5 py-1.5 rounded-xl text-3xs font-extrabold transition-all cursor-pointer ${
            mode === "encode" ? "bg-primary text-white" : "bg-neutral-100 dark:bg-neutral-800 text-muted-foreground"
          }`}
        >
          Encode Mode
        </button>
        <button
          onClick={() => setMode("decode")}
          className={`px-3.5 py-1.5 rounded-xl text-3xs font-extrabold transition-all cursor-pointer ${
            mode === "decode" ? "bg-primary text-white" : "bg-neutral-100 dark:bg-neutral-800 text-muted-foreground"
          }`}
        >
          Decode Mode
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
            {mode === "encode" ? "Plain Text / URL Input" : "Percent Encoded URL Input"}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              mode === "encode"
                ? "Type or paste clean text or URLs to escape..."
                : "Paste percent-encoded URL (e.g. search%3Fq%3Dtest) to decode..."
            }
            className="w-full h-36 bg-neutral-50 dark:bg-[#1a202c] border border-border focus:border-primary/50 outline-hidden rounded-xl p-4 text-xs text-foreground placeholder-muted-foreground/60 resize-none transition-colors"
          />
        </div>

        {/* Output */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
            {mode === "encode" ? "Percent Encoded Result" : "Clean Plain Text Output"}
          </label>
          <textarea
            value={output}
            readOnly
            placeholder="Outcome will render here instantly in real-time..."
            className="w-full h-36 bg-neutral-50/50 dark:bg-card/25 border border-border outline-hidden rounded-xl p-4 text-xs font-mono text-foreground placeholder-muted-foreground/45 resize-none"
          />
        </div>
      </div>

      {error && mode === "decode" && (
        <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-3xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Query Parameters Visual Grid Parser */}
      {queryParams.length > 0 && (
        <div className="border border-border rounded-2xl overflow-hidden bg-white dark:bg-card/20">
          <div className="bg-neutral-50 dark:bg-neutral-900/60 px-4 py-2 border-b border-border flex items-center gap-1.5">
            <List className="h-4 w-4 text-[#7d4dff]" />
            <span className="text-[10px] font-bold text-foreground uppercase tracking-wider">Query String Parameters Grid</span>
          </div>
          <div className="p-3 divide-y divide-border/60">
            {queryParams.map((param, index) => (
              <div key={index} className="grid grid-cols-12 py-2 text-3xs leading-relaxed gap-2 select-text">
                <span className="col-span-4 font-bold text-[#7d4dff] truncate">{param.key}</span>
                <span className="col-span-8 font-medium text-muted-foreground break-all">{param.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Control Actions bar */}
      <div className="flex items-center justify-between border-t border-border/40 pt-3">
        <span className="text-[10px] text-muted-foreground/80 font-medium">
          {queryParams.length > 0 ? `Found ${queryParams.length} parameters` : "Live parsing active"}
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={handleClear}
            disabled={!input}
            className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-muted-foreground hover:text-foreground rounded-lg border border-border/40 transition-colors cursor-pointer"
            title="Reset"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            onClick={handleCopy}
            disabled={!output}
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
}
