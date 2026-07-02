"use client";

import React, { useState, useMemo } from "react";
import { RotateCcw } from "lucide-react";

export default function TextCounter() {
  const [text, setText] = useState("");

  // Counts analysis
  const metrics = useMemo(() => {
    const charsWithSpaces = text.length;
    const charsNoSpaces = text.replace(/\s/g, "").length;
    
    const wordsArray = text.trim().split(/\s+/).filter(Boolean);
    const wordCount = wordsArray.length;
    
    const sentenceCount = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const paragraphCount = text.split(/\n+/).filter(p => p.trim().length > 0).length;

    let avgWordLength = 0;
    if (wordCount > 0) {
      const totalLetters = wordsArray.reduce((acc, word) => acc + word.length, 0);
      avgWordLength = parseFloat((totalLetters / wordCount).toFixed(1));
    }

    return {
      charsWithSpaces,
      charsNoSpaces,
      wordCount,
      sentenceCount,
      paragraphCount,
      avgWordLength
    };
  }, [text]);

  return (
    <div className="flex flex-col gap-5">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste your text content to count..."
        className="w-full min-h-36 bg-neutral-950 border border-border focus:border-primary/50 outline-hidden rounded-xl p-4 text-sm text-white placeholder-muted-foreground resize-y transition-colors"
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="glass p-3 rounded-xl border border-border/40 text-center">
          <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider block mb-1">Words</span>
          <span className="text-xl font-bold text-white">{metrics.wordCount}</span>
        </div>
        <div className="glass p-3 rounded-xl border border-border/40 text-center">
          <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider block mb-1">Characters</span>
          <span className="text-xl font-bold text-white">{metrics.charsWithSpaces}</span>
        </div>
        <div className="glass p-3 rounded-xl border border-border/40 text-center">
          <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider block mb-1">No Spaces</span>
          <span className="text-xl font-bold text-white">{metrics.charsNoSpaces}</span>
        </div>
        <div className="glass p-3 rounded-xl border border-border/40 text-center">
          <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider block mb-1">Sentences</span>
          <span className="text-xl font-bold text-white">{metrics.sentenceCount}</span>
        </div>
        <div className="glass p-3 rounded-xl border border-border/40 text-center">
          <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider block mb-1">Paragraphs</span>
          <span className="text-xl font-bold text-white">{metrics.paragraphCount}</span>
        </div>
        <div className="glass p-3 rounded-xl border border-border/40 text-center">
          <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider block mb-1">Avg Word Length</span>
          <span className="text-xl font-bold text-white">{metrics.avgWordLength}</span>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => setText("")}
          className="px-4 py-2 text-xs font-semibold bg-neutral-900 border border-border hover:border-neutral-700 hover:text-white rounded-xl transition-colors flex items-center gap-1.5"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Clear Text
        </button>
      </div>
    </div>
  );
}
