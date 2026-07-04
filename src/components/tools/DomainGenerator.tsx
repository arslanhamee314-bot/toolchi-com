"use client";

import React, { useState } from "react";
import { Search, Copy, Check, ExternalLink } from "lucide-react";

export default function DomainGenerator() {
  const [keyword, setKeyword] = useState("tool");
  const [generatedNames, setGeneratedNames] = useState<any[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    const base = keyword.trim().toLowerCase();
    const prefixes = ["go", "get", "my", "the", "smart", "pro", "easy", "cyber"];
    const suffixes = ["ify", "ly", "hq", "hub", "io", "ora", "verse", "tech", "base"];

    const names: any[] = [];

    // Synthesize prefix combos
    prefixes.forEach((pref) => {
      names.push({
        domain: `${pref}${base}.com`,
        type: "Premium Prefix Combo"
      });
    });

    // Synthesize suffix combos
    suffixes.forEach((suff) => {
      names.push({
        domain: `${base}${suff}.com`,
        type: "Modern Brandable Combo"
      });
    });

    setGeneratedNames(names.slice(0, 15));
    import("canvas-confetti").then((m) => m.default({ particleCount: 30, spread: 50, origin: { y: 0.85 } }));
  };

  const handleCopy = (domain: string, idx: number) => {
    navigator.clipboard.writeText(domain);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="flex flex-col gap-6 text-foreground text-xs">
      
      <div className="flex flex-col gap-2">
        <label className="font-bold text-sm block">Enter Keywords to Generate Domain Ideas</label>
        <p className="text-muted leading-relaxed text-3xs">Brainstorm domain names and check simulated availability limits.</p>
      </div>

      <form onSubmit={handleGenerate} className="flex gap-2">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Enter core term (e.g. tech, tool, code)..."
          className="flex-1 px-4 py-2.5 text-xs bg-white dark:bg-card border border-border rounded-xl outline-none focus:border-[#7d4dff]"
          required
        />
        <button
          type="submit"
          className="px-6 py-2.5 font-bold bg-[#7d4dff] hover:bg-[#6530ef] text-white rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
        >
          <Search className="h-4 w-4" /> Generate Ideas
        </button>
      </form>

      {generatedNames.length > 0 && (
        <div className="border border-border rounded-2xl p-5 bg-white dark:bg-[#1c2230] flex flex-col gap-3.5 shadow-xs animate-in fade-in slide-in-from-top-2 duration-300">
          <span className="font-bold text-[10px] text-muted uppercase tracking-wider">Generated Domain Names:</span>
          
          <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-1">
            {generatedNames.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center p-3 rounded-xl border border-border bg-white dark:bg-card/40 hover:border-[#7d4dff] transition-colors">
                <div className="flex flex-col">
                  <span className="font-extrabold text-sm text-[#7d4dff]">{item.domain}</span>
                  <span className="text-[10px] text-muted mt-0.5">{item.type}</span>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => handleCopy(item.domain, idx)}
                    className="p-2 border border-border bg-white dark:bg-card rounded-lg hover:border-[#7d4dff] text-muted hover:text-foreground transition-colors cursor-pointer"
                    title="Copy domain"
                  >
                    {copiedIndex === idx ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                  <a
                    href={`https://www.whois.com/whois/${item.domain}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border border-border bg-white dark:bg-card rounded-lg hover:border-[#7d4dff] text-muted hover:text-foreground transition-colors"
                    title="Check WHOIS"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
