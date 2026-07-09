"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, X, Sparkles, ArrowRight } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function HeroSearch() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams ? searchParams.get("search") || "" : "";
  const [searchVal, setSearchVal] = useState(initialSearch);
  const [suggestion, setSuggestion] = useState<{
    toolName: string;
    slug: string;
    type: string;
  } | null>(null);

  useEffect(() => {
    setSearchVal(initialSearch);
  }, [initialSearch]);

  const handleSearchChange = (val: string) => {
    setSearchVal(val);
    
    // Heuristics analyzer on the search text
    const trimmed = val.trim();
    if (trimmed.length > 3) {
      if ((trimmed.startsWith("{") && trimmed.endsWith("}")) || (trimmed.startsWith("[") && trimmed.endsWith("]"))) {
        setSuggestion({ toolName: "JSON Formatter", slug: "json-formatter", type: "JSON Code" });
      } else if (/^[A-Za-z0-9+/=]{16,}$/.test(trimmed) && trimmed.length % 4 === 0) {
        setSuggestion({ toolName: "Base64 Converter", slug: "base64", type: "Base64 Code" });
      } else if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.includes("?")) {
        setSuggestion({ toolName: "URL Encoder/Decoder", slug: "url-encoder", type: "URL Query" });
      } else if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(trimmed)) {
        setSuggestion({ toolName: "Color Converter", slug: "color-converter", type: "Hex Color" });
      } else {
        setSuggestion(null);
      }
    } else {
      setSuggestion(null);
    }

    // Update URL query parameters instantly without routing delay
    const newUrl = val ? `/?search=${encodeURIComponent(val)}` : "/";
    window.history.replaceState(null, "", newUrl);
    
    // Dispatch custom event to notify ToolsDirectory grid of the update
    window.dispatchEvent(new Event("searchchange"));
  };

  const handleClear = () => {
    handleSearchChange("");
  };

  const popularShortcuts = [
    { name: "Compress Image", href: "/tools/compress-image" },
    { name: "Minify Code", href: "/tools/minify-code" },
    { name: "SSL Checker", href: "/tools/ssl-checker" },
    { name: "JSON Formatter", href: "/tools/json-formatter" },
  ];

  return (
    <div className="w-full flex flex-col gap-4 text-left">
      {/* Search Input Box */}
      <div className="relative w-full">
        <div className="flex items-center bg-neutral-50 dark:bg-card border border-border/80 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10 rounded-2xl px-4 py-1.5 shadow-sm transition-all duration-200">
          <Search className="h-4.5 w-4.5 text-muted-foreground mr-2.5 shrink-0" />
          <input
            type="text"
            value={searchVal}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search 40+ free tools or paste raw code directly..."
            className="w-full bg-transparent border-0 outline-none text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/60 py-2.5"
            aria-label="Search free website tools"
          />
          {searchVal && (
            <button
              onClick={handleClear}
              className="p-1 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-full text-muted-foreground hover:text-foreground transition-colors mr-1 cursor-pointer"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Auto-detect Suggestion Alert Card */}
      {suggestion && (
        <div className="bg-[#f3eeff] dark:bg-[#1f1a2e] border border-[#7d4dff]/20 rounded-2xl p-3.5 flex items-center justify-between gap-4 animate-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-2 text-3xs sm:text-2xs font-extrabold text-foreground">
            <div className="h-7 w-7 bg-[#7d4dff]/10 text-primary rounded-lg flex items-center justify-center">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[#7d4dff] uppercase text-[9px] block">Auto-Detected {suggestion.type}</span>
              <p className="mt-0.5">Need to process this payload?</p>
            </div>
          </div>
          <Link
            href={`/tools/${suggestion.slug}`}
            className="inline-flex items-center gap-1 text-3xs font-extrabold text-white bg-primary hover:bg-[#6530ef] px-3.5 py-2 rounded-xl shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            Launch {suggestion.toolName} <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      )}

      {/* Popular Shortcuts */}
      <div className="flex flex-wrap items-center gap-2 text-3xs sm:text-2xs">
        <span className="text-muted-foreground font-bold uppercase tracking-wider select-none mr-1">
          Popular:
        </span>
        {popularShortcuts.map((shortcut) => (
          <Link
            key={shortcut.name}
            href={shortcut.href}
            className="px-3 py-1 bg-white hover:bg-primary/5 dark:bg-[#1a1f2c] dark:hover:bg-primary/15 text-[#6530ef] dark:text-[#a582ff] border border-border/60 hover:border-primary/40 rounded-full font-bold transition-all duration-200 active:scale-95 hover:shadow-xs shadow-black/5"
          >
            {shortcut.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
