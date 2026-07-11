"use client";

import React from "react";
import { AlertTriangle, RefreshCw, Trash2 } from "lucide-react";

interface ToolErrorStateProps {
  title?: string;
  message?: string;
  suggestions?: string[];
  onRetry?: () => void;
  onClear?: () => void;
  details?: string;
  className?: string;
}

export default function ToolErrorState({
  title = "We could not finish that action",
  message = "The input may be unsupported, empty, corrupted, or too large for this browser session.",
  suggestions = ["Try a smaller file", "Check the format", "Clear the input and run again"],
  onRetry,
  onClear,
  details,
  className = "",
}: ToolErrorStateProps) {
  return (
    <div className={`rounded-3xl border border-red-500/20 bg-red-500/5 p-5 text-left ${className}`} role="alert">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-red-500/20 bg-white text-red-500 shadow-sm dark:bg-card">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1 space-y-3">
          <div>
            <h3 className="text-sm font-extrabold text-foreground">{title}</h3>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{message}</p>
          </div>

          {suggestions.length > 0 && (
            <ul className="grid gap-1.5 text-[10px] font-semibold text-muted-foreground sm:grid-cols-3">
              {suggestions.map((suggestion) => (
                <li key={suggestion} className="rounded-xl border border-red-500/10 bg-white/70 px-3 py-2 dark:bg-card/70">
                  {suggestion}
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-wrap gap-2">
            {onRetry && (
              <button
                type="button"
                onClick={onRetry}
                className="inline-flex items-center gap-1.5 rounded-xl bg-red-500 px-3 py-2 text-[10px] font-extrabold text-white transition hover:bg-red-600 active:scale-95"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Try again
              </button>
            )}
            {onClear && (
              <button
                type="button"
                onClick={onClear}
                className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-white px-3 py-2 text-[10px] font-extrabold text-foreground transition hover:bg-neutral-50 active:scale-95 dark:bg-card dark:hover:bg-neutral-900"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Clear input
              </button>
            )}
          </div>

          {details && (
            <details className="rounded-xl border border-border/70 bg-white/70 p-3 text-[10px] text-muted-foreground dark:bg-card/70">
              <summary className="cursor-pointer font-extrabold text-foreground">Technical details</summary>
              <pre className="mt-2 whitespace-pre-wrap break-words font-mono">{details}</pre>
            </details>
          )}
        </div>
      </div>
    </div>
  );
}
