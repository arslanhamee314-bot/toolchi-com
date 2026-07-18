"use client";

import React from "react";
import { CATEGORIES } from "@/lib/tools-registry";
import LucideIcon from "./LucideIcon";

const categoryIconMap: Record<string, string> = {
  "gif-maker": "Image",
  "documents": "FileText",
  "video-tools": "Video",
  "audio": "Music",
  "transform": "Maximize2",
  "optimize": "Sparkles",
  "effects": "Sliders",
  "split": "Scissors",
  "add-text": "Type",
  "webp": "ArrowLeftRight",
  "apng": "Film",
  "avif": "FileImage",
  "jxl": "Grid",
  "svg": "Code",
  "webmaster": "Globe",
  "performance": "Zap",
  "operational": "Sliders",
  "developer": "Code",
  "ai": "Brain"
};

export default function CategoryFilters() {
  const handleCategoryClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    window.dispatchEvent(
      new CustomEvent("select-category", {
        detail: { id },
      })
    );
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {CATEGORIES.map((cat) => (
        <a
          key={cat.id}
          href={`#workspace`}
          onClick={(e) => handleCategoryClick(e, cat.id)}
          className="p-4 rounded-2xl border border-border/80 bg-white hover:border-[#7d4dff]/50 hover:shadow-lg hover:shadow-[#7d4dff]/5 dark:bg-[#171c26] dark:hover:bg-[#1c2230] text-center flex flex-col items-center justify-center gap-3 transition-all duration-300 active:scale-95 group shadow-2xs cursor-pointer hover:-translate-y-1"
        >
          {/* Visual Category badge */}
          <div className="h-11 w-11 rounded-full bg-[#f3eeff] dark:bg-[#1e1935] text-[#7d4dff] flex items-center justify-center font-bold text-base border border-[#e8ddff]/60 dark:border-[#7d4dff]/25 group-hover:scale-105 group-hover:bg-[#7d4dff] group-hover:text-white transition-all duration-300">
            <LucideIcon name={categoryIconMap[cat.id] || "HelpCircle"} className="h-5 w-5" />
          </div>
          <span className="text-[9px] font-extrabold text-foreground group-hover:text-[#7d4dff] transition-colors leading-tight uppercase tracking-wider">
            {cat.name.replace(" Tools", "").replace(" Utilities", "")}
          </span>
        </a>
      ))}
    </div>
  );
}
