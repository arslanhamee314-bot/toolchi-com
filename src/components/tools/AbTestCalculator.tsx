"use client";

import React, { useState } from "react";
import { CheckCircle, AlertTriangle, ArrowRight } from "lucide-react";

export default function AbTestCalculator() {
  const [controlVisitors, setControlVisitors] = useState(1000);
  const [controlConversions, setControlConversions] = useState(100);
  const [variantVisitors, setVariantVisitors] = useState(1000);
  const [variantConversions, setVariantConversions] = useState(130);
  const [result, setResult] = useState<any>(null);

  const calculateSignificance = () => {
    const p1 = controlConversions / controlVisitors; // Control rate
    const p2 = variantConversions / variantVisitors; // Variant rate

    const conversionRateA = (p1 * 100).toFixed(2) + "%";
    const conversionRateB = (p2 * 100).toFixed(2) + "%";

    const relativeImprovement = (((p2 - p1) / p1) * 100).toFixed(2) + "%";

    // Standard Z-score formula calculation
    const pooledP = (controlConversions + variantConversions) / (controlVisitors + variantVisitors);
    const standardError = Math.sqrt(pooledP * (1 - pooledP) * (1 / controlVisitors + 1 / variantVisitors));
    const zScore = Math.abs((p2 - p1) / standardError);

    // Dynamic standard normal CDF lookups
    let pValue = 0;
    if (zScore > 3.0) pValue = 0.001;
    else if (zScore > 2.58) pValue = 0.01;
    else if (zScore > 1.96) pValue = 0.05;
    else if (zScore > 1.64) pValue = 0.10;
    else pValue = 0.25;

    const confidenceIndex = ((1 - pValue) * 100).toFixed(0) + "%";
    const isSignificant = zScore >= 1.96; // 95% threshold standard

    setResult({
      conversionRateA,
      conversionRateB,
      relativeImprovement,
      confidenceIndex,
      zScore: zScore.toFixed(3),
      isSignificant,
      verdict: isSignificant
        ? `Variant is statistically significant! (Confidence: ${confidenceIndex})`
        : "The results are not statistically significant yet. Continue collecting data."
    });
    import("canvas-confetti").then((m) => m.default({ particleCount: 30, spread: 50, origin: { y: 0.85 } }));
  };

  return (
    <div className="flex flex-col gap-6 text-foreground text-xs">
      
      <div className="flex flex-col gap-2">
        <label className="font-bold text-sm block">A/B Testing Significance Calculator</label>
        <p className="text-muted leading-relaxed text-3xs">Input conversion rates for Control and Test variants to calculate experiment statistical confidence margins.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        
        {/* Control inputs */}
        <div className="flex flex-col gap-3 p-4 border border-border bg-white dark:bg-card/40 rounded-2xl shadow-xs">
          <span className="font-bold text-[#7d4dff] block text-3xs uppercase tracking-wider">Control Variant (A)</span>
          <div className="flex flex-col gap-2">
            <div>
              <label className="text-muted block text-3xs font-semibold mb-1">Visitors</label>
              <input
                type="number"
                value={controlVisitors}
                onChange={(e) => setControlVisitors(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-4 py-2.5 bg-white dark:bg-card border border-border rounded-xl outline-none focus:border-[#7d4dff]"
              />
            </div>
            <div>
              <label className="text-muted block text-3xs font-semibold mb-1">Conversions</label>
              <input
                type="number"
                value={controlConversions}
                onChange={(e) => setControlConversions(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full px-4 py-2.5 bg-white dark:bg-card border border-border rounded-xl outline-none focus:border-[#7d4dff]"
              />
            </div>
          </div>
        </div>

        {/* Variant inputs */}
        <div className="flex flex-col gap-3 p-4 border border-border bg-white dark:bg-card/40 rounded-2xl shadow-xs">
          <span className="font-bold text-[#7d4dff] block text-3xs uppercase tracking-wider">Test Variant (B)</span>
          <div className="flex flex-col gap-2">
            <div>
              <label className="text-muted block text-3xs font-semibold mb-1">Visitors</label>
              <input
                type="number"
                value={variantVisitors}
                onChange={(e) => setVariantVisitors(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-4 py-2.5 bg-white dark:bg-card border border-border rounded-xl outline-none focus:border-[#7d4dff]"
              />
            </div>
            <div>
              <label className="text-muted block text-3xs font-semibold mb-1">Conversions</label>
              <input
                type="number"
                value={variantConversions}
                onChange={(e) => setVariantConversions(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full px-4 py-2.5 bg-white dark:bg-card border border-border rounded-xl outline-none focus:border-[#7d4dff]"
              />
            </div>
          </div>
        </div>

      </div>

      <button
        onClick={calculateSignificance}
        className="px-6 py-2.5 font-bold bg-[#7d4dff] hover:bg-[#6530ef] text-white rounded-xl transition-colors cursor-pointer w-fit select-none"
      >
        Calculate Confidence
      </button>

      {result && (
        <div className="border border-border rounded-2xl p-5 bg-white dark:bg-[#1c2230] flex flex-col gap-4 shadow-xs animate-in fade-in slide-in-from-top-2 duration-300">
          
          <div className="flex items-center gap-2 border-b border-border/40 pb-3">
            {result.isSignificant ? (
              <CheckCircle className="h-5 w-5 text-emerald-400" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-amber-500" />
            )}
            <h3 className="font-extrabold text-sm">{result.verdict}</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-3 bg-neutral-50 dark:bg-neutral-800/40 rounded-xl border border-border/40">
              <span className="text-muted block text-3xs font-semibold uppercase">Rate Variant A</span>
              <span className="font-extrabold text-base text-foreground">{result.conversionRateA}</span>
            </div>
            <div className="p-3 bg-neutral-50 dark:bg-neutral-800/40 rounded-xl border border-border/40">
              <span className="text-muted block text-3xs font-semibold uppercase">Rate Variant B</span>
              <span className="font-extrabold text-base text-primary">{result.conversionRateB}</span>
            </div>
            <div className="p-3 bg-neutral-50 dark:bg-neutral-800/40 rounded-xl border border-border/40">
              <span className="text-muted block text-3xs font-semibold uppercase">Improvement</span>
              <span className="font-extrabold text-base text-emerald-400">{result.relativeImprovement}</span>
            </div>
            <div className="p-3 bg-neutral-50 dark:bg-neutral-800/40 rounded-xl border border-border/40">
              <span className="text-muted block text-3xs font-semibold uppercase">Z-Score Index</span>
              <span className="font-extrabold text-base text-foreground">{result.zScore}</span>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
