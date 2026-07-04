"use client";

import React, { useState } from "react";
import { Copy, Check, RotateCcw } from "lucide-react";

export default function CaseConverter() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const convertCase = (type: string) => {
    if (!text) return;
    let converted = text;

    switch (type) {
      case "upper":
        converted = text.toUpperCase();
        break;
      case "lower":
        converted = text.toLowerCase();
        break;
      case "title":
        converted = text
          .toLowerCase()
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
        break;
      case "sentence":
        converted = text
          .toLowerCase()
          .replace(/(^\s*|[.!?]\s+)([a-z])/g, (m, p1, p2) => p1 + p2.toUpperCase());
        break;
      case "kebab":
        converted = text
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
        break;
      case "snake":
        converted = text
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+/g, "_")
          .replace(/(^-|-$)/g, "");
        break;
      case "camel":
        converted = text
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
          .replace(/[^a-zA-Z0-9]/g, "");
        break;
    }
    setText(converted);
  };

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    import("canvas-confetti").then((m) => m.default({ particleCount: 40, spread: 60, origin: { y: 0.8 } }));
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste your text here..."
        className="w-full min-h-36 bg-neutral-950 border border-border focus:border-primary/50 outline-hidden rounded-xl p-4 text-sm text-white placeholder-muted-foreground resize-y transition-colors"
      />

      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => convertCase("upper")}
          className="px-3.5 py-2 text-xs font-semibold bg-muted hover:bg-neutral-800 text-white rounded-lg transition-colors border border-border/40"
        >
          UPPERCASE
        </button>
        <button
          onClick={() => convertCase("lower")}
          className="px-3.5 py-2 text-xs font-semibold bg-muted hover:bg-neutral-800 text-white rounded-lg transition-colors border border-border/40"
        >
          lowercase
        </button>
        <button
          onClick={() => convertCase("title")}
          className="px-3.5 py-2 text-xs font-semibold bg-muted hover:bg-neutral-800 text-white rounded-lg transition-colors border border-border/40"
        >
          Title Case
        </button>
        <button
          onClick={() => convertCase("sentence")}
          className="px-3.5 py-2 text-xs font-semibold bg-muted hover:bg-neutral-800 text-white rounded-lg transition-colors border border-border/40"
        >
          Sentence case
        </button>
        <button
          onClick={() => convertCase("kebab")}
          className="px-3.5 py-2 text-xs font-semibold bg-muted hover:bg-neutral-800 text-white rounded-lg transition-colors border border-border/40"
        >
          kebab-case
        </button>
        <button
          onClick={() => convertCase("snake")}
          className="px-3.5 py-2 text-xs font-semibold bg-muted hover:bg-neutral-800 text-white rounded-lg transition-colors border border-border/40"
        >
          snake_case
        </button>
        <button
          onClick={() => convertCase("camel")}
          className="px-3.5 py-2 text-xs font-semibold bg-muted hover:bg-neutral-800 text-white rounded-lg transition-colors border border-border/40"
        >
          camelCase
        </button>

        <div className="flex items-center gap-1.5 ml-auto">
          <button
            onClick={() => setText("")}
            className="p-2 hover:bg-muted text-muted-foreground hover:text-white rounded-lg border border-border/40 transition-colors"
            title="Clear Text"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            onClick={handleCopy}
            disabled={!text}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 active:scale-95 border ${
              copied
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                : "bg-primary border-primary text-primary-foreground disabled:opacity-50"
            }`}
          >
            {copied ? <Check className="h-4 w-4 animate-scale" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}
