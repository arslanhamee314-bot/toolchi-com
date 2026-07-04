"use client";

import React, { useState } from "react";
import { Copy, Check, RotateCcw, Shield } from "lucide-react";

export default function HashGenerator() {
  const [text, setText] = useState("");
  const [algorithm, setAlgorithm] = useState("SHA-256");
  const [hashOutput, setHashOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const calculateHash = async () => {
    if (!text) return;
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(text);
      
      // Calculate hash using Web Crypto API
      const hashBuffer = await crypto.subtle.digest(algorithm, data);
      
      // Convert buffer to hex string
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
      
      setHashOutput(hashHex);
    } catch (e: any) {
      console.error(e);
      setHashOutput("Error generating hash: " + e.message);
    }
  };

  const handleCopy = () => {
    if (!hashOutput) return;
    navigator.clipboard.writeText(hashOutput);
    setCopied(true);
    import("canvas-confetti").then((m) => m.default({ particleCount: 30, spread: 50, origin: { y: 0.85 } }));
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4">
      <textarea
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setHashOutput(""); // reset output on edit
        }}
        placeholder="Type or paste plain text string to hash..."
        className="w-full min-h-24 bg-neutral-950 border border-border focus:border-primary/50 outline-hidden rounded-xl p-4 text-sm text-white placeholder-muted-foreground/60 resize-y transition-colors"
      />

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-muted-foreground">Algorithm:</label>
          <select
            value={algorithm}
            onChange={(e) => {
              setAlgorithm(e.target.value);
              setHashOutput("");
            }}
            className="bg-neutral-950 border border-border text-xs font-semibold text-white rounded-lg p-2 focus:outline-hidden"
          >
            <option value="SHA-256">SHA-256</option>
            <option value="SHA-512">SHA-512</option>
            <option value="SHA-1">SHA-1</option>
          </select>
        </div>

        <button
          onClick={calculateHash}
          disabled={!text}
          className="px-5 py-2.5 text-xs font-bold bg-primary border border-primary text-primary-foreground hover:bg-primary-hover disabled:opacity-50 rounded-xl transition-all active:scale-95 shadow-md shadow-primary/10"
        >
          Generate Checksum
        </button>

        <div className="flex items-center gap-1.5 ml-auto">
          <button
            onClick={() => {
              setText("");
              setHashOutput("");
            }}
            className="p-2 hover:bg-muted text-muted-foreground hover:text-white rounded-lg border border-border/40 transition-colors"
            title="Reset"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {hashOutput && (
        <div className="flex flex-col gap-2 mt-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <label className="text-2xs font-semibold text-muted-foreground uppercase tracking-wider">Generated Hash ({algorithm})</label>
          <div className="flex bg-neutral-900 border border-border rounded-xl p-3.5 items-center justify-between gap-4 font-mono text-xs text-indigo-300 overflow-x-auto">
            <span className="break-all">{hashOutput}</span>
            <button
              onClick={handleCopy}
              className={`p-2 rounded-lg transition-all border shrink-0 ${
                copied
                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                  : "bg-neutral-800 border-border hover:bg-neutral-700 text-white"
              }`}
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
