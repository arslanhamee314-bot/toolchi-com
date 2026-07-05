"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function HeroSearch() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams ? searchParams.get("search") || "" : "";
  const [searchVal, setSearchVal] = useState(initialSearch);

  useEffect(() => {
    setSearchVal(initialSearch);
  }, [initialSearch]);

  const handleSearchChange = (val: string) => {
    setSearchVal(val);
    
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
    <div className="w-full flex flex-col gap-4">
      {/* Search Input Box */}
      <div className="relative w-full">
        <div className="flex items-center bg-neutral-50 dark:bg-card border border-border/80 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10 rounded-2xl px-4 py-1.5 shadow-sm transition-all duration-200">
          <Search className="h-4.5 w-4.5 text-muted-foreground mr-2.5 shrink-0" />
          <input
            type="text"
            value={searchVal}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search 40+ free tools..."
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
