"use client";

import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { X, Plus, ChevronLeft, Menu, Sparkles, LayoutDashboard, Grid2X2, Keyboard } from "lucide-react";
import { TOOLS_REGISTRY, ToolItem } from "@/lib/tools-registry";
import { getWorkflowById } from "@/lib/workflows-registry";
import ToolSidebar from "./ToolSidebar";
import SmartAssistPanel from "./SmartAssistPanel";
import MobileToolDrawer from "./MobileToolDrawer";
import ToolSwitcher from "@/components/tools/ToolSwitcher";
import LucideIcon from "@/components/tools/LucideIcon";

const MAX_FREE_TABS = 3;

interface Tab {
  slug: string;
  tool: ToolItem;
}

interface WorkspaceShellProps {
  initialSlug?: string;
  workflowId?: string;
}

export default function WorkspaceShell({ initialSlug, workflowId }: WorkspaceShellProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTabSlug, setActiveTabSlug] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [assistOpen, setAssistOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [mobileAssistOpen, setMobileAssistOpen] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Initialize with default tool
  useEffect(() => {
    const workflow = workflowId ? getWorkflowById(workflowId) : undefined;
    if (workflow) {
      const workflowTabs = workflow.steps
        .map((step) => TOOLS_REGISTRY.find((t) => t.slug === step.slug))
        .filter(Boolean)
        .slice(0, MAX_FREE_TABS)
        .map((tool) => ({ slug: tool!.slug, tool: tool! }));

      if (workflowTabs.length > 0) {
        setTabs(workflowTabs);
        setActiveTabSlug(workflowTabs[0].slug);
        try {
          const recent = JSON.parse(localStorage.getItem("toolchi_recent") || "[]") as string[];
          const workflowSlugs = workflowTabs.map((tab) => tab.slug);
          const next = [...workflowSlugs, ...recent.filter((slug) => !workflowSlugs.includes(slug))].slice(0, 10);
          localStorage.setItem("toolchi_recent", JSON.stringify(next));
        } catch {
          // ignore
        }
        return;
      }
    }

    const defaultSlug = initialSlug || "json-formatter";
    const tool = TOOLS_REGISTRY.find((t) => t.slug === defaultSlug);
    if (tool) {
      setTabs([{ slug: tool.slug, tool }]);
      setActiveTabSlug(tool.slug);
    }

    // Load recent tools
    try {
      const recent = JSON.parse(localStorage.getItem("toolchi_recent") || "[]") as string[];
      if (defaultSlug && !recent.includes(defaultSlug)) {
        const next = [defaultSlug, ...recent].slice(0, 10);
        localStorage.setItem("toolchi_recent", JSON.stringify(next));
      }
    } catch {
      // ignore
    }
  }, [initialSlug, workflowId]);

  // Sync active tool to URL
  useEffect(() => {
    if (activeTabSlug && pathname === "/workspace") {
      router.replace(`/workspace?tool=${activeTabSlug}`, { scroll: false });
    }
  }, [activeTabSlug, pathname, router]);

  // Keyboard shortcuts: Ctrl+1/2/3, Ctrl+W, Ctrl+T
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      const isInput = ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
      if (isInput) return;

      // Ctrl+1, Ctrl+2, Ctrl+3 — switch tabs
      if (e.ctrlKey && ["1","2","3"].includes(e.key)) {
        e.preventDefault();
        const idx = parseInt(e.key) - 1;
        if (tabs[idx]) setActiveTabSlug(tabs[idx].slug);
      }
      // Ctrl+W — close active tab
      if (e.ctrlKey && e.key === "w") {
        e.preventDefault();
        if (activeTabSlug) {
          const newTabs = tabs.filter((t) => t.slug !== activeTabSlug);
          setTabs(newTabs);
          if (newTabs.length > 0) setActiveTabSlug(newTabs[newTabs.length - 1].slug);
          else setActiveTabSlug("");
        }
      }
      // Ctrl+T — open tool browser
      if (e.ctrlKey && e.key === "t") {
        e.preventDefault();
        setMobileDrawerOpen(true);
      }
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [tabs, activeTabSlug]);

  const openTool = useCallback((slug: string) => {
    const existing = tabs.find((t) => t.slug === slug);
    if (existing) {
      setActiveTabSlug(slug);
      setMobileDrawerOpen(false);
      return;
    }
    if (tabs.length >= MAX_FREE_TABS) {
      // Replace oldest (first) tab
      const tool = TOOLS_REGISTRY.find((t) => t.slug === slug);
      if (!tool) return;
      setTabs((prev) => [...prev.slice(1), { slug, tool }]);
      setActiveTabSlug(slug);
    } else {
      const tool = TOOLS_REGISTRY.find((t) => t.slug === slug);
      if (!tool) return;
      setTabs((prev) => [...prev, { slug, tool }]);
      setActiveTabSlug(slug);
    }

    // Track in recent
    try {
      const recent = JSON.parse(localStorage.getItem("toolchi_recent") || "[]") as string[];
      const next = [slug, ...recent.filter((s: string) => s !== slug)].slice(0, 10);
      localStorage.setItem("toolchi_recent", JSON.stringify(next));
    } catch {
      // ignore
    }

    setMobileSidebarOpen(false);
    setMobileDrawerOpen(false);
  }, [tabs]);

  const closeTab = useCallback((slug: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newTabs = tabs.filter((t) => t.slug !== slug);
    setTabs(newTabs);
    if (activeTabSlug === slug && newTabs.length > 0) {
      setActiveTabSlug(newTabs[newTabs.length - 1].slug);
    }
  }, [tabs, activeTabSlug]);

  const activeTool = tabs.find((t) => t.slug === activeTabSlug)?.tool || null;

  return (
    <div className="flex flex-col h-[calc(100vh-57px)] overflow-hidden bg-background">

      {/* Top Workspace Toolbar */}
      <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-card border-b border-border shrink-0 min-h-[44px]">
        {/* Mobile: open drawer button */}
        <button
          onClick={() => setMobileDrawerOpen(true)}
          className="lg:hidden p-1.5 rounded-lg hover:bg-background text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          title="Browse Tools"
        >
          <Menu className="h-4 w-4" />
        </button>

        {/* Desktop sidebar toggle */}
        <button
          onClick={() => setSidebarOpen((v) => !v)}
          className="hidden lg:flex p-1.5 rounded-lg hover:bg-background text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          title="Toggle Navigator"
        >
          {sidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <LayoutDashboard className="h-4 w-4" />}
        </button>

        {/* Tabs */}
        <div className="flex-1 flex items-center gap-1 overflow-x-auto scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab.slug}
              onClick={() => setActiveTabSlug(tab.slug)}
              className={`hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                tab.slug === activeTabSlug
                  ? "bg-primary/10 text-primary border border-primary/25"
                  : "text-muted-foreground hover:text-foreground hover:bg-background"
              }`}
            >
              <LucideIcon name={tab.tool.iconName} className="h-3.5 w-3.5 shrink-0" />
              <span className="max-w-[100px] truncate">{tab.tool.name}</span>
              <span
                onClick={(e) => closeTab(tab.slug, e)}
                className="ml-0.5 p-0.5 rounded hover:bg-primary/10 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <X className="h-3 w-3" />
              </span>
            </button>
          ))}

          {/* Add tab */}
          {tabs.length < MAX_FREE_TABS && (
            <button
              onClick={() => setMobileDrawerOpen(true)}
              className="hidden lg:flex items-center gap-1 px-2 py-1.5 text-muted-foreground hover:text-foreground text-xs rounded-xl hover:bg-background transition-colors cursor-pointer shrink-0"
              title="Add tool tab"
            >
              <Plus className="h-3.5 w-3.5" />
              <span className="hidden sm:inline text-xs">Add Tool</span>
            </button>
          )}
          {tabs.length >= MAX_FREE_TABS && (
            <Link
              href="/pricing"
              className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 text-primary bg-primary/5 border border-primary/20 text-[10px] font-bold rounded-xl hover:bg-primary/10 transition-colors cursor-pointer shrink-0"
            >
              <Sparkles className="h-3 w-3" />
              Pro: Unlimited Tabs
            </Link>
          )}
        </div>

        {/* Smart Assist toggle */}
        <button
          onClick={() => {
            setAssistOpen((v) => !v);
            setMobileAssistOpen((v) => !v);
          }}
          className="hidden lg:flex p-1.5 rounded-lg hover:bg-background text-muted-foreground hover:text-primary transition-colors cursor-pointer shrink-0"
          title="Toggle Smart Assist"
        >
          <Sparkles className="h-4 w-4" />
        </button>

        {/* Keyboard shortcuts hint */}
        <button
          onClick={() => {
            const e = new KeyboardEvent("keydown", { key: "?", bubbles: true });
            window.dispatchEvent(e);
          }}
          className="hidden lg:flex p-1.5 rounded-lg hover:bg-background text-muted-foreground hover:text-foreground transition-colors cursor-pointer shrink-0"
          title="Keyboard Shortcuts (?)"
        >
          <Keyboard className="h-4 w-4" />
        </button>
      </div>

      {/* Main 3-column layout */}
      <div className="flex flex-1 overflow-hidden relative">

        {/* Mobile sidebar overlay (old slide-in) */}
        {mobileSidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}

        {/* Left Sidebar — desktop only */}
        <div
          className={`
            hidden lg:block lg:relative lg:inset-auto
            transition-all duration-300
            ${sidebarOpen ? "lg:w-[240px]" : "lg:w-0 lg:overflow-hidden"}
            shrink-0
          `}
        >
          <ToolSidebar
            activeSlugs={tabs.map((t) => t.slug)}
            onOpenTool={openTool}
          />
        </div>

        {/* Center — Main Tool Area */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          {tabs.length === 0 ? (
            <EmptyWorkspace onOpenTool={openTool} onBrowseTools={() => setMobileDrawerOpen(true)} />
          ) : activeTabSlug ? (
            <div className="flex-1 overflow-y-auto overscroll-contain p-4 md:p-6 pb-20 lg:pb-6">
              <ToolSwitcher slug={activeTabSlug} />
            </div>
          ) : null}
        </div>

        {/* Right Smart Assist Panel */}
        <div
          className={`
            z-50 lg:z-auto
            ${mobileAssistOpen ? "fixed inset-y-0 right-0 w-[280px]" : "hidden"}
            lg:block lg:relative lg:inset-auto
            transition-all duration-300
            ${assistOpen ? "lg:w-[268px]" : "lg:w-0 lg:overflow-hidden"}
            shrink-0
          `}
        >
          <SmartAssistPanel activeTool={activeTool} />
        </div>

      </div>

      {/* Mobile assist overlay backdrop */}
      {mobileAssistOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={() => setMobileAssistOpen(false)}
        />
      )}

      {/* Mobile Bottom Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-card/95 backdrop-blur-md border-t border-border px-4 py-2 flex items-center gap-2">
        {/* Tab pills (scrollable) */}
        <div className="flex-1 flex items-center gap-1.5 overflow-x-auto scrollbar-none min-w-0">
          {tabs.length === 0 && (
            <span className="text-xs text-muted-foreground">No tools open</span>
          )}
          {tabs.map((tab) => (
            <button
              key={tab.slug}
              onClick={() => setActiveTabSlug(tab.slug)}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[10px] font-bold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                tab.slug === activeTabSlug
                  ? "bg-primary text-white"
                  : "bg-background dark:bg-[#1a1f2e] border border-border text-muted-foreground"
              }`}
            >
              <LucideIcon name={tab.tool.iconName} className="h-3 w-3" />
              <span className="max-w-[70px] truncate">{tab.tool.name}</span>
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Smart Assist toggle */}
          <button
            onClick={() => setMobileAssistOpen((v) => !v)}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${mobileAssistOpen ? "bg-primary/10 border-primary/30 text-primary" : "border-border text-muted-foreground hover:text-primary"}`}
            title="Smart Assist"
          >
            <Sparkles className="h-4 w-4" />
          </button>
          {/* Browse tools */}
          <button
            onClick={() => setMobileDrawerOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 bg-primary text-white rounded-xl text-[10px] font-extrabold cursor-pointer active:scale-95 transition-all"
          >
            <Grid2X2 className="h-3.5 w-3.5" />
            Tools
          </button>
        </div>
      </div>

      {/* Mobile Tool Drawer (Bottom Sheet) */}
      <MobileToolDrawer
        open={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        onSelectTool={openTool}
        activeSlugs={tabs.map((t) => t.slug)}
      />

    </div>
  );
}

// Empty state for workspace
function EmptyWorkspace({ onOpenTool, onBrowseTools }: { onOpenTool: (slug: string) => void; onBrowseTools: () => void }) {
  const popularTools = TOOLS_REGISTRY.filter((t) => t.popular).slice(0, 6);
  return (
    <div className="flex flex-1 items-center justify-center p-8 pb-24 lg:pb-8">
      <div className="flex flex-col items-center gap-6 text-center max-w-lg">
        <div className="h-16 w-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
          <LayoutDashboard className="h-8 w-8" />
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-foreground mb-2">Your Workspace is Ready</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Open a tool from the navigator, or pick one below to get started.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full">
          {popularTools.map((tool) => (
            <button
              key={tool.slug}
              onClick={() => onOpenTool(tool.slug)}
              className="flex flex-col items-center gap-2 p-4 bg-white dark:bg-card border border-border rounded-2xl hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                <LucideIcon name={tool.iconName} className="h-4 w-4" />
              </div>
              <span className="text-[11px] font-bold text-foreground text-center leading-tight">{tool.name}</span>
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={onBrowseTools}
          className="rounded-xl border border-border bg-white px-4 py-2 text-xs font-extrabold text-foreground transition hover:bg-neutral-50 dark:bg-card dark:hover:bg-neutral-900"
        >
          Browse all tools
        </button>
        <p className="text-[10px] text-muted-foreground">
          Press <kbd className="px-1.5 py-0.5 bg-border rounded text-[9px] font-mono">Ctrl+K</kbd> to search all tools
        </p>
      </div>
    </div>
  );
}
