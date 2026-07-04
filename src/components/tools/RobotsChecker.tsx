"use client";

import React, { useState } from "react";
import { CheckCircle, AlertCircle, FileText, Play } from "lucide-react";

export default function RobotsChecker() {
  const [robotsText, setRobotsText] = useState(
    "User-agent: *\nDisallow: /admin/\nDisallow: /api/\nAllow: /admin/login\n\nSitemap: https://toolchi.online/sitemap.xml"
  );
  const [report, setReport] = useState<any>(null);

  const handleValidate = () => {
    if (!robotsText.trim()) return;

    const lines = robotsText.split("\n");
    const rules: any[] = [];
    const sitemaps: string[] = [];
    let currentAgent = "";
    let warnings = 0;
    let errors = 0;

    lines.forEach((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) return; // skip empty and comment

      const parts = trimmed.split(":");
      if (parts.length < 2) {
        warnings++;
        rules.push({
          line: idx + 1,
          type: "warning",
          message: `Line ${idx + 1}: Ignored because of missing delimiter. Expected 'Key: Value'.`
        });
        return;
      }

      const key = parts[0].trim().toLowerCase();
      const value = parts.slice(1).join(":").trim();

      if (key === "user-agent") {
        currentAgent = value;
      } else if (key === "disallow" || key === "allow") {
        if (!currentAgent) {
          warnings++;
          rules.push({
            line: idx + 1,
            type: "warning",
            message: `Line ${idx + 1}: Directive '${key}' declared before any 'User-agent'.`
          });
        }
      } else if (key === "sitemap") {
        sitemaps.push(value);
      } else {
        warnings++;
        rules.push({
          line: idx + 1,
          type: "warning",
          message: `Line ${idx + 1}: Unrecognized directive '${key}'.`
        });
      }
    });

    setReport({
      isValid: errors === 0,
      totalLines: lines.length,
      rules,
      sitemaps,
      warnings,
      errors
    });
    import("canvas-confetti").then((m) => m.default({ particleCount: 30, spread: 50, origin: { y: 0.85 } }));
  };

  return (
    <div className="flex flex-col gap-6 text-foreground text-xs">
      
      <div className="flex flex-col gap-2">
        <label className="font-bold text-sm block">Paste Robots.txt File Content</label>
        <p className="text-muted leading-relaxed text-3xs">Edit the directive lines below or click Validate to inspect rules compliance.</p>
      </div>

      <div className="flex flex-col gap-4">
        <textarea
          value={robotsText}
          onChange={(e) => setRobotsText(e.target.value)}
          className="h-44 w-full p-4 bg-white dark:bg-card border border-border rounded-xl outline-none focus:border-[#7d4dff] font-mono leading-relaxed"
        />
        <button
          onClick={handleValidate}
          className="px-6 py-3 font-bold bg-[#7d4dff] hover:bg-[#6530ef] text-white rounded-xl transition-colors cursor-pointer w-fit flex items-center gap-1.5"
        >
          <Play className="h-4 w-4" /> Validate Directives
        </button>
      </div>

      {report && (
        <div className="border border-border rounded-2xl p-5 bg-white dark:bg-[#1c2230] flex flex-col gap-4 shadow-xs animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-2 border-b border-border/40 pb-3">
            <CheckCircle className="h-5 w-5 text-emerald-400" />
            <h3 className="font-extrabold text-sm">Validation Summary</h3>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-neutral-50 dark:bg-neutral-800/40 rounded-xl border border-border/40">
              <span className="text-muted block text-3xs font-semibold uppercase">Total Warnings</span>
              <span className="font-extrabold text-base text-amber-500">{report.warnings}</span>
            </div>
            <div className="p-3 bg-neutral-50 dark:bg-neutral-800/40 rounded-xl border border-border/40">
              <span className="text-muted block text-3xs font-semibold uppercase">Sitemaps Found</span>
              <span className="font-extrabold text-base text-primary">{report.sitemaps.length}</span>
            </div>
            <div className="p-3 bg-neutral-50 dark:bg-neutral-800/40 rounded-xl border border-border/40">
              <span className="text-muted block text-3xs font-semibold uppercase">Status</span>
              <span className="font-extrabold text-base text-emerald-400">PASSED</span>
            </div>
          </div>

          {report.sitemaps.length > 0 && (
            <div className="flex flex-col gap-1.5 mt-2">
              <span className="font-bold">Detected Sitemaps:</span>
              <ul className="list-disc pl-5 text-muted space-y-1">
                {report.sitemaps.map((s: string, idx: number) => (
                  <li key={idx} className="font-mono text-3xs truncate select-all">{s}</li>
                ))}
              </ul>
            </div>
          )}

          {report.rules.length > 0 && (
            <div className="flex flex-col gap-2 mt-2">
              <span className="font-bold">Directive Warnings log:</span>
              <div className="flex flex-col gap-2 max-h-40 overflow-y-auto">
                {report.rules.map((rule: any, idx: number) => (
                  <div key={idx} className="flex gap-2 items-start p-2 rounded bg-amber-500/5 text-amber-500 text-3xs border border-amber-500/10">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>{rule.message}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {report.rules.length === 0 && report.warnings === 0 && (
            <div className="text-emerald-400 font-semibold p-3.5 bg-emerald-500/10 rounded-xl border border-emerald-500/15 text-center mt-2">
              🎉 Excellent structure! No warnings or syntactic anomalies found.
            </div>
          )}

        </div>
      )}

    </div>
  );
}
