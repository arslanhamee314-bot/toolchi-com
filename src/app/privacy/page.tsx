import React from "react";
import Link from "next/link";
import { ShieldCheck, Info, ArrowLeft, Lock } from "lucide-react";

export const metadata = {
  title: "Privacy Policy - Toolchi",
  description: "Learn how Toolchi handles your privacy. All tools are 100% serverless, private, and process data locally inside your browser.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="py-12 px-4 sm:px-6 max-w-4xl mx-auto w-full relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="flex flex-col gap-8 z-10 relative">
        {/* Navigation header */}
        <div className="flex justify-between items-center border-b border-border/40 pb-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-xl flex items-center justify-center">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">Privacy Policy</h1>
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

        {/* Primary Statement banner */}
        <div className="bg-emerald-500/5 border border-emerald-500/15 p-6 rounded-2xl flex gap-4 text-xs sm:text-sm">
          <ShieldCheck className="h-6 w-6 text-emerald-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="font-extrabold text-foreground">100% Private Client-Side Processing Guarantee</h3>
            <p className="text-muted-foreground leading-relaxed">
              Toolchi values your absolute privacy. Every file you upload, convert, merge, compress, or manipulate using our suites is processed entirely in your web browser. We never transmit your data, content, or files to any external remote servers.
            </p>
          </div>
        </div>

        {/* Policy Content */}
        <article className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-muted-foreground leading-relaxed space-y-6">
          <section className="space-y-2">
            <h2 className="text-base font-extrabold text-foreground tracking-tight">1. Information We Do Not Collect</h2>
            <p>
              Because Toolchi functions local-first:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>We do not collect, view, or retain your raw data files (e.g., PDFs, videos, audio recordings, or photos).</li>
              <li>No document data ever leaves your device or browser sandbox.</li>
              <li>We do not use tracking algorithms or profile databases to monitor your inputs.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-extrabold text-foreground tracking-tight">2. Information We Log</h2>
            <p>
              We collect minimal analytical metrics to monitor service health and compile usage counts:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Anonymized Site Usage:</strong> Pages viewed, click paths, and session statistics.</li>
              <li><strong>Technical Indicators:</strong> Browser type, operating system family, and basic responsiveness metrics.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-extrabold text-foreground tracking-tight">3. Cookies & Consent</h2>
            <p>
              Toolchi utilizes local preferences (such as your chosen theme selector) via browser local storage to preserve state. We do not place tracking, targeting, or invasive advertisement cookies on your machine.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-extrabold text-foreground tracking-tight">4. Third-Party Links</h2>
            <p>
              Our application directories might feature links pointing toward external tools or learning references. We do not control and are not responsible for the privacy regulations or content displayed on external websites.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-extrabold text-foreground tracking-tight">5. Data Controller & Subprocessors</h2>
            <p>
              The data controller for Toolchi is Toolchi Inc. Because our file conversion, splitting, merging, and AI content utilities process files 100% locally on your computer via client-side JavaScript, we do not utilize any third-party subprocessors for processing your documents. 
            </p>
            <p>
              To host the website and collect general web traffic analytics, we utilize Vercel Inc. (for hosting code) and Google Analytics (for anonymized telemetry and traffic monitoring). No user documents or sensitive strings are ever shared with these parties.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-extrabold text-foreground tracking-tight">6. Data Subject Rights (GDPR & CCPA/CPRA Compliance)</h2>
            <p>
              Under global data protection regulations (such as GDPR, CCPA, and CPRA), you are granted rights to access, delete, rectify, or restrict the processing of your personal data. Because we do not upload or store your documents or text strings on our servers, we have no capability to access, delete, or retrieve your processed files.
            </p>
            <p>
              For general site metrics or billing information (for Pro users), you may initiate request inquiries to have your data modified or deleted. Please submit your request via our contact support channel.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-extrabold text-foreground tracking-tight">7. Compliance Contact</h2>
            <p>
              If you have inquiries about our local processing sandboxes or compliance guidelines, feel free to submit feedback via our dedicated <Link href="/contact" className="text-[#7d4dff] hover:underline font-bold">Contact Page</Link> or email our privacy desk directly at <span className="font-bold text-foreground">audit@toolchi.online</span>.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
