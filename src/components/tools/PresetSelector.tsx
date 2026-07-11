"use client";

import React from "react";
import { Settings2 } from "lucide-react";

interface Preset {
  id: string;
  name: string;
  description?: string;
}

interface PresetSelectorProps {
  presets: Preset[];
  selectedPresetId: string;
  onSelect: (presetId: string) => void;
  title?: string;
  className?: string;
}

export default function PresetSelector({
  presets,
  selectedPresetId,
  onSelect,
  title = "Quick Configuration Presets",
  className = "",
}: PresetSelectorProps) {
  return (
    <div className={`space-y-2 text-left ${className}`}>
      {title && (
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
          <Settings2 className="h-3.5 w-3.5" />
          {title}
        </span>
      )}
      <div className="flex flex-wrap gap-2">
        {presets.map((preset) => {
          const isActive = preset.id === selectedPresetId;
          return (
            <button
              key={preset.id}
              onClick={() => onSelect(preset.id)}
              className={`px-3 py-1.5 rounded-xl text-[10px] font-extrabold transition-all duration-200 border cursor-pointer active:scale-95 flex flex-col text-left max-w-[160px] ${
                isActive
                  ? "bg-primary border-primary text-white shadow-sm shadow-primary/20"
                  : "bg-white dark:bg-card border-border/80 text-muted hover:border-neutral-500 hover:text-foreground"
              }`}
              title={preset.description}
            >
              <span>{preset.name}</span>
              {preset.description && (
                <span
                  className={`text-[8px] font-semibold mt-0.5 line-clamp-1 ${
                    isActive ? "text-white/80" : "text-muted-foreground/60"
                  }`}
                >
                  {preset.description}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
