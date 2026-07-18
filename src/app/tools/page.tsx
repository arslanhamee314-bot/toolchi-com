import React from "react";
import Link from "next/link";
import { Folder, ChevronRight, Home } from "lucide-react";
import DirectoryListWithSearch from "@/components/tools/DirectoryListWithSearch";

export const metadata = {
  title: "All Tools Directory - Complete Suite of Browser Utilities | Toolchi",
  description: "Browse the complete directory of over 90+ browser utilities. Text converters, local PDF editors, JSON formatters, color space converters, and calculators.",
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

        {/* Directory Categorized Index Map with Search & Filtering */}
        <DirectoryListWithSearch />

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
