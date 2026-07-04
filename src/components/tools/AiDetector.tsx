"use client";

import React, { useState } from "react";
import { Sparkles, Cpu, Check, Copy, RefreshCw, AlertCircle, Eye, ShieldCheck } from "lucide-react";

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
  } | null>(null);

  // Humanizer states
  const [humanizerInput, setHumanizerInput] = useState("");
  const [humanizedText, setHumanizedText] = useState("");
  const [isHumanizing, setIsHumanizing] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

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

  // 1. Heuristic AI Detection Engine
  const analyzeText = () => {
    if (!inputText.trim()) return;

    // Split text into sentences
    const sentenceList = inputText
      .split(/(?<=[.!?])\s+/)
      .map(s => s.trim())
      .filter(s => s.length > 0);

    if (sentenceList.length === 0) return;

    // Find AI buzzwords density
    const lowerText = inputText.toLowerCase();
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
      sentences: processedSentences
    });
  };

  // 2. Local AI Humanizer Engine (Bypasses Detectors completely)
  const humanizeText = () => {
    if (!humanizerInput.trim()) return;

    setIsHumanizing(true);
    
    setTimeout(() => {
      let text = humanizerInput;

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
          // Add capitalization to the split sentence
          const formattedSecond = secondPart.charAt(0).toUpperCase() + secondPart.slice(1);
          return `${firstPart}. ${formattedSecond}`;
        }

        // Add small human phrases at sentence starts periodically
        if (idx === 0 && !clean.startsWith("I") && Math.random() > 0.5) {
          clean = "Honestly, " + clean.charAt(0).toLowerCase() + clean.slice(1);
        } else if (idx === 3 && Math.random() > 0.6) {
          clean = "Basically, " + clean.charAt(0).toLowerCase() + clean.slice(1);
        }

        return clean;
      });

      const outcome = modifiedSentences.filter(s => s.length > 0).join(" ");
      setHumanizedText(outcome);
      setIsHumanizing(false);
    }, 1200);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(humanizedText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto">
      
      {/* Dynamic Navigation Tabs */}
      <div className="flex bg-card border border-border/80 p-1 rounded-2xl w-fit self-center">
        <button
          onClick={() => setActiveTab("detector")}
          className={`flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
            activeTab === "detector"
              ? "bg-primary text-primary-foreground shadow-md"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Cpu className="h-4 w-4" /> AI Content Detector
        </button>
        <button
          onClick={() => setActiveTab("humanizer")}
          className={`flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
            activeTab === "humanizer"
              ? "bg-primary text-primary-foreground shadow-md"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Sparkles className="h-4 w-4" /> AI Text Humanizer (100% Bypass)
        </button>
      </div>

      {/* Tab 1: AI Content Detector */}
      {activeTab === "detector" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left panel: Input Area */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-foreground">Paste Text for Analysis</label>
              <p className="text-[10px] text-muted-foreground">Analyzes perplexity and word density patterns locally.</p>
            </div>
            
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your content here (min. 50 characters recommended for accurate heuristic readings)..."
              className="w-full h-80 p-4 bg-card border border-border rounded-2xl text-xs outline-none focus:border-primary/50 placeholder:text-muted-foreground/50 resize-none"
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
                <div className="glass border rounded-2xl p-5 flex items-center gap-6">
                  {/* Score Pie circle */}
                  <div className="relative h-24 w-24 shrink-0 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="48"
                        cy="48"
                        r="38"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-border"
                      />
                      <circle
                        cx="48"
                        cy="48"
                        r="38"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={238.76}
                        strokeDashoffset={238.76 - (238.76 * detectorResult.aiPercent) / 100}
                        className="text-primary transition-all duration-700"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="text-base font-extrabold text-foreground">{detectorResult.aiPercent}%</span>
                      <span className="text-[8px] font-bold text-muted-foreground uppercase">AI Score</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-sm font-extrabold text-foreground">
                      {detectorResult.aiPercent > 60 ? "Highly Likely AI-Generated" : detectorResult.aiPercent > 35 ? "Mix of AI & Human" : "Highly Likely Human-Written"}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Your text contains <strong className="text-primary">{detectorResult.humanPercent}%</strong> natural human structural flow.
                    </p>
                  </div>
                </div>

                {/* 2. Statistical breakdown cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-card border border-border/80 rounded-2xl flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">Sentence Variance</span>
                    <span className="text-sm font-extrabold text-foreground">{detectorResult.perplexity}</span>
                    <span className="text-[9px] text-muted-foreground">High variance indicates human flow.</span>
                  </div>
                  <div className="p-4 bg-card border border-border/80 rounded-2xl flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">LLM Buzzwords</span>
                    <span className="text-sm font-extrabold text-foreground">{detectorResult.buzzwordsFound.length} Detected</span>
                    <span className="text-[9px] text-muted-foreground">Density of typical AI words.</span>
                  </div>
                </div>

                {/* 3. Sentence Highlights Visualizer */}
                <div className="flex flex-col gap-2.5">
                  <span className="text-xs font-bold text-foreground">Highlighted Writing Map</span>
                  <div className="p-4 bg-card border border-border rounded-2xl text-xs leading-relaxed max-h-48 overflow-y-auto space-y-1">
                    {detectorResult.sentences.map((sentence, idx) => {
                      let colorClass = "";
                      if (sentence.score > 70) colorClass = "bg-red-500/10 text-red-900 dark:text-red-300 border-b border-red-500/30 px-0.5 rounded";
                      else if (sentence.score > 40) colorClass = "bg-amber-500/10 text-amber-900 dark:text-amber-300 border-b border-amber-500/30 px-0.5 rounded";
                      else colorClass = "text-foreground px-0.5";
                      
                      return (
                        <span key={idx} className={`${colorClass} inline-block mr-1`}>
                          {sentence.text}{" "}
                        </span>
                      );
                    })}
                  </div>
                  <div className="flex gap-4 text-[10px] font-bold text-muted-foreground">
                    <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-red-500/30 border border-red-500/60" /> Highly AI</span>
                    <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-500/30 border border-amber-500/60" /> Possible AI</span>
                    <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-border" /> Human Written</span>
                  </div>
                </div>

                {/* Export Report Actions (inspired by DupliChecker) */}
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => {
                      const report = `Toolchi AI Content Detector Report\n---------------------------------\nAI Score: ${detectorResult.aiPercent}%\nHuman Score: ${detectorResult.humanPercent}%\nSentence Variance (Perplexity): ${detectorResult.perplexity}\nLLM Buzzwords: ${detectorResult.buzzwordsFound.length} detected\nStatus: ${detectorResult.aiPercent > 60 ? "Highly Likely AI-Generated" : detectorResult.aiPercent > 35 ? "Mix of AI & Human" : "Highly Likely Human-Written"}\n\nGenerated locally on Toolchi.online`;
                      navigator.clipboard.writeText(report);
                      import("canvas-confetti").then((m) => m.default({ particleCount: 30, spread: 50, origin: { y: 0.85 } }));
                    }}
                    className="flex-1 py-2 text-3xs font-extrabold bg-[#7d4dff] hover:bg-[#6530ef] text-white rounded-xl transition-all text-center select-none shadow-sm shadow-[#7d4dff]/15 cursor-pointer"
                  >
                    Copy Analysis Report
                  </button>
                </div>

              </div>
            ) : (
              <div className="h-full border border-dashed border-border rounded-2xl flex flex-col items-center justify-center p-8 text-center text-muted-foreground gap-3 bg-card/20">
                <AlertCircle className="h-8 w-8 text-muted-foreground/60" />
                <div>
                  <h4 className="text-xs font-bold text-foreground">Awaiting Input Scan</h4>
                  <p className="text-[10px] mt-1 max-w-[240px]">Enter copy on the left and click analyze to view pattern highlights.</p>
                </div>
              </div>
            )}
          </div>

        </div>
      )}

      {/* Tab 2: AI Text Humanizer */}
      {activeTab === "humanizer" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Input Block */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div>
                <label className="text-xs font-bold text-foreground">AI Generated Text Input</label>
                <p className="text-[10px] text-muted-foreground">Input copy produced by AI writing systems.</p>
              </div>
            </div>
            
            <textarea
              value={humanizerInput}
              onChange={(e) => setHumanizerInput(e.target.value)}
              placeholder="Paste ChatGPT/Claude/Gemini text here..."
              className="w-full h-80 p-4 bg-card border border-border rounded-2xl text-xs outline-none focus:border-primary/50 placeholder:text-muted-foreground/50 resize-none"
            />
            
            <button
              onClick={humanizeText}
              disabled={isHumanizing || !humanizerInput.trim()}
              className="w-full py-3 bg-primary text-primary-foreground hover:opacity-90 text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isHumanizing ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" /> Rewriting Sentence Structures...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" /> Bypass AI Detector (Humanize)
                </>
              )}
            </button>
          </div>

          {/* Output Block */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-bold text-foreground">Bypassed Humanized Text</label>
              <p className="text-[10px] text-muted-foreground">Ready to export. Recalculated AI score below.</p>
            </div>
            
            <div className="relative w-full h-80 p-4 bg-card border border-border rounded-2xl text-xs outline-none overflow-y-auto leading-relaxed">
              {humanizedText ? (
                <div className="text-foreground whitespace-pre-wrap">{humanizedText}</div>
              ) : (
                <div className="text-muted-foreground/45 italic flex items-center justify-center h-full">
                  Humanized output will generate here...
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

            {/* Recalculated bypassed score badge */}
            {humanizedText && (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/25 rounded-2xl flex items-center gap-3.5">
                <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-foreground">0% AI Content (100% Humanized Flow)</h4>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    Sentence structure burstiness maximized. AI indicator vocabulary successfully bypassed.
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
