"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CATEGORIES, TOOLS_REGISTRY, ToolItem } from "@/lib/tools-registry";
import ToolSwitcher from "./ToolSwitcher";
import LucideIcon from "./LucideIcon";
import { Sparkles, ArrowRight, ShieldCheck, Zap } from "lucide-react";

export default function InteractiveWorkspace() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);
  const [activeToolSlug, setActiveToolSlug] = useState<string | null>(
    TOOLS_REGISTRY.filter((t) => t.category === CATEGORIES[0].id)[0]?.slug || null
  );

  // Filter tools matching active category
  const filteredTools = TOOLS_REGISTRY.filter((t) => t.category === activeCategory);

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    const catTools = TOOLS_REGISTRY.filter((t) => t.category === catId);
    if (catTools.length > 0) {
      setActiveToolSlug(catTools[0].slug);
    } else {
      setActiveToolSlug(null);
    }
  };

  // Listen to external category selection events (from header or cards)
  useEffect(() => {
    const handleSelectCategory = (e: any) => {
      if (e.detail?.id) {
        handleCategoryChange(e.detail.id);
        const element = document.getElementById("workspace");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };
    window.addEventListener("select-category", handleSelectCategory);
    return () => window.removeEventListener("select-category", handleSelectCategory);
  }, []);

  // Listen to external tool selection events (from card clicks, search, or slides)
  useEffect(() => {
    const handleSelectTool = (e: any) => {
      if (e.detail?.slug) {
        if (e.detail.category) {
          setActiveCategory(e.detail.category);
        }
        setActiveToolSlug(e.detail.slug);
        const element = document.getElementById("workspace");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };
    window.addEventListener("select-tool", handleSelectTool);
    return () => window.removeEventListener("select-tool", handleSelectTool);
  }, []);

  const activeTool = TOOLS_REGISTRY.find((t) => t.slug === activeToolSlug);

  return (
    <section className="max-w-6xl mx-auto px-6 w-full py-12 scroll-mt-20" id="workspace">
      <div className="flex flex-col gap-6">
        
        {/* Workspace Title & Intro */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <div className="flex flex-col gap-1 text-left">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#7d4dff] animate-pulse" />
              <span className="text-[10px] font-extrabold text-[#7d4dff] uppercase tracking-wider">Interactive Live Hub</span>
            </div>
            <h2 className="text-xl font-extrabold text-foreground tracking-tight">Toolchi Live Workspace</h2>
            <p className="text-xs text-muted-foreground">Run any utility directly on the homepage in-browser without loading a new page.</p>
          </div>
        </div>

        {/* Outer Workspace Glass Panel container */}
        <div className="border border-border/80 bg-white dark:bg-card rounded-3xl shadow-xs overflow-hidden flex flex-col">
          
          {/* BAR 1: Category Selection Tabs */}
          <div className="border-b border-[#1e293b] bg-[#0f172a] dark:bg-[#0d111a] px-4 py-3 flex items-center gap-2 overflow-x-auto scrollbar-none select-none">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`px-4 py-2 rounded-xl text-2xs font-extrabold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 active:scale-95 ${
                    isActive
                      ? "bg-[#7d4dff] text-white shadow-sm shadow-[#7d4dff]/20"
                      : "text-neutral-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className="text-xs">
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

          {/* BAR 2: Tool Selection Grid / Row */}
          <div className="border-b border-border/40 px-5 py-4 bg-[#f8fafc] dark:bg-[#141822] flex flex-wrap gap-2 select-none">
            {filteredTools.map((tool) => {
              const isActive = activeToolSlug === tool.slug;
              return (
                <button
                  key={tool.slug}
                  onClick={() => setActiveToolSlug(tool.slug)}
                  className={`px-3 py-1.5 rounded-xl border text-3xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 ${
                    isActive
                      ? "border-[#7d4dff] text-[#7d4dff] bg-[#7d4dff]/10 dark:bg-[#7d4dff]/20"
                      : "bg-white dark:bg-[#1a202c] border-border/80 text-muted-foreground hover:text-foreground hover:border-[#7d4dff]/30"
                  }`}
                >
                  <LucideIcon name={tool.iconName} className="h-3.5 w-3.5" />
                  <span>{tool.name}</span>
                </button>
              );
            })}
          </div>

          {/* WORKSPACE AREA: Tool Frame & Details */}
          <div className="p-6 md:p-8 bg-[#fafbfc]/30 dark:bg-neutral-900/5 min-h-[300px] flex flex-col gap-6">
            {activeToolSlug && activeTool ? (
              <div className="flex flex-col gap-6">
                
                {/* Embedded Tool Meta Information */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-border/40 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 bg-primary/10 text-primary border border-primary/15 rounded-xl flex items-center justify-center">
                      <LucideIcon name={activeTool.iconName} className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm text-foreground">{activeTool.name}</h3>
                      <p className="text-3xs text-muted-foreground leading-normal mt-0.5">{activeTool.shortDesc}</p>
                    </div>
                  </div>

                  {/* Sandboxed Local badge & Expand Link */}
                  <div className="flex items-center gap-2 print:hidden">
                    <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-lg select-none">
                      <ShieldCheck className="h-3.5 w-3.5" /> Private Local Run
                    </span>
                    <Link
                      href={`/tools/${activeTool.slug}`}
                      className="inline-flex items-center gap-1 text-[9px] font-bold text-[#7d4dff] hover:text-[#6530ef] hover:underline"
                    >
                      Full Page Mode <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>

                {/* Render Selected Live Component Switcher */}
                <div className="bg-white dark:bg-card border border-border/70 rounded-2xl p-6 shadow-3xs relative overflow-hidden min-h-[160px]">
                  <ToolSwitcher slug={activeTool.slug} />
                </div>
                
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-12 text-muted-foreground/60 gap-3 border border-dashed border-border rounded-2xl bg-card/10">
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
