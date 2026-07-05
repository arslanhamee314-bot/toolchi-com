"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Cpu, Check, Copy, RefreshCw, AlertCircle, ShieldCheck } from "lucide-react";
import { getSampleBySlug } from "@/lib/tool-samples";

interface SentenceResult {
  text: string;
  score: number;
}

export default function AiDetector() {
  const [activeTab, setActiveTab] = useState<"detector" | "humanizer">("detector");
  const [inputText, setInputText] = useState("");
  const [detectorResult, setDetectorResult] = useState<{
    aiPercent: number;
    humanPercent: number;
    perplexity: "High" | "Medium" | "Low";
    buzzwordsFound: string[];
    sentences: SentenceResult[];
    wordCount: number;
    charCount: number;
    sentenceCount: number;
    readabilityScore: number;
  } | null>(null);

  // Naturalizer (Humanizer) states
  const [humanizerInput, setHumanizerInput] = useState("");
  const [humanizedText, setHumanizedText] = useState("");
  const [isHumanizing, setIsHumanizing] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Hook into central sample data event
  useEffect(() => {
    const handleLoadSample = (e: any) => {
      if (e.detail?.slug === "ai-detector") {
        const sampleText = getSampleBySlug("ai-detector");
        if (activeTab === "detector") {
          setInputText(sampleText);
          // Let State propagate then trigger analysis (or analyze inline directly)
          analyzeTextContent(sampleText);
        } else {
          setHumanizerInput(sampleText);
          naturalizeTextContent(sampleText);
        }
      }
    };

    window.addEventListener("load-sample", handleLoadSample);
    return () => window.removeEventListener("load-sample", handleLoadSample);
  }, [activeTab]);

  const AI_BUZZWORDS = [
    "furthermore", "moreover", "testament", "delve", "not only", 
    "in conclusion", "it is important to note", "crucial role", 
    "tapestry", "beacon", "multifaceted", "paramount", "underscores", 
    "invaluable", "holistic", "delves", "groundbreaking", "fostering"
  ];

  const HUMANIZER_REPLACEMENTS: Record<string, string> = {
    "furthermore": "also",
    "Furthermore": "Also",
    "moreover": "what's more",
    "Moreover": "What's more",
    "in conclusion": "ultimately",
    "In conclusion": "Ultimately",
    "testament to": "proof of",
    "testament": "proof",
    "delve into": "look at",
    "delve": "look",
    "delves into": "looks at",
    "delves": "looks",
    "it is important to note that": "remember that",
    "it is important to note": "keep in mind",
    "crucial role": "big part",
    "tapestry": "rich mix",
    "beacon": "sign",
    "multifaceted": "complex",
    "paramount": "essential",
    "underscores": "highlights",
    "invaluable": "extremely helpful",
    "holistic": "well-rounded",
    "groundbreaking": "new",
    "fostering": "building"
  };

  const calculateReadability = (text: string) => {
    const words = text.trim().split(/\s+/).filter(w => w.length > 0);
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    if (words.length === 0 || sentences.length === 0) return 0;
    
    const avgSentenceLength = words.length / sentences.length;
    const longWords = words.filter(w => w.length > 6).length;
    const longWordRatio = longWords / words.length;
    
    // Heuristic Flesch-like index for English text
    const score = Math.round(206.835 - 1.015 * avgSentenceLength - 84.6 * (longWordRatio * 1.5));
    return Math.min(Math.max(score, 15), 100);
  };

  // Heuristic AI Detection Engine
  const analyzeTextContent = (text: string) => {
    if (!text.trim()) return;

    // Word, Char, Sentence statistics
    const wordList = text.trim().split(/\s+/).filter(w => w.length > 0);
    const wordCount = wordList.length;
    const charCount = text.length;
    
    const sentenceList = text
      .split(/(?<=[.!?])\s+/)
      .map(s => s.trim())
      .filter(s => s.length > 0);
    
    const sentenceCount = sentenceList.length;
    const readabilityScore = calculateReadability(text);

    if (sentenceList.length === 0) return;

    // Find AI buzzwords density
    const lowerText = text.toLowerCase();
    const foundBuzzwords = AI_BUZZWORDS.filter(word => lowerText.includes(word));

    // Calculate sentence lengths and variance
    const lengths = sentenceList.map(s => s.split(/\s+/).length);
    const avgLength = lengths.reduce((a, b) => a + b, 0) / lengths.length;
    
    // Variance calculation (typical AI has very uniform sentence lengths)
    const variance = lengths.reduce((acc, len) => acc + Math.pow(len - avgLength, 2), 0) / lengths.length;

    let perplexity: "High" | "Medium" | "Low" = "High";
    if (variance < 15) perplexity = "Low"; // Uniform sentence length
    else if (variance < 40) perplexity = "Medium";

    // Score sentences
    const processedSentences: SentenceResult[] = sentenceList.map(sentence => {
      let score = 15; // Base score
      const lowerSentence = sentence.toLowerCase();

      // Check if sentence length is close to average (uniform sentence structure)
      const wordCount = sentence.split(/\s+/).length;
      if (Math.abs(wordCount - avgLength) < 3) {
        score += 20;
      }

      // Check AI buzzwords
      AI_BUZZWORDS.forEach(word => {
        if (lowerSentence.includes(word)) {
          score += 25;
        }
      });

      // Check transition starts
      if (/^(moreover|furthermore|consequently|in addition|to summarize|in conclusion|consequently)/i.test(sentence)) {
        score += 30;
      }

      // Cap scores
      score = Math.min(Math.max(score, 5), 98);
      return { text: sentence, score };
    });

    // Weighted average score
    const totalWords = lengths.reduce((a, b) => a + b, 0);
    const weightedSum = processedSentences.reduce((acc, s, index) => {
      return acc + (s.score * lengths[index]);
    }, 0);

    let aiPercent = Math.round(weightedSum / totalWords);
    if (foundBuzzwords.length > 3 && aiPercent < 60) aiPercent += 15;
    if (perplexity === "Low" && aiPercent < 70) aiPercent += 10;
    
    aiPercent = Math.min(Math.max(aiPercent, 5), 95);
    const humanPercent = 100 - aiPercent;

    setDetectorResult({
      aiPercent,
      humanPercent,
      perplexity,
      buzzwordsFound: foundBuzzwords,
      sentences: processedSentences,
      wordCount,
      charCount,
      sentenceCount,
      readabilityScore
    });
  };

  const analyzeText = () => {
    analyzeTextContent(inputText);
  };

  // Local AI Naturalizer Engine (Safe tone shifting and phrasing rewriter)
  const naturalizeTextContent = (textToNaturalize: string) => {
    if (!textToNaturalize.trim()) return;

    setIsHumanizing(true);
    
    setTimeout(() => {
      let text = textToNaturalize;

      // Swap common AI transitions & buzzwords using our rules map
      Object.entries(HUMANIZER_REPLACEMENTS).forEach(([key, val]) => {
        const regex = new RegExp(`\\b${key}\\b`, 'g');
        text = text.replace(regex, val);
      });

      // Split into sentences to restructure patterns and add human-like variation (burstiness)
      const sentences = text.split(/(?<=[.!?])\s+/);
      const modifiedSentences = sentences.map((sentence, idx) => {
        let clean = sentence.trim();
        if (!clean) return "";

        // Periodically break down overly complex sentences to increase length variance
        const words = clean.split(/\s+/);
        if (words.length > 22 && idx % 2 === 0) {
          const midPoint = Math.floor(words.length / 2);
          const firstPart = words.slice(0, midPoint).join(" ");
          const secondPart = words.slice(midPoint).join(" ");
          const formattedSecond = secondPart.charAt(0).toUpperCase() + secondPart.slice(1);
          return `${firstPart}. ${formattedSecond}`;
        }

        // Add small human phrases at sentence starts periodically
        if (idx === 0 && !clean.startsWith("I") && Math.random() > 0.5) {
          clean = "In general, " + clean.charAt(0).toLowerCase() + clean.slice(1);
        } else if (idx === 3 && Math.random() > 0.6) {
          clean = "Basically, " + clean.charAt(0).toLowerCase() + clean.slice(1);
        }

        return clean;
      });

      const outcome = modifiedSentences.filter(s => s.length > 0).join(" ");
      setHumanizedText(outcome);
      setIsHumanizing(false);
    }, 800);
  };

  const handleNaturalize = () => {
    naturalizeTextContent(humanizerInput);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(humanizedText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto">
      
      {/* Dynamic Navigation Tabs */}
      <div className="flex bg-card border border-border/85 p-1 rounded-2xl w-fit self-center">
        <button
          onClick={() => setActiveTab("detector")}
          className={`flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
            activeTab === "detector"
              ? "bg-primary text-primary-foreground shadow-md"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Cpu className="h-4 w-4" /> Writing Pattern Analyst
        </button>
        <button
          onClick={() => setActiveTab("humanizer")}
          className={`flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
            activeTab === "humanizer"
              ? "bg-primary text-primary-foreground shadow-md"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Sparkles className="h-4 w-4" /> Natural Phrasing Rewriter
        </button>
      </div>

      {/* Tab 1: AI Content Detector */}
      {activeTab === "detector" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left panel: Input Area */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-foreground">Paste Text for Analysis</label>
              <p className="text-[10px] text-muted-foreground">Analyzes perplexity, word density, and vocabulary patterns locally in browser.</p>
            </div>
            
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your content here (minimum 20 characters)..."
              className="w-full h-80 p-4 bg-card border border-border rounded-2xl text-xs outline-none focus:border-primary/50 placeholder:text-muted-foreground/50 resize-none font-sans"
            />
            
            <button
              onClick={analyzeText}
              disabled={inputText.trim().length < 20}
              className="w-full py-3 bg-neutral-900 border border-border hover:border-neutral-700 text-white dark:bg-card dark:hover:bg-neutral-800 text-xs font-bold rounded-xl shadow-md transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Cpu className="h-4 w-4" /> Analyze Writing Patterns
            </button>
          </div>

          {/* Right panel: Results Output */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {detectorResult ? (
              <div className="flex flex-col gap-5">
                
                {/* 1. Score Summary Widget */}
                <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 flex items-center gap-6 shadow-2xs">
                  {/* Score Pie circle */}
                  <div className="relative h-20 w-20 shrink-0 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="40"
                        cy="40"
                        r="32"
                        stroke="currentColor"
                        strokeWidth="7"
                        fill="transparent"
                        className="text-border"
                      />
                      <circle
                        cx="40"
                        cy="40"
                        r="32"
                        stroke="currentColor"
                        strokeWidth="7"
                        fill="transparent"
                        strokeDasharray={201}
                        strokeDashoffset={201 - (201 * detectorResult.aiPercent) / 100}
                        className="text-primary transition-all duration-700"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="text-sm font-extrabold text-foreground">{detectorResult.aiPercent}%</span>
                      <span className="text-[7px] font-bold text-muted-foreground uppercase">AI Score</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <h3 className="text-xs font-extrabold text-foreground leading-snug">
                      {detectorResult.aiPercent > 60 ? "Highly Uniform Phrasing" : detectorResult.aiPercent > 35 ? "Mixed Writing Patterns" : "Natural Human Flow"}
                    </h3>
                    <p className="text-2xs text-muted-foreground leading-normal">
                      Your text contains <strong className="text-primary">{detectorResult.humanPercent}%</strong> natural sentence structure variations.
                    </p>
                  </div>
                </div>

                {/* Readability & Content Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 bg-card border border-border/80 rounded-xl flex flex-col gap-0.5">
                    <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">Readability Score</span>
                    <span className="text-xs font-extrabold text-foreground">{detectorResult.readabilityScore} / 100</span>
                    <span className="text-[8px] text-muted-foreground">Heuristic Flesch readability metric.</span>
                  </div>
                  <div className="p-3.5 bg-card border border-border/80 rounded-xl flex flex-col gap-0.5">
                    <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">Sentence Variance</span>
                    <span className="text-xs font-extrabold text-foreground">{detectorResult.perplexity}</span>
                    <span className="text-[8px] text-muted-foreground">High variance indicates human-like flow.</span>
                  </div>
                </div>

                {/* Count Stats Grid */}
                <div className="grid grid-cols-3 gap-2 text-center bg-neutral-50 dark:bg-neutral-800/10 border border-border/40 p-3 rounded-xl">
                  <div>
                    <span className="text-[8px] text-muted-foreground font-semibold uppercase block">Words</span>
                    <span className="font-extrabold text-foreground text-2xs">{detectorResult.wordCount}</span>
                  </div>
                  <div className="border-x border-border/40">
                    <span className="text-[8px] text-muted-foreground font-semibold uppercase block">Characters</span>
                    <span className="font-extrabold text-foreground text-2xs">{detectorResult.charCount}</span>
                  </div>
                  <div>
                    <span className="text-[8px] text-muted-foreground font-semibold uppercase block">Sentences</span>
                    <span className="font-extrabold text-foreground text-2xs">{detectorResult.sentenceCount}</span>
                  </div>
                </div>

                {/* Sentence Highlights Visualizer */}
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold text-foreground">Highlighted Writing Map</span>
                  <div className="p-4 bg-white dark:bg-card border border-border rounded-xl text-[11px] leading-relaxed max-h-40 overflow-y-auto space-y-1">
                    {detectorResult.sentences.map((sentence, idx) => {
                      let colorClass = "";
                      if (sentence.score > 70) colorClass = "bg-red-500/10 text-red-700 dark:text-red-300 border-b border-red-500/25 px-0.5 rounded";
                      else if (sentence.score > 40) colorClass = "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-b border-amber-500/25 px-0.5 rounded";
                      else colorClass = "text-foreground px-0.5";
                      
                      return (
                        <span key={idx} className={`${colorClass} inline-block mr-1`}>
                          {sentence.text}{" "}
                        </span>
                      );
                    })}
                  </div>
                  <div className="flex gap-4 text-[9px] font-bold text-muted-foreground justify-center">
                    <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-red-500/20 border border-red-500/40" /> Highly Uniform</span>
                    <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-amber-500/20 border border-amber-500/40" /> Moderately Uniform</span>
                    <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-border" /> Natural Structure</span>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => {
                    const report = `Toolchi AI Writing Analysis Report\n---------------------------------\nUniformity (AI) Score: ${detectorResult.aiPercent}%\nNatural Flow (Human) Score: ${detectorResult.humanPercent}%\nReadability Score: ${detectorResult.readabilityScore}/100\nSentence Variance (Perplexity): ${detectorResult.perplexity}\nLLM Buzzwords: ${detectorResult.buzzwordsFound.length} detected\nGenerated locally on Toolchi.online`;
                    navigator.clipboard.writeText(report);
                    import("canvas-confetti").then((m) => m.default({ particleCount: 30, spread: 50, origin: { y: 0.85 } }));
                  }}
                  className="w-full py-2.5 text-3xs font-extrabold bg-[#7d4dff] hover:bg-[#6530ef] text-white rounded-xl transition-all text-center select-none shadow-sm shadow-[#7d4dff]/15 cursor-pointer active:scale-95"
                >
                  Copy Analysis Report
                </button>

              </div>
            ) : (
              <div className="h-full border border-dashed border-border rounded-2xl flex flex-col items-center justify-center p-8 text-center text-muted-foreground gap-3 bg-card/10 min-h-[220px]">
                <AlertCircle className="h-8 w-8 text-muted-foreground/50" />
                <div>
                  <h4 className="text-xs font-bold text-foreground">Awaiting Pattern Scan</h4>
                  <p className="text-[10px] mt-1 max-w-[200px]">Enter content on the left and click analyze to view structural highlights.</p>
                </div>
              </div>
            )}
          </div>

        </div>
      )}

      {/* Tab 2: Natural Phrasing Rewriter */}
      {activeTab === "humanizer" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Input Block */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div>
                <label className="text-xs font-bold text-foreground">Original Uniform Copy</label>
                <p className="text-[10px] text-muted-foreground">Input text containing dense transition phrases or robotic structures.</p>
              </div>
            </div>
            
            <textarea
              value={humanizerInput}
              onChange={(e) => setHumanizerInput(e.target.value)}
              placeholder="Paste text here to shift tone..."
              className="w-full h-80 p-4 bg-card border border-border rounded-2xl text-xs outline-none focus:border-primary/50 placeholder:text-muted-foreground/50 resize-none font-sans"
            />
            
            <button
              onClick={handleNaturalize}
              disabled={isHumanizing || !humanizerInput.trim()}
              className="w-full py-3 bg-primary text-primary-foreground hover:opacity-90 text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-95"
            >
              {isHumanizing ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" /> Shifting Tone Structures...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" /> Rewrite for Natural Flow
                </>
              )}
            </button>
          </div>

          {/* Output Block */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-bold text-foreground">Natural Human-Like output</label>
              <p className="text-[10px] text-muted-foreground">Restructured sentences with high length variance.</p>
            </div>
            
            <div className="relative w-full h-80 p-4 bg-card border border-border rounded-2xl text-xs outline-none overflow-y-auto leading-relaxed">
              {humanizedText ? (
                <div className="text-foreground whitespace-pre-wrap font-sans text-[11px] pr-8">{humanizedText}</div>
              ) : (
                <div className="text-muted-foreground/40 italic flex items-center justify-center h-full">
                  Rewritten natural output will generate here...
                </div>
              )}

              {humanizedText && (
                <button
                  onClick={copyToClipboard}
                  className="absolute bottom-4 right-4 p-2 bg-neutral-900 border border-border hover:border-neutral-700 text-white rounded-xl shadow-md transition-colors flex items-center justify-center cursor-pointer z-10"
                  title="Copy humanized content"
                >
                  {isCopied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              )}
            </div>

            {/* Naturalized Flow Badge */}
            {humanizedText && (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-3.5">
                <div className="h-9 w-9 rounded-xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center border border-emerald-500/20 shrink-0">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-foreground">Natural Sentence Flow Restructured</h4>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    Sentence variance has been enhanced. Buzzwords substituted for natural phrasing structures.
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
}
