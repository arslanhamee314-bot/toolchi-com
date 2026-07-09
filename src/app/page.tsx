import React, { Suspense } from "react";
import Link from "next/link";
import ToolsDirectory from "@/components/tools/ToolsDirectory";
import ToolsSlider from "@/components/tools/ToolsSlider";
import HeroSearch from "@/components/tools/HeroSearch";
import ToolCard from "@/components/tools/ToolCard";
import InteractiveWorkspace from "@/components/tools/InteractiveWorkspace";
import CategoryFilters from "@/components/tools/CategoryFilters";
import { CATEGORIES, TOOLS_REGISTRY } from "@/lib/tools-registry";
import { ShieldCheck, Cpu, UserMinus, Gift, Video, Layers, Image as ImageIcon, FileJson, Sparkles } from "lucide-react";
import AdUnit from "@/components/AdUnit";

// Page level SEO metadata (pre-rendered for Google)
export const metadata = {
  title: "Free AI, PDF, Image & Developer Tools Online - Toolchi",
  description: "Explore Toolchi's complete all-in-one suite of free online web, developer, PDF, and productivity tools. 100% secure, local, and private.",
};

export default function HomePage() {
  const popularTools = TOOLS_REGISTRY.filter((t) => t.popular).slice(0, 4);
  const newTools = TOOLS_REGISTRY.filter((t) => t.isNew).slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://toolchi.online/#organization",
        "name": "Toolchi",
        "url": "https://toolchi.online",
        "logo": {
          "@type": "ImageObject",
          "@id": "https://toolchi.online/#logo",
          "url": "https://toolchi.online/logo.jpg",
          "caption": "Toolchi"
        },
        "image": {
          "@id": "https://toolchi.online/#logo"
        },
        "sameAs": [
          "https://github.com/arslanhamee314-bot"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://toolchi.online/#website",
        "url": "https://toolchi.online",
        "name": "Toolchi",
        "description": "Explore Toolchi's complete all-in-one suite of free online web, developer, PDF, and productivity tools. 100% secure, local, and private.",
        "publisher": {
          "@id": "https://toolchi.online/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://toolchi.online/tools?search={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://toolchi.online/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What are the most essential tools for web development?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Highlighted tools on the page include the PNG/JPG compressor, JS & CSS minifier, SSL checker, Responsive checker, Robots.txt checker, and Sitemap validator."
            }
          },
          {
            "@type": "Question",
            "name": "What types of tools do you feature on your website?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The visible categories include webmaster tools, performance tools, operational tools, and design-related utilities."
            }
          },
          {
            "@type": "Question",
            "name": "Will you be updating this page with more tools?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The page messaging indicates that more vetted free tools may be added over time."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="flex-1 flex flex-col bg-[#f6f7fb] dark:bg-[#11141c]">
      {/* JSON-LD Schema Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-24 border-b border-border bg-white dark:bg-card">
        {/* Background glow checks */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-6 w-full flex flex-col-reverse lg:flex-row items-center gap-12 z-10 relative">
          
          {/* Hero Copy (Left on desktop) */}
          <div className="flex-1 flex flex-col gap-4 text-center lg:text-left items-center lg:items-start">
            <p className="text-3xs font-extrabold text-[#6530ef] tracking-widest uppercase">
              All-in-one free online tools
            </p>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-none animate-fade-in">
              Free AI, PDF, Image &amp; Developer Tools Online
            </h1>
            <p className="text-sm md:text-base text-muted max-w-lg leading-relaxed">
              Fast browser-based tools for bloggers, creators, developers, and webmasters. No upload, no signup.
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

            {/* Popular Tools Quick Access Banner */}
            <div className="w-full max-w-md mt-4 border border-dashed border-border/80 p-3.5 rounded-2xl bg-neutral-50/50 dark:bg-neutral-900/30 text-left select-none">
              <span className="text-[9px] font-extrabold text-[#7d4dff] uppercase tracking-wider block mb-2.5">⚡ Popular Tools Quick Access</span>
              <div className="grid grid-cols-2 gap-2.5 text-3xs font-bold leading-normal">
                {/* Video to GIF Card */}
                <a href="/tools/video-to-gif" className="flex items-center gap-2.5 p-2 rounded-xl bg-white dark:bg-card border border-border/60 hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200 group cursor-pointer">
                  <div className="h-7 w-7 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center shrink-0">
                    <Video className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-muted-foreground block text-[8px] uppercase">Animation Suite</span>
                    <span className="text-foreground font-extrabold group-hover:text-primary transition-colors truncate block">Video to GIF</span>
                  </div>
                </a>

                {/* Merge PDF Card */}
                <a href="/tools/merge-pdf" className="flex items-center gap-2.5 p-2 rounded-xl bg-white dark:bg-card border border-border/60 hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200 group cursor-pointer">
                  <div className="h-7 w-7 rounded-lg bg-teal-500/10 text-teal-500 flex items-center justify-center shrink-0">
                    <Layers className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-muted-foreground block text-[8px] uppercase">PDF Suite</span>
                    <span className="text-foreground font-extrabold group-hover:text-primary transition-colors truncate block">Merge PDF</span>
                  </div>
                </a>

                {/* JPG to WebP Card */}
                <a href="/tools/jpg-to-webp" className="flex items-center gap-2.5 p-2 rounded-xl bg-white dark:bg-card border border-border/60 hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200 group cursor-pointer">
                  <div className="h-7 w-7 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0">
                    <ImageIcon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-muted-foreground block text-[8px] uppercase">Image Suite</span>
                    <span className="text-foreground font-extrabold group-hover:text-primary transition-colors truncate block">JPG to WebP</span>
                  </div>
                </a>

                {/* JSON Formatter Card */}
                <a href="/tools/json-formatter" className="flex items-center gap-2.5 p-2 rounded-xl bg-white dark:bg-card border border-border/60 hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200 group cursor-pointer">
                  <div className="h-7 w-7 rounded-lg bg-[#7d4dff]/10 text-primary flex items-center justify-center shrink-0">
                    <FileJson className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-muted-foreground block text-[8px] uppercase">Dev Suite</span>
                    <span className="text-foreground font-extrabold group-hover:text-primary transition-colors truncate block">JSON Formatter</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Hero Decorative Illustration / Visual Proof Mockups (Right on desktop) */}
          <div className="flex-1 flex flex-col gap-4 relative w-full max-w-[420px] py-4 select-none lg:mt-0 mt-8">
            
            {/* Card 1: Image Compression Proof */}
            <div className="bg-white dark:bg-[#1c2230] border border-border/80 rounded-2xl p-4 shadow-sm flex items-center justify-between gap-4 -rotate-1.5 hover:rotate-0 transition-transform duration-300">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-5 w-5"><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                </div>
                <div className="text-left">
                  <h4 className="text-[8px] font-extrabold text-muted-foreground uppercase tracking-wider">Image Optimizer</h4>
                  <p className="text-[10px] font-extrabold text-foreground leading-tight">hero-banner.png</p>
                </div>
              </div>
              <div className="text-right flex items-center gap-2">
                <div className="text-[10px] text-muted-foreground leading-tight">
                  <span className="line-through block">3.2 MB</span>
                  <span className="font-extrabold text-foreground block">640 KB</span>
                </div>
                <span className="px-2 py-1 bg-emerald-500 text-white font-extrabold text-[9px] rounded-lg select-none shrink-0">
                  Saved 80%
                </span>
              </div>
            </div>

            {/* Card 2: JSON Formatter Proof */}
            <div className="bg-white dark:bg-[#1c2230] border border-border/80 rounded-2xl p-4 shadow-sm flex flex-col gap-2 rotate-1 hover:rotate-0 transition-transform duration-300 ml-4">
              <div className="flex items-center justify-between border-b border-border/40 pb-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-red-400"></span>
                  <span className="h-2 w-2 rounded-full bg-yellow-400"></span>
                  <span className="h-2 w-2 rounded-full bg-green-400"></span>
                </div>
                <span className="text-[8px] font-extrabold text-primary bg-[#7d4dff]/10 border border-[#7d4dff]/20 px-1.5 py-0.5 rounded uppercase tracking-wider">JSON Formatted</span>
              </div>
              <pre className="text-[9px] text-[#7d4dff] dark:text-[#a582ff] font-mono leading-normal bg-neutral-50 dark:bg-neutral-950 p-2.5 rounded-lg border text-left overflow-hidden">
{`{
  "status": "success",
  "clientSide": true,
  "formatted": "valid"
}`}
              </pre>
            </div>

            {/* Card 3: SSL Trust Seal Proof */}
            <div className="bg-white dark:bg-[#1c2230] border border-border/80 rounded-2xl p-4 shadow-sm flex items-center justify-between gap-4 -rotate-1 hover:rotate-0 transition-transform duration-300 mr-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-5 w-5"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </div>
                <div className="text-left">
                  <h4 className="text-[8px] font-extrabold text-muted-foreground uppercase tracking-wider">SSL Security Shield</h4>
                  <p className="text-[10px] font-extrabold text-foreground leading-tight">toolchi.online</p>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-blue-500 text-white font-extrabold text-[9px] rounded-lg select-none">
                SECURE
              </span>
            </div>

          </div>

        </div>
      </section>

      {/* 2. Interactive Live Workspace */}
      <InteractiveWorkspace />

      {/* Responsive AdSense Slot */}
      <AdUnit className="px-6 max-w-6xl mt-4" />

      {/* 3. Quick Use-Case Filters */}
      <section id="categories" className="py-12 bg-white dark:bg-card border-b border-border/40 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-6 w-full flex flex-col gap-6">
          <div className="flex flex-col gap-1 text-center lg:text-left">
            <h2 className="text-xl font-bold tracking-tight text-foreground">Browse by Use Case</h2>
            <p className="text-xs text-muted-foreground leading-normal">Select a category to quickly view corresponding tools.</p>
          </div>
          <CategoryFilters />
        </div>
      </section>

      {/* 3. Popular Tools Grid */}
      <section id="popular-tools" className="py-12 border-b border-border/40 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-6 w-full flex flex-col gap-6">
          <div className="flex flex-col gap-1 text-center lg:text-left">
            <h2 className="text-xl font-bold tracking-tight text-foreground font-extrabold">Popular Utilities</h2>
            <p className="text-xs text-muted-foreground leading-normal">Most frequently used tools by returning developers and creators.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {popularTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Recently Added Grid */}
      <section id="recent-tools" className="py-12 bg-white dark:bg-card border-b border-border/40 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-6 w-full flex flex-col gap-6">
          <div className="flex flex-col gap-1 text-center lg:text-left">
            <h2 className="text-xl font-bold tracking-tight text-foreground font-extrabold">Recently Released</h2>
            <p className="text-xs text-muted-foreground leading-normal">Fresh utilities recently added to our free online collection.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {newTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
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

      {/* SaaS Pro Call to Action */}
      <section className="py-12 bg-white dark:bg-card border-t border-border/40 select-none">
        <div className="max-w-4xl mx-auto px-6 w-full text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#7d4dff]/10 border border-[#7d4dff]/20 text-[#7d4dff] text-[10px] font-extrabold uppercase rounded-full tracking-wider">
            <Sparkles className="h-3 w-3" /> Toolchi Pro Suite
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-foreground tracking-tight max-w-xl mx-auto leading-tight">
            Accelerate Your Workflow with Creator Pro Suite
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Get ad-free premium workspace, batch file processing, offline session history, and advanced AI blogging outlines.
          </p>
          <div className="flex justify-center gap-3">
            <Link
              href="/pricing"
              className="px-5 py-2.5 bg-[#7d4dff] hover:bg-[#6530ef] text-white font-extrabold text-xs rounded-xl shadow-md shadow-[#7d4dff]/15 cursor-pointer active:scale-95 transition-all"
            >
              Get Started for $9/mo
            </Link>
            <Link
              href="/tools"
              className="px-5 py-2.5 border border-border bg-neutral-50 dark:bg-neutral-900/40 hover:bg-neutral-100 dark:hover:bg-neutral-800/80 text-foreground font-bold text-xs rounded-xl transition-all cursor-pointer"
            >
              Explore Free Tools
            </Link>
          </div>
        </div>
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
