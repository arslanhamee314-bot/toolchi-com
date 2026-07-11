"use client";

import React, { useState, useEffect } from "react";
import { X, Keyboard, Command } from "lucide-react";

interface ShortcutRow {
  keys: string[];
  description: string;
}

const SHORTCUTS: { section: string; rows: ShortcutRow[] }[] = [
  {
    section: "Global",
    rows: [
      { keys: ["Ctrl", "K"], description: "Open Command Palette" },
      { keys: ["?"], description: "Show Keyboard Shortcuts" },
      { keys: ["Esc"], description: "Close modals / panels" },
    ],
  },
  {
    section: "Workspace",
    rows: [
      { keys: ["Ctrl", "1-3"], description: "Switch to tab 1, 2 or 3" },
      { keys: ["Ctrl", "W"], description: "Close active tab" },
      { keys: ["Ctrl", "T"], description: "Open tool browser" },
    ],
  },
  {
    section: "Tool Actions",
    rows: [
      { keys: ["Ctrl", "C"], description: "Copy output result" },
      { keys: ["Ctrl", "S"], description: "Download / save output" },
      { keys: ["Ctrl", "Z"], description: "Reset / clear input" },
    ],
  },
];

export default function KeyboardShortcutsModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      // '?' opens shortcuts (only when not typing in an input)
      const target = e.target as HTMLElement;
      const isInput = ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
      if (e.key === "?" && !isInput) {
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[201] w-full max-w-[480px] px-4">
        <div className="bg-white dark:bg-[#171c26] border border-border rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <Keyboard className="h-4 w-4" />
              </div>
              <p className="text-sm font-extrabold text-foreground">Keyboard Shortcuts</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer p-1"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Shortcuts list */}
          <div className="p-5 space-y-5 max-h-[60vh] overflow-y-auto">
            {SHORTCUTS.map((section) => (
              <div key={section.section}>
                <p className="text-[9px] font-extrabold text-muted-foreground uppercase tracking-wider mb-2">
                  {section.section}
                </p>
                <div className="space-y-2">
                  {section.rows.map((row, i) => (
                    <div key={i} className="flex items-center justify-between py-1.5 border-b border-border/30 last:border-0">
                      <span className="text-xs text-muted-foreground">{row.description}</span>
                      <div className="flex items-center gap-1">
                        {row.keys.map((key, ki) => (
                          <React.Fragment key={ki}>
                            {ki > 0 && <span className="text-[9px] text-muted-foreground">+</span>}
                            <kbd className="px-2 py-0.5 bg-background dark:bg-[#1a1f2e] border border-border rounded-lg text-[10px] font-mono font-bold text-foreground">
                              {key}
                            </kbd>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="px-5 py-3 border-t border-border bg-background/50 dark:bg-[#1a1f2e]/50 flex items-center justify-between">
            <span className="text-[9px] text-muted-foreground flex items-center gap-1">
              <Command className="h-3 w-3" /> Press <kbd className="px-1 py-0.5 bg-border/60 rounded text-[8px] font-mono mx-1">?</kbd> anytime to toggle
            </span>
            <button
              onClick={() => setOpen(false)}
              className="text-[10px] font-bold text-primary hover:underline cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
