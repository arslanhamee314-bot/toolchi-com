import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ArrowLeft, ShieldCheck, Zap } from "lucide-react";
import { getToolBySlug, TOOLS_REGISTRY, ToolItem } from "@/lib/tools-registry";
import ToolSwitcher from "@/components/tools/ToolSwitcher";
import LucideIcon from "@/components/tools/LucideIcon";
import TutorialGallery from "@/components/tools/TutorialGallery";
import LoadSampleButton from "@/components/tools/LoadSampleButton";
import ToolCard from "@/components/tools/ToolCard";
import AdUnit from "@/components/AdUnit";

interface ToolPageProps {
  params: Promise<{ slug: string }>;
}

// Generate dynamic metadata for search engines
export async function generateMetadata({ params }: ToolPageProps) {
  const resolvedParams = await params;
  const tool = getToolBySlug(resolvedParams.slug);

  if (!tool) {
    return {
      title: "Tool Not Found — Toolchi",
      description: "The requested browser utility could not be found.",
    };
  }

  return {
    title: tool.seoTitle,
    description: tool.seoDescription,
    alternates: {
      canonical: `/tools/${tool.slug}`,
    },
    openGraph: {
      title: tool.seoTitle,
      description: tool.seoDescription,
      url: `/tools/${tool.slug}`,
      siteName: "Toolchi",
      type: "website",
      images: [
        {
          url: "/logo.jpg",
          width: 800,
          height: 800,
          alt: tool.name,
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: tool.seoTitle,
      description: tool.seoDescription,
      images: ["/logo.jpg"],
    }
  };
}

// Generate static params to allow Next.js to pre-render pages during builds
export async function generateStaticParams() {
  return TOOLS_REGISTRY.map((tool) => ({
    slug: tool.slug,
  }));
}

export default async function ToolPage({ params }: ToolPageProps) {
  const resolvedParams = await params;
  const tool = getToolBySlug(resolvedParams.slug);

  if (!tool) {
    notFound();
  }

  // Resolve related tools based on relatedSlugs priority then category matching
  const relatedTools: ToolItem[] = (tool.relatedSlugs || [])
    .map(slug => getToolBySlug(slug))
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

  // Pre-compile JSON-LD schemas
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `https://toolchi.online/tools/${tool.slug}#webapp`,
        "url": `https://toolchi.online/tools/${tool.slug}`,
        "name": tool.name,
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "All",
        "browserRequirements": "Requires HTML5, Web Crypto API, and JavaScript",
        "description": tool.shortDesc,
        "offers": {
          "@type": "Offer",
          "price": "0.00",
          "priceCurrency": "USD"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://toolchi.online/tools/${tool.slug}#breadcrumbs`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://toolchi.online"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Tools",
            "item": "https://toolchi.online/tools"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": tool.name,
            "item": `https://toolchi.online/tools/${tool.slug}`
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `https://toolchi.online/tools/${tool.slug}#faq`,
        "mainEntity": tool.faqs.map(f => ({
          "@type": "Question",
          "name": f.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.answer
          }
        }))
      }
    ]
  };

  return (
    <div className="py-8 px-4 sm:px-6 max-w-5xl mx-auto w-full relative overflow-hidden print:p-0 print:max-w-none print:w-full">
      
      {/* Dynamic JSON-LD injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Glow Effects */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="flex flex-col gap-6 z-10 relative">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-3xs font-semibold text-muted-foreground uppercase tracking-wider print:hidden">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <Link href="/tools" className="hover:text-foreground transition-colors">Tools</Link>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <span className="text-foreground truncate">{tool.name}</span>
        </nav>

        {/* Action Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border/40 pb-6 print:hidden">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-primary/10 text-primary border border-primary/20 rounded-xl flex items-center justify-center">
              <LucideIcon name={tool.iconName} className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">{tool.name}</h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">{tool.shortDesc}</p>
            </div>
          </div>
          <Link 
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors bg-card border border-border px-3 py-1.5 rounded-lg hover:border-neutral-700 shrink-0"
          >
            <ArrowLeft className="h-4.5 w-4.5" /> Back to Dashboard
          </Link>
        </div>

        {/* Premium interactive tool element */}
        <section className="glass rounded-3xl border border-border p-6 md:p-8 bg-card/25 shadow-2xl relative overflow-hidden print:border-0 print:bg-transparent print:shadow-none print:p-0 print:rounded-none">
          <div className="flex flex-wrap gap-2 mb-4 md:absolute md:top-3 md:right-3 md:mb-0 pointer-events-none print:hidden">
            <span className="inline-flex items-center gap-1 text-3xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
              <ShieldCheck className="h-3.5 w-3.5" /> Client Sandbox
            </span>
            <span className="inline-flex items-center gap-1 text-3xs font-semibold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded">
              <Zap className="h-3.5 w-3.5" /> Instant
            </span>
            <span className="inline-flex items-center gap-1 text-3xs font-semibold text-[#7d4dff] bg-[#f3eeff] border border-[#e8ddff] px-2 py-0.5 rounded">
              ⚡ Auto-Bake
            </span>
          </div>

          <ToolSwitcher slug={tool.slug} />
          {tool.sampleSupported && (
            <LoadSampleButton slug={tool.slug} />
          )}
        </section>

        {/* Educational SEO & E-E-A-T Blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6 print:hidden">
          
          {/* Main Info Column */}
          <section className="lg:col-span-2 flex flex-col gap-8 text-sm">
            <div className="flex flex-col gap-3">
              <h2 className="text-lg font-bold text-foreground tracking-tight">About {tool.name}</h2>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                {tool.longDesc}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-lg font-bold text-foreground tracking-tight">How to Use the Tool</h2>
              <ol className="list-decimal pl-5 space-y-2 text-xs md:text-sm text-muted-foreground mb-2">
                {tool.howToUse.map((step, i) => (
                  <li key={i} className="leading-relaxed pl-1">{step}</li>
                ))}
              </ol>
              <TutorialGallery tool={tool} />
            </div>
          </section>

          {/* Right Sidebar FAQs Column */}
          <section className="flex flex-col gap-6 border-t lg:border-t-0 lg:border-l border-border/40 pt-6 lg:pt-0 lg:pl-8 text-sm">
            <div className="flex flex-col gap-3">
              <h2 className="text-lg font-bold text-foreground tracking-tight">FAQs</h2>
              <div className="flex flex-col gap-4">
                {tool.faqs.map((faq, i) => (
                  <div key={i} className="flex flex-col gap-1.5 border-b border-border/40 pb-4 last:border-b-0 last:pb-0">
                    <h4 className="font-bold text-foreground text-xs">{faq.question}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

          </section>

        </div>

      {/* Responsive AdSense Slot */}
      <AdUnit slot="9018471042" className="mt-4" />

      {/* Block 5: Related Tools Bottom Grid */}
      {relatedTools.length > 0 && (
          <section className="border-t border-border/40 pt-10 mt-6 print:hidden w-full">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1 text-center lg:text-left">
                <h3 className="text-lg font-bold tracking-tight text-foreground font-extrabold">Related Utilities</h3>
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
