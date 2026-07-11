import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ChevronRight, ArrowLeft } from "lucide-react";
import { WORKFLOWS, getWorkflowById } from "@/lib/workflows-registry";
import LucideIcon from "@/components/tools/LucideIcon";

interface WorkflowPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: WorkflowPageProps) {
  const { id } = await params;
  const workflow = getWorkflowById(id);
  if (!workflow) return { title: "Workflow Not Found | Toolchi" };
  return {
    title: workflow.seoTitle,
    description: workflow.seoDescription,
    alternates: { canonical: `/workflows/${workflow.id}` },
    openGraph: {
      title: workflow.seoTitle,
      description: workflow.seoDescription,
      url: `/workflows/${workflow.id}`,
      siteName: "Toolchi",
      type: "website",
    },
  };
}

export async function generateStaticParams() {
  return WORKFLOWS.map((w) => ({ id: w.id }));
}

export default async function WorkflowPage({ params }: WorkflowPageProps) {
  const { id } = await params;
  const workflow = getWorkflowById(id);
  if (!workflow) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": workflow.title,
    "description": workflow.seoDescription,
    "step": workflow.steps.map((step, i) => ({
      "@type": "HowToStep",
      "position": i + 1,
      "name": step.label,
      "url": `https://toolchi.online/tools/${step.slug}`,
    })),
  };

  return (
    <div className="py-8 px-4 sm:px-6 max-w-4xl mx-auto w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-3xs font-semibold text-muted-foreground uppercase tracking-wider mb-6">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/workspace" className="hover:text-foreground transition-colors">Workspace</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{workflow.title}</span>
      </nav>

      <div className="flex flex-col gap-8">
        {/* Hero */}
        <div className="flex flex-col gap-4">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-extrabold uppercase tracking-wider ${workflow.color} ${workflow.accentColor} w-fit`}>
            {workflow.category} workflow
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
            {workflow.title}
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
            {workflow.description}
          </p>
          <Link
            href="/workspace"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-[#6530ef] text-white text-sm font-bold rounded-xl transition-all active:scale-95 w-fit"
          >
            Open in Workspace <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Workflow Steps Visualization */}
        <div className="bg-white dark:bg-card border border-border rounded-3xl p-6">
          <h2 className="text-lg font-extrabold text-foreground mb-5">Workflow Steps</h2>
          <div className="flex flex-col gap-3">
            {workflow.steps.map((step, idx) => (
              <div key={step.slug + idx} className="flex items-center gap-4">
                {/* Step number */}
                <div className="h-8 w-8 rounded-xl bg-primary/10 text-primary text-xs font-extrabold flex items-center justify-center shrink-0">
                  {idx + 1}
                </div>

                {/* Tool card */}
                <Link
                  href={`/tools/${step.slug}`}
                  className="flex-1 flex items-center gap-3 p-3 bg-background dark:bg-[#1a1f2e] border border-border hover:border-primary/40 hover:bg-primary/5 rounded-2xl transition-all group"
                >
                  <div className="h-8 w-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <LucideIcon name={step.icon} className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{step.label}</p>
                    <p className="text-[10px] text-muted-foreground">Click to open tool →</p>
                  </div>
                </Link>

                {/* Arrow connector (not for last) */}
                {idx < workflow.steps.length - 1 && (
                  <ArrowRight className="h-4 w-4 text-muted-foreground/40 shrink-0 hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* How To Section */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-extrabold text-foreground">Step-by-Step Guide</h2>
          <ol className="space-y-4">
            {workflow.howTo.map((step, i) => (
              <li key={i} className="flex gap-4">
                <div className="h-6 w-6 rounded-lg bg-primary text-white text-[10px] font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* FAQs */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-extrabold text-foreground">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {workflow.faqs.map((faq, i) => (
              <div key={i} className="bg-white dark:bg-card border border-border rounded-2xl p-5">
                <h3 className="text-sm font-extrabold text-foreground mb-1.5">{faq.question}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-primary/10 to-[#14b8a6]/10 border border-primary/20 rounded-3xl p-8 text-center flex flex-col items-center gap-4">
          <h2 className="text-xl font-extrabold text-foreground">Start This Workflow Now</h2>
          <p className="text-sm text-muted-foreground max-w-md">
            Open all tools for this workflow in one smart Toolchi Workspace — multi-tab, no signup.
          </p>
          <div className="flex gap-3 flex-wrap justify-center">
            <Link
              href="/workspace"
              className="px-5 py-2.5 bg-primary hover:bg-[#6530ef] text-white font-extrabold text-sm rounded-xl shadow-md shadow-primary/20 transition-all active:scale-95"
            >
              Open in Workspace
            </Link>
            <Link
              href="/tools"
              className="px-5 py-2.5 border border-border bg-white dark:bg-card hover:bg-background text-foreground font-bold text-sm rounded-xl transition-all"
            >
              Browse All Tools
            </Link>
          </div>
        </div>

        {/* Back link */}
        <Link
          href="/workspace"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Workspace
        </Link>
      </div>
    </div>
  );
}
