"use client";

import React, { useState } from "react";
import { Copy, Check, RotateCcw } from "lucide-react";

export default function LoremIpsum() {
  const [paragraphsCount, setParagraphsCount] = useState(3);
  const [generatedText, setGeneratedText] = useState("");
  const [copied, setCopied] = useState(false);
  const [formatType, setFormatType] = useState<"text" | "html">("text");

  const LOREM_DATABASE = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia.",
    "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis.",
    "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis."
  ];

  const handleGenerate = () => {
    let result = [];
    for (let i = 0; i < paragraphsCount; i++) {
      // Pick paragraphs cyclically
      const p = LOREM_DATABASE[i % LOREM_DATABASE.length];
      result.push(formatType === "html" ? `<p>${p}</p>` : p);
    }
    setGeneratedText(result.join(formatType === "html" ? "\n" : "\n\n"));
    import("canvas-confetti").then((m) => m.default({ particleCount: 15, spread: 30, origin: { y: 0.85 } }));
  };

  const handleCopy = () => {
    if (!generatedText) return;
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    import("canvas-confetti").then((m) => m.default({ particleCount: 30, spread: 50, origin: { y: 0.85 } }));
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3 bg-neutral-950 border border-border rounded-xl p-3.5">
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-muted-foreground">Paragraphs:</label>
          <input
            type="number"
            min={1}
            max={10}
            value={paragraphsCount}
            onChange={(e) => setParagraphsCount(Math.max(1, Number(e.target.value)))}
            className="w-16 bg-neutral-900 border border-border text-xs text-white rounded-lg p-2 focus:outline-hidden"
          />
        </div>

        <div className="flex bg-neutral-900 border border-border p-1 rounded-xl select-none">
          <button
            onClick={() => setFormatType("text")}
            className={`px-3 py-1 text-3xs font-bold rounded-lg transition-all cursor-pointer ${
              formatType === "text" ? "bg-[#7d4dff] text-white" : "text-muted-foreground hover:text-white"
            }`}
          >
            Raw Text
          </button>
          <button
            onClick={() => setFormatType("html")}
            className={`px-3 py-1 text-3xs font-bold rounded-lg transition-all cursor-pointer ${
              formatType === "html" ? "bg-[#7d4dff] text-white" : "text-muted-foreground hover:text-white"
            }`}
          >
            HTML Tags
          </button>
        </div>

        <button
          onClick={handleGenerate}
          className="px-4 py-2.5 text-xs font-bold bg-primary border border-primary text-primary-foreground hover:bg-primary-hover rounded-xl transition-all active:scale-95 shadow-md shadow-primary/10 ml-auto sm:ml-0"
        >
          Generate Placeholder
        </button>
      </div>

      {generatedText && (
        <div className="flex flex-col gap-2 mt-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <textarea
            value={generatedText}
            readOnly
            className="w-full min-h-36 bg-neutral-900 border border-border outline-hidden rounded-xl p-4 text-xs leading-relaxed text-indigo-300 resize-none font-sans"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                setGeneratedText("");
                setParagraphsCount(3);
              }}
              className="p-2 hover:bg-muted text-muted-foreground hover:text-white rounded-lg border border-border/40 transition-colors"
              title="Reset"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
            <button
              onClick={handleCopy}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 active:scale-95 border ${
                copied
                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                  : "bg-primary border-primary text-primary-foreground"
              }`}
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied!" : "Copy Placeholder"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
