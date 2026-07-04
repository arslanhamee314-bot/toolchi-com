import React from "react";
import Link from "next/link";
import { Folder, ChevronRight, Home } from "lucide-react";
import { CATEGORIES, getToolsByCategory } from "@/lib/tools-registry";
import LucideIcon from "@/components/tools/LucideIcon";

export const metadata = {
  title: "All Tools Directory - Complete Suite of Browser Utilities | Toolchi",
  description: "Browse the complete directory of over 25+ browser utilities. Text converters, local PDF editors, JSON formatters, color space converters, and calculators.",
  alternates: {
    canonical: "/tools",
  },
};

export default function ToolsDirectoryPage() {
  return (
    <div className="py-12 px-4 sm:px-6 max-w-5xl mx-auto w-full">
      <div className="flex flex-col gap-8">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-3xs font-semibold text-muted-foreground uppercase tracking-wider">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <span className="text-foreground">All Tools Directory</span>
        </nav>

        {/* Header Title */}
        <div className="border-b border-border/40 pb-6 flex items-center gap-3">
          <div className="h-10 w-10 bg-primary/10 text-primary border border-primary/20 rounded-xl flex items-center justify-center">
            <Folder className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">All Tools Directory</h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">Browse and access our complete suite of client-side web utilities.</p>
          </div>
        </div>

        {/* Directory Categorized Index Map */}
        <div className="flex flex-col gap-10">
          {CATEGORIES.map((category) => {
            const categoryTools = getToolsByCategory(category.id);
            if (categoryTools.length === 0) return null;

            return (
              <div key={category.id} className="flex flex-col gap-4">
                <div className="flex items-baseline gap-3 border-b border-border/20 pb-2">
                  <h2 className="text-base font-bold text-foreground tracking-tight">{category.name}</h2>
                  <span className="text-3xs text-muted-foreground font-semibold">{categoryTools.length} utilities</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {categoryTools.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={`/tools/${tool.slug}`}
                      className="p-4 rounded-xl border border-border/80 bg-card/10 hover:border-primary/40 hover:bg-card/25 transition-all flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="h-8 w-8 rounded-lg bg-[#f3eeff] dark:bg-[#251e1c] text-[#7d4dff] flex items-center justify-center border border-[#e8ddff]/80 dark:border-[#7d4dff]/20 shrink-0 text-xs shadow-xs group-hover:scale-105 group-hover:border-[#7d4dff]/40 transition-all">
                          {/\p{Extended_Pictographic}/u.test(tool.iconName) ? (
                            <span className="select-none">{tool.iconName}</span>
                          ) : (
                            <LucideIcon name={tool.iconName} className="h-4 w-4" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors block truncate">{tool.name}</span>
                          <span className="text-3xs text-muted-foreground block truncate">{tool.category}</span>
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

        {/* Return Button */}
        <div className="flex justify-center border-t border-border/40 pt-8 mt-4">
          <Link
            href="/"
            className="px-5 py-2.5 text-xs font-bold bg-neutral-900 border border-border hover:border-neutral-700 text-white rounded-xl transition-all active:scale-95 flex items-center gap-1.5"
          >
            <Home className="h-4 w-4" /> Back to Homepage
          </Link>
        </div>

      </div>
    </div>
  );
}
