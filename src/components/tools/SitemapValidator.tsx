"use client";

import React, { useState } from "react";
import { CheckCircle, AlertTriangle, FileSpreadsheet, Play } from "lucide-react";

export default function SitemapValidator() {
  const [xmlContent, setXmlContent] = useState(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://toolchi.online/</loc>
    <lastmod>2026-07-02</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://toolchi.online/tools</loc>
    <lastmod>2026-07-02</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`);

  const [report, setReport] = useState<any>(null);

  const handleValidate = () => {
    if (!xmlContent.trim()) return;

    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlContent, "text/xml");
      const parseError = xmlDoc.getElementsByTagName("parsererror");

      if (parseError.length > 0) {
        setReport({
          isValid: false,
          error: parseError[0].textContent || "XML Syntax Error detected.",
          urls: []
        });
        return;
      }

      const urlTags = xmlDoc.getElementsByTagName("url");
      const urls: any[] = [];
      let warnings = 0;

      for (let i = 0; i < urlTags.length; i++) {
        const urlNode = urlTags[i];
        const locNode = urlNode.getElementsByTagName("loc")[0];
        const lastmodNode = urlNode.getElementsByTagName("lastmod")[0];
        const priorityNode = urlNode.getElementsByTagName("priority")[0];

        const loc = locNode ? locNode.textContent : "";
        const lastmod = lastmodNode ? lastmodNode.textContent : "N/A";
        const priority = priorityNode ? priorityNode.textContent : "N/A";

        if (!loc) {
          warnings++;
        }

        urls.push({
          idx: i + 1,
          loc: loc || "[MISSING LOC TAG]",
          lastmod,
          priority
        });
      }

      setReport({
        isValid: true,
        totalUrls: urls.length,
        urls,
        warnings,
        schema: xmlDoc.documentElement.getAttribute("xmlns") || "Missing schema namespace"
      });
      import("canvas-confetti").then((m) => m.default({ particleCount: 30, spread: 50, origin: { y: 0.85 } }));
    } catch (err: any) {
      setReport({
        isValid: false,
        error: err.message || "Failed to parse XML.",
        urls: []
      });
    }
  };

  return (
    <div className="flex flex-col gap-6 text-foreground text-xs">
      
      <div className="flex flex-col gap-2">
        <label className="font-bold text-sm block">Paste XML Sitemap Code</label>
        <p className="text-muted leading-relaxed text-3xs">Edit the XML markup directly or click Validate to inspect schemas and count URLs.</p>
      </div>

      <div className="flex flex-col gap-4">
        <textarea
          value={xmlContent}
          onChange={(e) => setXmlContent(e.target.value)}
          className="h-44 w-full p-4 bg-white dark:bg-card border border-border rounded-xl outline-none focus:border-[#7d4dff] font-mono leading-relaxed"
        />
        <button
          onClick={handleValidate}
          className="px-6 py-3 font-bold bg-[#7d4dff] hover:bg-[#6530ef] text-white rounded-xl transition-colors cursor-pointer w-fit flex items-center gap-1.5"
        >
          <Play className="h-4 w-4" /> Validate Sitemap XML
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
              {report.isValid ? "Sitemap XML is Valid" : "XML Parsing Error"}
            </h3>
          </div>

          {!report.isValid ? (
            <div className="p-4 rounded-xl bg-rose-500/10 text-rose-500 border border-rose-500/25 font-mono text-3xs leading-relaxed">
              {report.error}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-3 bg-neutral-50 dark:bg-neutral-800/40 rounded-xl border border-border/40">
                  <span className="text-muted block text-3xs font-semibold uppercase">Total URLs</span>
                  <span className="font-extrabold text-base text-primary">{report.totalUrls}</span>
                </div>
                <div className="p-3 bg-neutral-50 dark:bg-neutral-800/40 rounded-xl border border-border/40">
                  <span className="text-muted block text-3xs font-semibold uppercase">Warnings</span>
                  <span className="font-extrabold text-base text-amber-500">{report.warnings}</span>
                </div>
              </div>

              <div>
                <span className="text-muted block text-3xs font-bold uppercase mb-2">XML Namespace Schema</span>
                <span className="font-mono text-3xs bg-neutral-100 dark:bg-neutral-900 px-3 py-1.5 rounded-lg border border-border/60 block select-all">{report.schema}</span>
              </div>

              <div className="flex flex-col gap-2 mt-2">
                <span className="font-bold">Indexed URL list:</span>
                <div className="flex flex-col gap-2 max-h-48 overflow-y-auto border border-border rounded-xl p-3 bg-neutral-50 dark:bg-neutral-900/20">
                  {report.urls.map((u: any) => (
                    <div key={u.idx} className="flex justify-between items-center text-[10px] py-1.5 border-b border-border/20 last:border-0 gap-4">
                      <span className="font-mono text-muted truncate select-all">{u.loc}</span>
                      <div className="flex gap-3 text-3xs font-bold shrink-0 text-muted">
                        <span>P: {u.priority}</span>
                        <span>D: {u.lastmod}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
