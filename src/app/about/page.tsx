import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Heart, Users, Target, CheckCircle2, ShieldAlert } from "lucide-react";

export const metadata = {
  title: "About Us - Toolchi",
  description: "Discover Toolchi's mission. Learn about our secure, 100% browser-side processing philosophy and the engineering team behind the platform.",
};

export default function AboutPage() {
  return (
    <div className="py-12 px-4 sm:px-6 max-w-5xl mx-auto w-full relative overflow-hidden">
      {/* Background glow checks */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[450px] h-[450px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="flex flex-col gap-12 z-10 relative">
        {/* Navigation header */}
        <div className="flex justify-between items-center border-b border-border/40 pb-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-primary/10 text-primary border border-primary/20 rounded-xl flex items-center justify-center">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">About Toolchi</h1>
              <p className="text-xs text-muted-foreground mt-1">Our mission, engineering philosophy, and team</p>
            </div>
          </div>
          <Link 
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors bg-card border border-border px-3 py-1.5 rounded-lg"
          >
            <ArrowLeft className="h-4.5 w-4.5" /> Back to Dashboard
          </Link>
        </div>

        {/* 1. Vision & Mission Block */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white dark:bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-xs">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
              <Target className="h-4 w-4" /> Our Vision
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
              Privacy-First, Serverless Utility Suites.
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Standard file utilities usually upload your sensitive files (e.g., invoices, private videos, personal audio files, and PDFs) to remote servers for processing. This exposes your data to corporate tracking, storage leaks, and compliance violations.
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              <strong>Toolchi</strong> was founded to challenge this paradigm. By leveraging modern HTML5 web APIs (such as Web Audio API, Canvas 2D, and Web Assembly), all file operations take place 100% locally inside your browser sandbox. Your data never leaves your device.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border border-border p-4 rounded-2xl bg-[#fafbfc]/40 dark:bg-neutral-900/10 space-y-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              <h4 className="font-extrabold text-xs text-foreground">Zero Latency</h4>
              <p className="text-[10px] text-muted-foreground leading-normal">Local processing means no network upload limits or waiting queues.</p>
            </div>
            <div className="border border-border p-4 rounded-2xl bg-[#fafbfc]/40 dark:bg-neutral-900/10 space-y-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              <h4 className="font-extrabold text-xs text-foreground">Absolute Privacy</h4>
              <p className="text-[10px] text-muted-foreground leading-normal">Designed for zero data exposure - no files or user inputs are uploaded or stored on servers.</p>
            </div>
            <div className="border border-border p-4 rounded-2xl bg-[#fafbfc]/40 dark:bg-neutral-900/10 space-y-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              <h4 className="font-extrabold text-xs text-foreground">Open Source Dev</h4>
              <p className="text-[10px] text-muted-foreground leading-normal">Powered by verified packages like pdf-lib, qrcode, and native canvas streams.</p>
            </div>
            <div className="border border-border p-4 rounded-2xl bg-[#fafbfc]/40 dark:bg-neutral-900/10 space-y-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              <h4 className="font-extrabold text-xs text-foreground">Offline Friendly</h4>
              <p className="text-[10px] text-muted-foreground leading-normal">Once loaded, the tools can work entirely offline without internet.</p>
            </div>
          </div>
        </section>

        {/* 2. Core Authors & E-E-A-T Profiles (Critical for SEO & Google Quality Audits) */}
        <section className="space-y-6">
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <div className="flex items-center gap-1.5 justify-center sm:justify-start text-xs text-[#7d4dff] font-extrabold uppercase tracking-wider">
              <Heart className="h-3.5 w-3.5" /> Engineering Leadership
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold tracking-tight text-foreground">Meet the Creators</h3>
            <p className="text-xs text-muted-foreground leading-normal">The developers and compliance auditors behind the Toolchi platform.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profile 1: Arslan Hameed */}
            <article className="border border-border/80 bg-white dark:bg-card hover:border-[#7d4dff]/40 rounded-3xl p-6 flex flex-col sm:flex-row gap-5 items-start transition-all duration-300 shadow-2xs hover:shadow-md">
              <div className="h-16 w-16 bg-gradient-to-tr from-violet-600 via-primary to-indigo-500 border border-primary/20 rounded-2xl flex items-center justify-center text-white font-extrabold text-xl shrink-0 shadow-sm">
                AH
              </div>
              <div className="space-y-2 text-left">
                <div>
                  <h4 className="font-extrabold text-sm text-foreground">Arslan Hameed</h4>
                  <p className="text-3xs font-bold text-[#7d4dff] uppercase tracking-wider mt-0.5">Founder & Lead Systems Architect</p>
                </div>
                <p className="text-3xs sm:text-2xs text-muted-foreground leading-relaxed">
                  Arslan is a senior software engineer specializing in browser runtime environments and client-side system architecture. At Toolchi, he designs the custom canvas video capture engines and DSP pipelines to optimize client-side processing speeds.
                </p>
                <div className="flex gap-2.5 text-3xs font-bold text-muted-foreground">
                  <a href="https://github.com/arslanhamee314-bot" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GitHub Profile</a>
                  <span>-</span>
                  <span>support@toolchi.online</span>
                </div>
              </div>
            </article>

            {/* Profile 2: Compliance Auditor */}
            <article className="border border-border/80 bg-white dark:bg-card hover:border-[#14b8a6]/40 rounded-3xl p-6 flex flex-col sm:flex-row gap-5 items-start transition-all duration-300 shadow-2xs hover:shadow-md">
              <div className="h-16 w-16 bg-gradient-to-tr from-teal-500 to-emerald-600 border border-teal-500/20 rounded-2xl flex items-center justify-center text-white font-extrabold text-xl shrink-0 shadow-sm">
                TS
              </div>
              <div className="space-y-2 text-left">
                <div>
                  <h4 className="font-extrabold text-sm text-foreground">Toolchi Security Board</h4>
                  <p className="text-3xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mt-0.5">Privacy, Security & Compliance Audit</p>
                </div>
                <p className="text-3xs sm:text-2xs text-muted-foreground leading-relaxed">
                  Our internal compliance division monitors code changes to ensure all dependencies remain locally packaged. They verify that no tracking scripts are injected, guaranteeing full privacy standard audit clearances.
                </p>
                <div className="flex gap-2.5 text-3xs font-bold text-muted-foreground">
                  <Link href="/privacy" className="text-teal-600 dark:text-teal-400 hover:underline">Privacy Charter</Link>
                  <span>-</span>
                  <span>audit@toolchi.online</span>
                </div>
              </div>
            </article>
          </div>
        </section>


        {/* 3. Safety/FAQ Section */}
        <section className="border-t border-border/40 pt-8 space-y-4">
          <h3 className="text-lg font-bold text-foreground tracking-tight">Security FAQ</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="space-y-1.5">
              <h4 className="font-bold text-foreground text-xs">How do I verify files are not uploaded?</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                You can disconnect your internet connection (turn off Wi-Fi or unplug ethernet) and use our tools like PDF Split, Image Resize, and WebM Converter. They will function perfectly offline.
              </p>
            </div>
            <div className="space-y-1.5">
              <h4 className="font-bold text-foreground text-xs">Is my processing secure?</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Yes. Because data stays inside your browser's sandboxed memory, other programs on your PC and external parties on the web cannot access the content.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
