"use client";

import React from "react";
import Link from "next/link";
import { Terminal, ArrowLeft, Key, Code, CheckCircle, Cpu, FileText } from "lucide-react";
import Header from "@/components/Header";

export default function PdfToolsApiDocs() {

  return (
    <div className="min-h-screen bg-white dark:bg-[#0b0f19] text-foreground transition-colors">
      <Header />

      <main className="max-w-4xl mx-auto px-6 py-12 flex flex-col gap-10">
        <Link href="/developers" className="flex items-center gap-2 text-xs font-bold text-[#7d4dff] hover:underline w-fit">
          <ArrowLeft className="h-4 w-4" /> Back to Developer Portal
        </Link>

        {/* Hero */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-primary/10 border border-primary/20 text-primary rounded-xl flex items-center justify-center">
              <FileText className="h-5 w-5" />
            </div>
            <h1 className="text-3xl font-black text-[#111827] dark:text-white">PDF Optimization & Watermark API</h1>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Programmatic execution of PDF merges, split-range extractions, size compressions, custom page number stamping, and copyright watermark injection.
          </p>
        </section>

        {/* Quick Endpoint Specs */}
        <section className="flex flex-col gap-6">
          <h2 className="text-lg font-black border-b border-border/40 pb-2">POST /api/v1/pdf/share-ready</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="space-y-4">
              <span className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-widest block">Query Parameters</span>
              
              <div className="space-y-3 font-semibold">
                <div className="p-3 bg-neutral-50 dark:bg-card/30 rounded-xl border border-border/40 flex justify-between items-start gap-4">
                  <div>
                    <span className="font-mono text-primary">pdf_urls</span>
                    <span className="text-[10px] text-rose-500 block mt-0.5">Required &bull; array</span>
                  </div>
                  <p className="text-muted-foreground text-right max-w-xs">List of fully qualified HTTP links of PDF files to merge.</p>
                </div>
                <div className="p-3 bg-neutral-50 dark:bg-card/30 rounded-xl border border-border/40 flex justify-between items-start gap-4">
                  <div>
                    <span className="font-mono text-primary">enable_watermark</span>
                    <span className="text-[10px] text-muted-foreground block mt-0.5">Optional &bull; boolean</span>
                  </div>
                  <p className="text-muted-foreground text-right max-w-xs">If true, overlays copyright stamp footer on each page.</p>
                </div>
                <div className="p-3 bg-neutral-50 dark:bg-card/30 rounded-xl border border-border/40 flex justify-between items-start gap-4">
                  <div>
                    <span className="font-mono text-primary">watermark_text</span>
                    <span className="text-[10px] text-muted-foreground block mt-0.5">Optional &bull; string</span>
                  </div>
                  <p className="text-muted-foreground text-right max-w-xs">Custom overlay watermark text stamp.</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <span className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-widest block">Example Response</span>
              <pre className="p-4 bg-neutral-950 text-emerald-400 font-mono text-[10px] rounded-2xl border border-border/80 overflow-x-auto leading-relaxed shadow-sm">
{`{
  "success": true,
  "job_id": "pdf_job_948f2a",
  "merged_pages": 14,
  "output_size_bytes": 1050000,
  "download_url": "https://toolchi.online/files/merged-document.pdf",
  "share_readiness_score": 100
}`}
              </pre>
            </div>
          </div>
        </section>

        {/* Integration snippet */}
        <section className="flex flex-col gap-4">
          <span className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-widest block">Integration Code Snippet</span>
          <div className="border border-border/80 rounded-2xl overflow-hidden bg-neutral-950 text-white font-mono text-[10px]">
            <div className="flex border-b border-border/40 bg-neutral-900 px-4 py-2 text-2xs font-semibold text-muted-foreground select-none">
              NodeJS / fetch request
            </div>
            <pre className="p-4 overflow-x-auto leading-relaxed text-indigo-200">
{`const response = await fetch("https://toolchi.online/api/v1/pdf/share-ready", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer tc_live_xxxxxxxx"
  },
  body: JSON.stringify({
    pdf_urls: [
      "https://yoursite.com/invoices/inv01.pdf",
      "https://yoursite.com/invoices/inv02.pdf"
    ],
    enable_watermark: true,
    watermark_text: "Confidential - Toolchi API"
  })
});
const data = await response.json();
console.log("Merged PDF ready:", data.download_url);`}
            </pre>
          </div>
        </section>

        {/* Call to Action */}
        <section className="p-6 bg-primary/5 rounded-3xl border border-primary/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <h4 className="font-extrabold text-sm text-[#111827] dark:text-white">Ready to automate PDF compiling workflows?</h4>
            <p className="text-3xs text-muted-foreground">Generate a sandbox API key and run queries directly in your terminal.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/dashboard" className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-3xs font-bold rounded-xl transition-all shadow-sm">
              Get API Keys
            </Link>
            <Link href="/docs/api" className="px-4 py-2 border border-border hover:bg-neutral-50 dark:hover:bg-neutral-900 text-foreground text-3xs font-bold rounded-xl transition-all">
              Try Sandbox Playground
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}


