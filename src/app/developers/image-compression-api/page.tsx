"use client";

import React from "react";
import Link from "next/link";
import { Terminal, ArrowLeft, Key, Code, CheckCircle, Cpu, Image as ImageIcon } from "lucide-react";
import Header from "@/components/Header";

export default function ImageCompressionApiDocs() {

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
              <ImageIcon className="h-5 w-5" />
            </div>
            <h1 className="text-3xl font-black text-[#111827] dark:text-white">Image Optimization API</h1>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Fast, lossless server-side image compression, conversion, placeholder generation, and custom watermarking. Optimizes heavy JPG/PNG assets into next-gen formats (WebP, AVIF) programmatically.
          </p>
        </section>

        {/* Quick Endpoint Specs */}
        <section className="flex flex-col gap-6">
          <h2 className="text-lg font-black border-b border-border/40 pb-2">POST /api/v1/images/optimize-auto</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="space-y-4">
              <span className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-widest block">Query Parameters</span>
              
              <div className="space-y-3 font-semibold">
                <div className="p-3 bg-neutral-50 dark:bg-card/30 rounded-xl border border-border/40 flex justify-between items-start gap-4">
                  <div>
                    <span className="font-mono text-primary">image_url</span>
                    <span className="text-[10px] text-rose-500 block mt-0.5">Required &bull; string</span>
                  </div>
                  <p className="text-muted-foreground text-right max-w-xs">Fully qualified HTTP link of the target image asset.</p>
                </div>
                <div className="p-3 bg-neutral-50 dark:bg-card/30 rounded-xl border border-border/40 flex justify-between items-start gap-4">
                  <div>
                    <span className="font-mono text-primary">quality</span>
                    <span className="text-[10px] text-muted-foreground block mt-0.5">Optional &bull; float</span>
                  </div>
                  <p className="text-muted-foreground text-right max-w-xs">Compression factor from 0.1 to 1.0. Default is 0.75.</p>
                </div>
                <div className="p-3 bg-neutral-50 dark:bg-card/30 rounded-xl border border-border/40 flex justify-between items-start gap-4">
                  <div>
                    <span className="font-mono text-primary">target_format</span>
                    <span className="text-[10px] text-muted-foreground block mt-0.5">Optional &bull; string</span>
                  </div>
                  <p className="text-muted-foreground text-right max-w-xs">Target conversion format: webp (default), png, jpeg, or avif.</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <span className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-widest block">Example Response</span>
              <pre className="p-4 bg-neutral-950 text-emerald-400 font-mono text-[10px] rounded-2xl border border-border/80 overflow-x-auto leading-relaxed shadow-sm">
{`{
  "success": true,
  "original_size_bytes": 2450000,
  "compressed_size_bytes": 620000,
  "saved_percentage": "74%",
  "recommended_format": "webp",
  "download_url": "https://toolchi.online/files/res.webp",
  "web_readiness_score": 95
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
{`const response = await fetch("https://toolchi.online/api/v1/images/optimize-auto", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer tc_live_xxxxxxxx"
  },
  body: JSON.stringify({
    image_url: "https://yourdomain.com/assets/photo.png",
    target_format: "webp",
    quality: 0.8
  })
});
const data = await response.json();
console.log("Optimized image:", data.download_url);`}
            </pre>
          </div>
        </section>

        {/* Call to Action */}
        <section className="p-6 bg-primary/5 rounded-3xl border border-primary/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <h4 className="font-extrabold text-sm text-[#111827] dark:text-white">Ready to automate image optimization?</h4>
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


