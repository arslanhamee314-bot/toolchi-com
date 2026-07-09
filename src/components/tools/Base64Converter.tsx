"use client";

import React, { useState, useEffect } from "react";
import { Copy, Check, RotateCcw, AlertTriangle, Sparkles, HelpCircle } from "lucide-react";

export default function Base64Converter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [detectedFormat, setDetectedFormat] = useState<string | null>(null);

  // Hook into central sample data event
  useEffect(() => {
    const handleLoadSample = (e: any) => {
      if (e.detail?.slug === "base64") {
        setInput("Toolchi is 100% secure, client-side, and free!");
        setMode("encode");
      }
    };
    window.addEventListener("load-sample", handleLoadSample);
    return () => window.removeEventListener("load-sample", handleLoadSample);
  }, []);

  // Heuristic format auto-detector & live processing logic
  useEffect(() => {
    if (!input.trim()) {
      setOutput("");
      setError(null);
      setDetectedFormat(null);
      return;
    }

    // Heuristics checks
    const trimmed = input.trim();
    const isBase64Pattern = /^[A-Za-z0-9+/]+={0,2}$/.test(trimmed) && trimmed.length % 4 === 0 && trimmed.length > 4;

    if (isBase64Pattern) {
      setDetectedFormat("Base64 Code");
    } else {
      setDetectedFormat(null);
    }

    try {
      setError(null);
      if (mode === "encode") {
        const bytes = new TextEncoder().encode(input);
        const binString = Array.from(bytes, (byte) => String.fromCharCode(byte)).join("");
        setOutput(btoa(binString));
      } else {
        const binString = atob(trimmed);
        const bytes = Uint8Array.from(binString, (char) => char.charCodeAt(0));
        setOutput(new TextDecoder().decode(bytes));
      }
    } catch (e: any) {
      // In decode mode, dynamic typing might temporarily be invalid, show light status indicator
      if (mode === "decode") {
        setOutput("");
        setError("Invalid Base64 format string.");
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
    setDetectedFormat(null);
  };

  return (
    <div className="flex flex-col gap-4 text-left">
      {/* Mode Selector */}
      <div className="flex items-center gap-2 select-none border-b border-border/40 pb-3">
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

        {detectedFormat && mode !== "decode" && (
          <button
            onClick={() => setMode("decode")}
            className="ml-auto inline-flex items-center gap-1 text-[9px] font-extrabold text-[#7d4dff] bg-[#f3eeff] border border-[#e8ddff] px-2 py-0.5 rounded-lg select-none hover:bg-[#e8ddff] transition-all cursor-pointer"
          >
            <Sparkles className="h-3 w-3" /> Auto-Detect: Switch to Decode?
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
            {mode === "encode" ? "Plain Text Input" : "Base64 Code Input"}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              mode === "encode"
                ? "Type or paste plain text here to encode in real-time..."
                : "Paste Base64 code here to decode..."
            }
            className="w-full h-36 bg-neutral-50 dark:bg-[#1a202c] border border-border focus:border-primary/50 outline-hidden rounded-xl p-4 text-xs text-foreground placeholder-muted-foreground/60 resize-none transition-colors"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
            {mode === "encode" ? "Base64 Output" : "Plain Text Output"}
          </label>
          <textarea
            value={output}
            readOnly
            placeholder="Parsed outcome will render here instantly..."
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

      {/* Control Actions bar */}
      <div className="flex items-center justify-between border-t border-border/40 pt-3">
        <span className="text-[10px] text-muted-foreground/80 font-medium">
          {input.length} characters • {input.split(/\s+/).filter(Boolean).length} words
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
