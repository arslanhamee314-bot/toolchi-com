"use client";

import React from "react";
import { Lightbulb, Sparkles } from "lucide-react";

interface SmartAssistProps {
  recommendation: string;
  reason: string;
  nextStep?: string;
  className?: string;
}

export default function SmartAssist({
  recommendation,
  reason,
  nextStep,
  className = "",
}: SmartAssistProps) {
  return (
    <div
      className={`relative overflow-hidden p-4 rounded-2xl border border-primary/20 bg-primary/5 dark:bg-primary/2 select-none hover:shadow-xs transition-all duration-300 ${className}`}
    >
      <div className="absolute -top-12 -right-12 w-24 h-24 bg-primary/10 rounded-full blur-xl pointer-events-none" />

      <div className="flex gap-3 items-start relative z-10">
        <div className="h-8 w-8 rounded-xl bg-primary/15 text-primary flex items-center justify-center shrink-0">
          <Sparkles className="h-4.5 w-4.5 animate-pulse" />
        </div>
        <div className="space-y-1.5 text-left">
          <h4 className="text-[9px] font-extrabold uppercase tracking-wider text-primary">
            Toolchi Smart Assist
          </h4>
          <div className="space-y-1 text-xs">
            <p className="font-bold text-foreground flex items-start gap-1.5">
              <Lightbulb className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
              <span>{recommendation}</span>
            </p>
            <p className="text-muted text-[10px] leading-relaxed">
              {reason}
            </p>
            {nextStep && (
              <p className="text-[10px] font-semibold text-primary/80 mt-1">
                Next step: <span className="underline">{nextStep}</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
