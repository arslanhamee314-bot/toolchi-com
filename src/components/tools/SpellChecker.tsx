"use client";

import React, { useState } from "react";
import { CheckCircle, AlertTriangle, RefreshCw } from "lucide-react";

// Heuristic local typo dictionary list
const TYPO_MAP: Record<string, string> = {
  recieve: "receive",
  seperate: "separate",
  untill: "until",
  definately: "definitely",
  accomodation: "accommodation",
  beutiful: "beautiful",
  freind: "friend",
  goverment: "government",
  occured: "occurred",
  succesful: "successful",
  neccessary: "necessary",
  tommorrow: "tomorrow",
  calender: "calendar",
  publically: "publicly",
  arguement: "argument",
  truely: "truly"
};

export default function SpellChecker() {
  const [text, setText] = useState("We should seperate these files untill tommorrow.");
  const [report, setReport] = useState<any>(null);

  const handleCheck = () => {
    if (!text.trim()) return;

    // Split text into words while keeping punctuation
    const words = text.split(/(\s+)/);
    const correctedWords: string[] = [];
    const issues: any[] = [];
    let count = 0;

    words.forEach((w) => {
      // Strip punctuation to look up in dict
      const cleanWord = w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "");
      const lowerWord = cleanWord.toLowerCase();
      
      if (TYPO_MAP[lowerWord]) {
        count++;
        const correction = TYPO_MAP[lowerWord];
        // Retain original word casing (uppercase first letter check)
        const isCapitalized = cleanWord.charAt(0) === cleanWord.charAt(0).toUpperCase() && cleanWord.length > 0;
        const suggestedWord = isCapitalized 
          ? correction.charAt(0).toUpperCase() + correction.slice(1) 
          : correction;

        // Reassemble back with punctuation
        const corrected = w.replace(cleanWord, suggestedWord);
        correctedWords.push(corrected);

        issues.push({
          original: cleanWord,
          suggestion: suggestedWord,
          context: `Found "${cleanWord}". Suggest replacing with "${suggestedWord}".`
        });
      } else {
        correctedWords.push(w);
      }
    });

    setReport({
      issues,
      correctedText: correctedWords.join(""),
      issuesCount: count
    });
    import("canvas-confetti").then((m) => m.default({ particleCount: 30, spread: 50, origin: { y: 0.85 } }));
  };

  const handleApplyCorrections = () => {
    if (!report) return;
    setText(report.correctedText);
    setReport(null);
  };

  return (
    <div className="flex flex-col gap-6 text-foreground text-xs">
      
      <div className="flex flex-col gap-2">
        <label className="font-bold text-sm block">Enter Text to Check Spelling</label>
        <p className="text-muted leading-relaxed text-3xs">Edit copy text blocks and run syntax checks to verify common spellings parameters.</p>
      </div>

      <div className="flex flex-col gap-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="h-32 w-full p-4 bg-white dark:bg-card border border-border rounded-xl outline-none focus:border-[#7d4dff] leading-relaxed"
        />
        <button
          onClick={handleCheck}
          className="px-6 py-2.5 font-bold bg-[#7d4dff] hover:bg-[#6530ef] text-white rounded-xl transition-colors cursor-pointer w-fit select-none"
        >
          Check Spelling
        </button>
      </div>

      {report && (
        <div className="border border-border rounded-2xl p-5 bg-white dark:bg-[#1c2230] flex flex-col gap-4 shadow-xs animate-in fade-in slide-in-from-top-2 duration-300">
          
          <div className="flex items-center gap-2 border-b border-border/40 pb-3">
            {report.issuesCount > 0 ? (
              <AlertTriangle className="h-5 w-5 text-amber-500" />
            ) : (
              <CheckCircle className="h-5 w-5 text-emerald-400" />
            )}
            <h3 className="font-extrabold text-sm">
              {report.issuesCount > 0 ? `Spelling checker: ${report.issuesCount} typos found` : "No spelling issues found"}
            </h3>
          </div>

          {report.issuesCount > 0 ? (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                {report.issues.map((issue: any, idx: number) => (
                  <div key={idx} className="p-3 bg-amber-500/5 text-amber-500 rounded-xl border border-amber-500/10 flex justify-between items-center text-3xs font-semibold">
                    <span>{issue.context}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={handleApplyCorrections}
                className="px-5 py-2 text-xs font-bold bg-[#7d4dff] hover:bg-[#6530ef] text-white rounded-xl transition-colors cursor-pointer w-fit flex items-center gap-1"
              >
                <RefreshCw className="h-3.5 w-3.5" /> Apply All Corrections
              </button>
            </div>
          ) : (
            <div className="text-emerald-400 font-semibold p-3.5 bg-emerald-500/10 rounded-xl border border-emerald-500/15 text-center mt-1">
              🎉 Congratulations! No common orthographic errors detected.
            </div>
          )}

        </div>
      )}

    </div>
  );
}
