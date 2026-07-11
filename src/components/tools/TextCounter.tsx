"use client";

import React, { useState, useMemo } from "react";
import { RotateCcw } from "lucide-react";
import SmartAssist from "./SmartAssist";
import PresetSelector from "./PresetSelector";
import ResultScore from "./ResultScore";
import NextBestActions from "./NextBestActions";

export default function TextCounter() {
  const [text, setText] = useState("");
  const [selectedPreset, setSelectedPreset] = useState("blog");

  const presets = [
    { id: "blog", name: "Blog Post", description: "Target: 600-1500 words" },
    { id: "seo_meta", name: "SEO Meta", description: "Target: 120-160 chars" },
    { id: "social", name: "Social Post", description: "Target: under 280 chars" },
    { id: "email", name: "Cold Email", description: "Target: 50-150 words" }
  ];

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

    // Dynamic quality score calculation
    let targetScore = 100;
    if (selectedPreset === "seo_meta") {
      if (charsWithSpaces < 120 || charsWithSpaces > 160) {
        targetScore = 50;
      }
    } else if (selectedPreset === "blog") {
      if (wordCount < 300) {
        targetScore = 50;
      } else if (wordCount < 600) {
        targetScore = 80;
      }
    } else if (selectedPreset === "social") {
      if (charsWithSpaces > 280) {
        targetScore = 40;
      }
    } else if (selectedPreset === "email") {
      if (wordCount < 50 || wordCount > 150) {
        targetScore = 70;
      }
    }
    if (text.length === 0) targetScore = 0;

    return {
      charsWithSpaces,
      charsNoSpaces,
      wordCount,
      sentenceCount,
      paragraphCount,
      avgWordLength,
      topKeywords,
      readingTimeStr,
      speakingTimeStr,
      targetScore
    };
  }, [text, selectedPreset]);

  // Dynamic Smart Assist details
  let recommendation = "Select a target preset to analyze layout boundaries.";
  let reason = "Different channels (Blogs, Meta description snippets, Socials) enforce exact character rules.";
  let nextStep = "Select a preset above";

  if (selectedPreset === "blog") {
    if (metrics.wordCount < 600) {
      recommendation = "Blog post word count is too short.";
      reason = "Search engines favor comprehensive write-ups. We recommend expanding content to 800+ words.";
      nextStep = "Expand post details";
    } else {
      recommendation = "Excellent blog post length.";
      reason = "Word counts over 600 are optimized for standard crawlers and reader retention.";
      nextStep = "Review keyword density map below";
    }
  } else if (selectedPreset === "seo_meta") {
    if (metrics.charsWithSpaces < 120 || metrics.charsWithSpaces > 160) {
      recommendation = "SEO Meta description falls out of optimal limits.";
      reason = "Keep meta description between 120 and 160 characters to prevent truncation on search result cards.";
      nextStep = "Adjust description length";
    } else {
      recommendation = "Meta description is search-engine optimized.";
      reason = "Matches perfect limits for both desktop and mobile snippets.";
      nextStep = "Copy to website settings";
    }
  } else if (selectedPreset === "social") {
    if (metrics.charsWithSpaces > 280) {
      recommendation = "Social post exceeds 280 characters.";
      reason = "Posts exceeding X / Twitter standard length require truncation. Shorten to maintain quick readability.";
      nextStep = "Shorten paragraph details";
    } else {
      recommendation = "Social post length is optimized.";
      reason = "Meets standard post parameters for Twitter/X, LinkedIn feeds, and Facebook updates.";
      nextStep = "Copy post text";
    }
  }

  const nextActions = [
    { slug: "spell-checker", name: "Spell Checker", description: "Verify spelling and correct typing mistakes in your draft." },
    { slug: "case-converter", name: "Case Converter", description: "Format titles, camelCases, slugs, or programming text variables." },
    { slug: "domain-generator", name: "Domain Generator", description: "Brainstorm high ranking brandable domain names from text ideas." }
  ];

  return (
    <div className="flex flex-col gap-5 text-foreground text-xs text-left">
      {/* Smart Assist Panel */}
      <SmartAssist recommendation={recommendation} reason={reason} nextStep={nextStep} />

      {/* Preset Selector */}
      <div className="border-b border-border/40 pb-3">
        <PresetSelector presets={presets} selectedPresetId={selectedPreset} onSelect={setSelectedPreset} />
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste your text content to count..."
        className="w-full min-h-36 bg-neutral-950 border border-border focus:border-primary/50 outline-hidden rounded-xl p-4 text-sm text-white placeholder-muted-foreground resize-y transition-colors"
      />

      {/* Quality Score component */}
      {text.length > 0 && (
        <ResultScore score={metrics.targetScore} metricTitle="SEO Length Suggestion Score" details="Evaluates character boundaries and word density suitability according to targets." />
      )}

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
          className="px-4 py-2 text-xs font-semibold bg-neutral-900 border border-border hover:border-neutral-700 hover:text-white rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
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

      {/* Next Best Actions */}
      <NextBestActions actions={nextActions} />
    </div>
  );
}
