"use client";

import React, { useState, useEffect, useRef } from "react";
import { Copy, Check, RotateCcw, ShieldCheck, Download, FileCode } from "lucide-react";

export default function Minifier() {
  const [codeType, setCodeType] = useState<"css" | "js">("js");
  const [inputCode, setInputCode] = useState("");
  const [outputCode, setOutputCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Hook into central sample data loader
  useEffect(() => {
    const handleLoadSample = (e: any) => {
      if (e.detail?.slug === "minify-code") {
        if (codeType === "js") {
          setInputCode(`// Sample Javascript
function calculateSum(a, b) {
  /* This is a multiline comment
     which will be stripped */
  const result = a + b;
  console.log("Sum: " + result);
  return result;
}`);
        } else {
          setInputCode(`/* Sample CSS */
body {
  background-color: #11141c;
  color: #ffffff;
  margin: 0;
  padding: 0px;
}`);
        }
      }
    };
    window.addEventListener("load-sample", handleLoadSample);
    return () => window.removeEventListener("load-sample", handleLoadSample);
  }, [codeType]);

  // Live real-time minification loop
  useEffect(() => {
    if (!inputCode.trim()) {
      setOutputCode("");
      return;
    }

    let minified = inputCode;
    if (codeType === "css") {
      minified = minified
        .replace(/\/\*[\s\S]*?\*\//g, "") // strip comments
        .replace(/\s+/g, " ") // compress whitespaces
        .replace(/\s*([\{\}:;,])\s*/g, "$1") // strip spaces around punctuation
        .replace(/;}/g, "}") // strip last semicolon
        .trim();
    } else {
      minified = minified
        .replace(/\/\*[\s\S]*?\*\//g, "") // multiline comments
        .replace(/\/\/.*/g, "") // single line comments
        .replace(/\s+/g, " ") // compress whitespaces
        .replace(/\s*([\{\}\(\)=:;,+\-*\/])\s*/g, "$1") // spaces around punctuation
        .trim();
    }
    setOutputCode(minified);
  }, [inputCode, codeType]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      setInputCode(event.target?.result as string);
    };
    reader.readAsText(file);
  };

  const handleDownload = () => {
    if (!outputCode) return;
    const blob = new Blob([outputCode], { type: codeType === "js" ? "application/javascript" : "text/css" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName ? fileName.replace(/\.(js|css|txt)$/i, `.min.${codeType}`) : `optimized.min.${codeType}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    if (!outputCode) return;
    navigator.clipboard.writeText(outputCode);
    setCopied(true);
    import("canvas-confetti").then((m) => m.default({ particleCount: 30, spread: 50, origin: { y: 0.85 } }));
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setInputCode("");
    setOutputCode("");
    setFileName("");
  };

  const originalLen = inputCode.length;
  const minifiedLen = outputCode.length;
  const savings = originalLen > 0 ? originalLen - minifiedLen : 0;
  const pct = originalLen > 0 ? Math.round((savings / originalLen) * 100) : 0;

  return (
    <div className="flex flex-col gap-6 text-left">
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <h4 className="text-sm font-extrabold text-foreground uppercase tracking-wider">Code Asset Minifier</h4>
        <span className="inline-flex items-center gap-1 text-[9px] font-bold text-[#7d4dff] bg-[#f3eeff] border border-[#e8ddff] px-2 py-0.5 rounded-lg select-none">
          <ShieldCheck className="h-3.5 w-3.5" /> 100% Client Minifier
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2 select-none">
        <button
          onClick={() => setCodeType("js")}
          className={`px-3.5 py-1.5 rounded-xl text-3xs font-extrabold transition-all cursor-pointer ${
            codeType === "js" ? "bg-primary text-white" : "bg-neutral-100 dark:bg-neutral-800 text-muted-foreground"
          }`}
        >
          JavaScript
        </button>
        <button
          onClick={() => setCodeType("css")}
          className={`px-3.5 py-1.5 rounded-xl text-3xs font-extrabold transition-all cursor-pointer ${
            codeType === "css" ? "bg-primary text-white" : "bg-neutral-100 dark:bg-neutral-800 text-muted-foreground"
          }`}
        >
          CSS
        </button>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 text-3xs font-extrabold bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-foreground rounded-xl transition-all border border-border/60 cursor-pointer"
        >
          <FileCode className="h-3.5 w-3.5" />
          <span>{fileName ? "Change File" : "Upload File"}</span>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".js,.css,.txt"
            className="hidden"
          />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input Pane */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Source Raw Code</label>
          <textarea
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            placeholder={`Paste raw ${codeType.toUpperCase()} code here...`}
            className="w-full h-48 bg-neutral-50 dark:bg-[#1a202c] border border-border focus:border-primary/50 outline-hidden rounded-xl p-4 text-xs font-mono text-foreground placeholder-muted-foreground/60 resize-none transition-colors"
          />
        </div>

        {/* Output Pane */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Minified Result</label>
          <textarea
            value={outputCode}
            readOnly
            placeholder="Minified outcome will appear here in real-time..."
            className="w-full h-48 bg-neutral-50/50 dark:bg-card/25 border border-border outline-hidden rounded-xl p-4 text-xs font-mono text-foreground placeholder-muted-foreground/45 resize-none"
          />
        </div>
      </div>

      {originalLen > 0 && (
        <div className="grid grid-cols-3 gap-3 text-center border border-border/80 rounded-2xl p-3 bg-neutral-50/30 dark:bg-card/30 text-3xs font-bold leading-normal">
          <div>
            <span className="text-muted-foreground block text-[8px] uppercase">Original Size</span>
            <span className="text-foreground">{(originalLen / 1024).toFixed(2)} KB</span>
          </div>
          <div>
            <span className="text-muted-foreground block text-[8px] uppercase">Compressed Size</span>
            <span className="text-emerald-500">{(minifiedLen / 1024).toFixed(2)} KB</span>
          </div>
          <div>
            <span className="text-muted-foreground block text-[8px] uppercase">Byte Savings</span>
            <span className="text-emerald-500">{pct}% Less Payload</span>
          </div>
        </div>
      )}

      {/* Control Actions bar */}
      <div className="flex items-center justify-between border-t border-border/40 pt-3">
        <span className="text-[10px] text-muted-foreground/80 font-medium">
          {fileName ? `Source: ${fileName}` : "Client-side compilation"}
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            disabled={!inputCode}
            className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-muted-foreground hover:text-foreground rounded-lg border border-border/40 transition-colors cursor-pointer"
            title="Reset"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          {outputCode && (
            <button
              onClick={handleDownload}
              className="px-3.5 py-2 text-xs font-bold bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-foreground border border-border rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Download className="h-4 w-4" />
              <span>Download File</span>
            </button>
          )}
          <button
            onClick={handleCopy}
            disabled={!outputCode}
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
