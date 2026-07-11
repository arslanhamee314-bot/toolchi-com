"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { X, Search, ChevronRight, Star, Clock, Zap } from "lucide-react";
import { TOOLS_REGISTRY, ToolItem } from "@/lib/tools-registry";
import LucideIcon from "@/components/tools/LucideIcon";

const CATEGORY_GROUPS = [
  { id: "ai", label: "AI Writing", color: "bg-purple-500/10 text-purple-500" },
  { id: "documents", label: "PDF & Docs", color: "bg-teal-500/10 text-teal-500" },
  { id: "optimize", label: "Image Tools", color: "bg-emerald-500/10 text-emerald-500" },
  { id: "transform", label: "Transform", color: "bg-blue-500/10 text-blue-500" },
  { id: "gif-maker", label: "GIF & Animation", color: "bg-pink-500/10 text-pink-500" },
  { id: "video-tools", label: "Video", color: "bg-red-500/10 text-red-500" },
  { id: "developer", label: "Developer", color: "bg-orange-500/10 text-orange-500" },
  { id: "webmaster", label: "SEO & Webmaster", color: "bg-amber-500/10 text-amber-500" },
  { id: "operational", label: "Utilities", color: "bg-indigo-500/10 text-indigo-500" },
];

interface MobileToolDrawerProps {
  open: boolean;
  onClose: () => void;
  onSelectTool: (slug: string) => void;
  activeSlugs?: string[];
}

export default function MobileToolDrawer({ open, onClose, onSelectTool, activeSlugs = [] }: MobileToolDrawerProps) {
  const [query, setQuery] = useState("");
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const [recentSlugs, setRecentSlugs] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Load recent tools
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("toolchi_recent") || "[]") as string[];
      setRecentSlugs(stored.slice(0, 5));
    } catch { /* ignore */ }
  }, [open]);

  // Auto-focus search on open
  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedCat(null);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const handleSelect = useCallback((slug: string) => {
    onSelectTool(slug);
    onClose();
    setQuery("");
    setSelectedCat(null);
  }, [onSelectTool, onClose]);

  // Filtered tools
  const filteredTools: ToolItem[] = query.trim()
    ? TOOLS_REGISTRY.filter(t =>
        t.name.toLowerCase().includes(query.toLowerCase()) ||
        t.shortDesc.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 15)
    : selectedCat
      ? TOOLS_REGISTRY.filter(t => t.category === selectedCat)
      : [];

  const recentTools = recentSlugs
    .map(s => TOOLS_REGISTRY.find(t => t.slug === s))
    .filter(Boolean) as ToolItem[];

  const popularTools = TOOLS_REGISTRY.filter(t => t.popular).slice(0, 6);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm lg:hidden"
        onClick={onClose}
      />

      {/* Bottom Sheet Drawer */}
      <div
        ref={drawerRef}
        className="fixed bottom-0 left-0 right-0 z-[101] lg:hidden bg-white dark:bg-[#171c26] rounded-t-3xl border-t border-border shadow-2xl"
        style={{ maxHeight: "85vh", display: "flex", flexDirection: "column" }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1 shrink-0">
          <div className="w-10 h-1 rounded-full bg-border" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-border shrink-0">
          <div>
            <p className="text-sm font-extrabold text-foreground">Select a Tool</p>
            <p className="text-[10px] text-muted-foreground">{TOOLS_REGISTRY.length}+ tools available</p>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-xl bg-background dark:bg-[#1a1f2e] border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-5 py-3 shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search tools..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 text-sm bg-background dark:bg-[#1a1f2e] border border-border rounded-2xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/10 transition"
            />
            {query && (
              <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer">
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-5 pb-6">

          {/* Search results */}
          {query.trim() && (
            <div className="space-y-1">
              <p className="text-[9px] font-extrabold text-muted-foreground uppercase tracking-wider mb-2">
                {filteredTools.length} Results
              </p>
              {filteredTools.length === 0 && (
                <p className="text-sm text-muted-foreground py-4 text-center">No tools found for &ldquo;{query}&rdquo;</p>
              )}
              {filteredTools.map(tool => (
                <DrawerToolRow key={tool.slug} tool={tool} isActive={activeSlugs.includes(tool.slug)} onSelect={handleSelect} />
              ))}
            </div>
          )}

          {/* Category selected */}
          {!query.trim() && selectedCat && (
            <div className="space-y-1">
              <div className="flex items-center gap-2 mb-3">
                <button
                  onClick={() => setSelectedCat(null)}
                  className="text-[10px] font-bold text-primary hover:underline cursor-pointer flex items-center gap-1"
                >
                  ← All Categories
                </button>
              </div>
              <p className="text-[9px] font-extrabold text-muted-foreground uppercase tracking-wider mb-2">
                {CATEGORY_GROUPS.find(c => c.id === selectedCat)?.label} · {filteredTools.length} tools
              </p>
              {filteredTools.map(tool => (
                <DrawerToolRow key={tool.slug} tool={tool} isActive={activeSlugs.includes(tool.slug)} onSelect={handleSelect} />
              ))}
            </div>
          )}

          {/* Default: Recent + Popular + Categories */}
          {!query.trim() && !selectedCat && (
            <div className="space-y-5">

              {/* Recent Tools */}
              {recentTools.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                    <p className="text-[9px] font-extrabold text-muted-foreground uppercase tracking-wider">Recently Used</p>
                  </div>
                  <div className="space-y-1">
                    {recentTools.map(tool => (
                      <DrawerToolRow key={tool.slug} tool={tool} isActive={activeSlugs.includes(tool.slug)} onSelect={handleSelect} />
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Tools */}
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <Zap className="h-3.5 w-3.5 text-muted-foreground" />
                  <p className="text-[9px] font-extrabold text-muted-foreground uppercase tracking-wider">Popular Tools</p>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {popularTools.map(tool => (
                    <button
                      key={tool.slug}
                      onClick={() => handleSelect(tool.slug)}
                      className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border transition-all cursor-pointer text-center ${
                        activeSlugs.includes(tool.slug)
                          ? "bg-primary/10 border-primary/30 text-primary"
                          : "bg-background dark:bg-[#1a1f2e] border-border hover:border-primary/30 hover:bg-primary/5"
                      }`}
                    >
                      <div className={`h-8 w-8 rounded-xl flex items-center justify-center ${activeSlugs.includes(tool.slug) ? "bg-primary text-white" : "bg-primary/10 text-primary"}`}>
                        <LucideIcon name={tool.iconName} className="h-4 w-4" />
                      </div>
                      <span className="text-[9px] font-bold text-foreground leading-tight">{tool.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Grid */}
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <Star className="h-3.5 w-3.5 text-muted-foreground" />
                  <p className="text-[9px] font-extrabold text-muted-foreground uppercase tracking-wider">Browse by Category</p>
                </div>
                <div className="space-y-1">
                  {CATEGORY_GROUPS.map(cat => {
                    const count = TOOLS_REGISTRY.filter(t => t.category === cat.id).length;
                    if (count === 0) return null;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCat(cat.id)}
                        className="w-full flex items-center justify-between px-3.5 py-3 bg-background dark:bg-[#1a1f2e] border border-border hover:border-primary/30 hover:bg-primary/5 rounded-2xl transition-all cursor-pointer group"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`h-7 w-7 rounded-xl ${cat.color} flex items-center justify-center`}>
                            <div className="h-2 w-2 rounded-full bg-current" />
                          </div>
                          <span className="text-sm font-semibold text-foreground">{cat.label}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] text-muted-foreground">{count} tools</span>
                          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </>
  );
}

// Tool row for list display
function DrawerToolRow({ tool, isActive, onSelect }: { tool: ToolItem; isActive: boolean; onSelect: (slug: string) => void }) {
  return (
    <button
      onClick={() => onSelect(tool.slug)}
      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl border transition-all cursor-pointer text-left ${
        isActive
          ? "bg-primary/10 border-primary/30"
          : "bg-background dark:bg-[#1a1f2e] border-border hover:border-primary/30 hover:bg-primary/5"
      }`}
    >
      <div className={`h-8 w-8 rounded-xl flex items-center justify-center shrink-0 ${isActive ? "bg-primary text-white" : "bg-primary/10 text-primary"}`}>
        <LucideIcon name={tool.iconName} className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <p className={`text-sm font-semibold truncate ${isActive ? "text-primary" : "text-foreground"}`}>{tool.name}</p>
        <p className="text-[10px] text-muted-foreground truncate">{tool.shortDesc}</p>
      </div>
      {isActive && <span className="ml-auto text-[9px] font-extrabold text-primary bg-primary/10 px-1.5 py-0.5 rounded shrink-0">Open</span>}
    </button>
  );
}
