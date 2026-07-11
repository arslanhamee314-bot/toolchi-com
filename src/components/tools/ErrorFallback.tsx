"use client";

import React from "react";
import Link from "next/link";
import { AlertTriangle, Home, RotateCcw, Search } from "lucide-react";

interface ErrorFallbackProps {
  title?: string;
  message?: string;
  reset?: () => void;
}

export default function ErrorFallback({
  title = "Something stopped the workspace",
  message = "The page could not finish rendering. You can retry, browse tools, or return home.",
  reset,
}: ErrorFallbackProps) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6 py-16">
      <div className="w-full max-w-xl rounded-3xl border border-border bg-white p-8 text-center shadow-lg dark:bg-card">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-500">
          <AlertTriangle className="h-8 w-8" />
        </div>
        <h1 className="mt-6 text-2xl font-black tracking-tight text-foreground">{title}</h1>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">{message}</p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          {reset && (
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-extrabold text-white transition hover:bg-[#6530ef] active:scale-95"
            >
              <RotateCcw className="h-4 w-4" />
              Try again
            </button>
          )}
          <Link
            href="/tools"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-white px-4 py-2.5 text-xs font-extrabold text-foreground transition hover:bg-neutral-50 dark:bg-card dark:hover:bg-neutral-900"
          >
            <Search className="h-4 w-4" />
            Browse tools
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-white px-4 py-2.5 text-xs font-extrabold text-foreground transition hover:bg-neutral-50 dark:bg-card dark:hover:bg-neutral-900"
          >
            <Home className="h-4 w-4" />
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
