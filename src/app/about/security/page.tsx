import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Cpu, HardDrive, Lock } from "lucide-react";

export const metadata = {
  title: "Security Sandbox Blueprint & Data Privacy - Toolchi",
  description: "Examine Toolchi's browser-side local security architecture. Learn how canvas pixel buffers and WebAssembly guarantee 100% data privacy.",
  alternates: {
    canonical: "/about/security",
  },
};

export default function SecurityPage() {
  return (
    <div className="py-12 px-4 sm:px-6 max-w-4xl mx-auto w-full relative overflow-hidden">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-teal-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="flex flex-col gap-8 z-10 relative">
        {/* Navigation header */}
        <div className="flex justify-between items-center border-b border-border/40 pb-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 rounded-xl flex items-center justify-center">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">Security Sandbox Blueprint</h1>
              <p className="text-xs text-muted-foreground mt-1">Technical details on browser-side data isolation</p>
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
              <Lock className="h-4.5 w-4.5 text-teal-500" /> 100% Client-Side Processing Architecture
            </h2>
            <p>
              Traditional online tools upload your files (such as confidential legal PDFs, client invoices, or raw images) to remote web servers. This introduces leakage risks. 
            </p>
            <p>
              Toolchi utilizes <strong>W3C Client-Side File APIs</strong>. When you select a document:
            </p>
            <ol className="list-decimal pl-5 space-y-1 text-muted-foreground">
              <li>Your browser loads the file bytes directly into isolated tab memory (RAM) via a <code>FileReader</code> stream.</li>
              <li>Calculations (like resizing image pixels, stripping EXIF tags, or merging PDF streams) are processed using local Javascript libraries (such as <code>pdf-lib</code>) and HTML5 Canvas contexts.</li>
              <li>The output file is compiled dynamically and made available for instant download using sandboxed blob paths (<code>URL.createObjectURL</code>).</li>
            </ol>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Cpu className="h-4.5 w-4.5 text-teal-500" /> Local RAM Buffer Isolation
            </h2>
            <p>
              Because all calculations occur strictly in active tab RAM, closing the browser tab automatically terminates the memory allocation. The operating system immediately reclaims the RAM, leaving zero trace of your documents, code inputs, or private graphics on the local hard drive or the internet.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <HardDrive className="h-4.5 w-4.5 text-teal-500" /> Disconnecting the Internet (Offline Audit)
            </h2>
            <p>
              You can verify this architecture yourself. Load the Toolchi Workspace, turn off your device's Wi-Fi connection, and run any file conversion or compression task. You will notice that everything compiles successfully without any network requests.
            </p>
          </section>

          <section className="border-t border-border/40 pt-6">
            <p className="text-3xs text-muted-foreground text-center">
              Security Charter maintained by the <strong>Toolchi Security Board</strong>. Contact: <strong>audit@toolchi.online</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
