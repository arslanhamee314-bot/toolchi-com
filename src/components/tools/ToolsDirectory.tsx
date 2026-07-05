"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Search, ChevronDown, ChevronUp, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { TOOLS_REGISTRY, CATEGORIES, ToolItem } from "@/lib/tools-registry";
import LucideIcon from "./LucideIcon";
import ToolCard from "./ToolCard";

export default function ToolsDirectory() {
  const searchParams = useSearchParams();
  const searchQueryParam = searchParams ? searchParams.get("search") || "" : "";
  const [searchQuery, setSearchQuery] = useState(searchQueryParam);
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setSearchQuery(searchQueryParam);
  }, [searchQueryParam]);

  useEffect(() => {
    const handleSearchChange = () => {
      const params = new URLSearchParams(window.location.search);
      setSearchQuery(params.get("search") || "");
    };
    window.addEventListener("searchchange", handleSearchChange);
    return () => window.removeEventListener("searchchange", handleSearchChange);
  }, []);

  const toggleCategory = (catId: string) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
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
    <div className="flex flex-col w-full gap-6">

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
                id={cat.id}
                className={`py-8 w-full border border-border/60 rounded-3xl transition-all shadow-xs scroll-mt-20 ${
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
                      <ToolCard key={tool.slug} tool={tool} />
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
