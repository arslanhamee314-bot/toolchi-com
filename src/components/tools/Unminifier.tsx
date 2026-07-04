"use client";

import React, { useState } from "react";
import { Copy, Check, RotateCcw, Play } from "lucide-react";

export default function Unminifier() {
  const [codeType, setCodeType] = useState<"css" | "js">("js");
  const [inputCode, setInputCode] = useState("");
  const [outputCode, setOutputCode] = useState("");
  const [copied, setCopied] = useState(false);

  const handleUnminify = () => {
    if (!inputCode.trim()) return;

    let formatted = "";

    if (codeType === "css") {
      // Basic CSS unminification parser (expand brackets, block indentation)
      let indent = 0;
      const clean = inputCode
        .replace(/\s*([\{\};,])\s*/g, "$1") // clean spacings
        .replace(/;}/g, "}");

      for (let i = 0; i < clean.length; i++) {
        const char = clean[i];
        if (char === "{") {
          formatted += " {\n" + "  ".repeat(++indent);
        } else if (char === "}") {
          formatted = formatted.trimEnd();
          formatted += "\n" + "  ".repeat(--indent) + "}\n\n";
          if (indent > 0) formatted += "  ".repeat(indent);
        } else if (char === ";") {
          formatted += ";\n" + "  ".repeat(indent);
        } else if (char === ",") {
          formatted += ", ";
        } else {
          formatted += char;
        }
      }
      formatted = formatted.trim();
    } else {
      // Basic JS unminification parser (brackets spacing, line wrapping)
      let indent = 0;
      const clean = inputCode.replace(/([\{\};])/g, "$1\n");
      const lines = clean.split("\n");

      lines.forEach((line) => {
        const trimmed = line.trim();
        if (!trimmed) return;

        if (trimmed.includes("}")) {
          indent = Math.max(0, indent - 1);
        }

        formatted += "  ".repeat(indent) + trimmed + "\n";

        if (trimmed.includes("{")) {
          indent++;
        }
      });
    }

    setOutputCode(formatted.trim());
    import("canvas-confetti").then((m) => m.default({ particleCount: 30, spread: 50, origin: { y: 0.85 } }));
  };

  const handleCopy = () => {
    if (!outputCode) return;
    navigator.clipboard.writeText(outputCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setInputCode("");
    setOutputCode("");
  };

  return (
    <div className="flex flex-col gap-6 text-foreground text-xs">
      
      <div className="flex flex-col gap-2">
        <label className="font-bold text-sm block">Unminify JS & CSS Code</label>
        <p className="text-muted leading-relaxed text-3xs">Pretty print compressed JavaScript or CSS code blocks to restore readability.</p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setCodeType("js")}
          className={`px-4 py-2 font-bold rounded-xl border text-3xs transition-colors cursor-pointer ${
            codeType === "js" ? "bg-[#7d4dff] text-white border-[#7d4dff]" : "bg-white dark:bg-card border-border hover:border-[#7d4dff]"
          }`}
        >
          JavaScript
        </button>
        <button
          onClick={() => setCodeType("css")}
          className={`px-4 py-2 font-bold rounded-xl border text-3xs transition-colors cursor-pointer ${
            codeType === "css" ? "bg-[#7d4dff] text-white border-[#7d4dff]" : "bg-white dark:bg-card border-border hover:border-[#7d4dff]"
          }`}
        >
          CSS
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <span className="text-muted block text-3xs font-bold uppercase">Minified Code</span>
          <textarea
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            placeholder="Paste compressed code here..."
            className="h-48 w-full p-4 bg-white dark:bg-card border border-border rounded-xl outline-none focus:border-[#7d4dff] font-mono leading-relaxed"
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-muted block text-3xs font-bold uppercase">Formatted Code</span>
          <textarea
            value={outputCode}
            readOnly
            placeholder="Unminified pretty printed code will load here..."
            className="h-48 w-full p-4 bg-neutral-50 dark:bg-neutral-900 border border-border rounded-xl outline-none font-mono leading-relaxed select-all"
          />
        </div>
      </div>

      <div className="flex gap-3 items-center">
        <button
          onClick={handleUnminify}
          className="px-6 py-2.5 font-bold bg-[#7d4dff] hover:bg-[#6530ef] text-white rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
        >
          <Play className="h-4 w-4" /> Pretty Print
        </button>
        <button
          onClick={handleReset}
          className="p-2.5 border border-border bg-white dark:bg-card hover:border-neutral-700 rounded-xl text-muted hover:text-foreground transition-colors cursor-pointer"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
        {outputCode && (
          <button
            onClick={handleCopy}
            className="px-4 py-2.5 font-bold bg-white dark:bg-card border border-border hover:border-[#7d4dff] rounded-xl transition-colors cursor-pointer ml-auto flex items-center gap-1.5"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied" : "Copy Output"}
          </button>
        )}
      </div>

    </div>
  );
}
