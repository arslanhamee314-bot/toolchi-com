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

    // Keywords density computation
    const stopWords = new Set(['the', 'a', 'and', 'or', 'in', 'of', 'to', 'is', 'it', 'that', 'this', 'for', 'on', 'with', 'as', 'at', 'by', 'an', 'be', 'are', 'was', 'were', 'from', 'but', 'not']);
    const frequencyMap: Record<string, number> = {};
    wordsArray.forEach((word) => {
      const clean = word.toLowerCase().replace(/[^a-z0-9]/g, "");
      if (clean && clean.length > 2 && !stopWords.has(clean)) {
        frequencyMap[clean] = (frequencyMap[clean] || 0) + 1;
      }
    });

    const topKeywords = Object.entries(frequencyMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([word, count]) => ({
        word,
        count,
        percent: wordCount > 0 ? ((count / wordCount) * 100).toFixed(1) + "%" : "0%"
      }));
    const readingTimeSeconds = Math.round((wordCount / 200) * 60);
    const readingTimeStr = readingTimeSeconds < 60 ? `${readingTimeSeconds}s` : `~${Math.ceil(readingTimeSeconds / 60)}m`;

    const speakingTimeSeconds = Math.round((wordCount / 130) * 60);
    const speakingTimeStr = speakingTimeSeconds < 60 ? `${speakingTimeSeconds}s` : `~${Math.ceil(speakingTimeSeconds / 60)}m`;

    return {
      charsWithSpaces,
      charsNoSpaces,
      wordCount,
      sentenceCount,
      paragraphCount,
      avgWordLength,
      topKeywords,
      readingTimeStr,
      speakingTimeStr
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

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
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
          <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider block mb-1">Avg Word</span>
          <span className="text-xl font-bold text-white">{metrics.avgWordLength}</span>
        </div>
        <div className="glass p-3 rounded-xl border border-border/40 text-center">
          <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider block mb-1">Read Time</span>
          <span className="text-xl font-bold text-[#7d4dff]">{metrics.readingTimeStr}</span>
        </div>
        <div className="glass p-3 rounded-xl border border-border/40 text-center">
          <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider block mb-1">Speak Time</span>
          <span className="text-xl font-bold text-[#7d4dff]">{metrics.speakingTimeStr}</span>
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

      {metrics.topKeywords.length > 0 && (
        <div className="border border-border/65 rounded-xl p-4 bg-white dark:bg-card/40 flex flex-col gap-2.5 mt-2 animate-in fade-in duration-300">
          <span className="font-extrabold text-[10px] text-muted-foreground uppercase tracking-wider block">Top Keyword Density Analysis</span>
          <div className="flex flex-wrap gap-2">
            {metrics.topKeywords.map((item, idx) => (
              <span key={idx} className="px-3 py-1.5 bg-neutral-50 dark:bg-neutral-900/60 border border-border rounded-lg text-3xs font-bold text-foreground">
                {item.word}: {item.count} repetitions ({item.percent})
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
