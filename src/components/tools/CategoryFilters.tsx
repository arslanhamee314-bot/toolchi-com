"use client";

import React from "react";
import { CATEGORIES } from "@/lib/tools-registry";

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
          className="p-4 rounded-xl border border-border bg-neutral-50 dark:bg-[#1a1f2c] hover:border-[#7d4dff]/40 hover:bg-[#7d4dff]/5 dark:hover:bg-[#7d4dff]/10 text-center flex flex-col items-center justify-center gap-2.5 transition-all active:scale-95 group shadow-2xs"
        >
          {/* Visual Category badge */}
          <div className="h-10 w-10 rounded-full bg-[#f3eeff] dark:bg-[#251e1c] text-[#7d4dff] flex items-center justify-center font-bold text-base border border-[#e8ddff]/40 group-hover:scale-105 transition-transform">
            {cat.id === "gif-maker" && "🎞️"}
            {cat.id === "video-tools" && "🎬"}
            {cat.id === "audio" && "🔊"}
            {cat.id === "transform" && "📐"}
            {cat.id === "optimize" && "🧹"}
            {cat.id === "effects" && "🪄"}
            {cat.id === "split" && "🔀"}
            {cat.id === "add-text" && "📝"}
            {cat.id === "webp" && "🖼️"}
            {cat.id === "apng" && "🔴"}
            {cat.id === "avif" && "🟢"}
            {cat.id === "jxl" && "📊"}
            {cat.id === "svg" && "🎨"}
            {cat.id === "documents" && "📄"}
            {cat.id === "webmaster" && "🌐"}
            {cat.id === "performance" && "⚡"}
            {cat.id === "operational" && "⚙️"}
            {cat.id === "developer" && "💻"}
            {cat.id === "ai" && "🤖"}
          </div>
          <span className="text-[9px] font-extrabold text-foreground group-hover:text-[#7d4dff] transition-colors leading-tight uppercase tracking-wider">
            {cat.name.replace(" Tools", "").replace(" Utilities", "")}
          </span>
        </a>
      ))}
    </div>
  );
}
