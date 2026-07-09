import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ArrowLeft, ShieldCheck, Sparkles, Check, X, ArrowUpRight } from "lucide-react";
import { COMPETITORS_REGISTRY, getCompetitorBySlug } from "@/lib/competitors-registry";
import { getToolBySlug } from "@/lib/tools-registry";
import ToolCard from "@/components/tools/ToolCard";
import AdUnit from "@/components/AdUnit";

interface AlternativePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return COMPETITORS_REGISTRY.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: AlternativePageProps) {
  const resolvedParams = await params;
  const competitor = getCompetitorBySlug(resolvedParams.slug);

  if (!competitor) {
    return {
      title: "Comparison Not Found | Toolchi",
      description: "The requested competitor comparison could not be found.",
    };
  }

  return {
    title: competitor.seoTitle,
    description: competitor.seoDescription,
    alternates: {
      canonical: `/alternatives/${competitor.slug}`,
    },
  };
}

export default async function AlternativePage({ params }: AlternativePageProps) {
  const resolvedParams = await params;
  const competitor = getCompetitorBySlug(resolvedParams.slug);

  if (!competitor) {
    notFound();
  }

  // Load recommended tools data
  const recommendedTools = competitor.recommendedToolSlugs
    .map((slug) => getToolBySlug(slug))
    .filter((t) => t !== undefined);

  return (
    <div className="py-12 px-4 sm:px-6 max-w-5xl mx-auto w-full relative overflow-hidden">
      {/* Background glow checks */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[450px] h-[450px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="flex flex-col gap-8 z-10 relative">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-3xs font-semibold text-muted-foreground uppercase tracking-wider print:hidden">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <span className="text-muted-foreground">Alternatives</span>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <span className="text-foreground truncate">{competitor.name} Alternative</span>
        </nav>

        {/* Action Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border/40 pb-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-primary/10 text-primary border border-primary/20 rounded-xl flex items-center justify-center font-extrabold shrink-0">
              VS
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">{competitor.heading}</h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">Honest comparison, privacy audits, and free local workspace tools.</p>
            </div>
          </div>
          <Link 
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors bg-card border border-border px-3 py-1.5 rounded-lg hover:border-neutral-700 shrink-0"
          >
            <ArrowLeft className="h-4.5 w-4.5" /> Back to Dashboard
          </Link>
        </div>

        {/* Intro description */}
        <section className="text-xs sm:text-sm text-muted-foreground leading-relaxed space-y-4">
          <p>{competitor.introText}</p>
        </section>

        {/* Recommended Toolchi Tools Grid */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-foreground tracking-tight">Best Toolchi Utilities for this Use Case</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {recommendedTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </section>

        {/* Responsive AdSense Slot */}
        <AdUnit slot="9018471042" className="my-2" />

        {/* Side-by-Side Comparison Table */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-foreground tracking-tight">{competitor.tableHeading}</h2>
          <div className="overflow-x-auto border border-border/60 rounded-2xl">
            <table className="min-w-full divide-y divide-border/40 text-[11px] sm:text-xs">
              <thead className="bg-neutral-50 dark:bg-card">
                <tr className="divide-x divide-border/20 text-foreground font-extrabold">
                  <th className="px-4 py-3 text-left">Feature / Metric</th>
                  <th className="px-4 py-3 text-left">Toolchi (Local-First)</th>
                  <th className="px-4 py-3 text-left">{competitor.name}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20 bg-white dark:bg-card/10">
                {competitor.comparisons.map((item, idx) => (
                  <tr key={idx} className="divide-x divide-border/20">
                    <td className="px-4 py-3 font-semibold text-foreground">{item.featureName}</td>
                    <td className="px-4 py-3 font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/5">{item.toolchiValue}</td>
                    <td className="px-4 py-3 text-muted-foreground">{item.competitorValue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Pros and Cons split lists */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Toolchi Advantages */}
          <div className="border border-border/60 rounded-3xl p-6 bg-card/10 space-y-4">
            <h3 className="font-extrabold text-sm text-foreground flex items-center gap-1.5">
              <Check className="h-4.5 w-4.5 text-emerald-500 shrink-0" /> Why Toolchi Wins
            </h3>
            <ul className="space-y-2.5 text-xs text-muted-foreground">
              {competitor.pros.map((pro, idx) => (
                <li key={idx} className="flex gap-2 leading-relaxed">
                  <span className="text-emerald-500 shrink-0 font-bold">•</span>
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Trade-offs */}
          <div className="border border-border/60 rounded-3xl p-6 bg-card/10 space-y-4">
            <h3 className="font-extrabold text-sm text-foreground flex items-center gap-1.5">
              <X className="h-4.5 w-4.5 text-red-500 shrink-0" /> Trade-offs &amp; Constraints
            </h3>
            <ul className="space-y-2.5 text-xs text-muted-foreground">
              {competitor.cons.map((con, idx) => (
                <li key={idx} className="flex gap-2 leading-relaxed">
                  <span className="text-red-500 shrink-0 font-bold">•</span>
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Privacy Note */}
        <section className="p-5 bg-emerald-500/5 dark:bg-emerald-500/2 border border-emerald-500/20 rounded-3xl flex flex-col sm:flex-row gap-4 items-center">
          <div className="h-10 w-10 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-xl flex items-center justify-center shrink-0">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-xs font-extrabold text-foreground">Critical Privacy Architecture Note</h4>
            <p className="text-[10px] text-muted-foreground leading-normal mt-0.5">
              {competitor.privacyFocusText}
            </p>
          </div>
        </section>

        {/* SaaS Creator Pro CTA Banner */}
        <section className="border border-dashed border-[#7d4dff]/40 bg-[#7d4dff]/5 rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row justify-between items-center gap-6 select-none mt-4">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#7d4dff]/15 text-primary text-[9px] font-extrabold uppercase rounded-lg tracking-wider">
              <Sparkles className="h-3.5 w-3.5" /> Creator Pro Suite
            </div>
            <h3 className="font-extrabold text-sm sm:text-base text-foreground tracking-tight">Need Batch Editing &amp; Advanced AI Blogging Tools?</h3>
            <p className="text-3xs sm:text-2xs text-muted-foreground max-w-lg leading-relaxed">
              Upgrade to Toolchi Creator Pro for an ad-free premium workspace, batch PDF merges, larger upload limits, and offline history tracking.
            </p>
          </div>
          <Link 
            href="/pricing"
            className="px-5 py-2.5 bg-[#7d4dff] hover:bg-[#6530ef] text-white font-extrabold text-xs rounded-xl shadow-md shadow-[#7d4dff]/15 flex items-center gap-1 hover:scale-103 active:scale-97 transition-all shrink-0 cursor-pointer"
          >
            Get Creator Pro Suite <ArrowUpRight className="h-4 w-4" />
          </Link>
        </section>

      </div>
    </div>
  );
}
