"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Terminal, Code, Cpu, Database, Image as ImageIcon, FileText, Globe, Key, CheckCircle, ArrowRight } from "lucide-react";
import Header from "@/components/Header";

export default function DevelopersLanding() {

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    import("canvas-confetti").then((m) => m.default({ particleCount: 60, spread: 80, origin: { y: 0.75 } }));
  };

  const categories = [
    {
      id: "image",
      title: "Image Processing API",
      icon: ImageIcon,
      desc: "Fast, lossless local & server-side image compression, conversion (WebP, AVIF), placeholder generation, and custom watermarking.",
      link: "/developers/image-compression-api",
      endpoints: ["POST /v1/images/compress", "POST /v1/images/watermark", "POST /v1/images/optimize-auto"]
    },
    {
      id: "pdf",
      title: "PDF Toolset API",
      icon: FileText,
      desc: "Programmatic PDF merging, range splitting, compression levels, page numbering, and background branding watermarks.",
      link: "/developers/pdf-tools-api",
      endpoints: ["POST /v1/pdf/merge", "POST /v1/pdf/split", "POST /v1/pdf/share-ready"]
    },
    {
      id: "seo",
      title: "SEO Audit API",
      icon: Globe,
      desc: "Retrieve robots.txt configuration, validate sitemaps, audit ssl certificates, track redirect chains, and check server status.",
      link: "/developers/seo-audit-api",
      endpoints: ["POST /v1/seo/robots-check", "POST /v1/seo/sitemap-validate", "POST /v1/seo/quick-audit"]
    },
    {
      id: "ai",
      title: "AI Writing & Blogging API",
      icon: Cpu,
      desc: "Instant article outline structure, blog title generation, readability insights, content summarizers, and paragraph rewriters.",
      link: "/developers/ai-blogging-api",
      endpoints: ["POST /v1/ai/title-generator", "POST /v1/ai/outline-generator", "POST /v1/ai/blog-pack"]
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0b0f19] text-foreground transition-colors selection:bg-primary/20">
      <Header />

      <main className="max-w-6xl mx-auto px-6 py-16 flex flex-col gap-16">
        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto flex flex-col gap-6 mt-6">
          <div className="mx-auto px-3.5 py-1 bg-primary/10 border border-primary/20 text-primary text-[10px] font-extrabold tracking-wider uppercase rounded-full w-fit">
            Toolchi Developer Platform
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-[#111827] dark:text-white">
            Programmatic APIs for <span className="bg-gradient-to-r from-violet-500 via-primary to-indigo-500 bg-clip-text text-transparent">File, SEO, & Content</span> Workflows
          </h1>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Integrate our smart browser-based utility pipelines or query our high-performance server-side APIs to automate heavy background tasks with zero server storage logs.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2">
            <Link
              href="/docs/api"
              className="px-6 py-3 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-md shadow-primary/10 hover:shadow-primary/20 transition-all flex items-center gap-2"
            >
              <Terminal className="h-4 w-4" /> Explore API Docs
            </Link>
            <Link
              href="/dashboard"
              className="px-6 py-3 border border-border hover:bg-neutral-50 dark:hover:bg-neutral-900 text-foreground text-xs font-bold rounded-xl transition-all flex items-center gap-2"
            >
              <Key className="h-4 w-4 text-muted-foreground" /> Get API Keys
            </Link>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-1.5 text-center sm:text-left">
            <h2 className="text-2xl font-black text-[#111827] dark:text-white">API Product Catalog</h2>
            <p className="text-xs text-muted-foreground">Select a category to view detailed documentation and parameters.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.id}
                  className="group relative border border-border/80 bg-neutral-50/30 dark:bg-card/20 rounded-3xl p-6 flex flex-col justify-between gap-6 hover:border-primary/40 hover:bg-white dark:hover:bg-card/40 transition-all duration-300 shadow-xs hover:shadow-md"
                >
                  <div className="flex flex-col gap-4">
                    <div className="h-10 w-10 bg-primary/10 border border-primary/20 text-primary rounded-2xl flex items-center justify-center">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base text-[#111827] dark:text-white flex items-center gap-2 group-hover:text-primary transition-colors">
                        {cat.title}
                        <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed mt-2">{cat.desc}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 pt-4 border-t border-border/40">
                    <span className="text-[9px] font-extrabold text-muted-foreground uppercase tracking-wider block">Key Endpoints</span>
                    <div className="flex flex-wrap gap-1.5 mt-1 font-mono text-[9px] font-semibold">
                      {cat.endpoints.map((ep, i) => (
                        <span key={i} className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 text-muted-foreground rounded-lg border border-border/40">
                          {ep}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={cat.link}
                      className="text-primary text-[10px] font-extrabold hover:underline mt-3 flex items-center gap-1 w-fit"
                    >
                      View product landing details &rarr;
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Live Waitlist Section */}
        <section className="border border-border/80 bg-neutral-50/40 dark:bg-card/10 rounded-3xl p-8 max-w-4xl mx-auto w-full relative overflow-hidden flex flex-col md:flex-row items-center gap-8 shadow-xs">
          <div className="absolute inset-0 bg-radial-gradient from-primary/5 to-transparent pointer-events-none" />

          <div className="flex-1 flex flex-col gap-3">
            <span className="text-2xs font-extrabold text-primary uppercase tracking-widest">Early Developer Access</span>
            <h3 className="text-2xl font-black text-[#111827] dark:text-white leading-tight">Secure Unlimited Automation</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We are rolling out production rate limits soon. Join our developer waitlist today to receive 5,000 free monthly requests, dedicated webhooks, and private SLA support code snippets.
            </p>
          </div>

          <div className="w-full md:w-fit shrink-0">
            {submitted ? (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-2xl flex items-center gap-3 animate-in zoom-in duration-200">
                <CheckCircle className="h-5 w-5 shrink-0" />
                <div className="text-left">
                  <span className="font-extrabold text-xs block">You are on the list!</span>
                  <span className="text-[10px] text-muted-foreground block mt-0.5">Check your inbox for key access invites soon.</span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleWaitlistSubmit} className="flex gap-2 w-full sm:w-[360px]">
                <input
                  type="email"
                  required
                  placeholder="Enter developer email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-white dark:bg-[#151923] border border-border text-xs rounded-xl outline-none focus:border-primary text-foreground font-semibold placeholder:text-muted-foreground/60 shadow-xs"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-sm active:scale-95 whitespace-nowrap"
                >
                  Join Waitlist
                </button>
              </form>
            )}
          </div>
        </section>

        {/* Rate Limits & Pricing Structure */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-border/80 rounded-3xl p-6 bg-white dark:bg-card/10 flex flex-col justify-between gap-6">
            <div className="space-y-3">
              <span className="text-2xs font-extrabold text-muted-foreground uppercase tracking-widest block">Free Tier</span>
              <h4 className="text-xl font-black text-[#111827] dark:text-white">$0 <span className="text-xs text-muted-foreground font-normal">/ month</span></h4>
              <p className="text-xs text-muted-foreground leading-normal">Perfect for local scripts and rapid web prototyping.</p>
              <ul className="space-y-2.5 pt-4 text-3xs font-semibold text-muted-foreground border-t border-border/40">
                <li className="flex items-center gap-2">🟢 <span className="text-foreground">100 requests / mo limit</span></li>
                <li className="flex items-center gap-2">🟢 <span className="text-foreground">Supports SEO & AI APIs</span></li>
                <li className="flex items-center gap-2">🟡 <span>Max image size: 2MB</span></li>
                <li className="flex items-center gap-2">🔴 <span>Includes watermark footer</span></li>
              </ul>
            </div>
            <Link
              href="/dashboard"
              className="w-full text-center py-2.5 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-foreground text-xs font-extrabold rounded-xl transition-colors cursor-pointer"
            >
              Get Free Key
            </Link>
          </div>

          <div className="border-2 border-primary rounded-3xl p-6 bg-primary/5 flex flex-col justify-between gap-6 relative">
            <div className="absolute top-3.5 right-3.5 px-2.5 py-0.5 bg-primary text-white text-[8px] font-extrabold rounded-full tracking-wider uppercase">
              Popular
            </div>
            <div className="space-y-3">
              <span className="text-2xs font-extrabold text-primary uppercase tracking-widest block">Developer Pro</span>
              <h4 className="text-xl font-black text-[#111827] dark:text-white">$19 <span className="text-xs text-muted-foreground font-normal">/ month</span></h4>
              <p className="text-xs text-muted-foreground leading-normal">Designed for SaaS apps, blogging, and image optimization pipelines.</p>
              <ul className="space-y-2.5 pt-4 text-3xs font-semibold text-muted-foreground border-t border-primary/20">
                <li className="flex items-center gap-2">🟢 <span className="text-foreground">10,000 requests / mo limit</span></li>
                <li className="flex items-center gap-2">🟢 <span className="text-foreground">No Toolchi Branding / Logo</span></li>
                <li className="flex items-center gap-2">🟢 <span className="text-foreground">Image size: Up to 50MB</span></li>
                <li className="flex items-center gap-2">🟢 <span className="text-foreground">Batch operation processing</span></li>
              </ul>
            </div>
            <Link
              href="/pricing"
              className="w-full text-center py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-extrabold rounded-xl transition-all cursor-pointer shadow-sm active:scale-95"
            >
              Upgrade to Pro
            </Link>
          </div>

          <div className="border border-border/80 rounded-3xl p-6 bg-white dark:bg-card/10 flex flex-col justify-between gap-6">
            <div className="space-y-3">
              <span className="text-2xs font-extrabold text-muted-foreground uppercase tracking-widest block">Growth Agency</span>
              <h4 className="text-xl font-black text-[#111827] dark:text-white">$49 <span className="text-xs text-muted-foreground font-normal">/ month</span></h4>
              <p className="text-xs text-muted-foreground leading-normal">For agencies and high volume workflow platforms.</p>
              <ul className="space-y-2.5 pt-4 text-3xs font-semibold text-muted-foreground border-t border-border/40">
                <li className="flex items-center gap-2">🟢 <span className="text-foreground">100,000 requests / mo limit</span></li>
                <li className="flex items-center gap-2">🟢 <span className="text-foreground">Custom Webhook callbacks</span></li>
                <li className="flex items-center gap-2">🟢 <span className="text-foreground">Dedicated execution limits</span></li>
                <li className="flex items-center gap-2">🟢 <span className="text-foreground">White-label outputs</span></li>
              </ul>
            </div>
            <Link
              href="/pricing"
              className="w-full text-center py-2.5 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-foreground text-xs font-extrabold rounded-xl transition-colors cursor-pointer"
            >
              Select Growth
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

