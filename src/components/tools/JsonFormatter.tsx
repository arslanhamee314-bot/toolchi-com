"use client";

import React, { useState } from "react";
import { Copy, Check, RotateCcw, AlertTriangle } from "lucide-react";

export default function JsonFormatter() {
  const [jsonInput, setJsonInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleFormat = (spaces = 2) => {
    if (!jsonInput.trim()) return;
    try {
      setError(null);
      const parsed = JSON.parse(jsonInput);
      const formatted = JSON.stringify(parsed, null, spaces);
      setJsonInput(formatted);
    } catch (e: any) {
      setError(e.message);
    }
  };

  const handleMinify = () => {
    if (!jsonInput.trim()) return;
    try {
      setError(null);
      const parsed = JSON.parse(jsonInput);
      const minified = JSON.stringify(parsed);
      setJsonInput(minified);
    } catch (e: any) {
      setError(e.message);
    }
  };

  const handleCopy = () => {
    if (!jsonInput) return;
    navigator.clipboard.writeText(jsonInput);
    setCopied(true);
    import("canvas-confetti").then((m) => m.default({ particleCount: 30, spread: 50, origin: { y: 0.85 } }));
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4">
      <textarea
        value={jsonInput}
        onChange={(e) => {
          setJsonInput(e.target.value);
          if (error) setError(null);
        }}
        placeholder='Paste raw JSON code here (e.g. {"name":"toolchi","active":true})...'
        className="w-full min-h-48 bg-neutral-950 border border-border focus:border-primary/50 outline-hidden rounded-xl p-4 text-xs font-mono text-indigo-300 placeholder-muted-foreground/60 resize-y transition-colors"
      />

      {error && (
        <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span><strong>JSON Parse Error:</strong> {error}</span>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => handleFormat(2)}
          className="px-3.5 py-2 text-xs font-semibold bg-muted hover:bg-neutral-800 text-white rounded-lg transition-colors border border-border/40"
        >
          Format (2 Spaces)
        </button>
        <button
          onClick={() => handleFormat(4)}
          className="px-3.5 py-2 text-xs font-semibold bg-muted hover:bg-neutral-800 text-white rounded-lg transition-colors border border-border/40"
        >
          Format (4 Spaces)
        </button>
        <button
          onClick={handleMinify}
          className="px-3.5 py-2 text-xs font-semibold bg-muted hover:bg-neutral-800 text-white rounded-lg transition-colors border border-border/40"
        >
          Minify JSON
        </button>

        <div className="flex items-center gap-1.5 ml-auto">
          <button
            onClick={() => {
              setJsonInput("");
              setError(null);
            }}
            className="p-2 hover:bg-muted text-muted-foreground hover:text-white rounded-lg border border-border/40 transition-colors"
            title="Clear"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            onClick={handleCopy}
            disabled={!jsonInput || !!error}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 active:scale-95 border ${
              copied
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                : "bg-primary border-primary text-primary-foreground disabled:opacity-50"
            }`}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied!" : "Copy Output"}
          </button>
        </div>
      </div>
    </div>
  );
}
