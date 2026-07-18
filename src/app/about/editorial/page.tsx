import React from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Star, Award, ShieldAlert } from "lucide-react";

export const metadata = {
  title: "Editorial Policies & Review Methodology - Toolchi",
  description: "Learn about Toolchi's editorial standards, fact-checking procedures, and how we review and test our developer and browser-side utilities.",
  alternates: {
    canonical: "/about/editorial",
  },
};

export default function EditorialPage() {
  return (
    <div className="py-12 px-4 sm:px-6 max-w-4xl mx-auto w-full relative overflow-hidden">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="flex flex-col gap-8 z-10 relative">
        {/* Navigation header */}
        <div className="flex justify-between items-center border-b border-border/40 pb-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-primary/10 text-primary border border-primary/20 rounded-xl flex items-center justify-center">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">Editorial Policies</h1>
              <p className="text-xs text-muted-foreground mt-1">Our review methodologies, facts & benchmarks</p>
            </div>
          </div>
          <Link 
            href="/about"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors bg-card border border-border px-3 py-1.5 rounded-lg"
          >
            <ArrowLeft className="h-4.5 w-4.5" /> Back to About
          </Link>
        </div>

        {/* Content Section */}
        <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-foreground/80 leading-relaxed space-y-6">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Star className="h-4.5 w-4.5 text-primary" /> Fact-Checking Standards
            </h2>
            <p>
              Toolchi values accuracy and trustworthiness above all else. Every article published on the Toolchi Blog and every utility guide is compiled by certified webmasters and systems engineers. We explicitly check all claims against standard browser runtime specification sheets published by the W3C and whatWG.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Award className="h-4.5 w-4.5 text-primary" /> Benchmarking Heuristics
            </h2>
            <p>
              When we benchmark files (like measuring compression rates for PNG/WebP files or PDF document sizing metrics), we verify the outcomes across multiple test suites:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
              <li>High-resolution raw images to assess pixel color delta losses.</li>
              <li>Multi-page vector PDFs to confirm typography layer preservation.</li>
              <li>Linguistic word variety structures to evaluate AI text perplexity counts.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <ShieldAlert className="h-4.5 w-4.5 text-primary" /> Conflict of Interest & Ads Disclosures
            </h2>
            <p>
              All recommendations, workflows, and utilities are 100% free of sponsor bias. While Toolchi may host display ads (Google AdSense) to fund browser runtime server caching fees, we do not allow advertising structures to influence our security audits or tool recommendations.
            </p>
          </section>

          <section className="border-t border-border/40 pt-6">
            <p className="text-3xs text-muted-foreground text-center">
              Last Updated: July 2026. For questions or corrections, contact our editorial desk at <strong>editorial@toolchi.online</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
