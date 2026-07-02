"use client";

import React, { useState } from "react";
import { Copy, Check, RotateCcw, AlertTriangle } from "lucide-react";
import confetti from "canvas-confetti";

export default function Base64Converter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleEncode = () => {
    if (!input) return;
    try {
      setError(null);
      // UTF-8 base64 encoding support
      const bytes = new TextEncoder().encode(input);
      const binString = Array.from(bytes, (byte) => String.fromCharCode(byte)).join("");
      const encoded = btoa(binString);
      setOutput(encoded);
    } catch (e: any) {
      setError("Failed to encode payload: " + e.message);
    }
  };

  const handleDecode = () => {
    if (!input) return;
    try {
      setError(null);
      const binString = atob(input.trim());
      const bytes = Uint8Array.from(binString, (char) => char.charCodeAt(0));
      const decoded = new TextDecoder().decode(bytes);
      setOutput(decoded);
    } catch (e: any) {
      setError("Invalid Base64 format: " + e.message);
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.85 } });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-2xs font-semibold text-muted-foreground uppercase tracking-wider">Input Source</label>
          <textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              if (error) setError(null);
            }}
            placeholder="Type or paste plain text (to encode) or Base64 code (to decode)..."
            className="w-full h-36 bg-neutral-950 border border-border focus:border-primary/50 outline-hidden rounded-xl p-4 text-xs text-white placeholder-muted-foreground/60 resize-none transition-colors"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-2xs font-semibold text-muted-foreground uppercase tracking-wider">Parsed Outcome</label>
          <textarea
            value={output}
            readOnly
            placeholder="Outcome will appear here..."
            className="w-full h-36 bg-neutral-900 border border-border outline-hidden rounded-xl p-4 text-xs font-mono text-indigo-300 placeholder-muted-foreground/40 resize-none"
          />
        </div>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="flex items-center gap-2">
        <button
          onClick={handleEncode}
          disabled={!input}
          className="px-4 py-2 text-xs font-bold bg-primary border border-primary text-primary-foreground hover:bg-primary-hover disabled:opacity-50 rounded-xl transition-all active:scale-95 shadow-md shadow-primary/10"
        >
          Encode to Base64
        </button>
        <button
          onClick={handleDecode}
          disabled={!input}
          className="px-4 py-2 text-xs font-bold bg-neutral-900 border border-border hover:border-neutral-700 text-white disabled:opacity-50 rounded-xl transition-all active:scale-95"
        >
          Decode Base64
        </button>

        <div className="flex items-center gap-1.5 ml-auto">
          <button
            onClick={() => {
              setInput("");
              setOutput("");
              setError(null);
            }}
            className="p-2 hover:bg-muted text-muted-foreground hover:text-white rounded-lg border border-border/40 transition-colors"
            title="Clear"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            onClick={handleCopy}
            disabled={!output}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 active:scale-95 border ${
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
