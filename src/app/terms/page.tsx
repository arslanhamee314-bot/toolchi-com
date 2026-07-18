import React from "react";
import Link from "next/link";
import { Scale, ArrowLeft, FileText } from "lucide-react";

export const metadata = {
  title: "Terms of Service - Toolchi",
  description: "Read the Terms of Service for using Toolchi's free local-first tools and utility suites.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="py-12 px-4 sm:px-6 max-w-4xl mx-auto w-full relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="flex flex-col gap-8 z-10 relative">
        {/* Navigation header */}
        <div className="flex justify-between items-center border-b border-border/40 pb-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 rounded-xl flex items-center justify-center">
              <Scale className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">Terms of Service</h1>
              <p className="text-xs text-muted-foreground mt-1">Last updated: July 2026</p>
            </div>
          </div>
          <Link 
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors bg-card border border-border px-3 py-1.5 rounded-lg"
          >
            <ArrowLeft className="h-4.5 w-4.5" /> Back to Dashboard
          </Link>
        </div>

        {/* Policy Content */}
        <article className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-muted-foreground leading-relaxed space-y-6">
          <section className="space-y-2">
            <h2 className="text-base font-extrabold text-foreground tracking-tight">1. Acceptance of Terms</h2>
            <p>
              By accessing and using Toolchi (referred to as the "Service" or "Platform"), you agree to abide by and be bound by these Terms of Service. If you do not accept these guidelines, you may not use any utility or processing workspace available on the platform.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-extrabold text-foreground tracking-tight">2. Scope of License & Free Use</h2>
            <p>
              Toolchi provides browser-based utilities free of charge. You are granted a non-exclusive, non-transferable, revocable license to utilize the tools for individual, team, educational, or commercial file processing.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-extrabold text-foreground tracking-tight">3. File Ownership and Privacy</h2>
            <p>
              You maintain full ownership and copyrights of all files, images, PDFs, videos, and audio documents you process on Toolchi. Because all processing engines execute locally inside your browser client sandbox:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>No file contents are uploaded, copied, or stored on our servers.</li>
              <li>You are solely responsible for ensuring that you have legal rights to process, compress, or manipulate the assets you feed into the platform.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-extrabold text-foreground tracking-tight">4. Prohibited Uses</h2>
            <p>
              You agree not to use the Service to:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Attempt to scrape, reverse engineer, or maliciously inject script loops to disrupt the website performance.</li>
              <li>Upload files containing malicious code, viruses, or trojans that could execute within other user sessions locally.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-extrabold text-foreground tracking-tight">5. Disclaimer of Warranties</h2>
            <p>
              THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. TOOLCHI DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. WE DO NOT GUARANTEE THAT THE PROCESSING WORKSPACES WILL BE ERROR-FREE OR THAT THE FILES PROCESSED WILL HAVE PERFECT GRAPHIC FIDELITY.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-extrabold text-foreground tracking-tight">6. Amendments to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Changes will be posted here on the terms page and take effect immediately. Continued use of Toolchi after adjustments signifies your acknowledgement of the updated terms.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
