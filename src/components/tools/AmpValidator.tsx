"use client";

import React, { useState } from "react";
import { CheckCircle, AlertTriangle, FileCode, Play } from "lucide-react";

export default function AmpValidator() {
  const [ampHtml, setAmpHtml] = useState(`<!doctype html>
<html amp lang="en">
  <head>
    <meta charset="utf-8">
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <title>Hello AMP World</title>
    <link rel="canonical" href="self.html">
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
  </head>
  <body>
    <h1>Welcome to the AMP mobile web!</h1>
  </body>
</html>`);

  const [report, setReport] = useState<any>(null);

  const handleValidate = () => {
    if (!ampHtml.trim()) return;

    const lower = ampHtml.toLowerCase();
    const checks: any[] = [];
    let errors = 0;

    // Check 1: Doctype check
    const hasDoctype = /<!doctype\s+html>/i.test(lower);
    checks.push({
      item: "Doctype declaration",
      status: hasDoctype,
      desc: hasDoctype ? "Contains correct <!doctype html> declaration." : "Missing <!doctype html> at the beginning."
    });
    if (!hasDoctype) errors++;

    // Check 2: HTML AMP tag check
    const hasAmpAttr = /<html\s+([^>]*\s+)?(amp|⚡)/i.test(lower);
    checks.push({
      item: "AMP attribute root tag",
      status: hasAmpAttr,
      desc: hasAmpAttr ? "Contains <html amp> or <html ⚡> tag." : "Missing amp/⚡ attribute in the root <html> tag."
    });
    if (!hasAmpAttr) errors++;

    // Check 3: Head and body tags check
    const hasHead = lower.includes("<head>") && lower.includes("</head>");
    const hasBody = lower.includes("<body>") && lower.includes("</body>");
    checks.push({
      item: "Head & Body structures",
      status: hasHead && hasBody,
      desc: hasHead && hasBody ? "Standard head and body tags are correctly placed." : "Missing <head> or <body> tags."
    });
    if (!hasHead || !hasBody) errors++;

    // Check 4: AMP script tag check
    const hasScript = lower.includes('async src="https://cdn.ampproject.org/v0.js"');
    checks.push({
      item: "AMP runtime JS script",
      status: hasScript,
      desc: hasScript ? "Contains required async v0.js script load." : "Missing required <script async src=\"https://cdn.ampproject.org/v0.js\"></script>."
    });
    if (!hasScript) errors++;

    // Check 5: Viewport meta tag check
    const hasViewport = lower.includes('name="viewport"') && lower.includes("initial-scale=1");
    checks.push({
      item: "Viewport responsive configuration",
      status: hasViewport,
      desc: hasViewport ? "Contains viewport config with initial-scale=1." : "Missing responsive viewport meta settings."
    });
    if (!hasViewport) errors++;

    setReport({
      isValid: errors === 0,
      checks,
      errorsCount: errors
    });
    import("canvas-confetti").then((m) => m.default({ particleCount: 30, spread: 50, origin: { y: 0.85 } }));
  };

  return (
    <div className="flex flex-col gap-6 text-foreground text-xs">
      
      <div className="flex flex-col gap-2">
        <label className="font-bold text-sm block">Paste AMP HTML Code</label>
        <p className="text-muted leading-relaxed text-3xs">Edit AMP code block details directly or click Validate to inspect mobile speed markers.</p>
      </div>

      <div className="flex flex-col gap-4">
        <textarea
          value={ampHtml}
          onChange={(e) => setAmpHtml(e.target.value)}
          className="h-44 w-full p-4 bg-white dark:bg-card border border-border rounded-xl outline-none focus:border-[#7d4dff] font-mono leading-relaxed"
        />
        <button
          onClick={handleValidate}
          className="px-6 py-3 font-bold bg-[#7d4dff] hover:bg-[#6530ef] text-white rounded-xl transition-colors cursor-pointer w-fit flex items-center gap-1.5"
        >
          <Play className="h-4 w-4" /> Validate AMP HTML
        </button>
      </div>

      {report && (
        <div className="border border-border rounded-2xl p-5 bg-white dark:bg-[#1c2230] flex flex-col gap-4 shadow-xs animate-in fade-in slide-in-from-top-2 duration-300">
          
          <div className="flex items-center gap-2 border-b border-border/40 pb-3">
            {report.isValid ? (
              <CheckCircle className="h-5 w-5 text-emerald-400" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-rose-500" />
            )}
            <h3 className="font-extrabold text-sm">
              {report.isValid ? "AMP Code is Valid!" : `AMP validation: ${report.errorsCount} errors found`}
            </h3>
          </div>

          <div className="flex flex-col gap-2">
            {report.checks.map((check: any, idx: number) => (
              <div key={idx} className="flex justify-between items-center p-3 rounded-xl border border-border bg-neutral-50 dark:bg-neutral-900/20">
                <div className="flex flex-col">
                  <span className="font-bold text-3xs">{check.item}</span>
                  <span className="text-[10px] text-muted mt-0.5">{check.desc}</span>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold shrink-0 ${
                  check.status ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                }`}>
                  {check.status ? "VALID" : "INVALID"}
                </span>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
}
