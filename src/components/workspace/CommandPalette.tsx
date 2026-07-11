"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, X, Zap, FileText, Layers } from "lucide-react";
import { TOOLS_REGISTRY } from "@/lib/tools-registry";
import { WORKFLOWS } from "@/lib/workflows-registry";
import LucideIcon from "@/components/tools/LucideIcon";

interface SearchResult {
  type: "tool" | "workflow" | "page";
  id: string;
  label: string;
  description: string;
  href: string;
  icon?: string;
}

const STATIC_PAGES: SearchResult[] = [
  { type: "page", id: "workspace", label: "Toolchi Workspace", description: "Open the multi-tool dashboard", href: "/workspace", icon: "LayoutDashboard" },
  { type: "page", id: "pricing", label: "Pricing", description: "View Pro plans and upgrade", href: "/pricing", icon: "Star" },
  { type: "page", id: "blog", label: "Blog", description: "Guides, tips, and tutorials", href: "/blog", icon: "BookOpen" },
  { type: "page", id: "tools", label: "All Tools", description: "Browse the complete tools directory", href: "/tools", icon: "Grid" },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Open on Ctrl+K / Cmd+K
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setSelectedIdx(0);
    }
  }, [open]);

  // Build results
  const results: SearchResult[] = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      // Show recent/popular when no query
      const popular = TOOLS_REGISTRY.filter((t) => t.popular).slice(0, 5).map((t): SearchResult => ({
        type: "tool",
        id: t.slug,
        label: t.name,
        description: t.shortDesc,
        href: `/tools/${t.slug}`,
        icon: t.iconName,
      }));
      return [...STATIC_PAGES, ...popular];
    }

    const toolResults = TOOLS_REGISTRY
      .filter((t) => t.name.toLowerCase().includes(q) || t.shortDesc.toLowerCase().includes(q) || (t.tags || []).some((tag) => tag.toLowerCase().includes(q)))
      .slice(0, 6)
      .map((t): SearchResult => ({
        type: "tool",
        id: t.slug,
        label: t.name,
        description: t.shortDesc,
        href: `/tools/${t.slug}`,
        icon: t.iconName,
      }));

    const workflowResults = WORKFLOWS
      .filter((w) => w.title.toLowerCase().includes(q) || w.description.toLowerCase().includes(q))
      .slice(0, 3)
      .map((w): SearchResult => ({
        type: "workflow",
        id: w.id,
        label: w.title,
        description: w.description,
        href: `/workflows/${w.id}`,
      }));

    const pageResults = STATIC_PAGES.filter(
      (p) => p.label.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    );

    return [...pageResults, ...workflowResults, ...toolResults];
  }, [query]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const result = results[selectedIdx];
      if (result) navigate(result.href);
    }
  }, [results, selectedIdx]);

  const navigate = useCallback((href: string) => {
    setOpen(false);
    router.push(href);
  }, [router]);

  if (!open) return null;

  const groupedTypes = ["page", "workflow", "tool"] as const;
  const typeLabels = { page: "Pages", workflow: "Workflows", tool: "Tools" };
  const typeIcons = { page: FileText, workflow: Layers, tool: Zap };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      {/* Palette */}
      <div className="fixed top-[15vh] left-1/2 -translate-x-1/2 z-[201] w-full max-w-[580px] px-4">
        <div className="bg-white dark:bg-[#171c26] border border-border rounded-2xl shadow-2xl overflow-hidden">
          
          {/* Search Input */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
            <Search className="h-4 w-4 text-muted-foreground shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search tools, workflows, pages..."
              value={query}
              onChange={(e) => { setQuery(e.target.value); setSelectedIdx(0); }}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-[360px] overflow-y-auto py-2">
            {results.length === 0 && (
              <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                No results for &ldquo;{query}&rdquo;
              </div>
            )}

            {groupedTypes.map((type) => {
              const group = results.filter((r) => r.type === type);
              if (group.length === 0) return null;
              const Icon = typeIcons[type];
              return (
                <div key={type}>
                  <div className="flex items-center gap-1.5 px-4 py-1.5">
                    <Icon className="h-3 w-3 text-muted-foreground" />
                    <p className="text-[9px] font-extrabold text-muted-foreground uppercase tracking-wider">
                      {typeLabels[type]}
                    </p>
                  </div>
                  {group.map((result) => {
                    const globalIdx = results.indexOf(result);
                    const isSelected = selectedIdx === globalIdx;
                    return (
                      <button
                        key={result.id}
                        onClick={() => navigate(result.href)}
                        onMouseEnter={() => setSelectedIdx(globalIdx)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors cursor-pointer ${
                          isSelected ? "bg-primary/10 text-primary" : "hover:bg-background dark:hover:bg-[#1a1f2e]"
                        }`}
                      >
                        <div className={`h-7 w-7 rounded-xl flex items-center justify-center shrink-0 ${
                          isSelected ? "bg-primary text-white" : "bg-border/50 text-muted-foreground"
                        }`}>
                          {result.icon ? (
                            <LucideIcon name={result.icon} className="h-3.5 w-3.5" />
                          ) : (
                            <Layers className="h-3.5 w-3.5" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className={`text-sm font-semibold truncate ${isSelected ? "text-primary" : "text-foreground"}`}>
                            {result.label}
                          </p>
                          <p className="text-[10px] text-muted-foreground truncate">{result.description}</p>
                        </div>
                        {isSelected && <ArrowRight className="h-3.5 w-3.5 text-primary shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>

          {/* Footer hint */}
          <div className="flex items-center justify-between px-4 py-2 border-t border-border bg-background/50 dark:bg-[#1a1f2e]/50">
            <div className="flex items-center gap-3 text-[9px] text-muted-foreground">
              <span><kbd className="px-1 py-0.5 bg-border/60 rounded text-[8px] font-mono">↑↓</kbd> Navigate</span>
              <span><kbd className="px-1 py-0.5 bg-border/60 rounded text-[8px] font-mono">↵</kbd> Open</span>
              <span><kbd className="px-1 py-0.5 bg-border/60 rounded text-[8px] font-mono">Esc</kbd> Close</span>
            </div>
            <span className="text-[9px] text-muted-foreground">{results.length} results</span>
          </div>

        </div>
      </div>
    </>
  );
}
