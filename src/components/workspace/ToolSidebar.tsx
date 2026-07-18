"use client";

import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import {
  LayoutDashboard, Clock, Star, ChevronDown, ChevronRight, X, Search,
} from "lucide-react";
import { CATEGORIES, TOOLS_REGISTRY, ToolItem } from "@/lib/tools-registry";
import LucideIcon from "@/components/tools/LucideIcon";

// Category groupings for the workspace sidebar
const SIDEBAR_CATEGORIES = [
  { id: "ai", label: "AI Writing", color: "text-purple-500", bg: "bg-purple-500/10" },
  { id: "documents", label: "PDF & Docs", color: "text-teal-500", bg: "bg-teal-500/10" },
  { id: "optimize", label: "Image Tools", color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { id: "transform", label: "Transform", color: "text-blue-500", bg: "bg-blue-500/10" },
  { id: "gif-maker", label: "GIF & Animation", color: "text-pink-500", bg: "bg-pink-500/10" },
  { id: "video-tools", label: "Video", color: "text-red-500", bg: "bg-red-500/10" },
  { id: "developer", label: "Developer", color: "text-orange-500", bg: "bg-orange-500/10" },
  { id: "webmaster", label: "SEO & Webmaster", color: "text-amber-500", bg: "bg-amber-500/10" },
  { id: "operational", label: "Utilities", color: "text-indigo-500", bg: "bg-indigo-500/10" },
];

interface ToolSidebarProps {
  activeSlugs?: string[];
  onOpenTool?: (slug: string) => void;
}

export default function ToolSidebar({ activeSlugs = [], onOpenTool }: ToolSidebarProps) {
  const [expandedCats, setExpandedCats] = useState<string[]>(["ai", "documents"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [recentTools, setRecentTools] = useState<ToolItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load recent tools and favorites from localStorage
  useEffect(() => {
    const loadState = () => {
      try {
        const storedRecent = JSON.parse(localStorage.getItem("toolchi_recent") || "[]") as string[];
        const recentItems = storedRecent
          .map((slug: string) => TOOLS_REGISTRY.find((t) => t.slug === slug))
          .filter(Boolean) as ToolItem[];
        setRecentTools(recentItems.slice(0, 5));

        const storedFavs = JSON.parse(localStorage.getItem("toolchi_favorites") || "[]") as string[];
        setFavorites(storedFavs);
      } catch {
        // ignore
      }
    };

    loadState();
    window.addEventListener("toolchi_favorites_change", loadState);
    return () => window.removeEventListener("toolchi_favorites_change", loadState);
  }, []);


  const toggleCat = useCallback((id: string) => {
    setExpandedCats((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  }, []);

  const toggleFavorite = useCallback((slug: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setFavorites((prev) => {
      const next = prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug];
      localStorage.setItem("toolchi_favorites", JSON.stringify(next));
      return next;
    });
  }, []);

  // Filtered tools for search
  const filteredTools = searchQuery.trim()
    ? TOOLS_REGISTRY.filter(
        (t) =>
          t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.shortDesc.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 12)
    : null;

  const favoriteTools = TOOLS_REGISTRY.filter((t) => favorites.includes(t.slug));

  return (
    <aside className="flex flex-col h-full overflow-hidden bg-white dark:bg-card border-r border-border">
      {/* Sidebar Header */}
      <div className="px-4 py-4 border-b border-border shrink-0">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-7 w-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
            <LayoutDashboard className="h-4 w-4" />
          </div>
          <span className="text-xs font-extrabold text-foreground">Tool Navigator</span>
        </div>
        {/* Search within sidebar */}
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Filter tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-background dark:bg-[#1a1f2e] border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/10 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto overscroll-contain px-3 py-3 space-y-1">

        {/* Search Results */}
        {filteredTools && (
          <div className="pb-2">
            <p className="text-[9px] font-extrabold text-muted-foreground uppercase tracking-wider px-1 mb-2">
              Search Results
            </p>
            {filteredTools.length === 0 && (
              <p className="text-xs text-muted-foreground px-1 py-2">No tools found.</p>
            )}
            {filteredTools.map((tool) => (
              <SidebarToolItem
                key={tool.slug}
                tool={tool}
                isActive={activeSlugs.includes(tool.slug)}
                isFavorite={favorites.includes(tool.slug)}
                onOpen={onOpenTool}
                onToggleFav={toggleFavorite}
              />
            ))}
          </div>
        )}

        {!filteredTools && (
          <>
            {/* Recent Tools */}
            {recentTools.length > 0 && (
              <div className="pb-3">
                <div className="flex items-center gap-1.5 px-1 mb-2">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <p className="text-[9px] font-extrabold text-muted-foreground uppercase tracking-wider">
                    Recent
                  </p>
                </div>
                {recentTools.map((tool) => (
                  <SidebarToolItem
                    key={tool.slug}
                    tool={tool}
                    isActive={activeSlugs.includes(tool.slug)}
                    isFavorite={favorites.includes(tool.slug)}
                    onOpen={onOpenTool}
                    onToggleFav={toggleFavorite}
                  />
                ))}
              </div>
            )}

            {/* Favorites */}
            {favoriteTools.length > 0 && (
              <div className="pb-3">
                <div className="flex items-center gap-1.5 px-1 mb-2">
                  <Star className="h-3 w-3 text-muted-foreground" />
                  <p className="text-[9px] font-extrabold text-muted-foreground uppercase tracking-wider">
                    Favorites
                  </p>
                </div>
                {favoriteTools.map((tool) => (
                  <SidebarToolItem
                    key={tool.slug}
                    tool={tool}
                    isActive={activeSlugs.includes(tool.slug)}
                    isFavorite={true}
                    onOpen={onOpenTool}
                    onToggleFav={toggleFavorite}
                  />
                ))}
              </div>
            )}

            {/* Category Groups */}
            <div className="pt-1">
              <p className="text-[9px] font-extrabold text-muted-foreground uppercase tracking-wider px-1 mb-2">
                Browse by Category
              </p>
              {SIDEBAR_CATEGORIES.map((cat) => {
                const catTools = TOOLS_REGISTRY.filter((t) => t.category === cat.id).slice(0, 8);
                const isExpanded = expandedCats.includes(cat.id);
                if (catTools.length === 0) return null;
                return (
                  <div key={cat.id} className="mb-1">
                    <button
                      onClick={() => toggleCat(cat.id)}
                      className="w-full flex items-center justify-between px-2 py-1.5 rounded-xl hover:bg-background dark:hover:bg-[#1a1f2e] transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-2">
                        <div className={`h-5 w-5 rounded-lg ${cat.bg} ${cat.color} flex items-center justify-center`}>
                          <div className="h-1.5 w-1.5 rounded-full bg-current" />
                        </div>
                        <span className="text-xs font-bold text-foreground">{cat.label}</span>
                        <span className="text-[9px] text-muted-foreground">({catTools.length})</span>
                      </div>
                      {isExpanded
                        ? <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                        : <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                      }
                    </button>
                    {isExpanded && (
                      <div className="ml-2 mt-0.5 border-l border-border/50 pl-2">
                        {catTools.map((tool) => (
                          <SidebarToolItem
                            key={tool.slug}
                            tool={tool}
                            isActive={activeSlugs.includes(tool.slug)}
                            isFavorite={favorites.includes(tool.slug)}
                            onOpen={onOpenTool}
                            onToggleFav={toggleFavorite}
                          />
                        ))}
                        {TOOLS_REGISTRY.filter((t) => t.category === cat.id).length > 8 && (
                          <Link
                            href={`/tools?category=${cat.id}`}
                            className="block text-[10px] text-primary font-bold px-2 py-1 hover:underline"
                          >
                            View all →
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </aside>
  );
}

// Small inner component for individual tool rows
function SidebarToolItem({
  tool,
  isActive,
  isFavorite,
  onOpen,
  onToggleFav,
}: {
  tool: ToolItem;
  isActive: boolean;
  isFavorite: boolean;
  onOpen?: (slug: string) => void;
  onToggleFav: (slug: string, e: React.MouseEvent) => void;
}) {
  return (
    <div
      className={`group flex items-center justify-between gap-1 px-2 py-1.5 rounded-xl transition-all duration-150 cursor-pointer ${
        isActive
          ? "bg-primary/10 border border-primary/20"
          : "hover:bg-background dark:hover:bg-[#1a1f2e]"
      }`}
      onClick={() => onOpen?.(tool.slug)}
    >
      <div className="flex items-center gap-2 min-w-0">
        <div className="h-5 w-5 rounded-lg bg-primary/5 border border-border/60 text-primary flex items-center justify-center shrink-0">
          <LucideIcon name={tool.iconName} className="h-3 w-3" />
        </div>
        <div className="min-w-0">
          <p className={`text-[11px] font-semibold truncate leading-none ${isActive ? "text-primary" : "text-foreground"}`}>
            {tool.name}
          </p>
          {isActive && (
            <p className="text-[9px] text-primary/70 mt-0.5">Active</p>
          )}
        </div>
      </div>
      <button
        onClick={(e) => onToggleFav(tool.slug, e)}
        className={`shrink-0 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded ${
          isFavorite ? "!opacity-100 text-amber-400" : "text-muted-foreground hover:text-amber-400"
        }`}
        title={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Star className={`h-3 w-3 ${isFavorite ? "fill-current" : ""}`} />
      </button>
    </div>
  );
}
