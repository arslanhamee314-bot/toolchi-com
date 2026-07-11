import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { getToolsByCategory } from "@/lib/tools-registry";
import ToolCard from "@/components/tools/ToolCard";
import AdUnit from "@/components/AdUnit";
import LucideIcon from "@/components/tools/LucideIcon";

interface CategoryLandingPageProps {
  categoryIds: string[];
  title: string;
  subtitle: string;
  iconName: string;
  canonical: string;
  introTitle: string;
  intro: string;
  bestFor: string[];
  comparisons: Array<{
    label: string;
    benefit: string;
    workflow: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export default function CategoryLandingPage({
  categoryIds,
  title,
  subtitle,
  iconName,
  canonical,
  introTitle,
  intro,
  bestFor,
  comparisons,
  faqs,
}: CategoryLandingPageProps) {
  const tools = categoryIds.flatMap((id) => getToolsByCategory(id));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description: subtitle,
    url: `https://toolchi.online${canonical}`,
    mainEntity: tools.slice(0, 20).map((tool) => ({
      "@type": "WebApplication",
      name: tool.name,
      url: `https://toolchi.online/tools/${tool.slug}`,
      applicationCategory: "UtilityApplication",
    })),
  };

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-12 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="flex items-center gap-1.5 text-3xs font-semibold uppercase tracking-wider text-muted-foreground">
        <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
        <ChevronRight className="h-3 w-3 shrink-0" />
        <Link href="/tools" className="transition-colors hover:text-foreground">Tools</Link>
        <ChevronRight className="h-3 w-3 shrink-0" />
        <span className="text-foreground">{title}</span>
      </nav>

      <header className="flex items-center gap-3 border-b border-border/40 pb-6">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
          <LucideIcon name={iconName} className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">{title}</h1>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">{subtitle}</p>
        </div>
      </header>

      {tools.length > 0 && (
        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </section>
      )}

      <AdUnit className="my-6" />

      <article className="space-y-8 text-xs leading-relaxed text-muted-foreground sm:text-sm">
        <section className="space-y-2">
          <h2 className="text-lg font-bold tracking-tight text-foreground">{introTitle}</h2>
          <p>{intro}</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold tracking-tight text-foreground">Best For</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {bestFor.map((item) => (
              <div key={item} className="rounded-2xl border border-border/70 bg-white p-4 dark:bg-card">
                <p className="font-semibold text-foreground">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold tracking-tight text-foreground">Toolchi Workflow Advantage</h2>
          <div className="overflow-x-auto rounded-2xl border border-border/70">
            <table className="min-w-full divide-y divide-border/40 text-[11px]">
              <thead className="bg-neutral-50 text-foreground dark:bg-card">
                <tr className="divide-x divide-border/30">
                  <th className="px-4 py-3 text-left font-extrabold">Need</th>
                  <th className="px-4 py-3 text-left font-extrabold">Toolchi Benefit</th>
                  <th className="px-4 py-3 text-left font-extrabold">Suggested Workflow</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30 bg-white dark:bg-card/30">
                {comparisons.map((row) => (
                  <tr key={row.label} className="divide-x divide-border/30">
                    <td className="px-4 py-3 font-semibold text-foreground">{row.label}</td>
                    <td className="px-4 py-3">{row.benefit}</td>
                    <td className="px-4 py-3">{row.workflow}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold tracking-tight text-foreground">FAQs</h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {faqs.map((faq) => (
              <div key={faq.question} className="space-y-1">
                <h3 className="text-xs font-extrabold text-foreground">{faq.question}</h3>
                <p className="text-2xs leading-relaxed text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </article>

      <div className="flex justify-center border-t border-border/40 pt-8">
        <Link
          href="/"
          className="flex items-center gap-1.5 rounded-xl border border-border bg-neutral-900 px-5 py-2.5 text-xs font-bold text-white transition hover:border-neutral-700"
        >
          <Home className="h-4 w-4" /> Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
