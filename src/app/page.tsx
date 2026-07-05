import React, { Suspense } from "react";
import ToolsDirectory from "@/components/tools/ToolsDirectory";
import ToolsSlider from "@/components/tools/ToolsSlider";
import HeroSearch from "@/components/tools/HeroSearch";
import { ShieldCheck, Cpu, UserMinus, Gift } from "lucide-react";

// Page level SEO metadata (pre-rendered for Google)
export const metadata = {
  title: "Toolchi Web Tools Directory – Recreated Structure",
  description: "Effective (Free) Tools to Help You Manage and Improve Your Website. 100% client-side web master, performance, and operational tools.",
};

export default function HomePage() {
  return (
    <div className="flex-1 flex flex-col bg-[#f6f7fb] dark:bg-[#11141c]">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-24 border-b border-border bg-white dark:bg-card">
        {/* Background glow checks */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-6 w-full flex flex-col-reverse lg:flex-row items-center gap-12 z-10 relative">
          
          {/* Hero Copy (Left on desktop) */}
          <div className="flex-1 flex flex-col gap-4 text-center lg:text-left items-center lg:items-start">
            <p className="text-3xs font-extrabold text-[#6530ef] tracking-widest uppercase">
              Free website utilities
            </p>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-none">
              Web Tools Directory
            </h1>
            <p className="text-sm md:text-base text-muted max-w-lg leading-relaxed">
              Effective (Free) Tools to Help You Manage and Improve Your Website. Fast, private, and fully local.
            </p>

            {/* Trust Signals Badges */}
            <div className="flex flex-wrap gap-2 mt-2 select-none justify-center lg:justify-start">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-500/5 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
                <ShieldCheck className="h-3.5 w-3.5 shrink-0" /> No upload
              </span>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-500/5 border border-blue-500/20 px-2.5 py-1 rounded-lg">
                <Cpu className="h-3.5 w-3.5 shrink-0" /> Runs in browser
              </span>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 dark:bg-amber-500/5 border border-amber-500/20 px-2.5 py-1 rounded-lg">
                <UserMinus className="h-3.5 w-3.5 shrink-0" /> No signup
              </span>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 dark:bg-indigo-500/5 border border-indigo-500/20 px-2.5 py-1 rounded-lg">
                <Gift className="h-3.5 w-3.5 shrink-0" /> Free forever
              </span>
            </div>
            
            {/* Centered/Left aligned search bar with shortcuts */}
            <div className="w-full max-w-md mt-4">
              <Suspense fallback={<div className="h-10 bg-neutral-100 dark:bg-neutral-800 rounded-2xl animate-pulse" />}>
                <HeroSearch />
              </Suspense>
            </div>
          </div>

          {/* Hero Decorative Illustration (Right on desktop) */}
          <div className="flex-1 flex justify-center items-center relative w-full max-w-[420px] h-[240px] px-8">
            
            {/* Main Browser Canvas block */}
            <div className="w-full max-w-[340px] h-[190px] rounded-2xl bg-white dark:bg-[#171c26] border border-border/80 card-shadow relative flex flex-col overflow-hidden animate-in fade-in zoom-in duration-700">
              <div className="h-7 bg-[#f6f7fb] dark:bg-[#11141c] border-b border-border/80 flex items-center px-3.5 gap-1.5 shrink-0">
                <span className="h-2 w-2 rounded-full bg-red-400 shrink-0" />
                <span className="h-2 w-2 rounded-full bg-yellow-400 shrink-0" />
                <span className="h-2 w-2 rounded-full bg-green-400 shrink-0" />
              </div>
              <div className="flex-1 p-5 flex flex-col gap-3 justify-center">
                <div className="h-2 w-[78%] bg-neutral-100 dark:bg-neutral-800 rounded-md" />
                <div className="h-2 w-[60%] bg-neutral-100 dark:bg-neutral-800 rounded-md" />
                <div className="h-2 w-[86%] bg-neutral-100 dark:bg-neutral-800 rounded-md" />
                <div className="h-2 w-[48%] bg-neutral-100 dark:bg-neutral-800 rounded-md" />
              </div>
            </div>

            {/* Floating emoji badges */}
            <div className="absolute top-4 left-2 h-14 w-14 rounded-2xl bg-white dark:bg-[#1c2230] border border-[#e8ddff]/80 dark:border-border/60 card-shadow flex items-center justify-center text-2xl select-none animate-bounce duration-[3s]">
              ⚙
            </div>
            <div className="absolute top-8 right-2 h-14 w-14 rounded-2xl bg-white dark:bg-[#1c2230] border border-[#e8ddff]/80 dark:border-border/60 card-shadow flex items-center justify-center text-2xl select-none animate-bounce duration-[4s]">
              📈
            </div>
            <div className="absolute bottom-4 right-8 h-14 w-14 rounded-2xl bg-white dark:bg-[#1c2230] border border-[#e8ddff]/80 dark:border-border/60 card-shadow flex items-center justify-center text-2xl select-none animate-bounce duration-[3.5s]">
              🎨
            </div>
            <div className="absolute bottom-2 left-6 h-14 w-14 rounded-2xl bg-white dark:bg-[#1c2230] border border-[#e8ddff]/80 dark:border-border/60 card-shadow flex items-center justify-center text-2xl select-none animate-bounce duration-[4.5s]">
              ☑
            </div>
          </div>

        </div>
      </section>

      {/* 2. Interactive Tool Carousel Slider */}
      <section className="py-8 bg-neutral-100/30 dark:bg-neutral-900/5 border-b border-border/40 print:hidden">
        <div className="max-w-6xl mx-auto px-6 w-full">
          <ToolsSlider />
        </div>
      </section>

      {/* 3. Tools Grid Section */}
      <section className="py-12 md:py-16">
        <Suspense fallback={<div className="text-center py-10 text-muted-foreground text-xs">Loading tools directory...</div>}>
          <ToolsDirectory />
        </Suspense>
      </section>

      {/* 3. FAQ Section */}
      <section className="py-16 bg-[#f9fafc] dark:bg-[#151923] border-t border-border/80">
        <div className="max-w-3xl mx-auto px-6 flex flex-col gap-8">
          <div className="text-center flex flex-col gap-2">
            <h2 className="text-2xl font-extrabold text-foreground tracking-tight">
              Frequently Asked Questions
            </h2>
            <div className="h-1 w-12 bg-[#7d4dff] mx-auto rounded-full mt-1" />
          </div>

          <div className="flex flex-col gap-4">
            <article className="bg-white dark:bg-card border border-border p-6 rounded-2xl card-shadow flex flex-col gap-2">
              <h3 className="font-extrabold text-sm text-foreground tracking-tight">
                What are the most essential tools for web development?
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                Highlighted tools on the page include the PNG/JPG compressor, JS & CSS minifier, SSL checker, Responsive checker, Robots.txt checker, and Sitemap validator.
              </p>
            </article>

            <article className="bg-white dark:bg-card border border-border p-6 rounded-2xl card-shadow flex flex-col gap-2">
              <h3 className="font-extrabold text-sm text-foreground tracking-tight">
                What types of tools do you feature on your website?
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                The visible categories include webmaster tools, performance tools, operational tools, and design-related utilities.
              </p>
            </article>

            <article className="bg-white dark:bg-card border border-border p-6 rounded-2xl card-shadow flex flex-col gap-2">
              <h3 className="font-extrabold text-sm text-foreground tracking-tight">
                Will you be updating this page with more tools?
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                The page messaging indicates that more vetted free tools may be added over time.
              </p>
            </article>
          </div>
        </div>
      </section>

    </div>
  );
}
