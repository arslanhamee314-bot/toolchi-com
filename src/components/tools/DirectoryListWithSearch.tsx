"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ChevronRight, X } from "lucide-react";
import { CATEGORIES, TOOLS_REGISTRY, ToolItem } from "@/lib/tools-registry";
import LucideIcon from "@/components/tools/LucideIcon";

export default function DirectoryListWithSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredToolsByCategory = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const mapping: Record<string, ToolItem[]> = {};

    CATEGORIES.forEach((cat) => {
      // Filter tools belonging to this category
      let tools = TOOLS_REGISTRY.filter((t) => t.category === cat.id);

      // If category filter is active (not 'all'), hide tools from other categories
      if (selectedCategory !== "all" && cat.id !== selectedCategory) {
        mapping[cat.id] = [];
        return;
      }

      // If search query is present, filter by name/description
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
  }, [searchQuery, selectedCategory]);

  const isAllEmpty = useMemo(() => {
    return Object.values(filteredToolsByCategory).every((list) => list.length === 0);
  }, [filteredToolsByCategory]);

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Search Input and Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-card border border-border p-4 rounded-2xl shadow-xs">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tools (e.g. compress, formatter)..."
            className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-900 border border-border rounded-xl outline-none text-foreground placeholder:text-muted-foreground/60 focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-full text-muted-foreground transition-colors cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Category Selector Scroll Chips */}
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-1 scrollbar-none snap-x select-none">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1.5 text-3xs font-extrabold rounded-xl border transition-all cursor-pointer whitespace-nowrap active:scale-95 shrink-0 ${
              selectedCategory === "all"
                ? "bg-[#7d4dff] border-[#7d4dff] text-white shadow-xs"
                : "bg-neutral-50 dark:bg-neutral-900 border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            All Categories
          </button>
          {CATEGORIES.map((cat) => {
            // Only show chip if it contains any tools
            const toolsCount = TOOLS_REGISTRY.filter((t) => t.category === cat.id).length;
            if (toolsCount === 0) return null;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-3xs font-extrabold rounded-xl border transition-all cursor-pointer whitespace-nowrap active:scale-95 shrink-0 ${
                  selectedCategory === cat.id
                    ? "bg-[#7d4dff] border-[#7d4dff] text-white shadow-xs"
                    : "bg-neutral-50 dark:bg-neutral-900 border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Categorized Tools Grid */}
      {!isAllEmpty ? (
        <div className="flex flex-col gap-10">
          {CATEGORIES.map((category) => {
            const categoryTools = filteredToolsByCategory[category.id];
            if (!categoryTools || categoryTools.length === 0) return null;

            return (
              <div key={category.id} className="flex flex-col gap-4">
                <div className="flex items-baseline gap-3 border-b border-border/20 pb-2">
                  <h2 className="text-base font-bold text-foreground tracking-tight">
                    {category.name}
                  </h2>
                  <span className="text-3xs text-muted-foreground font-semibold">
                    {categoryTools.length} tools
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {categoryTools.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={`/tools/${tool.slug}`}
                      className="p-4 rounded-xl border border-border/80 bg-card/10 hover:border-primary/40 hover:bg-card/25 transition-all flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="h-8 w-8 rounded-lg bg-[#f3eeff] dark:bg-[#251e1c] text-[#7d4dff] flex items-center justify-center border border-[#e8ddff]/80 dark:border-[#7d4dff]/20 shrink-0 shadow-xs group-hover:scale-105 group-hover:border-[#7d4dff]/40 transition-all">
                          <LucideIcon name={tool.iconName} className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors block truncate">
                            {tool.name}
                          </span>
                          <span className="text-3xs text-muted-foreground block truncate">
                            {category.name.replace(" Tools", "")}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white dark:bg-card p-12 text-center rounded-3xl border border-dashed border-border flex flex-col items-center justify-center gap-4 max-w-xl mx-auto w-full shadow-sm mt-4">
          <div className="h-12 w-12 bg-neutral-100 dark:bg-neutral-800 text-muted rounded-full flex items-center justify-center">
            <Search className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-foreground text-base">No utilities found</h3>
            <p className="text-xs text-muted mt-1.5 max-w-xs mx-auto leading-relaxed">
              We couldn't find any tool matching "{searchQuery}". Try selecting another category or clear the filter.
            </p>
          </div>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="px-5 py-2.5 text-xs font-bold bg-[#7d4dff] hover:bg-[#6530ef] text-white rounded-full transition-all active:scale-95 cursor-pointer shadow-md shadow-[#7d4dff]/15"
          >
            Reset Search filters
          </button>
        </div>
      )}
    </div>
  );
}
