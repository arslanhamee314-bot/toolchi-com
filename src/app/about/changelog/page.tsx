import React from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Gift, Wrench, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Changelog & Product Updates - Toolchi",
  description: "Check the release logs and version history of the Toolchi workspace platforms. Follow our technical enhancements and bug fixes.",
  alternates: {
    canonical: "/about/changelog",
  },
};

export default function ChangelogPage() {
  return (
    <div className="py-12 px-4 sm:px-6 max-w-4xl mx-auto w-full relative overflow-hidden">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="flex flex-col gap-8 z-10 relative">
        {/* Navigation header */}
        <div className="flex justify-between items-center border-b border-border/40 pb-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 rounded-xl flex items-center justify-center">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">Public Changelog</h1>
              <p className="text-xs text-muted-foreground mt-1">Platform updates, version history and bug fixes</p>
            </div>
          </div>
          <Link 
            href="/about"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors bg-card border border-border px-3 py-1.5 rounded-lg"
          >
            <ArrowLeft className="h-4.5 w-4.5" /> Back to About
          </Link>
        </div>

        {/* Versions Timeline */}
        <div className="space-y-8 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-border/60">
          
          {/* Version 2.0.0 */}
          <div className="relative pl-10 space-y-2">
            <div className="absolute left-1.5 top-1.5 h-4.5 w-4.5 rounded-full bg-primary border-4 border-background flex items-center justify-center" />
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-extrabold text-foreground bg-card border border-border px-2.5 py-0.5 rounded-lg">v2.0.0</span>
              <span className="text-3xs font-bold text-muted-foreground uppercase tracking-widest">July 2026</span>
              <span className="inline-flex items-center gap-1 text-[9px] font-extrabold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                <ShieldCheck className="h-3 w-3" /> Production Standard
              </span>
            </div>
            <h3 className="text-sm font-extrabold text-foreground tracking-tight">SEO Overhaul & E-E-A-T Architecture Integration</h3>
            <ul className="list-none space-y-1.5 text-xs text-muted-foreground">
              <li className="flex items-start gap-2">
                <Gift className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span><strong>Linguistic AI Overviews</strong>: Rendered structured definition frames on key pages to support semantic indexation audits.</span>
              </li>
              <li className="flex items-start gap-2">
                <Gift className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span><strong>Sitemap Index Partitioning</strong>: Split sitemap directories into segmented structures to handle scale.</span>
              </li>
              <li className="flex items-start gap-2">
                <Wrench className="h-4 w-4 text-teal-500 shrink-0 mt-0.5" />
                <span><strong>Duplicate Redirects</strong>: Implemented 301 redirects on trailing slash duplicates like `/home/`.</span>
              </li>
            </ul>
          </div>

          {/* Version 1.8.0 */}
          <div className="relative pl-10 space-y-2">
            <div className="absolute left-2.5 top-2.5 h-2.5 w-2.5 rounded-full bg-neutral-400 border border-background" />
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-extrabold text-foreground bg-card border border-border px-2.5 py-0.5 rounded-lg">v1.8.0</span>
              <span className="text-3xs font-bold text-muted-foreground uppercase tracking-widest">June 2026</span>
            </div>
            <h3 className="text-sm font-extrabold text-foreground tracking-tight">Workspace Sandbox Security & API Key Validation</h3>
            <ul className="list-none space-y-1.5 text-xs text-muted-foreground">
              <li className="flex items-start gap-2">
                <Gift className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span><strong>Authorization Scoping</strong>: Added bearer key verification checks to the diagnostic API routes.</span>
              </li>
              <li className="flex items-start gap-2">
                <Wrench className="h-4 w-4 text-teal-500 shrink-0 mt-0.5" />
                <span><strong>Rate Limiter</strong>: Integrated middleware throttling windows to restrict potential API resource abuse.</span>
              </li>
            </ul>
          </div>

          {/* Version 1.5.0 */}
          <div className="relative pl-10 space-y-2">
            <div className="absolute left-2.5 top-2.5 h-2.5 w-2.5 rounded-full bg-neutral-400 border border-background" />
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-extrabold text-foreground bg-card border border-border px-2.5 py-0.5 rounded-lg">v1.5.0</span>
              <span className="text-3xs font-bold text-muted-foreground uppercase tracking-widest">April 2026</span>
            </div>
            <h3 className="text-sm font-extrabold text-foreground tracking-tight">Vite-to-Next.js Platform Migration</h3>
            <ul className="list-none space-y-1.5 text-xs text-muted-foreground">
              <li className="flex items-start gap-2">
                <Gift className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span><strong>App Router Shells</strong>: Re-coded the core utility components into Next.js App Router folders.</span>
              </li>
              <li className="flex items-start gap-2">
                <Wrench className="h-4 w-4 text-teal-500 shrink-0 mt-0.5" />
                <span><strong>Multi-Tab Workspace</strong>: Built dynamic tabs allowing concurrent sandbox operations.</span>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
