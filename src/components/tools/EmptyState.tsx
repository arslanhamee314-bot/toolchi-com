"use client";

import React from "react";
import { FilePlus2, Search, Type, UploadCloud } from "lucide-react";

type EmptyStateVariant = "upload" | "text" | "search" | "result";

interface EmptyStateProps {
  variant?: EmptyStateVariant;
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

const icons = {
  upload: UploadCloud,
  text: Type,
  search: Search,
  result: FilePlus2,
};

export default function EmptyState({
  variant = "result",
  title,
  message,
  actionLabel,
  onAction,
  className = "",
}: EmptyStateProps) {
  const Icon = icons[variant];
  const defaults = {
    upload: ["Drop a file to begin", "Your result will appear here after local processing."],
    text: ["Paste text to start", "Toolchi can analyze, format, or transform your text instantly."],
    search: ["No matching tools found", "Try a simpler keyword or browse categories."],
    result: ["Output waiting", "Run the tool and your result summary will appear here."],
  }[variant];

  return (
    <div className={`rounded-3xl border border-dashed border-border bg-white/60 p-8 text-center dark:bg-card/40 ${className}`}>
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/15 bg-primary/10 text-primary">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-sm font-extrabold text-foreground">{title || defaults[0]}</h3>
      <p className="mx-auto mt-1 max-w-sm text-xs leading-relaxed text-muted-foreground">{message || defaults[1]}</p>
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-4 rounded-xl bg-primary px-4 py-2 text-xs font-extrabold text-white transition hover:bg-[#6530ef] active:scale-95"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
