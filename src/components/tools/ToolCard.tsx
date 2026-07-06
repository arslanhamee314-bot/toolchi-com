"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ToolItem } from "@/lib/tools-registry";
import LucideIcon from "./LucideIcon";

interface ToolCardProps {
  tool: ToolItem;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  const handleCardClick = (e: React.MouseEvent) => {
    if (isHomepage) {
      e.preventDefault();
      window.dispatchEvent(
        new CustomEvent("select-tool", {
          detail: { slug: tool.slug, category: tool.category },
        })
      );
    }
  };

  return (
    <article
      onClick={handleCardClick}
      className={`bg-white dark:bg-card border border-border group-hover:border-[#7d4dff]/50 rounded-[18px] p-6 shadow-xs min-h-[260px] flex flex-col items-start hover:-translate-y-1 active:translate-y-0.5 transition-all duration-200 relative group ${
        isHomepage ? "cursor-pointer" : ""
      }`}
    >
      {/* Custom Card Stripe top border */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#7d4dff] to-[#7d4dff] rounded-t-[18px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Tool Icon Header row */}
      <div className="flex w-full items-center justify-between mb-4">
        <div className="h-14 w-14 rounded-[16px] bg-[#f3eeff] dark:bg-[#251e1c] text-[#7d4dff] flex items-center justify-center font-bold text-xl border border-[#e8ddff]/40">
          <LucideIcon name={tool.iconName} className="h-5.5 w-5.5" />
        </div>
        
        {/* Badges container */}
        <div className="flex items-center gap-1.5 shrink-0">
          {tool.isNew && (
            <span className="text-[8px] font-extrabold text-[#7d4dff] bg-[#7d4dff]/10 px-2 py-0.5 rounded border border-[#7d4dff]/20 select-none">
              New
            </span>
          )}
          {tool.popular && (
            <span className="text-[8px] font-extrabold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 select-none">
              Popular
            </span>
          )}
          <span className="text-[8px] font-extrabold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 select-none">
            Local
          </span>
        </div>
      </div>

      {/* Title & Desc */}
      <div className="flex-1 mb-5 w-full">
        <h3 className="font-extrabold text-sm text-foreground tracking-tight leading-snug mb-1.5 group-hover:text-[#7d4dff] transition-colors">
          {tool.name}
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
          {tool.shortDesc}
        </p>
      </div>

      {/* Call to Action Button */}
      {isHomepage ? (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleCardClick(e);
          }}
          className="w-full text-center py-2 px-4 bg-[#7d4dff] hover:bg-[#6530ef] text-white font-bold text-xs rounded-xl transition-colors mt-auto select-none shadow-sm shadow-[#7d4dff]/10 cursor-pointer"
        >
          {tool.ctaText || "Open Tool"}
        </button>
      ) : (
        <Link
          href={`/tools/${tool.slug}`}
          className="w-full text-center py-2 px-4 bg-[#7d4dff] hover:bg-[#6530ef] text-white font-bold text-xs rounded-xl transition-colors mt-auto select-none shadow-sm shadow-[#7d4dff]/10"
        >
          {tool.ctaText || "Open Tool"}
        </Link>
      )}
    </article>
  );
}
