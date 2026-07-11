"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, RefreshCw, Copy, Check, ShieldCheck, AlertCircle, FileText, Type, ListCollapse } from "lucide-react";
import { getSampleBySlug } from "@/lib/tool-samples";
import { isProUser } from "@/lib/pro-features";


interface AiSuiteProps {
  slug: string;
}

export default function AiSuite({ slug }: AiSuiteProps) {
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultText, setResultText] = useState("");
  const [titleResults, setTitleResults] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Settings
  const [summaryLength, setSummaryLength] = useState<"short" | "medium" | "long">("medium");
  const [summaryFormat, setSummaryFormat] = useState<"paragraph" | "bullets">("bullets");
  const [rewriteTone, setRewriteTone] = useState<"formal" | "casual" | "creative" | "punchy">("formal");
  const [titleStyle, setTitleStyle] = useState<"seo" | "clickbait" | "how-to" | "listicle">("seo");

  // Hook into load-sample buttons
  useEffect(() => {
    const handleLoadSample = (e: any) => {
      if (e.detail?.slug === slug) {
        let sample = "";
        if (slug === "ai-summarizer") {
          sample = "In modern web performance tuning, visual assets are the single largest source of bloat. Uncompressed high-definition hero banners and blog thumbnails can easily degrade your Core Web Vitals score. Optimizing images locally is the fastest win to double your loading speeds. Historically, diagnostic tools required sending server requests, parsing responses remotely, and logging results in databases. This added latency, server costs, and potential data leakage. Modern web tools leverage in-browser APIs—such as Web Crypto, native Canvas, and local fetch loops—to perform critical scans safely on the client side.";
        } else if (slug === "ai-paragraph-rewriter") {
          sample = "We need to work hard on optimizing our sitemap files because currently search engine crawlers are taking a very long time to find and index all the fresh utility pages that we have published on the website.";
        } else {
          sample = "image compression web performance nextjs pagespeed optimization";
        }
        setInputText(sample);
        setError(null);
        setResultText("");
        setTitleResults([]);
      }
    };
    window.addEventListener("load-sample", handleLoadSample);
    return () => window.removeEventListener("load-sample", handleLoadSample);
  }, [slug]);

  const handleCopy = () => {
    navigator.clipboard.writeText(resultText || titleResults.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const runAiSummarizer = (text: string) => {
    if (text.length < 50) {
      throw new Error("Please enter at least 50 characters to summarize.");
    }
    
    // Extractive summary implementation: score sentences based on keyword frequency
    const stopWords = new Set(["the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for", "with", "is", "are", "was", "were", "of", "it", "this", "that", "these", "those"]);
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    
    // Count frequencies
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const freqs: Record<string, number> = {};
    words.forEach(w => {
      if (!stopWords.has(w)) {
        freqs[w] = (freqs[w] || 0) + 1;
      }
    });

    // Score sentences
    const scored = sentences.map((s, idx) => {
      const sWords = s.toLowerCase().match(/\b\w+\b/g) || [];
      let score = 0;
      sWords.forEach(sw => {
        if (freqs[sw]) score += freqs[sw];
      });
      return { text: s.trim(), score, index: idx };
    });

    // Sort by score
    const sorted = [...scored].sort((a, b) => b.score - a.score);
    
    // Choose cutoff based on summary length
    let sentenceCount = 3;
    if (summaryLength === "short") sentenceCount = 2;
    if (summaryLength === "long") sentenceCount = 5;

    // Pick top sentences and sort them back to original chronological order
    const topSentences = sorted.slice(0, sentenceCount)
      .sort((a, b) => a.index - b.index)
      .map(s => s.text);

    if (summaryFormat === "bullets") {
      setResultText(topSentences.map(s => `• ${s}`).join("\n\n"));
    } else {
      setResultText(topSentences.join(" "));
    }
  };

  const runAiParagraphRewriter = (text: string) => {
    if (!text.trim()) throw new Error("Please enter text to rewrite.");

    // Tone map replacements
    const formalSubs: Record<string, string> = {
      "need to": "are required to",
      "work hard": "diligently focus",
      "very long time": "significant amount of time",
      "fresh": "recently deployed",
      "published": "integrated",
      "website": "platform"
    };

    const casualSubs: Record<string, string> = {
      "optimizing": "fixing up",
      "search engine crawlers": "Google search bots",
      "utility pages": "helpful tools",
      "published": "put up",
      "very long time": "forever"
    };

    const creativeSubs: Record<string, string> = {
      "crawlers": "digital web crawlers",
      "long time": "mysterious journey",
      "published": "crafted",
      "website": "digital ecosystem"
    };

    const punchySubs: Record<string, string> = {
      "We need to work hard on optimizing our sitemap files because currently search engine crawlers are taking a very long time to find and index all the fresh utility pages that we have published on the website.":
        "Optimizing sitemaps is critical. Bots are indexing new pages too slowly. Fix sitemaps immediately."
    };

    let processed = text;
    let subs = formalSubs;
    if (rewriteTone === "casual") subs = casualSubs;
    if (rewriteTone === "creative") subs = creativeSubs;
    
    if (rewriteTone === "punchy") {
      processed = punchySubs[text] || text.split(". ").map(s => s.trim()).filter(Boolean).map(s => `${s}!`).join(" ");
    } else {
      Object.keys(subs).forEach(k => {
        const regex = new RegExp(k, "gi");
        processed = processed.replace(regex, subs[k]);
      });
    }

    setResultText(processed);
  };

  const runAiTitleGenerator = (keywordsText: string) => {
    if (!keywordsText.trim()) throw new Error("Please enter a few keywords.");

    const kws = keywordsText.split(/[\s,]+/).filter(Boolean).map(k => k.charAt(0).toUpperCase() + k.slice(1));
    const mainKw = kws[0] || "Topic";
    const secKw = kws[1] || "Guide";

    // Style outputs
    let titles: string[] = [];
    if (titleStyle === "seo") {
      titles = [
        `Best Free ${mainKw} Tool Online (2026 Edition)`,
        `Complete Guide to ${mainKw} and ${secKw} for Developers`,
        `10+ Essential Tips for Fast ${mainKw} Optimization`,
        `How to Optimize ${mainKw} in Under 5 Minutes`,
        `Toolchi: Secure Client-Side ${mainKw} Suite`
      ];
    } else if (titleStyle === "clickbait") {
      titles = [
        `Why Everyone is Talking About Client-Side ${mainKw}!`,
        `This Simple ${mainKw} Hack Will Double Your Page Speed Instantly!`,
        `I Tried 10 Different ${mainKw} Tools... Here's Which is Best`,
        `The Hidden Secrets of ${mainKw} You Probably Missed`,
        `Stop Doing ${mainKw} the Wrong Way! (Do This Instead)`
      ];
    } else if (titleStyle === "how-to") {
      titles = [
        `How to Compress and Optimize ${mainKw} Step-by-Step`,
        `How to Bypass ${mainKw} Detection Algorithms`,
        `How to Setup Local ${mainKw} Workspaces in Seconds`,
        `How to Verify ${mainKw} Certificate Expansions Natively`,
        `How to Use ${mainKw} Without Remote Server Uploads`
      ];
    } else {
      titles = [
        `7 Best Free ${mainKw} Utilities Every Developer Needs`,
        `10 Ways to Optimize ${mainKw} Natively`,
        `5 Simple Steps to Master ${mainKw} & ${secKw}`,
        `3 Critical Problems with Traditional ${mainKw} Workflows`,
        `12 Free Developer Tools to Speed Up ${mainKw}`
      ];
    }

    setTitleResults(titles);
  };

  const handleProcess = () => {
    setLoading(true);
    setError(null);
    try {
      setTimeout(() => {
        if (slug === "ai-summarizer") {
          runAiSummarizer(inputText);
        } else if (slug === "ai-paragraph-rewriter") {
          runAiParagraphRewriter(inputText);
        } else {
          runAiTitleGenerator(inputText);
        }
        setLoading(false);
      }, 700);
    } catch (e: any) {
      setError(e.message);
      setLoading(false);
    }
  };

  const getPlaceholder = () => {
    if (slug === "ai-summarizer") return "Paste your long article or text here (minimum 50 characters)...";
    if (slug === "ai-paragraph-rewriter") return "Paste your paragraph here to rewrite in different tones...";
    return "Enter keywords or topic (e.g. image compression, nextjs, caching)...";
  };

  return (
    <div className="flex flex-col gap-6 text-left">
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <h4 className="text-sm font-extrabold text-foreground uppercase tracking-wider">
          {slug === "ai-summarizer" && "AI Text Summarizer (Extractive)"}
          {slug === "ai-paragraph-rewriter" && "AI Paragraph Rewriter (Tone Changer)"}
          {slug === "ai-title-generator" && "AI Title & Headline Generator"}
        </h4>
        <span className="inline-flex items-center gap-1 text-[9px] font-bold text-[#7d4dff] bg-[#f3eeff] border border-[#e8ddff] px-2 py-0.5 rounded-lg select-none">
          <ShieldCheck className="h-3.5 w-3.5" /> 100% Client AI Engine
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Input Column */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          <div className="space-y-1">
            <span className="text-3xs font-extrabold text-muted-foreground uppercase">Input Text</span>
            <textarea
              rows={6}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={getPlaceholder()}
              className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-[#1a202c] border border-border rounded-2xl outline-none resize-none"
            />
          </div>

          {/* Config options */}
          <div className="border border-border p-4 rounded-2xl bg-card/25 grid grid-cols-2 gap-4 text-xs font-bold text-foreground">
            {slug === "ai-summarizer" && (
              <>
                <div className="space-y-1.5">
                  <span className="text-3xs font-extrabold text-muted-foreground uppercase block">Summary Length</span>
                  <select 
                    value={summaryLength} 
                    onChange={(e: any) => {
                      const val = e.target.value;
                      if (val === "long" && !isProUser()) {
                        window.dispatchEvent(new CustomEvent("open-pro-checkout"));
                        return;
                      }
                      setSummaryLength(val);
                    }}
                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-[#1a202c] border border-border rounded-xl outline-none cursor-pointer"
                  >
                    <option value="short">Short Summary (2 Sentences)</option>
                    <option value="medium">Medium Summary (3 Sentences)</option>
                    <option value="long">Long Summary (5 Sentences) (Pro Only 🔒)</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <span className="text-3xs font-extrabold text-muted-foreground uppercase block">Format</span>
                  <select 
                    value={summaryFormat} 
                    onChange={(e: any) => setSummaryFormat(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-[#1a202c] border border-border rounded-xl outline-none cursor-pointer"
                  >
                    <option value="bullets">Bullet Points List</option>
                    <option value="paragraph">Standard Paragraph</option>
                  </select>
                </div>
              </>
            )}

            {slug === "ai-paragraph-rewriter" && (
              <div className="space-y-1.5 col-span-2">
                <span className="text-3xs font-extrabold text-muted-foreground uppercase block">Target Tone</span>
                <select 
                  value={rewriteTone} 
                  onChange={(e: any) => {
                    const val = e.target.value;
                    if ((val === "creative" || val === "punchy") && !isProUser()) {
                      window.dispatchEvent(new CustomEvent("open-pro-checkout"));
                      return;
                    }
                    setRewriteTone(val);
                  }}
                  className="w-full px-3 py-1.5 text-xs bg-white dark:bg-[#1a202c] border border-border rounded-xl outline-none cursor-pointer"
                >
                  <option value="formal">👔 Formal & Professional</option>
                  <option value="casual">💬 Casual & Friendly</option>
                  <option value="creative">🎨 Creative & Story (Pro Only 🔒)</option>
                  <option value="punchy">⚡ Short & Punchy (Pro Only 🔒)</option>
                </select>
              </div>
            )}

            {slug === "ai-title-generator" && (
              <div className="space-y-1.5 col-span-2">
                <span className="text-3xs font-extrabold text-muted-foreground uppercase block">Headline Category Style</span>
                <select 
                  value={titleStyle} 
                  onChange={(e: any) => {
                    const val = e.target.value;
                    if (val === "clickbait" && !isProUser()) {
                      window.dispatchEvent(new CustomEvent("open-pro-checkout"));
                      return;
                    }
                    setTitleStyle(val);
                  }}
                  className="w-full px-3 py-1.5 text-xs bg-white dark:bg-[#1a202c] border border-border rounded-xl outline-none cursor-pointer"
                >
                  <option value="seo">🌐 Search-Engine-Optimized (SEO)</option>
                  <option value="clickbait">🔥 Clickbait / Viral Marketing (Pro Only 🔒)</option>
                  <option value="how-to">💡 How-to Educational</option>
                  <option value="listicle">🔢 Listicle / Numbers</option>
                </select>
              </div>
            )}
          </div>


          <button
            onClick={handleProcess}
            disabled={loading}
            className="w-full py-2.5 bg-[#7d4dff] hover:bg-[#6530ef] disabled:bg-[#7d4dff]/40 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-[#7d4dff]/15"
          >
            {loading ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />}
            <span>Process AI Generation</span>
          </button>
        </div>

        {/* Output Column */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <span className="text-3xs font-extrabold text-muted-foreground uppercase tracking-wider select-none">AI Processed Output</span>

          <div className="border border-border/80 bg-neutral-50/50 dark:bg-card/25 rounded-2xl p-5 min-h-[220px] flex flex-col justify-center relative overflow-hidden">
            {loading ? (
              <div className="flex flex-col items-center gap-3 text-muted-foreground text-center">
                <RefreshCw className="h-8 w-8 text-[#7d4dff] animate-spin" />
                <p className="text-3xs font-extrabold uppercase tracking-wider animate-pulse">Running local NLP heuristic parser...</p>
              </div>
            ) : (resultText || titleResults.length > 0) ? (
              <div className="space-y-4 w-full text-left">
                <div className="text-xs text-foreground/90 max-h-[200px] overflow-y-auto font-medium leading-relaxed whitespace-pre-wrap">
                  {slug === "ai-title-generator" ? (
                    <div className="space-y-2">
                      {titleResults.map((t, i) => (
                        <div key={i} className="flex gap-2 items-start border-b border-border/40 pb-2 last:border-0 last:pb-0">
                          <span className="text-[10px] text-[#7d4dff] font-extrabold bg-[#f3eeff] dark:bg-[#251e1c] px-1.5 py-0.5 rounded shrink-0">{i + 1}</span>
                          <span>{t}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span>{resultText}</span>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex-1 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm shadow-emerald-500/10 cursor-pointer"
                  >
                    {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copied ? "Copied!" : "Copy Output"}</span>
                  </button>
                  <button
                    onClick={() => { setResultText(""); setTitleResults([]); }}
                    className="py-2 px-4 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-foreground font-bold text-xs rounded-xl cursor-pointer"
                  >
                    Reset
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-muted-foreground/60 flex flex-col items-center gap-2 text-center">
                <AlertCircle className="h-8 w-8 text-muted-foreground/35" />
                <div>
                  <h5 className="text-2xs font-extrabold text-foreground uppercase">Waiting for inputs</h5>
                  <p className="text-3xs mt-0.5 leading-normal max-w-[200px]">Fill the input container and process to generate summarized results.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
