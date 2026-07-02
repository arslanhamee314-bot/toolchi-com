"use client";

import React, { useState } from "react";
import { Copy, Check, RotateCcw, Equal } from "lucide-react";
import confetti from "canvas-confetti";

export default function Calculator() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);

  const calculate = () => {
    if (!expression.trim()) return;
    try {
      setError(false);
      // Clean target equations for secure JavaScript evaluation (prevent arbitrary executions)
      const cleanExpr = expression.replace(/[^0-9+\-*/().\s]/g, "");
      
      // Evaluate basic arithmetic safely
      const outcome = new Function(`return (${cleanExpr})`)();
      
      if (outcome === undefined || isNaN(outcome)) {
        throw new Error("Invalid output");
      }
      setResult(String(outcome));
    } catch (e) {
      setError(true);
      setResult("Syntax Error");
    }
  };

  const handleCopy = () => {
    if (!result || error) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    confetti({ particleCount: 20, spread: 45, origin: { y: 0.85 } });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex bg-neutral-950 border border-border focus-within:border-primary/50 rounded-xl px-4 py-3 items-center gap-3">
        <input
          type="text"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") calculate();
          }}
          placeholder="Enter arithmetic expression (e.g. (2 + 3) * 5)..."
          className="bg-transparent border-0 outline-hidden text-sm text-white w-full placeholder:text-muted-foreground/60 font-mono"
        />
        <button
          onClick={calculate}
          className="p-1.5 bg-primary text-primary-foreground rounded-lg hover:scale-105 active:scale-95 transition-all shrink-0"
        >
          <Equal className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-2xs font-semibold text-muted-foreground uppercase tracking-wider">Evaluation Result</label>
        <div className={`flex bg-neutral-900 border rounded-xl p-3.5 items-center justify-between gap-4 font-mono text-base ${
          error ? "border-rose-500/20 text-rose-400 bg-rose-500/5" : "border-border text-indigo-300"
        }`}>
          <span>{result || "0"}</span>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => {
                setExpression("");
                setResult("");
                setError(false);
              }}
              className="p-1.5 hover:bg-neutral-800 text-muted-foreground hover:text-white rounded transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
            <button
              onClick={handleCopy}
              disabled={!result || error}
              className={`p-1.5 rounded transition-all border ${
                copied
                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                  : "bg-neutral-800 border-border hover:bg-neutral-700 text-white disabled:opacity-40"
              }`}
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
