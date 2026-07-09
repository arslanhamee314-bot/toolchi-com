"use client";

import React from "react";
import { useInteraction } from "./InteractionProvider";

export default function CustomCursor() {
  const { cursorState, cursorLabel, mousePosition, isHovering, isDesktop } = useInteraction();

  if (!isDesktop || !isHovering) return null;

  // 1. Establish default styles according to Toolchi Smart Glow Cursor Spec
  let ringStyle: React.CSSProperties = {
    width: "28px",
    height: "28px",
    borderColor: "rgba(125, 77, 255, 0.35)",
    backgroundColor: "rgba(125, 77, 255, 0.16)",
    borderRadius: "9999px"
  };

  let dotStyle: React.CSSProperties = {
    width: "6px",
    height: "6px",
    backgroundColor: "#7d4dff"
  };

  let ringClasses = "border flex items-center justify-center";
  let dotClasses = "flex items-center justify-center";
  let labelText = cursorLabel;

  // 2. Map states to specific visual parameters
  switch (cursorState) {
    case "hover":
    case "button":
      ringStyle = {
        width: "38px",
        height: "38px",
        borderColor: "rgba(125, 77, 255, 0.65)",
        backgroundColor: "rgba(125, 77, 255, 0.22)",
        borderRadius: "9999px",
        boxShadow: "0 0 12px rgba(125, 77, 255, 0.25)"
      };
      dotStyle = {
        width: "4px",
        height: "4px",
        backgroundColor: "#ffffff",
        boxShadow: "0 0 4px #ffffff"
      };
      if (!labelText) labelText = "Click";
      break;

    case "link":
      ringStyle = {
        width: "32px",
        height: "32px",
        borderColor: "rgba(91, 124, 255, 0.35)",
        backgroundColor: "rgba(91, 124, 255, 0.1)",
        borderRadius: "9999px"
      };
      dotStyle = {
        width: "6px",
        height: "6px",
        backgroundColor: "#5b7cff"
      };
      if (!labelText) labelText = "Open";
      break;

    case "card":
      ringStyle = {
        width: "42px",
        height: "42px",
        borderColor: "rgba(125, 77, 255, 0.4)",
        backgroundColor: "rgba(20, 184, 166, 0.12)",
        borderRadius: "12px", // rounded-square shape
        boxShadow: "0 0 10px rgba(125, 77, 255, 0.15)"
      };
      dotStyle = {
        width: "6px",
        height: "6px",
        backgroundColor: "#7d4dff"
      };
      if (!labelText) labelText = "Explore";
      break;

    case "input":
      ringStyle = {
        width: "6px",
        height: "22px",
        borderColor: "rgba(125, 77, 255, 0.4)",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: "2px"
      };
      dotStyle = {
        width: "1px",
        height: "14px",
        backgroundColor: "#7d4dff",
        borderRadius: "0px"
      };
      break;

    case "upload":
      ringStyle = {
        width: "44px",
        height: "44px",
        borderColor: "#14b8a6",
        borderStyle: "dashed",
        backgroundColor: "rgba(20, 184, 166, 0.15)",
        borderRadius: "9999px"
      };
      dotStyle = {
        width: "6px",
        height: "6px",
        backgroundColor: "#14b8a6"
      };
      if (!labelText) labelText = "Drop";
      break;

    case "loading":
      ringStyle = {
        width: "34px",
        height: "34px",
        borderColor: "#7d4dff",
        borderTopColor: "transparent",
        borderRightColor: "#14b8a6",
        borderRadius: "9999px"
      };
      dotStyle = {
        width: "6px",
        height: "6px",
        backgroundColor: "#7d4dff"
      };
      ringClasses += " cursor-rotating-spinner";
      dotClasses += " animate-ping";
      if (!labelText) labelText = "Processing";
      break;

    case "success":
      ringStyle = {
        width: "34px",
        height: "34px",
        borderColor: "#22c55e",
        backgroundColor: "rgba(34, 197, 94, 0.15)",
        borderRadius: "9999px"
      };
      dotStyle = {
        width: "6px",
        height: "6px",
        backgroundColor: "#22c55e"
      };
      ringClasses += " cursor-pulse-green";
      if (!labelText) labelText = "Success";
      break;

    case "error":
      ringStyle = {
        width: "34px",
        height: "34px",
        borderColor: "#ef4444",
        backgroundColor: "rgba(239, 68, 68, 0.15)",
        borderRadius: "9999px"
      };
      dotStyle = {
        width: "6px",
        height: "6px",
        backgroundColor: "#ef4444"
      };
      ringClasses += " cursor-shake-red";
      if (!labelText) labelText = "Error";
      break;

    case "click":
      ringStyle = {
        width: "20px",
        height: "20px",
        borderColor: "rgba(125, 77, 255, 0.7)",
        backgroundColor: "rgba(125, 77, 255, 0.4)",
        borderRadius: "9999px"
      };
      dotStyle = {
        width: "8px",
        height: "8px",
        backgroundColor: "#7d4dff"
      };
      break;

    default:
      break;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] print:hidden">
      {/* Outer tracking ring */}
      <div
        className={`toolchi-cursor-ring absolute -translate-x-1/2 -translate-y-1/2 will-change-transform transition-all duration-200 cubic-bezier(0.1, 0.8, 0.2, 1) ${ringClasses}`}
        style={{
          ...ringStyle,
          transform: `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0) ${
            cursorState === "hover" || cursorState === "button" ? "scale(1.15)" : ""
          }`,
        }}
      />

      {/* Inner dot */}
      <div
        className={`toolchi-cursor-dot absolute rounded-full -translate-x-1/2 -translate-y-1/2 will-change-transform transition-all duration-75 ease-out ${dotClasses}`}
        style={{
          ...dotStyle,
          transform: `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0)`,
        }}
      />

      {/* Floating text label */}
      {labelText && (
        <div
          className="absolute bg-neutral-900/90 text-white text-[9px] font-extrabold px-2 py-1 rounded-md shadow-md backdrop-blur-xs select-none pointer-events-none transition-opacity duration-200"
          style={{
            transform: `translate3d(${mousePosition.x + 16}px, ${mousePosition.y + 16}px, 0)`,
          }}
        >
          {labelText}
        </div>
      )}
    </div>
  );
}
