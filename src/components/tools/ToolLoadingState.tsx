"use client";

import React from "react";
import { Loader2, ShieldCheck } from "lucide-react";

interface ToolLoadingStateProps {
  title?: string;
  message?: string;
  steps?: string[];
  progress?: number;
  className?: string;
}

export default function ToolLoadingState({
  title = "Processing locally",
  message = "Toolchi is preparing your result inside this browser tab.",
  steps = [],
  progress,
  className = "",
}: ToolLoadingStateProps) {
  const safeProgress = typeof progress === "number" ? Math.max(0, Math.min(100, progress)) : null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`relative overflow-hidden rounded-3xl border border-primary/20 bg-primary/5 p-5 text-left ${className}`}
    >
      <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />
      <div className="relative z-10 flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-white text-primary shadow-sm dark:bg-card">
          <Loader2 className="h-5 w-5 animate-spin" />
        </div>
        <div className="min-w-0 flex-1 space-y-3">
          <div>
            <h3 className="text-sm font-extrabold text-foreground">{title}</h3>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{message}</p>
          </div>

          {safeProgress !== null && (
            <div className="space-y-1.5">
              <div className="h-2 overflow-hidden rounded-full bg-white dark:bg-card">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-300"
                  style={{ width: `${safeProgress}%` }}
                />
              </div>
              <p className="text-[10px] font-bold text-primary">{safeProgress}% complete</p>
            </div>
          )}

          {steps.length > 0 && (
            <ol className="grid gap-1.5 text-[10px] font-semibold text-muted-foreground sm:grid-cols-2">
              {steps.map((step, index) => (
                <li key={step} className="flex items-center gap-1.5">
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[8px] font-black text-primary">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          )}

          <div className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="h-3.5 w-3.5" />
            Files stay on your device
          </div>
        </div>
      </div>
    </div>
  );
}
