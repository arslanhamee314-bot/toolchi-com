"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ChevronDown, ChevronUp, X } from "lucide-react";
import { TOOLS_REGISTRY, CATEGORIES, ToolItem } from "@/lib/tools-registry";
import LucideIcon from "./LucideIcon";

export default function ToolsDirectory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});

  const toggleCategory = (catId: string) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  const isEmoji = (str: string) => {
    // Detects raw emojis vs standard Lucide string keys
    return /\p{Extended_Pictographic}/u.test(str);
  };

  // Filter tools based on live search query
  const filteredToolsByCategory = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const mapping: Record<string, ToolItem[]> = {};

    CATEGORIES.forEach((cat) => {
      let tools = TOOLS_REGISTRY.filter((t) => t.category === cat.id);
      if (query) {
        tools = tools.filter(
          (t) =>
            t.name.toLowerCase().includes(query) ||
            t.shortDesc.toLowerCase().includes(query)
        );
      }
      mapping[cat.id] = tools;
    });

    return mapping;
  }, [searchQuery]);

  // Determine if all sections are empty (to show "No utilities found" state)
  const isAllEmpty = useMemo(() => {
    return Object.values(filteredToolsByCategory).every((list) => list.length === 0);
  }, [filteredToolsByCategory]);

  return (
    <div className="flex flex-col w-full gap-10">
      
      {/* 1. Toolchi Search Bar Widget (Centered in Hero) */}
      <div className="relative max-w-2xl mx-auto w-full -mt-20 mb-8 z-30 px-4 sm:px-0">
        <div className="flex items-center bg-white dark:bg-card border border-border focus-within:border-primary/50 rounded-full px-5 py-2 shadow-lg transition-all duration-200">
          <Search className="h-5 w-5 text-muted mr-3 shrink-0" />
          <input
            id="toolSearch"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tools by name (e.g. Sitemap, PDF, QR)..."
            className="w-full bg-transparent border-0 outline-none text-sm text-foreground placeholder:text-muted/60 py-2.5"
            aria-label="Search tools"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full text-muted hover:text-foreground transition-colors mr-1 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button 
            type="button"
            className="px-6 py-2.5 text-xs font-extrabold bg-[#7d4dff] hover:bg-[#6530ef] text-white rounded-full transition-all active:scale-95 cursor-pointer shrink-0 ml-2"
          >
            Search
          </button>
        </div>
      </div>

      {/* 2. Category Tool Sections */}
      {!isAllEmpty ? (
        <div className="flex flex-col gap-8 w-full">
          {CATEGORIES.map((cat, catIdx) => {
            const tools = filteredToolsByCategory[cat.id];
            if (tools.length === 0) return null; // Hide empty category groups dynamically

            const isCollapsed = collapsedCategories[cat.id];

            return (
              <section 
                key={cat.id} 
                className={`py-8 w-full border border-border/60 rounded-3xl transition-all shadow-xs ${
                  catIdx % 2 === 1 
                    ? "bg-[#f9fafc] dark:bg-[#151923]" 
                    : "bg-white dark:bg-card"
                }`}
              >
                <div className="max-w-6xl mx-auto px-6 flex flex-col gap-6">
                  
                  {/* Category Header with Toggle Expand/Collapse */}
                  <div className="flex items-center justify-between gap-4 pb-2 border-b border-border/40">
                    <div>
                      <h2 className="text-xl font-bold tracking-tight text-foreground">{cat.name}</h2>
                      <p className="text-xs text-muted leading-relaxed mt-0.5">{cat.desc}</p>
                    </div>
                    <button
                      onClick={() => toggleCategory(cat.id)}
                      className="h-10 w-10 border border-border bg-white dark:bg-card text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full flex items-center justify-center transition-all cursor-pointer select-none text-base"
                      title={isCollapsed ? "Expand Section" : "Collapse Section"}
                    >
                      {isCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
                    </button>
                  </div>

                  {/* Category Tool Cards Grid */}
                  <div 
                    className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 transition-all duration-300 ${
                      isCollapsed ? "collapsed-grid" : "expanded-grid"
                    }`}
                  >
                    {tools.map((tool) => (
                      <article
                        key={tool.slug}
                        className="bg-white dark:bg-card border border-border group-hover:border-[#7d4dff]/50 rounded-[18px] p-6 shadow-xs min-h-[260px] flex flex-col items-start hover:-translate-y-0.5 transition-transform-ease duration-200 relative group"
                      >
                        {/* Custom Card Stripe top border */}
                        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#7d4dff] to-[#7d4dff] rounded-t-[18px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Tool Icon Header row */}
                        <div className="flex w-full items-center justify-between mb-4">
                          <div className="h-16 w-16 rounded-[18px] bg-[#f3eeff] dark:bg-[#251e1c] text-[#7d4dff] flex items-center justify-center font-bold text-2xl border border-[#e8ddff]/40">
                            {isEmoji(tool.iconName) ? (
                              <span className="select-none">{tool.iconName}</span>
                            ) : (
                              <LucideIcon name={tool.iconName} className="h-6 w-6" />
                            )}
                          </div>
                          <span className="text-[9px] font-extrabold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/15 select-none shrink-0">
                            Local
                          </span>
                        </div>

                        {/* Title & Desc */}
                        <div className="flex-1 mb-4">
                          <h3 className="font-extrabold text-sm text-foreground tracking-tight leading-snug mb-2 group-hover:text-[#7d4dff] transition-colors">
                            {tool.name}
                          </h3>
                          <p className="text-xs text-muted leading-relaxed line-clamp-3">
                            {tool.shortDesc}
                          </p>
                        </div>

                        {/* Call to Action Button */}
                        <Link
                          href={`/tools/${tool.slug}`}
                          className="w-full text-center py-2.5 px-4 bg-[#7d4dff] hover:bg-[#6530ef] text-white font-bold text-xs rounded-full transition-colors mt-auto select-none shadow-sm shadow-[#7d4dff]/10"
                        >
                          Open Tool
                        </Link>
                      </article>
                    ))}
                  </div>

                </div>
              </section>
            );
          })}
        </div>
      ) : (
        <div className="bg-white dark:bg-card p-12 text-center rounded-3xl border border-dashed border-border flex flex-col items-center justify-center gap-4 max-w-xl mx-auto w-full shadow-sm">
          <div className="h-12 w-12 bg-neutral-100 dark:bg-neutral-800 text-muted rounded-full flex items-center justify-center">
            <Search className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-foreground text-base">No utilities found</h3>
            <p className="text-xs text-muted mt-1.5 max-w-xs mx-auto leading-relaxed">
              We couldn't find any tool matching "{searchQuery}". Try auditing your spelling or reset the search.
            </p>
          </div>
          <button
            onClick={() => setSearchQuery("")}
            className="px-5 py-2.5 text-xs font-bold bg-[#7d4dff] hover:bg-[#6530ef] text-white rounded-full transition-all active:scale-95 cursor-pointer shadow-md shadow-[#7d4dff]/15"
          >
            Clear Search Filter
          </button>
        </div>
      )}

    </div>
  );
}
