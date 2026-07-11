"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck, Sparkles, Check, Info } from "lucide-react";
import { isProUser } from "@/lib/pro-features";
import ProGate from "./ProGate";

export interface BrandingConfig {
  enabled: boolean;
  text: string;
  placement: "bottom-right" | "bottom-left" | "bottom-center" | "top-right";
  opacity: number; // 0.1 to 1.0
}

export const DEFAULT_BRANDING: BrandingConfig = {
  enabled: true,
  text: "Powered by Toolchi",
  placement: "bottom-right",
  opacity: 0.35,
};

export function getBrandingConfig(): BrandingConfig {
  if (typeof window === "undefined") return DEFAULT_BRANDING;
  try {
    const saved = localStorage.getItem("toolchi_branding");
    const isPro = isProUser();
    if (saved) {
      const parsed = JSON.parse(saved) as BrandingConfig;
      // Free users can't disable branding
      if (!isPro) {
        return { ...parsed, enabled: true, text: "Powered by Toolchi" };
      }
      return parsed;
    }
  } catch { /* ignore */ }
  return DEFAULT_BRANDING;
}

export function saveBrandingConfig(config: BrandingConfig) {
  if (typeof window === "undefined") return;
  localStorage.setItem("toolchi_branding", JSON.stringify(config));
  window.dispatchEvent(new Event("toolchi_branding_change"));
}

export default function BrandingOptions() {
  const [config, setConfig] = useState<BrandingConfig>(DEFAULT_BRANDING);
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    setConfig(getBrandingConfig());
    setIsPro(isProUser());

    const handleProChange = () => {
      setIsPro(isProUser());
      setConfig(getBrandingConfig());
    };
    const handleBrandingChange = () => {
      setConfig(getBrandingConfig());
    };

    window.addEventListener("toolchi_pro_change", handleProChange);
    window.addEventListener("toolchi_branding_change", handleBrandingChange);
    return () => {
      window.removeEventListener("toolchi_pro_change", handleProChange);
      window.removeEventListener("toolchi_branding_change", handleBrandingChange);
    };
  }, []);

  const updateConfig = (updates: Partial<BrandingConfig>) => {
    const next = { ...config, ...updates };
    setConfig(next);
    saveBrandingConfig(next);
  };

  const placements = [
    { id: "bottom-right", label: "Bottom Right" },
    { id: "bottom-left", label: "Bottom Left" },
    { id: "bottom-center", label: "Bottom Center" },
    { id: "top-right", label: "Top Right" },
  ] as const;

  const opacities = [
    { value: 0.2, label: "20%" },
    { value: 0.35, label: "35%" },
    { value: 0.5, label: "50%" },
    { value: 0.8, label: "80%" },
  ];

  return (
    <div className="bg-white dark:bg-card border border-border rounded-3xl p-5 space-y-4">
      <div className="flex items-center gap-2">
        <div className="h-6 w-6 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
          <ShieldCheck className="h-4 w-4" />
        </div>
        <div>
          <h4 className="text-xs font-extrabold text-foreground">Output Branding Settings</h4>
          <p className="text-[9px] text-muted-foreground">Customize brand stamp on downloads</p>
        </div>
      </div>

      <div className="space-y-3.5">
        {/* Toggle Branding stamp */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-foreground">Add Branding Logo/Stamp</span>
          <ProGate feature="removeBranding" inline>
            <button
              onClick={() => updateConfig({ enabled: !config.enabled })}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                config.enabled ? "bg-primary" : "bg-neutral-200 dark:bg-neutral-800"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                  config.enabled ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </button>
          </ProGate>
        </div>

        {/* Custom Watermark Text */}
        <div className="space-y-1">
          <span className="text-[9px] font-extrabold text-muted-foreground uppercase tracking-wider block">Stamp Text</span>
          <ProGate feature="removeBranding">
            <input
              type="text"
              value={config.text}
              onChange={(e) => updateConfig({ text: e.target.value })}
              placeholder="e.g. Powered by Toolchi"
              disabled={!config.enabled}
              className="w-full px-3 py-1.5 text-xs bg-neutral-50 dark:bg-[#1a1f2e] border border-border rounded-xl text-foreground focus:outline-none focus:border-primary disabled:opacity-50"
            />
          </ProGate>
        </div>

        {/* Placement Select */}
        <div className="space-y-1">
          <span className="text-[9px] font-extrabold text-muted-foreground uppercase tracking-wider block">Placement</span>
          <div className="grid grid-cols-2 gap-2">
            {placements.map((p) => (
              <button
                key={p.id}
                disabled={!config.enabled}
                onClick={() => updateConfig({ placement: p.id })}
                className={`px-2.5 py-1.5 text-[10px] font-bold rounded-lg border transition-all text-center cursor-pointer disabled:opacity-50 ${
                  config.placement === p.id
                    ? "bg-primary/10 border-primary text-primary"
                    : "bg-neutral-50 dark:bg-[#1a1f2e] border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Opacity slider */}
        <div className="space-y-1">
          <span className="text-[9px] font-extrabold text-muted-foreground uppercase tracking-wider block">Stamp Opacity</span>
          <div className="grid grid-cols-4 gap-1.5">
            {opacities.map((o) => (
              <button
                key={o.value}
                disabled={!config.enabled}
                onClick={() => updateConfig({ opacity: o.value })}
                className={`py-1 text-[9px] font-bold rounded-md border transition-all text-center cursor-pointer disabled:opacity-50 ${
                  config.opacity === o.value
                    ? "bg-primary text-white border-primary"
                    : "bg-neutral-50 dark:bg-[#1a1f2e] border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>

        {/* Informative info banner for free users */}
        {!isPro && (
          <div className="flex items-start gap-2 p-2.5 bg-primary/5 border border-primary/20 rounded-xl text-[9px] text-muted-foreground">
            <Info className="h-3.5 w-3.5 text-primary shrink-0" />
            <p className="leading-snug">
              Free accounts include a subtle &ldquo;Powered by Toolchi&rdquo; stamp. Upgrade to Pro to disable or replace with your custom brand name.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
