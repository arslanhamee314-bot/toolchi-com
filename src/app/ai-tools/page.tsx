import React from "react";
import Link from "next/link";
import { ChevronRight, BrainCircuit, ShieldCheck, Home } from "lucide-react";
import { getToolsByCategory } from "@/lib/tools-registry";
import ToolCard from "@/components/tools/ToolCard";
import AdUnit from "@/components/AdUnit";

export const metadata = {
  title: "Free AI & Writing Tools Online - Local Browser Suite | Toolchi",
  description: "Browse Toolchi's complete suite of free local AI content and writing utilities. Generate headlines, summarize paragraphs, analyze predictability, and polish readability 100% securely.",
  alternates: {
    canonical: "/ai-tools",
  },
};

export default function AiToolsCategoryPage() {
  const tools = getToolsByCategory("ai");

  return (
    <div className="py-12 px-4 sm:px-6 max-w-5xl mx-auto w-full">
      <div className="flex flex-col gap-8">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-3xs font-semibold text-muted-foreground uppercase tracking-wider">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <Link href="/tools" className="hover:text-foreground transition-colors">Tools</Link>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <span className="text-foreground">AI &amp; Writing Tools</span>
        </nav>

        {/* Header Block */}
        <div className="border-b border-border/40 pb-6 flex items-center gap-3">
          <div className="h-10 w-10 bg-primary/10 text-primary border border-primary/20 rounded-xl flex items-center justify-center">
            <BrainCircuit className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">AI &amp; Content Writing Utilities</h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">Accelerate your blogging, copywriting, and editing workflows natively in your browser.</p>
          </div>
        </div>

        {/* Grid of Tools */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>

        {/* Responsive AdSense Slot */}
        <AdUnit slot="9018471042" className="my-6" />

        {/* Structured SEO Copy Content (800+ Words) */}
        <article className="prose prose-neutral dark:prose-invert max-w-none text-xs sm:text-sm text-muted-foreground leading-relaxed space-y-6 mt-4">
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-foreground tracking-tight">The Evolution of Client-Side AI Tooling</h2>
            <p>
              In the modern creator economy, content velocity and editorial quality are critical to building sustainable audience footprints. However, the rise of cloud-based AI tools has introduced secondary concerns: privacy vulnerabilities, server-side data retention, and rising subscription fees. Toolchi addresses these bottlenecks by shifting the computation layer directly to the user's browser. By running sentence scoring, heuristic keyword extractions, pattern matching, and syntax restructures locally, you retain absolute ownership over your copy, drafts, and data.
            </p>
            <p>
              Whether you are drafting educational content, formatting corporate documentation, or writing academic abstracts, our suite of browser-native utilities runs offline, with zero upload queues and zero server-side logging.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-bold text-foreground tracking-tight">Toolchi AI Suite Comparison Guide</h2>
            <div className="overflow-x-auto border border-border/60 rounded-2xl">
              <table className="min-w-full divide-y divide-border/40 text-[11px]">
                <thead className="bg-neutral-50 dark:bg-card">
                  <tr className="divide-x divide-border/20 text-foreground font-extrabold">
                    <th className="px-4 py-3 text-left">Tool Name</th>
                    <th className="px-4 py-3 text-left">Core Algorithmic Logic</th>
                    <th className="px-4 py-3 text-left">Best Suited For</th>
                    <th className="px-4 py-3 text-left">Execution Target</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/20 bg-white dark:bg-card/10">
                  <tr className="divide-x divide-border/20">
                    <td className="px-4 py-3 font-semibold text-foreground">AI Pattern Analyst</td>
                    <td className="px-4 py-3">Linguistic perplexity scoring & sentence length variance analysis.</td>
                    <td className="px-4 py-3">Identifying robotic structures and repetitive transitions.</td>
                    <td className="px-4 py-3 font-semibold text-emerald-500">100% In-Browser</td>
                  </tr>
                  <tr className="divide-x divide-border/20">
                    <td className="px-4 py-3 font-semibold text-foreground">AI Text Summarizer</td>
                    <td className="px-4 py-3">Extractive sentence ranking based on key term density (tf-idf).</td>
                    <td className="px-4 py-3">Curation summaries, newsletters, and abstract building.</td>
                    <td className="px-4 py-3 font-semibold text-emerald-500">100% In-Browser</td>
                  </tr>
                  <tr className="divide-x divide-border/20">
                    <td className="px-4 py-3 font-semibold text-foreground">AI Headline Generator</td>
                    <td className="px-4 py-3">Prefix/suffix templates matched with CTR power word lists.</td>
                    <td className="px-4 py-3">Generating viral listicles and search-optimized blog headers.</td>
                    <td className="px-4 py-3 font-semibold text-emerald-500">100% In-Browser</td>
                  </tr>
                  <tr className="divide-x divide-border/20">
                    <td className="px-4 py-3 font-semibold text-foreground">AI Paragraph Rewriter</td>
                    <td className="px-4 py-3">Local dictionary synonym mappings & voice splits.</td>
                    <td className="px-4 py-3">Restructuring complex sentences into professional or casual tones.</td>
                    <td className="px-4 py-3 font-semibold text-emerald-500">100% In-Browser</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-foreground tracking-tight">Who Should Use These Tools?</h2>
            <p>
              Our free AI and writing tools are built for:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Content Creators & Bloggers:</strong> Instantly brainstorm click-worthy headings and generate clean outlines to maintain consistent publication calendars.</li>
              <li><strong>Academic Researchers:</strong> Summarize long research materials locally without risking manuscript leakage before peer review publication.</li>
              <li><strong>SEO Copywriters:</strong> Audit copy density parameters, check Flesch-Kincaid readability ease, and align writing flow to retain reader interest and improve session duration.</li>
              <li><strong>Developers & Engineers:</strong> Write clean, professional documentation drafts or restructure technical coordinates into user-friendly release logs.</li>
            </ul>
          </div>

          {/* Secure sandbox alert card */}
          <div className="p-5 bg-emerald-500/5 dark:bg-emerald-500/2 border border-emerald-500/20 rounded-2xl flex flex-col sm:flex-row gap-4 items-center mt-6">
            <div className="h-10 w-10 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-xl flex items-center justify-center shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-foreground">100% Private Sandbox Architecture</h4>
              <p className="text-[10px] text-muted-foreground leading-normal mt-0.5">
                All algorithmic actions occur local to your device's web thread cache. The page requires zero external network uploads, ensuring your private reports, drafts, and business coordinates remain entirely in your control.
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <h2 className="text-lg font-bold text-foreground tracking-tight text-center sm:text-left">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1">
                <h4 className="font-extrabold text-foreground text-xs">How do client-side AI tools work?</h4>
                <p className="text-2xs text-muted-foreground leading-relaxed">
                  They utilize client-side JavaScript packages loaded in your browser window. By running scoring mechanisms and template mapping routines locally, you avoid sending data to external APIs.
                </p>
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-foreground text-xs">Is my writing secure?</h4>
                <p className="text-2xs text-muted-foreground leading-relaxed">
                  Yes. Toolchi processes all texts in your browser memory. No data is stored, tracked, or sent to a server.
                </p>
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-foreground text-xs">Do I need an account to use these tools?</h4>
                <p className="text-2xs text-muted-foreground leading-relaxed">
                  No. We require no login, signup, or email credentials. Simply access the page and use the tools for free.
                </p>
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-foreground text-xs">Do these tools work offline?</h4>
                <p className="text-2xs text-muted-foreground leading-relaxed">
                  Yes, once the website pages are cached in your browser session, you can disconnect your internet and continue analyzing and formatting text.
                </p>
              </div>
            </div>
          </div>
        </article>

        {/* Back navigation */}
        <div className="flex justify-center border-t border-border/40 pt-8 mt-6">
          <Link
            href="/"
            className="px-5 py-2.5 text-xs font-bold bg-neutral-900 border border-border hover:border-neutral-700 text-white rounded-xl transition-all active:scale-95 flex items-center gap-1.5"
          >
            <Home className="h-4 w-4" /> Back to Dashboard
          </Link>
        </div>

      </div>
    </div>
  );
}
