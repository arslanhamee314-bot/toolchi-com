"use client";

import React from "react";
import { useInteraction } from "./InteractionProvider";

export default function CustomCursor() {
  const { cursorState, cursorLabel, mousePosition, isHovering, isDesktop } = useInteraction();

  if (!isDesktop || !isHovering) return null;

  // Compute ring style adjustments
  let ringClasses = "border border-primary bg-primary/5 w-7 h-7";
  let dotClasses = "bg-primary w-2 h-2";

  switch (cursorState) {
    case "hover":
    case "button":
      ringClasses = "border border-[#7d4dff] bg-[#7d4dff]/10 w-9 h-9 scale-110";
      dotClasses = "bg-[#7d4dff] w-1.5 h-1.5 opacity-80";
      break;
    case "link":
      ringClasses = "border-b border-l-0 border-r-0 border-t-0 border-[#7d4dff] w-6 h-4 rounded-none scale-y-50 mt-1";
      dotClasses = "bg-[#7d4dff] w-1 h-1 translate-x-2";
      break;
    case "card":
      ringClasses = "border border-[#7d4dff]/40 bg-[#7d4dff]/8 rounded-[8px] w-10 h-10";
      dotClasses = "bg-[#7d4dff] w-2 h-2";
      break;
    case "input":
      ringClasses = "border border-border/80 w-3 h-5 rounded-[2px]";
      dotClasses = "bg-foreground w-[1px] h-3 rounded-none";
      break;
    case "upload":
      ringClasses = "border-2 border-dashed border-teal-500 bg-teal-500/10 w-12 h-12";
      dotClasses = "bg-teal-500 w-2.5 h-2.5";
      break;
    case "loading":
      ringClasses = "border-2 border-t-transparent border-[#7d4dff] cursor-rotating-spinner w-8 h-8 rounded-full";
      dotClasses = "bg-[#7d4dff] w-2 h-2 animate-ping";
      break;
    case "success":
      ringClasses = "border-2 border-emerald-500 bg-emerald-500/15 cursor-pulse-green w-9 h-9";
      dotClasses = "bg-emerald-500 w-2.5 h-2.5";
      break;
    case "error":
      ringClasses = "border-2 border-red-500 bg-red-500/15 cursor-shake-red w-9 h-9";
      dotClasses = "bg-red-500 w-2.5 h-2.5";
      break;
    case "click":
      ringClasses = "border border-[#7d4dff] bg-[#7d4dff]/30 w-5 h-5 scale-90";
      dotClasses = "bg-[#7d4dff] w-3 h-3";
      break;
    default:
      break;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] print:hidden">
      {/* Outer tracking ring */}
      <div
        className={`toolchi-cursor-ring absolute rounded-full -translate-x-1/2 -translate-y-1/2 will-change-transform transition-all duration-200 cubic-bezier(0.1, 0.8, 0.2, 1) flex items-center justify-center ${ringClasses}`}
        style={{
          transform: `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0) ${
            cursorState === "hover" || cursorState === "button" ? "scale(1.15)" : ""
          }`,
        }}
      />

      {/* Inner dot */}
      <div
        className={`toolchi-cursor-dot absolute rounded-full -translate-x-1/2 -translate-y-1/2 will-change-transform transition-all duration-75 ease-out flex items-center justify-center ${dotClasses}`}
        style={{
          transform: `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0)`,
        }}
      />

      {/* Floating text label */}
      {cursorLabel && (
        <div
          className="absolute bg-neutral-900/90 text-white text-[9px] font-extrabold px-2 py-1 rounded-md shadow-md backdrop-blur-xs select-none pointer-events-none transition-opacity duration-200"
          style={{
            transform: `translate3d(${mousePosition.x + 16}px, ${mousePosition.y + 16}px, 0)`,
          }}
        >
          {cursorLabel}
        </div>
      )}
    </div>
  );
}
