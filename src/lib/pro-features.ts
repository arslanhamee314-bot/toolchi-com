"use client";

export const PRO_FEATURES = {
  removeBranding: {
    name: "Branding Removal",
    desc: "Remove 'Powered by Toolchi' watermark and inject your own custom logo/brand name."
  },
  batchProcessing: {
    name: "Batch File Processing",
    desc: "Process up to 20 files at once (compress images, merge PDF, bulk converters)."
  },
  unlimitedTabs: {
    name: "Unlimited Workspace Tabs",
    desc: "Open unlimited simultaneous tools in your multi-tool workspace (free limit: 3)."
  },
  advancedSmartAssist: {
    name: "Advanced Smart Assist",
    desc: "Get deep quality analysis, warnings, and contextual tool chain recommendations."
  },
  savedPresets: {
    name: "Saved Presets & History",
    desc: "Save custom configurations and export output templates easily."
  }
};

export function isProUser(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("toolchi_pro") === "true";
}

export function setProUser(val: boolean) {
  if (typeof window === "undefined") return;
  localStorage.setItem("toolchi_pro", val ? "true" : "false");
  // Dispatch custom event to notify all components of status change
  window.dispatchEvent(new Event("toolchi_pro_change"));
}
