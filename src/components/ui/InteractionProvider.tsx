"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";

export type CursorState =
  | "default"
  | "hover"
  | "link"
  | "button"
  | "card"
  | "input"
  | "upload"
  | "loading"
  | "success"
  | "error"
  | "click";

interface InteractionContextType {
  cursorState: CursorState;
  cursorLabel: string;
  mousePosition: { x: number; y: number };
  isHovering: boolean;
  isDesktop: boolean;
  setCursorState: (state: CursorState, label?: string) => void;
  triggerSuccess: (durationMs?: number) => void;
  triggerError: (durationMs?: number) => void;
  triggerLoading: (durationMs?: number) => void;
}

const InteractionContext = createContext<InteractionContextType | undefined>(undefined);

export function InteractionProvider({ children }: { children: React.ReactNode }) {
  const [cursorState, setCursorStateState] = useState<CursorState>("default");
  const [cursorLabel, setCursorLabel] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const stateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const setCursorState = (state: CursorState, label = "") => {
    // Clear any pending temporary overrides
    if (stateTimeoutRef.current) {
      clearTimeout(stateTimeoutRef.current);
      stateTimeoutRef.current = null;
    }
    setCursorStateState(state);
    setCursorLabel(label);
  };

  const triggerSuccess = (durationMs = 1200) => {
    setCursorState("success", "Success!");
    stateTimeoutRef.current = setTimeout(() => {
      setCursorStateState("default");
      setCursorLabel("");
    }, durationMs);
  };

  const triggerError = (durationMs = 1500) => {
    setCursorState("error", "Error!");
    stateTimeoutRef.current = setTimeout(() => {
      setCursorStateState("default");
      setCursorLabel("");
    }, durationMs);
  };

  const triggerLoading = (durationMs = 2000) => {
    setCursorState("loading", "Processing");
    stateTimeoutRef.current = setTimeout(() => {
      setCursorStateState("default");
      setCursorLabel("");
    }, durationMs);
  };

  useEffect(() => {
    // Check if device supports fine pointing device (desktop mouse)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setIsDesktop(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
    };
    mediaQuery.addEventListener("change", handleMediaChange);

    // If not desktop, fallback to mobile tap effects only
    if (!mediaQuery.matches) {
      // Setup touch ripples listener
      const handleTouchStart = (e: TouchEvent) => {
        const target = e.target as HTMLElement;
        if (!target) return;

        const interactiveEl = target.closest("a, button, [role='button'], [data-cursor]");
        if (!interactiveEl) return;

        // Create ripple element inside target bounding box
        const rect = interactiveEl.getBoundingClientRect();
        const touch = e.touches[0];
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;

        const ripple = document.createElement("span");
        ripple.className = "tap-ripple";
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.style.width = ripple.style.height = `${Math.max(rect.width, rect.height)}px`;

        // Make sure container is relatively positioned
        const originalPosition = window.getComputedStyle(interactiveEl).position;
        if (originalPosition === "static") {
          (interactiveEl as HTMLElement).style.position = "relative";
        }
        
        // Overflow hidden setup
        const originalOverflow = window.getComputedStyle(interactiveEl).overflow;
        if (originalOverflow !== "hidden") {
          (interactiveEl as HTMLElement).style.overflow = "hidden";
        }

        interactiveEl.appendChild(ripple);

        setTimeout(() => {
          ripple.remove();
        }, 600);
      };

      document.addEventListener("touchstart", handleTouchStart, { passive: true });
      return () => {
        mediaQuery.removeEventListener("change", handleMediaChange);
        document.removeEventListener("touchstart", handleTouchStart);
      };
    }

    // Add active cursor class to body
    document.body.classList.add("toolchi-cursor-active");

    // Mouse movement tracker
    let animationFrameId: number;
    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovering) setIsHovering(true);
      
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    // Mouse click event handlers (MouseDown / MouseUp)
    const handleMouseDown = () => {
      setCursorStateState("click");
    };

    const handleMouseUp = (e: MouseEvent) => {
      // Re-trigger hover checks after release
      const target = e.target as HTMLElement;
      if (target) {
        const interactiveEl = target.closest("[data-cursor], a, button, input, textarea, select, [role='button']");
        if (interactiveEl) {
          const customState = interactiveEl.getAttribute("data-cursor") as CursorState;
          setCursorStateState(customState || "hover");
        } else {
          setCursorStateState("default");
        }
      } else {
        setCursorStateState("default");
      }
    };

    // Global Hover Delegate listener
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const interactiveEl = target.closest("[data-cursor], a, button, input, textarea, select, [role='button']");
      if (!interactiveEl) {
        setCursorStateState("default");
        setCursorLabel("");
        return;
      }

      const customState = interactiveEl.getAttribute("data-cursor") as CursorState;
      const customLabel = interactiveEl.getAttribute("data-cursor-label") || "";

      if (customState) {
        setCursorStateState(customState);
        setCursorLabel(customLabel);
      } else {
        const tagName = interactiveEl.tagName.toLowerCase();
        if (tagName === "a") {
          setCursorStateState("link");
        } else if (tagName === "button" || interactiveEl.getAttribute("role") === "button") {
          setCursorStateState("button");
        } else if (tagName === "input" || tagName === "textarea") {
          setCursorStateState("input");
        } else {
          setCursorStateState("hover");
        }
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      cancelAnimationFrame(animationFrameId);
      mediaQuery.removeEventListener("change", handleMediaChange);
      document.body.classList.remove("toolchi-cursor-active");
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isHovering]);

  return (
    <InteractionContext.Provider
      value={{
        cursorState,
        cursorLabel,
        mousePosition,
        isHovering,
        isDesktop,
        setCursorState,
        triggerSuccess,
        triggerError,
        triggerLoading,
      }}
    >
      {children}
    </InteractionContext.Provider>
  );
}

export function useInteraction() {
  const context = useContext(InteractionContext);
  if (!context) {
    throw new Error("useInteraction must be used within an InteractionProvider");
  }
  return context;
}
