import React from "react";
import Link from "next/link";
import { ChevronRight, FolderClosed, ShieldCheck, Home } from "lucide-react";
import { getToolsByCategory } from "@/lib/tools-registry";
import ToolCard from "@/components/tools/ToolCard";
import AdUnit from "@/components/AdUnit";

export const metadata = {
  title: "Free Local PDF & Document Tools Online - PDF-Lib Suite | Toolchi",
  description: "Merge, split, compress, and rotate your PDF documents 100% locally in your web browser. Zero server uploads, maximum file privacy, and no limits.",
  alternates: {
    canonical: "/pdf-tools",
  },
};

export default function PdfToolsCategoryPage() {
  const tools = getToolsByCategory("documents");

  return (
    <div className="py-12 px-4 sm:px-6 max-w-5xl mx-auto w-full">
      <div className="flex flex-col gap-8">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-3xs font-semibold text-muted-foreground uppercase tracking-wider">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <Link href="/tools" className="hover:text-foreground transition-colors">Tools</Link>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <span className="text-foreground">PDF &amp; Document Tools</span>
        </nav>

        {/* Header Block */}
        <div className="border-b border-border/40 pb-6 flex items-center gap-3">
          <div className="h-10 w-10 bg-primary/10 text-primary border border-primary/20 rounded-xl flex items-center justify-center">
            <FolderClosed className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">PDF &amp; Document Utilities</h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">Split, merge, compress, and reorganize your document pages securely on the client side.</p>
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
            <h2 className="text-lg font-bold text-foreground tracking-tight">Why Choose Client-Side PDF Tools?</h2>
            <p>
              Documents often contain highly confidential business files: tax summaries, sales contracts, business receipts, and private resumes. Conventional online PDF editors require you to upload your files to external servers, introducing severe security risks and violation potentials for compliance audits. Toolchi completely solves this by using client-side WebAssembly and JS libraries to parse and compile PDF files directly inside your browser window. Your private files are read locally into RAM, manipulated according to your inputs, and exported instantly without a single byte ever leaving your device.
            </p>
            <p>
              Furthermore, since there is no network transfer delay, you avoid waiting in long server-side queues or hitting arbitrary file size limit prompts (which commonly block free plans on other platforms).
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-bold text-foreground tracking-tight">Toolchi PDF Suite Comparison Guide</h2>
            <div className="overflow-x-auto border border-border/60 rounded-2xl">
              <table className="min-w-full divide-y divide-border/40 text-[11px]">
                <thead className="bg-neutral-50 dark:bg-card">
                  <tr className="divide-x divide-border/20 text-foreground font-extrabold">
                    <th className="px-4 py-3 text-left">Utility</th>
                    <th className="px-4 py-3 text-left">How It Works</th>
                    <th className="px-4 py-3 text-left">Ideal Payload Target</th>
                    <th className="px-4 py-3 text-left">Privacy Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/20 bg-white dark:bg-card/10">
                  <tr className="divide-x divide-border/20">
                    <td className="px-4 py-3 font-semibold text-foreground">Merge PDF</td>
                    <td className="px-4 py-3">Combines separate document page trees into one master PDF binary.</td>
                    <td className="px-4 py-3">Invoices, slide decks, and multi-chapter reports.</td>
                    <td className="px-4 py-3 font-semibold text-emerald-500">100% Local (Safe)</td>
                  </tr>
                  <tr className="divide-x divide-border/20">
                    <td className="px-4 py-3 font-semibold text-foreground">Split PDF</td>
                    <td className="px-4 py-3">Extracts selected page ranges into individual PDF streams.</td>
                    <td className="px-4 py-3">Individual forms, receipts, and contract chapters.</td>
                    <td className="px-4 py-3 font-semibold text-emerald-500">100% Local (Safe)</td>
                  </tr>
                  <tr className="divide-x divide-border/20">
                    <td className="px-4 py-3 font-semibold text-foreground">Compress PDF</td>
                    <td className="px-4 py-3">Downsamples high-resolution images and cleans fonts structure.</td>
                    <td className="px-4 py-3">Email attachments and portal upload files.</td>
                    <td className="px-4 py-3 font-semibold text-emerald-500">100% Local (Safe)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-foreground tracking-tight">Who Should Use These Tools?</h2>
            <p>
              Our PDF and document suite is widely used by:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Freelancers & Small Businesses:</strong> Organize client receipts and merge month-end billing files with absolute invoice confidentiality.</li>
              <li><strong>Legal & HR Professionals:</strong> Split corporate contracts, sign sheets, or extract employee onboarding documents without risk of data leaks.</li>
              <li><strong>Students & Educators:</strong> Consolidate homework tasks, split lecture slides, or compress assignments to fit LMS upload rules.</li>
              <li><strong>Webmasters & Admin Assistants:</strong> Optimize graphic-heavy documents to reduce web hosting footprints and page loading delays.</li>
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
                All document parsing, page extractions, and rendering routines run within your browser's local RAM. No file buffers or metadata are sent across the network, ensuring complete protection for sensitive data.
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <h2 className="text-lg font-bold text-foreground tracking-tight text-center sm:text-left">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1">
                <h4 className="font-extrabold text-foreground text-xs">How do browser-based PDF tools work?</h4>
                <p className="text-2xs text-muted-foreground leading-relaxed">
                  They load lightweight WebAssembly or JavaScript engines (such as pdf-lib) directly inside your browser tab to compile and edit document structures locally.
                </p>
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-foreground text-xs">Is my document safe from being stored?</h4>
                <p className="text-2xs text-muted-foreground leading-relaxed">
                  Yes, definitely. Since the tool does not perform server uploads, there is no server database to log or store your files.
                </p>
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-foreground text-xs">Can I merge files with large page counts?</h4>
                <p className="text-2xs text-muted-foreground leading-relaxed">
                  Yes, our local scripts can comfortably handle documents containing hundreds of pages, utilizing your device's local memory threads.
                </p>
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-foreground text-xs">Do I need to pay to use these tools?</h4>
                <p className="text-2xs text-muted-foreground leading-relaxed">
                  No. All standard tools run completely free of charge and do not require any signup or subscription tiers.
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
