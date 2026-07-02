"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Sparkles, TrendingUp, X } from "lucide-react";
import { TOOLS_REGISTRY, CATEGORIES, ToolItem } from "@/lib/tools-registry";
import LucideIcon from "./LucideIcon";

export default function ToolsDirectory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Real-time search autocomplete list
  const autocompleteResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return TOOLS_REGISTRY.filter(
      (t) =>
        t.name.toLowerCase().includes(query) ||
        t.shortDesc.toLowerCase().includes(query)
    ).slice(0, 5);
  }, [searchQuery]);

  // Filter tools based on search and selected category
  const filteredTools = useMemo(() => {
    let result = TOOLS_REGISTRY;

    if (selectedCategory !== "all") {
      result = result.filter((t) => t.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(query) ||
          t.shortDesc.toLowerCase().includes(query)
      );
    }

    return result;
  }, [selectedCategory, searchQuery]);

  // Extract popular tools
  const popularTools = useMemo(() => {
    return TOOLS_REGISTRY.filter((t) => t.popular);
  }, []);

  return (
    <div className="flex flex-col gap-10">
      
      {/* 1. Real-Time Search Bar Wrapper */}
      <div className="relative max-w-2xl mx-auto w-full -mt-6 mb-4 z-30">
        <div className="flex items-center bg-card border border-border focus-within:border-primary/50 rounded-2xl px-4 py-3.5 shadow-xl transition-all duration-200">
          <Search className="h-5 w-5 text-muted-foreground mr-3 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search all 25+ client-side tools (e.g., PDF, Case, JSON)..."
            className="w-full bg-transparent border-0 outline-hidden text-sm text-foreground placeholder:text-muted-foreground/60"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="p-1 hover:bg-muted rounded-full text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Autocomplete Dropdown */}
        {autocompleteResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="px-4 py-2 border-b border-border/60 text-3xs font-semibold text-muted-foreground uppercase tracking-wider">
              Suggested Utilities
            </div>
            <div className="divide-y divide-border/40">
              {autocompleteResults.map((result) => (
                <Link
                  key={result.slug}
                  href={`/tools/${result.slug}`}
                  onClick={() => setSearchQuery("")}
                  className="flex items-center justify-between p-3.5 hover:bg-primary/5 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-muted text-muted-foreground flex items-center justify-center border group-hover:bg-primary/10 group-hover:text-primary transition-all">
                      <LucideIcon name={result.iconName} className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-primary transition-colors">
                        {result.name}
                      </div>
                      <div className="text-xs text-muted-foreground truncate max-w-sm md:max-w-md">
                        {result.shortDesc}
                      </div>
                    </div>
                  </div>
                  <span className="text-3xs text-muted-foreground bg-muted px-2 py-0.5 rounded font-bold uppercase">
                    {result.category}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 2. Popular Tools Section (Highlighted Slider/Grid) */}
      {selectedCategory === "all" && !searchQuery && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-border/40 pb-2">
            <TrendingUp className="h-5 w-5 text-indigo-400" />
            <h2 className="text-lg font-bold tracking-tight text-white">Popular Utilities</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="glass p-5 rounded-2xl border hover:border-primary/40 hover-scale flex flex-col gap-4 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 h-16 w-16 bg-indigo-500/5 rounded-bl-full pointer-events-none group-hover:bg-indigo-500/10 transition-colors" />
                <div className="flex items-center justify-between">
                  <div className="h-9 w-9 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
                    <LucideIcon name={tool.iconName} className="h-4.5 w-4.5" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-3xs font-extrabold bg-indigo-500/10 text-indigo-400 rounded-full border border-indigo-500/25">
                    Popular
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-sm text-white group-hover:text-primary transition-colors mb-1.5">{tool.name}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{tool.shortDesc}</p>
                </div>
                <div className="text-xs font-semibold text-primary group-hover:text-primary-foreground flex items-center gap-1 mt-2">
                  Launch Tool →
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 3. Category Filter Chips & Grid */}
      <div id="categories" className="flex flex-col gap-6 scroll-mt-24">
        <div className="flex flex-col gap-2 border-b border-border/40 pb-2">
          <h2 className="text-lg font-bold tracking-tight text-white">All Browser Utilities</h2>
          <p className="text-xs text-muted-foreground">Select a category chip below to filter tools dynamically.</p>
        </div>

        {/* Filters Carousel/Chips */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:-mx-0 sm:px-0">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 text-xs font-semibold rounded-xl shrink-0 transition-all border active:scale-95 ${
              selectedCategory === "all"
                ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/10"
                : "bg-card border-border hover:border-neutral-700 text-muted-foreground hover:text-foreground"
            }`}
          >
            All Utilities
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl shrink-0 transition-all border active:scale-95 ${
                selectedCategory === cat.id
                  ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/10"
                  : "bg-card border-border hover:border-neutral-700 text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Filtered Tools Grid */}
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="glass p-5 rounded-2xl border hover:border-primary/40 hover-scale flex flex-col justify-between gap-5 group"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
                      <LucideIcon name={tool.iconName} className="h-4.5 w-4.5" />
                    </div>
                    {tool.isNew && (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-3xs font-extrabold bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/25">
                        New
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white group-hover:text-primary transition-colors mb-1.5">{tool.name}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">{tool.shortDesc}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-border/40 pt-4 mt-auto">
                  <span className="text-3xs font-bold text-muted-foreground uppercase tracking-wider bg-muted px-2 py-0.5 rounded">
                    {tool.category}
                  </span>
                  <span className="text-xs font-semibold text-primary group-hover:text-primary-foreground">
                    Open Tool →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="glass p-12 text-center rounded-2xl border border-dashed border-border flex flex-col items-center justify-center gap-3">
            <div className="h-10 w-10 bg-muted text-muted-foreground rounded-full flex items-center justify-center">
              <Search className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-white text-base">No utilities found</h3>
            <p className="text-xs text-muted-foreground max-w-xs">
              We couldn't find any tool matching "{searchQuery}" under this category. Check your spelling or reset filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-2 px-4 py-2 text-xs font-semibold bg-neutral-900 border border-border text-white rounded-lg hover:border-neutral-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
