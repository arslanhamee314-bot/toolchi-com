"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ArrowLeft, ShieldCheck, Zap, CheckCircle2 } from "lucide-react";
import { getToolBySlug, TOOLS_REGISTRY, ToolItem } from "@/lib/tools-registry";
import { getLocalizedTool } from "@/lib/tools-i18n";
import ToolSwitcher from "@/components/tools/ToolSwitcher";
import LucideIcon from "@/components/tools/LucideIcon";
import TutorialGallery from "@/components/tools/TutorialGallery";
import LoadSampleButton from "@/components/tools/LoadSampleButton";
import ToolCard from "@/components/tools/ToolCard";
import AdUnit from "@/components/AdUnit";
import RelatedWorkflowBlock from "@/components/workspace/RelatedWorkflowBlock";
import { getDictionary } from "@/i18n/dictionary";

interface ToolLayoutProps {
  slug: string;
  locale?: string;
}

function getDifferentiationContent(toolName: string, categoryId: string) {
  const commonHeader = `Most online ${toolName.toLowerCase()} utilities require uploading your files to remote servers, exposing sensitive business or personal data to leakage, and throttle speeds with download queues. Toolchi is different. `;
  
  if (categoryId === "optimize" || categoryId === "transform") {
    return {
      title: `Why Toolchi's Image Workspace is Different`,
      text: `${commonHeader}All scaling, cropping, and compression operations run strictly inside your browser tab utilizing canvas and CPU threads. Our workspace integrates a dynamic Web Speed Readiness Score to analyze page load suitability, and offers custom presets tailored for blog heroes (1200px), SEO previews, and social headers with 100% file privacy.`
    };
  }
  
  if (categoryId === "documents") {
    return {
      title: `Why Toolchi's PDF Engine is Different`,
      text: `${commonHeader}Unlike standard tools that upload documents to remote servers, Toolchi splits and merges pages locally in-browser. Our workspace automatically gauges combined file weights, monitors sizing limits against common email thresholds (like 10MB), and recommends the best next actions (such as PDF compression) to keep your documents private and lightweight.`
    };
  }
  
  if (categoryId === "developer") {
    return {
      title: `Why Toolchi's Developer Tools are Different`,
      text: `${commonHeader}Most formatter and encoder suites only beautify text. Toolchi is different because it parses syntaxes locally in real-time, displays duplicate JSON key warnings, computes base64 and Gzip compression estimates, and outputs a precise Code Cleanliness Score to guarantee formatting compliance.`
    };
  }
  
  if (categoryId === "ai") {
    return {
      title: `Why Toolchi's Content Suite is Different`,
      text: `${commonHeader}Instead of just counting characters, our AI Writing Analyzer and Summarizer assess readability levels, sentence variation metrics, and tone scores. Our Smart Assist panel guides you with actionable tips (such as SEO length warnings for SERP snippets) to guarantee your drafts are fully blog-ready.`
    };
  }
  
  if (categoryId === "webmaster" || categoryId === "performance") {
    return {
      title: `Why Toolchi's SEO Diagnostics are Different`,
      text: `${commonHeader}Our validators don't just dump raw code parameters. We parse robots.txt and sitemaps to warn you about missing crawl paths, display SSL countdown renewals, visualize redirect chains, and calculate an overall Crawl Health Score to secure your ranking metrics.`
    };
  }
  
  return {
    title: `Why Toolchi is Different`,
    text: `${commonHeader}We do not just perform raw conversions. Toolchi guides your workflow by integrating dynamic Smart Assist instructions, analyzing outputs for a tailored Quality Score, and recommending the next best actions—all while executing strictly on the client side with 100% data confidentiality.`
  };
}

export default function ToolLayout({ slug, locale = "en" }: ToolLayoutProps) {
  const baseTool = getToolBySlug(slug);
  if (!baseTool) {
    notFound();
  }

  const dict = getDictionary(locale);
  const isRtl = locale === "ur";

  // Dynamic direction sync
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.dir = isRtl ? "rtl" : "ltr";
      document.documentElement.lang = locale;
    }
  }, [locale, isRtl]);

  // Localized tool metadata
  const localized = getLocalizedTool(slug, locale);
  const tool = {
    ...baseTool,
    name: localized?.name || baseTool.name,
    shortDesc: localized?.shortDesc || baseTool.shortDesc,
  };

  const getLocalizedLink = (href: string) => {
    if (locale === "en") return href;
    return `/${locale}${href}`;
  };

  // Related tools
  const relatedTools: ToolItem[] = (tool.relatedSlugs || [])
    .map(s => getToolBySlug(s))
    .filter(Boolean) as ToolItem[];
    
  if (relatedTools.length < 4) {
    const catTools = TOOLS_REGISTRY.filter(
      (t) => t.category === tool.category && t.slug !== tool.slug
    );
    for (const t of catTools) {
      if (relatedTools.length >= 4) break;
      if (!relatedTools.some(rt => rt.slug === t.slug)) {
        relatedTools.push(t);
      }
    }
  }

  const appLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.name,
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any (browser-based)",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "url": `https://toolchi.online/tools/${tool.slug}`,
    "description": tool.shortDesc,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://toolchi.online" },
      { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://toolchi.online/tools" },
      { "@type": "ListItem", "position": 3, "name": tool.name, "item": `https://toolchi.online/tools/${tool.slug}` },
    ],
  };

  const faqLd = tool.faqs?.length ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": tool.faqs.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": { "@type": "Answer", "text": f.answer },
    })),
  } : null;

  return (
    <div className={`py-8 px-4 sm:px-6 max-w-5xl mx-auto w-full relative overflow-hidden print:p-0 print:max-w-none print:w-full ${isRtl ? "text-right" : "text-left"}`} dir={isRtl ? "rtl" : "ltr"}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}

      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="flex flex-col gap-6 z-10 relative">
        {/* Breadcrumbs */}
        <nav className={`flex items-center gap-1.5 text-3xs font-semibold text-muted-foreground uppercase tracking-wider print:hidden ${isRtl ? "flex-row-reverse" : ""}`}>
          <Link href={getLocalizedLink("/")} className="hover:text-foreground transition-colors">{dict.common.home}</Link>
          <ChevronRight className={`h-3 w-3 shrink-0 ${isRtl ? "rotate-180" : ""}`} />
          <Link href={getLocalizedLink("/tools")} className="hover:text-foreground transition-colors">{dict.common.tools}</Link>
          <ChevronRight className={`h-3 w-3 shrink-0 ${isRtl ? "rotate-180" : ""}`} />
          <span className="text-foreground truncate">{tool.name}</span>
        </nav>

        {/* Action Header */}
        <div className={`flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border/40 pb-6 print:hidden ${isRtl ? "md:flex-row-reverse" : ""}`}>
          <div className={`flex items-center gap-3 ${isRtl ? "flex-row-reverse" : ""}`}>
            <div className="h-10 w-10 bg-primary/10 text-primary border border-primary/20 rounded-xl flex items-center justify-center shrink-0">
              <LucideIcon name={tool.iconName} className="h-5 w-5" />
            </div>
            <div className={isRtl ? "text-right" : "text-left"}>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">{tool.name}</h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">{tool.shortDesc}</p>
            </div>
          </div>
          <Link 
            href={getLocalizedLink("/")}
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors bg-card border border-border px-3 py-1.5 rounded-lg hover:border-neutral-700 shrink-0"
          >
            <ArrowLeft className="h-4.5 w-4.5" /> {dict.common.backToDashboard}
          </Link>
        </div>

        {/* Tool container */}
        <section className="glass rounded-3xl border border-border p-6 md:p-8 bg-card/25 shadow-2xl relative overflow-hidden print:border-0 print:bg-transparent print:shadow-none print:p-0 print:rounded-none">
          <div className={`flex flex-wrap gap-2 mb-4 md:absolute md:top-3 md:right-3 md:mb-0 pointer-events-none print:hidden ${isRtl ? "md:left-3 md:right-auto" : ""}`}>
            <span className="inline-flex items-center gap-1 text-3xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
              <ShieldCheck className="h-3.5 w-3.5" /> Client Sandbox
            </span>
            <span className="inline-flex items-center gap-1 text-3xs font-semibold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded">
              <Zap className="h-3.5 w-3.5" /> Instant
            </span>
          </div>

          <ToolSwitcher slug={tool.slug} />
          {tool.sampleSupported && (
            <LoadSampleButton slug={tool.slug} />
          )}
        </section>

        {/* Related Workflows */}
        <RelatedWorkflowBlock toolSlug={tool.slug} />

        {/* Info grids */}
        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6 print:hidden ${isRtl ? "dir-rtl" : ""}`}>
          <section className="lg:col-span-2 flex flex-col gap-8 text-sm">
            <div className="flex flex-col gap-3">
              <h2 className="text-lg font-bold text-foreground tracking-tight">About {tool.name}</h2>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                {tool.longDesc}
              </p>
            </div>

            {tool.features && tool.features.length > 0 && (
              <div className="flex flex-col gap-3">
                <h2 className="text-lg font-bold text-foreground tracking-tight">{dict.common.features}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {tool.features.map((feature, idx) => (
                    <div key={idx} className={`p-4 bg-white dark:bg-card border border-border/70 rounded-2xl flex items-start gap-3 ${isRtl ? "text-right flex-row-reverse" : "text-left"}`}>
                      <div className="h-6 w-6 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-4">
              <h2 className="text-lg font-bold text-foreground tracking-tight">{dict.common.howToUse}</h2>
              <ol className="list-decimal pl-5 space-y-2 text-xs md:text-sm text-muted-foreground mb-2">
                {tool.howToUse.map((step, i) => (
                  <li key={i} className="leading-relaxed pl-1">{step}</li>
                ))}
              </ol>
              <TutorialGallery tool={tool} />
            </div>

            {/* Why Toolchi is different block */}
            {(() => {
              const diffContent = getDifferentiationContent(tool.name, tool.category);
              return (
                <div className="flex flex-col gap-3 p-5 bg-primary/5 dark:bg-primary/2 border border-primary/20 rounded-3xl mt-2 select-none">
                  <h3 className="font-extrabold text-sm text-foreground flex items-center gap-1.5">
                    <span className="text-primary shrink-0">✨</span>
                    {diffContent.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {diffContent.text}
                  </p>
                </div>
              );
            })()}

            {/* Use via API Developer callout */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-[#7d4dff]/5 dark:bg-[#7d4dff]/2 border border-[#7d4dff]/25 rounded-3xl mt-4 select-none">
              <div className="space-y-1 text-left">
                <h4 className="font-extrabold text-xs text-foreground flex items-center gap-1.5">
                  <span className="text-[#7d4dff]">🛠️</span>
                  Need programmatic automation for this workflow?
                </h4>
                <p className="text-[10px] text-muted-foreground leading-normal max-w-lg">
                  Toolchi offers high-performance Developer APIs for this tool's pipeline. Integrate image compression, PDF merge/split, SEO audits, and AI generation programmatically.
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <Link
                  href="/docs/api"
                  className="px-3.5 py-1.5 bg-[#7d4dff] hover:bg-[#6530ef] text-white text-[10px] font-extrabold rounded-xl transition-all shadow-sm active:scale-95 whitespace-nowrap"
                >
                  View API Docs
                </Link>
                <Link
                  href="/dashboard"
                  className="px-3.5 py-1.5 border border-border bg-white dark:bg-card hover:bg-neutral-50 dark:hover:bg-neutral-900 text-foreground text-[10px] font-extrabold rounded-xl transition-all active:scale-95 whitespace-nowrap"
                >
                  Get API Key
                </Link>
              </div>
            </div>

          </section>


          {/* FAQ section */}
          <section className={`flex flex-col gap-6 border-t lg:border-t-0 lg:border-l border-border/40 pt-6 lg:pt-0 lg:pl-8 text-sm ${isRtl ? "lg:border-l-0 lg:border-r lg:pl-0 lg:pr-8" : ""}`}>
            <div className="flex flex-col gap-3">
              <h2 className="text-lg font-bold text-foreground tracking-tight">FAQs</h2>
              <div className="flex flex-col gap-4">
                {tool.faqs.map((faq, i) => (
                  <div key={i} className="flex flex-col gap-1.5 border-b border-border/40 pb-4 last:border-b-0 last:pb-0">
                    <h4 className="font-bold text-foreground text-xs leading-snug">{faq.question}</h4>
                    <p className="text-2xs text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-emerald-500/5 dark:bg-emerald-500/2 border border-emerald-500/20 rounded-2xl flex flex-col gap-2 mt-4 select-none">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <h3 className="text-xs font-extrabold text-foreground">Secure Client-Side Sandbox</h3>
              </div>
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                Toolchi operations are executed fully in your local browser sandbox. Zero files, strings, or image buffers are uploaded to servers, ensuring complete security.
              </p>
            </div>
          </section>
        </div>

        <AdUnit slot="9018471042" className="mt-4" />

        {/* Related tools */}
        {relatedTools.length > 0 && (
          <section className="border-t border-border/40 pt-10 mt-6 print:hidden w-full">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1 text-center lg:text-left">
                <h3 className="text-lg font-bold tracking-tight text-foreground font-extrabold">{dict.common.relatedTools}</h3>
                <p className="text-xs text-muted-foreground leading-normal">Other local developer and webmaster tools you might find useful.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {relatedTools.map((rt) => (
                  <ToolCard key={rt.slug} tool={rt} />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
