"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { CATEGORIES, TOOLS_REGISTRY, ToolItem } from "@/lib/tools-registry";
import ToolSwitcher from "./ToolSwitcher";
import LucideIcon from "./LucideIcon";
import { Sparkles, ArrowRight, ShieldCheck, History, ChevronDown, ChevronUp, Clock, X } from "lucide-react";

interface HistoryEntry {
  slug: string;
  name: string;
  category: string;
  runAt: string;
  iconName: string;
}

export default function InteractiveWorkspace() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);
  const [activeToolSlug, setActiveToolSlug] = useState<string | null>(
    TOOLS_REGISTRY.filter((t) => t.category === CATEGORIES[0].id)[0]?.slug || null
  );
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [showMoreTools, setShowMoreTools] = useState(false);

  const filteredTools = TOOLS_REGISTRY.filter((t) => t.category === activeCategory);
  const VISIBLE_TOOL_COUNT = 8;
  const visibleTools = showMoreTools ? filteredTools : filteredTools.slice(0, VISIBLE_TOOL_COUNT);
  const hasMoreTools = filteredTools.length > VISIBLE_TOOL_COUNT;

  const handleCategoryChange = useCallback((catId: string) => {
    setActiveCategory(catId);
    setShowMoreTools(false);
    const catTools = TOOLS_REGISTRY.filter((t) => t.category === catId);
    setActiveToolSlug(catTools.length > 0 ? catTools[0].slug : null);
  }, []);

  const handleToolSelect = useCallback((slug: string, category?: string) => {
    if (category) setActiveCategory(category);
    setActiveToolSlug(slug);
    const tool = TOOLS_REGISTRY.find((t) => t.slug === slug);
    if (tool) {
      const entry: HistoryEntry = {
        slug: tool.slug, name: tool.name, category: tool.category,
        iconName: tool.iconName,
        runAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setHistory((prev) => [entry, ...prev.filter((h) => h.slug !== slug)].slice(0, 6));
    }
  }, []);

  useEffect(() => {
    const onCat = (e: any) => { if (e.detail?.id) { handleCategoryChange(e.detail.id); document.getElementById("workspace")?.scrollIntoView({ behavior: "smooth" }); } };
    const onTool = (e: any) => { if (e.detail?.slug) { handleToolSelect(e.detail.slug, e.detail.category); document.getElementById("workspace")?.scrollIntoView({ behavior: "smooth" }); } };
    window.addEventListener("select-category", onCat);
    window.addEventListener("select-tool", onTool);
    return () => { window.removeEventListener("select-category", onCat); window.removeEventListener("select-tool", onTool); };
  }, [handleCategoryChange, handleToolSelect]);

  const activeTool = TOOLS_REGISTRY.find((t) => t.slug === activeToolSlug);

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 w-full py-12 scroll-mt-20" id="workspace">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <div className="flex flex-col gap-1 text-left">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#7d4dff] animate-pulse" />
              <span className="text-[10px] font-extrabold text-[#7d4dff] uppercase tracking-wider">Interactive Live Hub</span>
            </div>
            <h2 className="text-xl font-extrabold text-foreground tracking-tight">Toolchi Live Workspace</h2>
            <p className="text-xs text-muted-foreground">Run any utility directly in-browser without loading a new page.</p>
          </div>
          <button onClick={() => setShowHistory((s) => !s)} className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground hover:text-[#7d4dff] transition-colors select-none">
            <History className="h-3.5 w-3.5" />
            Session History {history.length > 0 && <span className="bg-[#7d4dff] text-white px-1.5 py-0.5 rounded-full text-[8px]">{history.length}</span>}
            {showHistory ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </button>
        </div>

        {showHistory && (
          <div className="bg-card border border-border/70 rounded-2xl p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-3xs font-extrabold text-muted-foreground uppercase tracking-wider">Recent Tools - This Session</span>
              {history.length > 0 && <button onClick={() => setHistory([])} className="text-[9px] text-muted-foreground hover:text-red-400 transition-colors flex items-center gap-1"><X className="h-3 w-3" /> Clear</button>}
            </div>
            {history.length === 0 ? (
              <p className="text-3xs text-muted-foreground text-center py-3">No tools run yet this session.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {history.map((h) => (
                  <button key={h.slug + h.runAt} onClick={() => handleToolSelect(h.slug, h.category)} className="flex items-center gap-1.5 px-2.5 py-1.5 bg-neutral-50 dark:bg-neutral-800 border border-border hover:border-[#7d4dff]/50 rounded-xl text-[10px] font-bold text-foreground transition-all active:scale-95">
                    <LucideIcon name={h.iconName} className="h-3 w-3 text-[#7d4dff]" />
                    <span>{h.name}</span>
                    <span className="text-[8px] text-muted-foreground flex items-center gap-0.5"><Clock className="h-2.5 w-2.5" />{h.runAt}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="border border-border/80 bg-white dark:bg-card rounded-3xl shadow-xs overflow-hidden flex flex-col">
          <div className="border-b border-[#1e293b] bg-[#0f172a] dark:bg-[#0d111a] px-3 py-2.5 flex items-center gap-2 overflow-x-auto scrollbar-none select-none snap-x snap-mandatory">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button key={cat.id} onClick={() => handleCategoryChange(cat.id)} className={`px-3 py-1.5 rounded-xl text-2xs font-extrabold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 active:scale-95 snap-start shrink-0 ${isActive ? "bg-[#7d4dff] text-white shadow-sm shadow-[#7d4dff]/20" : "text-neutral-300 hover:text-white hover:bg-white/5"}`}>
                  <span className="flex items-center justify-center shrink-0 w-4 h-4">
                    {cat.id === "gif-maker" && <img src="/images/maker.png" className="h-4 w-4 object-contain" alt="" />}
                    {cat.id === "video-tools" && <img src="/images/video.svg" className="h-4 w-4 object-contain" alt="" />}
                    {cat.id === "audio" && <img src="/images/audio.svg" className="h-4 w-4 object-contain" alt="" />}
                    {cat.id === "transform" && <img src="/images/resize.svg" className="h-4 w-4 object-contain" alt="" />}
                    {cat.id === "optimize" && <img src="/images/optimize.svg" className="h-4 w-4 object-contain" alt="" />}
                    {cat.id === "effects" && <img src="/images/effects.svg" className="h-4 w-4 object-contain" alt="" />}
                    {cat.id === "split" && <img src="/images/split.svg" className="h-4 w-4 object-contain" alt="" />}
                    {cat.id === "add-text" && <img src="/images/insert-text.svg" className="h-4 w-4 object-contain" alt="" />}
                    {cat.id === "webp" && <img src="/images/webp.svg" className="h-4 w-4 object-contain" alt="" />}
                    {cat.id === "apng" && <img src="/images/apng.svg" className="h-4 w-4 object-contain" alt="" />}
                    {cat.id === "avif" && <img src="/images/avif.svg" className="h-4 w-4 object-contain" alt="" />}
                    {cat.id === "jxl" && <img src="/images/jxl.svg" className="h-4 w-4 object-contain" alt="" />}
                    {cat.id === "svg" && <img src="/images/svg.svg" className="h-4 w-4 object-contain" alt="" />}
                    {cat.id === "documents" && "📄"}
                    {cat.id === "webmaster" && "🌐"}
                    {cat.id === "performance" && "⚡"}
                    {cat.id === "operational" && "⚙️"}
                    {cat.id === "developer" && "💻"}
                    {cat.id === "ai" && "🤖"}
                  </span>
                  <span>{cat.name.replace(" Tools", "").replace(" Utilities", "")}</span>
                </button>
              );
            })}
          </div>

          <div className="border-b border-border/40 px-3 sm:px-4 py-2.5 flex items-center gap-2 overflow-x-auto scrollbar-none whitespace-nowrap select-none bg-[#f8fafc] dark:bg-[#141822] snap-x">
            {visibleTools.map((tool) => {
              const isActive = activeToolSlug === tool.slug;
              return (
                <button key={tool.slug} onClick={() => handleToolSelect(tool.slug)} className={`px-3 py-1.5 rounded-xl border text-3xs font-extrabold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 active:scale-95 shrink-0 ${isActive ? "border-[#7d4dff] text-[#7d4dff] bg-[#7d4dff]/10 dark:bg-[#7d4dff]/20" : "bg-white dark:bg-[#1a202c] border-border/80 text-muted-foreground hover:text-foreground hover:border-[#7d4dff]/30"}`}>
                  <LucideIcon name={tool.iconName} className="h-3.5 w-3.5" />
                  <span>{tool.name}</span>
                </button>
              );
            })}
            {hasMoreTools && (
              <button onClick={() => setShowMoreTools((s) => !s)} className="px-3 py-1.5 rounded-xl border text-3xs font-extrabold cursor-pointer whitespace-nowrap flex items-center gap-1 bg-white dark:bg-[#1a202c] border-border/80 text-muted-foreground hover:text-[#7d4dff] hover:border-[#7d4dff]/30 shrink-0 transition-all">
                {showMoreTools ? "Less ▲" : `+${filteredTools.length - VISIBLE_TOOL_COUNT} More ▼`}
              </button>
            )}
          </div>

          <div className="p-3 sm:p-5 md:p-7 bg-[#fafbfc]/30 dark:bg-neutral-900/5 min-h-[300px] flex flex-col gap-4 sm:gap-6">
            {activeToolSlug && activeTool ? (
              <div className="flex flex-col gap-4 sm:gap-5">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-border/40 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 bg-primary/10 text-primary border border-primary/15 rounded-xl flex items-center justify-center shrink-0">
                      <LucideIcon name={activeTool.iconName} className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm text-foreground">{activeTool.name}</h3>
                      <p className="text-3xs text-muted-foreground leading-normal mt-0.5">{activeTool.shortDesc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 print:hidden">
                    <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-lg select-none">
                      <ShieldCheck className="h-3.5 w-3.5" /> Private Local Run
                    </span>
                    <Link href={`/tools/${activeTool.slug}`} className="inline-flex items-center gap-1 text-[9px] font-bold text-[#7d4dff] hover:text-[#6530ef] hover:underline">
                      Full Page Mode <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
                <div className="bg-white dark:bg-card border border-border/70 rounded-2xl p-3 sm:p-5 shadow-3xs relative overflow-hidden min-h-[160px]">
                  <ToolSwitcher slug={activeTool.slug} />
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 sm:p-12 text-muted-foreground/60 gap-3 border border-dashed border-border rounded-2xl bg-card/10">
                <Sparkles className="h-8 w-8 text-muted-foreground/45" />
                <div>
                  <h4 className="text-xs font-bold text-foreground">Select a tool above</h4>
                  <p className="text-3xs mt-0.5">Choose any browser-based utility tool from the workspace bars to run it instantly.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
